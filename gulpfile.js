import gulp from "gulp";
const { src, dest, series, parallel, watch } = gulp;
import browserSync from "browser-sync";
import nodemon from "nodemon";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import webpack from "webpack";
import cssnano from "gulp-cssnano";
import htmlMin from "gulp-htmlmin";
import uglify from "gulp-uglify";
import terser from "gulp-terser";
import { deleteAsync } from "del";
import imageMin from "gulp-imagemin";
import webpackConfig from "./webpack.config.js";

const sass = gulpSass(dartSass);

// project filePaths
const baseDir = "./app",
  distDir = "./dist",
  styleFiles = baseDir + "/public/styles/**/*.scss",
  cssFiles = baseDir + "/public/styles/**/*.css",
  jsWatchFiles = [
    baseDir + "/public/scripts/app/**/*.js",
    baseDir + "/public/scripts/vendor/*.js",
  ],
  jsBuildFiles = baseDir + "/public/scripts/*.js",
  viewFiles = baseDir + "/views",
  ejsGlob = baseDir + "/views/**/*.ejs",
  imageFiles = baseDir + "/public/images/**/*",
  serverFiles = [
    baseDir + "/*.cjs",
    baseDir + "/routes/**/*.cjs",
    baseDir + "/bin/**/*.cjs",
  ];

/* 
#########################
### WATCH TASKS START ###
#########################
*/

function startNodemon(cb) {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    //script: "./app/index.cjs",
    script: "./app/bin/www.cjs",
    // watch core server file(s) that require server restart on change
    watch: ["./app/index.cjs", "./app/routes/**/*.cjs"],
  })
    .on("start", function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on("restart", function onRestart() {
      // reload connected browsers after a slight delay to account for server loading time

      setTimeout(function reload() {
        browserSync.reload({
          stream: false,
        });
      }, 3000);
    });
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb(); // without reload would only run once
}

function watchFiles() {
  browserSync.init({
    open: "local",
    proxy: "http://localhost:3000",
    port: 4000,
  });
  watch(styleFiles, series(compileStyles, browserSyncReload));
  watch(jsWatchFiles, compileJs);
  watch(viewFiles, browserSyncReload);
}

const watchTask = series(startNodemon, watchFiles);
/* 
##########################
### STYLES TASKS START ###
##########################
*/

function compileStyles() {
  return src(styleFiles, {
    sourcemaps: true,
    base: baseDir + "/public/styles/scss/",
  })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(dest("./app/public/styles", { sourcemaps: true }))
    .pipe(browserSync.stream());
}
/* 
######################
### JS TASKS START ###
######################
*/
function compileJs(cb) {
  webpack(webpackConfig, function (err, stats) {
    if (err) {
      console.log(err.toString());
    }
    console.log(stats.toString());
    cb();
  });
}
/* 
#########################
### BUILD TASKS START ###
#########################
*/
async function delDist() {
  try {
    await deleteAsync(distDir);
  } catch (error) {
    console.error("Error deleting dist directory:", error);
  }
}

function optimizeImages() {
  return src(imageFiles)
    .pipe(
      imageMin({
        progressive: true, // jpeg
        interlaced: true, // gif
        multipass: true, // svg
      })
    )
    .pipe(dest(distDir + "/public/images"));
}

function cssBuild() {
  return src(cssFiles)
    .pipe(cssnano())
    .pipe(dest(distDir + "/public/styles"));
}

function jsBuild() {
  return src(jsBuildFiles)
    .pipe(uglify())
    .pipe(dest(distDir + "/public/scripts"));
}

function minifyHtml() {
  return src(ejsGlob, { base: "./app" })
    .pipe(
      htmlMin({
        collapseWhitespace: true,
        removeComments: true,
      })
    )
    .pipe(dest(distDir));
}

function buildServerFiles() {
  return src(serverFiles, { base: "./app" }).pipe(terser()).pipe(dest(distDir));
}

const build = series(
  delDist,
  parallel(optimizeImages, minifyHtml, buildServerFiles, cssBuild, jsBuild)
);
/* 
#####################################
### PRODUCTION SERVER TASKS START ###
#####################################
*/
function prodServer(cb) {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    script: "./dist/index.cjs",
    // watch core server file(s) that require server restart on change
    watch: ["./dist/index.cjs"],
  })
    .on("start", function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }
      called = true;
    })
    .on("restart", function onRestart() {
      // reload connected browsers after a slight delay to account for server loading time

      setTimeout(function reload() {
        browserSync.reload({
          stream: false,
        });
      }, 3000);
    });
}

const prod = series(prodServer);

//  public gulp tasks, npx gulp <task>
export { watchTask, prod, build };
export default watchTask;

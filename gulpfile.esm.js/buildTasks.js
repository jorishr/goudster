// esmModule.js
import { src, dest, series, parallel } from "gulp";
import { deleteAsync } from "del";
import imageMin from "gulp-imagemin";
import cssnano from "gulp-cssnano";
import htmlMin from "gulp-htmlmin";
import uglify from "gulp-uglify";
import terser from "gulp-terser";

//  project filePaths
const baseDir = "./app",
  distDir = "./dist",
  imageFiles = baseDir + "/public/images/**/*";
(cssFiles = baseDir + "/public/styles/**/*.css"),
  (jsFiles = baseDir + "/public/scripts/*.js"),
  (ejsGlob = baseDir + "/views/**/*.ejs"),
  (serverFiles = [baseDir + "/*.js", baseDir + "/routes/**/*.js"]);

//start clean
function delDist() {
  return deleteAsync(distDir);
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
  return src(jsFiles)
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

const buildTask = series(
  delDist,
  parallel(optimizeImages, minifyHtml, buildServerFiles, cssBuild, jsBuild)
);

export default buildTask;

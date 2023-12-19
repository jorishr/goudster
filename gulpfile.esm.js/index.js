import { series, watch } from "gulp";

import browserSync from "browser-sync";
import nodemon from "nodemon";

import styles from "./styleTasks.js";
import jsCompile from "./jsTasks.js";
//import buildTask from "./buildTasks.js";
import prodServer from "./prod.js";

// project filePaths
const baseDir = "./app",
  styleFiles = baseDir + "/public/styles/**/*.scss",
  jsFiles = [
    baseDir + "/public/scripts/app/**/*.js",
    baseDir + "/public/scripts/vendor/*.js",
  ],
  viewFiles = baseDir + "/views";

//  watch tasks
function startNodemon(cb) {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    script: "./app/index.js",
    // watch core server file(s) that require server restart on change
    watch: ["./app/index.js"],
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
  watch(styleFiles, series(styles, browserSyncReload));
  watch(jsFiles, jsCompile);
  watch(viewFiles, browserSyncReload);
}

const watchTask = series(startNodemon, watchFiles);
const prod = series(prodServer);
//const build = series(buildTask);

//  public gulp tasks, npx gulp <task>
export { watchTask, prod };
//export { watchTask, prod, build };
export default watchTask;

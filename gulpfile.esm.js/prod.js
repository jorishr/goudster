import nodemon from "nodemon";
import browserSync from "browser-sync";

export default function prodServer(cb) {
  let called = false;
  return nodemon({
    // nodemon our expressjs server
    script: "./dist/index.js",
    // watch core server file(s) that require server restart on change
    watch: ["./dist/index.js"],
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

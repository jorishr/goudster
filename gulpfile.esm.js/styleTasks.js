import { src, dest } from "gulp";
import autoprefixer from "autoprefixer";
import postcss from "gulp-postcss";
import browserSync from "browser-sync";
import * as dartSass from "sass";
import gulpSass from "gulp-sass";

const sass = gulpSass(dartSass);

// files
const baseDir = "./app",
  styleFiles = baseDir + "/public/styles/**/*.scss";

//  styles task
export default function styles() {
  return src(styleFiles, {
    sourcemaps: true,
    base: baseDir + "/public/styles/scss/",
  })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer]))
    .pipe(dest("./app/public/styles", { sourcemaps: true }))
    .pipe(browserSync.stream());
}

const   {src, dest, series} = require('gulp'),
        autoprefixer = require('autoprefixer'),
        sass         = require('gulp-sass'),
        postcss      = require('gulp-postcss'),
        browserSync  = require('browser-sync').create();

sass.compiler = require('node-sass');

// Files
const   baseDir    = './app',
        styleFiles = baseDir + '/public/styles/**/*.scss';

//  styles task

function styles(){
    return src(styleFiles, {sourcemaps: true, base: baseDir + '/public/styles/scss/'})
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer]))
        .pipe(dest('./app/public/styles', {sourcemaps: true}))
        .pipe(browserSync.stream())
};

module.exports = styles;
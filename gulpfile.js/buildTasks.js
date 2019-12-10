const   {src, dest, series, parallel} = require('gulp'), 
        del           = require('del'),
        imageMin      = require('gulp-imagemin'),
        cssnano       = require('gulp-cssnano'),
        htmlMin       = require('gulp-htmlmin'),
        uglify        = require('gulp-uglify'),
        terser        = require('gulp-terser');

//  project filePaths
const   baseDir    = './app',
        distDir    = './dist',
        imageFiles = baseDir + '/public/images/**/*'
        cssFiles   = baseDir + '/public/styles/**/*.css',
        jsFiles    = baseDir + '/public/scripts/*.js',
        ejsGlob    = baseDir + '/views/**/*.ejs',
        serverFiles= [baseDir + '/*.js', baseDir + '/routes/**/*.js'];

function delDist(){
    return del(distDir);
}

function optimizeImages(){
    return src(imageFiles)
        .pipe(imageMin({
            progressive: true,  // jpeg
            interlaced: true,   // gif
            multipass: true     // svg
        }))
        .pipe(dest(distDir + '/public/images'));
};

function cssBuild(){
    return src(cssFiles)
        .pipe(cssnano())    
        .pipe(dest(distDir + '/public/styles'))
};

function jsBuild(){
    return src(jsFiles)
        .pipe(uglify())
        .pipe(dest(distDir + '/public/scripts'));
};

function minifyHtml(){
    return src(ejsGlob, { base: './app' })
        .pipe(htmlMin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(dest(distDir));
};

function buildServerFiles(){
    return src(serverFiles, {base: './app'})
        .pipe(terser())
        .pipe(dest(distDir));
}

exports.buildTask = series(delDist, parallel(optimizeImages, minifyHtml, buildServerFiles, cssBuild, jsBuild));
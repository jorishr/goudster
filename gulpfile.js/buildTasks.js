const   {src, dest, series, parallel} = require('gulp'), 
        del           = require('del'),
        imageMin      = require('gulp-imagemin'),
        cssnano       = require('gulp-cssnano'),
        rev           = require('gulp-rev'),
        revReplace    = require('gulp-rev-replace'),
        uglify        = require('gulp-uglify'),
        replaceInFile = require('replace-in-file');

//  project filePaths
const   baseDir    = './app',
        distDir    = './dist',
        imageFiles = baseDir + '/public/images/**/*'
        cssFiles   = baseDir + '/public/styles/**/*.css',
        jsFiles    = baseDir + '/public/scripts/*.js',
        viewFiles  = baseDir + '/views',
        serverFiles= [baseDir + '/*.js', baseDir + '/views/**/*.ejs', baseDir + '/routes/**/*.js'];



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
        .pipe(dest(imageDest));
};

function cssBuild(){
    return src(cssFiles)
        .pipe(cssnano())    
        .pipe(rev())
        .pipe(dest(distDir + '/public/styles'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(distDir + '/public/styles'))
};

function updateHtmlrevCss(){
    let manifest = src(distDir + '/public/styles/rev-manifest.json');
    return src(distDir + '/views/index.ejs')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest(distDir + '/views'));
};

function jsBuild(){
    return src(jsFiles)
        .pipe(uglify())
        .pipe(rev())
        .pipe(dest(distDir + '/public/scripts'))
        .pipe(rev.manifest())   // produces rev-manifest.json
        .pipe(dest(distDir + '/public/scripts'));
};

function updateHtmlrevJs(){
    let manifest = src(distDir + '/public/scripts/rev-manifest.json');
    return src(distDir + '/views/index.ejs')
        .pipe(revReplace({manifest: manifest}))
        .pipe(dest(distDir + '/views'));
};

function buildServerFiles(){
    return src(serverFiles, {base: './app'})
        .pipe(uglify())
        .pipe(dest(distDir));
}

// delete rev-manifest.json

function endBuildClean(){
    return del([distDir + '/public/styles/*.json', distDir + '/public/scripts/*.json']);
};

exports.buildTask = series(delDist, parallel(optimizeImages, buildServerFiles, series(cssBuild, updateHtmlrevCss), series(jsBuild, updateHtmlrevJs)), endBuildClean);
'use strict';

//Set config variables
var config = {
    cssPath: './styles/css',
     sassPath: './styles/sass',
    sassFiles: sassPath + '/**/*.scss'
}

//Require gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),

//Compile SASS, create sourcemap for styles task
gulp.task('styles', function() {
  gulp.src(config.sassFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      //outputStyle: 'compressed',
      outputStyle: 'compact',
      // outputStyle: 'nested',
      // outputStyle: 'expanded',
      precision: 10
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    //Set destination to CSS directory
    .pipe(gulp.dest(config.cssPath))
});

//Create our watch task
gulp.task('watch',function() {
  gulp.watch(config.sassFiles,['styles']);
});

//Define the default task and add the watch task to it
gulp.task('default', ['watch']);

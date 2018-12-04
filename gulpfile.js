'use strict';

//Require gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat')

//Set config variables
var config = {
    cssPath: '.', // Compiling the main stylesheet to the theme root for easy Wordpress linking
    sassFiles: './assets/styles/sass/**/*.scss',
    jsFiles: './assets/scripts/src/**/*.js',
    distPath: './assets/scripts/dist',
    npmPath: './node_modules'
}

//Compile the styles
function styles() {
  return gulp
    .src(config.sassFiles)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed',
      //outputStyle: 'compact',
      //outputStyle: 'nested',
      //outputStyle: 'expanded',
      precision: 10
    }))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(sourcemaps.write('.'))
    .pipe(plumber.stop())
    //Set destination to CSS directory
    .pipe(gulp.dest(config.cssPath))
}

//Compile the scripts
function scripts() {
  return gulp
    .src([
      config.npmPath + '/jquery/dist/jquery.min.js',
      config.npmPath + '/bootstrap/dist/js/bootstrap.min.js',
      config.jsFiles
    ])
    .pipe(concat('application.js'))
    .pipe(gulp.dest(config.distPath))
}

//Set which files to watch
function watch() {
  gulp.watch(config.sassFiles, styles);
  gulp.watch(config.jsFiles, scripts);
}

//Set our build order
var build = gulp.parallel(styles, scripts, watch);

//Define our default task
gulp.task('default', build);
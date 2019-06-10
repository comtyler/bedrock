'use strict';

//Require gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload');

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
    .pipe(sass({errLogToConsole: true, outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(sourcemaps.write({includeContent: false}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.cssPath))
    .pipe(livereload())
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
  livereload.listen();
  gulp.watch(config.sassFiles, styles);
  gulp.watch(config.jsFiles, scripts);
}

//Set our build order
var build = gulp.parallel(styles, scripts, watch);

//Define our default task
gulp.task('default', build);
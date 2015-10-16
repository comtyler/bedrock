'use strict';

//Require gulp plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps')

//Set config variables
var config = {
    cssPath: './stylesheets/css',
     sassPath: './stylesheets/sass'
}

//Compile SASS, create sourcemap for styles task
gulp.task('styles', function() {
  gulp.src(config.sassPath + '/**/*.scss')
    //Keep Gulp running even on errors
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    //Initialize CSS maps for browser style identification
    .pipe(sourcemaps.init())
    //Compile SASS
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: "compressed"
    }))
    .pipe(sourcemaps.write('/maps'))
    //Set destination to CSS directory
    .pipe(gulp.dest(config.cssPath))
});

//Create our watch task
gulp.task('watch',function() {
  gulp.watch(config.sassPath + '/**/*.scss',['styles']);
});

//Define the default task and add the watch task to it
gulp.task('default', ['watch']);

'use strict';

//Require global Gulp plugins
const gulp = require('gulp'),
			plumber = require('gulp-plumber'),
			livereload = require('gulp-livereload'),
			sourcemaps = require('gulp-sourcemaps'),
			environments = require('gulp-environments');

//Set environment variables
var development = environments.development,
		production = environments.production;

//Set config variables
var config = {
	paths: {
		base: './',
		files: './**/*.php',
		scripts: {
			input: './assets/scripts/src/**/*.js',
			output: './assets/scripts/dist',
			vue: './node_modules/vue/dist/vue.js'
		},
		styles: {
			input: './assets/styles/**/*.scss',
		}
	}
}

//Compile the styles
function styles() {
	const postcss = require('gulp-postcss');
	const purgecss = require ('gulp-purgecss');
	const cleancss = require ('gulp-clean-css');
	const sass = require('gulp-sass');

	return gulp.src(config.paths.styles.input)
		.pipe(plumber())
		.pipe(development(sourcemaps.init()))
		.pipe(
			sass({
				errLogToConsole: true,
				outputStyle: development() ? 'expanded' : 'compressed'
			}).on('error', sass.logError)
		)
		.pipe(postcss([
      require('tailwindcss'),
      require('autoprefixer')
    ]))
    .pipe(production(purgecss({ content: [config.paths.files] })))
    .pipe(production(cleancss({ level: 2 })))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(gulp.dest(config.paths.base))
}

//Compile the scripts
function scripts() {
	const terser = require('gulp-terser');
	const concat = require('gulp-concat');

	return gulp.src([config.paths.scripts.vue, config.paths.scripts.input])
		.pipe(plumber())
		.pipe(development(sourcemaps.init()))
		.pipe(concat('application.js'))
		.pipe(production(terser()))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(gulp.dest(config.paths.scripts.output))
}

//Set which files to watch during development
function watch() {
	livereload.listen(35729);
	gulp.watch(config.paths.files).on('change', function(file) {
		livereload.changed(file);
	});
	gulp.watch(config.paths.styles.input, styles);
	gulp.watch(config.paths.scripts.input, scripts);
}

//Define our tasks
gulp.task('build', gulp.parallel(styles, scripts));
gulp.task('default', gulp.parallel(styles, scripts, watch));
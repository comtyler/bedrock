'use strict';

//Require global Gulp plugins
const gulp = require('gulp'),
			plumber = require('gulp-plumber'),
			hash = require('gulp-hash-filename'),
			livereload = require('gulp-livereload'),
			sourcemaps = require('gulp-sourcemaps'),
			environments = require('gulp-environments');

//Set environment variables
var development = environments.development,
		production = environments.production;

//Set config variables
var config = {
	files: './**/*.php',
	scripts: {
		input: './assets/scripts/src/**/*.js',
		output: './assets/scripts/dist',
		compiled: './assets/scripts/dist/**/*.js',
		vue: './node_modules/vue/dist/vue.js'
	},
	styles: {
		input: './assets/styles/sass/**/*.scss',
		output: './assets/styles/css',
		compiled: './assets/styles/css/**/*.css'
	}
}

//Remove existing compiled assets
function sweep() {
	const clean = require('gulp-clean');

	return gulp.src([config.scripts.compiled, config.styles.compiled], {read: false})
		.pipe(clean({force: true}))
}

//Compile the styles
function styles() {
	const postcss = require('gulp-postcss');
	const purgecss = require ('gulp-purgecss');
	const cleancss = require ('gulp-clean-css');
	const sass = require('gulp-sass');

	sweep();

	return gulp.src(config.styles.input)
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
    .pipe(production(purgecss({ content: [config.files] })))
    .pipe(production(cleancss({ level: 2 })))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(hash({
			"format": "{name}-{hash:12}{ext}"
		}))
		.pipe(gulp.dest(config.styles.output))
}

//Compile the scripts
function scripts() {
	const terser = require('gulp-terser');
	const concat = require('gulp-concat');

	sweep();

	return gulp.src([config.scripts.vue, config.scripts.input])
		.pipe(plumber())
		.pipe(development(sourcemaps.init()))
		.pipe(concat('main.js'))
		.pipe(production(terser()))
		.pipe(development(sourcemaps.write()))
		.pipe(development(livereload()))
		.pipe(hash({
			"format": "{name}-{hash:12}{ext}"
		}))
		.pipe(gulp.dest(config.scripts.output))
}

//Set which files to watch during development
function watch() {
	livereload.listen(35729);
	gulp.watch(config.files).on('change', function(file) {
		livereload.changed(file);
	});
	gulp.watch(config.styles.input, styles);
	gulp.watch(config.scripts.input, scripts);
}

//Set our build order
var build = gulp.parallel(styles, scripts);
var watch = gulp.parallel(styles, scripts, watch);

//Define our tasks
gulp.task('build', gulp.series(sweep, build));
gulp.task('default', gulp.series(sweep, watch));
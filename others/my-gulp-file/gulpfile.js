'use strict';

// include gulp
var gulp = require('gulp'); 

// include plug-ins
var jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    stripDebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    livereload = require('gulp-livereload');
    
// JS concat, strip debugging and minify
gulp.task('js', function() {
  gulp.src(['./js/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('script.min.js'))
    // .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest('./js/min/'));
});

// Compile Sass files
gulp.task('sass', function () {
  gulp.src('./css/scss/all.scss')
    .pipe(sass())
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer('last 3 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css/min/'))
    .pipe(livereload());
});

// default gulp task: watch Sass files
gulp.task('default', function() {
  livereload.listen();
  gulp.watch(['./css/**/*.scss'], ['sass']);
});
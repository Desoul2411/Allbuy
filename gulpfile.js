'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const del = require('del');
const newer = require('gulp-newer');
const autoprefixer = require('gulp-autoprefixer');
const remember = require('gulp-remember');
const browserSync = require('browser-sync').create();
const eslint = require('gulp-eslint');
const urlAdjuster = require('gulp-css-url-adjuster');
const imagemin = require('gulp-imagemin');


gulp.task('styles', function () {
    return gulp.src('frontend/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(urlAdjuster({
            replace:  ['../../assets/images','../assets/images'],
        }))
        .pipe(autoprefixer())
        .pipe(remember('styles'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('public/styles'));
});

gulp.task('scripts', function() {
    return gulp.src('frontend/js/*.js', {since: gulp.lastRun('scripts')})
        .pipe(newer('public/js')) //filter does not let no modified files
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('lint', function () {
    return gulp.src('frontend/js/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('clean', function () {
    return del('public');
});

gulp.task('assets', function () {
    return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
        .pipe(newer('public/assets')) //filter does not let no modified files
        .pipe(debug({title: 'assets'}))
        .pipe(gulp.dest('public/assets'));
});

gulp.task('html', function () {
    return gulp.src('frontend/*.html', {since: gulp.lastRun('html')})
        .pipe(newer('public'))
        .pipe(gulp.dest('public'));
});

gulp.task('images', function(){
    return gulp.src('frontend/assets/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets/images'))
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts', 'assets', 'html'))
);

gulp.task('watch', function () {
    gulp.watch('frontend/styles/**', gulp.series('styles'));
    gulp.watch('frontend/js/**', gulp.series('scripts'));
    gulp.watch('frontend/assets/**', gulp.series('assets'));
    gulp.watch('frontend/*.html', gulp.series('html'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: 'public'
    });

    browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
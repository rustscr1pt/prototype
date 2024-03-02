const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));

const imagemin = require('gulp-imagemin'); // import image minifier
const htmlmin = require('gulp-htmlmin'); // import html minifier

gulp.task('serve', function() {
    browserSync.init({
        server: {baseDir: './'}
    });
});

gulp.task('styles', function() {
    return gulp
        .src('sass/*.sass')
        .pipe(sass({outputStyle : 'compressed'}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('checker', function() {
    gulp.watch('sass/*.sass', gulp.parallel('styles'));
    gulp.watch('*html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('serve', 'styles', 'checker'));


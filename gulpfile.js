const gulp = require('gulp');
const browserSync = require('browser-sync');
const sass = require('gulp-sass')(require('sass'));

gulp.task('serve', function() {
    browserSync.init({
        server: {baseDir: './'}
    });
});

gulp.task('styles', function() {
    return gulp
        .src('sas/*.sass')
        .pipe(sass({outputStyle : 'compressed'}))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

gulp.task('checker', function() {
    gulp.watch('sass/*.sass', gulp.parallel('styles'));
    gulp.watch('*html').on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('serve', 'styles', 'checker'));

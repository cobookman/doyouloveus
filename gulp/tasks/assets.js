var gulp = require('gulp');

gulp.task('assets', function () {
    return gulp.src('./assets/**').pipe(gulp.dest('./public'));
});

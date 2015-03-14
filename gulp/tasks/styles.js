var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('sass', function() {
    return gulp.src('./client/styles.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            compass: true
        }))
        .pipe(prefix('last 2 versions', '> 1%', 'Firefox ESR', 'Opera 12.1'))
        .pipe(gulp.dest('./public/css'));
});

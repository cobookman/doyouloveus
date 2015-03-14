var gulp = require('gulp');
var CombinedStream = require('combined-stream');
var wrapCommonJS = require('gulp-wrap-commonjs');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('vendor', function() {
    var vendorStream = new CombinedStream();
    vendorStream.append(function(next) {
        next(gulp.src('./bower_components/commonjs-require-definition/require.js'));
    });

    return vendorStream.append(function (next) {
        next(
            gulp.src([
                './bower_components/react/react.js'
            ])
            .pipe(wrapCommonJS({
                pathModifier: function(path) {
                    var projectDirname = __dirname.replace('/gulp/tasks', '');
                    return path
                        .replace(projectDirname + '/bower_components/', '')
                        .replace(projectDirname + '/node_modules/', '')
                        .replace(new RegExp('/.*$'), '');
                }
            }))
        );
    })
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));

});

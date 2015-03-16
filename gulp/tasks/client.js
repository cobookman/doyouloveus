"use strict";

var gulp = require('gulp');
var CombinedStream = require('combined-stream');
var wrapCommonJS = require('gulp-wrap-commonjs');
var concat = require('gulp-concat');
var react = require('gulp-react');
var uglify = require('gulp-uglify');

gulp.task('client', function() {
    var jsStream = new CombinedStream();
    jsStream.append(function (next) {
        next(gulp.src('./client/**/*.{jsx,js}'));
    });

    return jsStream
        .pipe(react())
        .pipe(wrapCommonJS({
            pathModifier: function(path) {
                return path
                    .replace(__dirname.replace('gulp/tasks',  '') + 'client/', '')
                    .replace(new RegExp('\\.js$'), '');
            }
        }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});

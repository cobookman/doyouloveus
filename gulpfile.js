'use strict';

var gulp = require('gulp');
var fs = require('fs');
var util = require('util');
var path = require('path');

(function loadTasks(dirs) {
    if (!util.isArray(dirs)) { dirs = [dirs]; }

    dirs.forEach(function (dir) {
        fs.readdirSync(dir).forEach(function(file) {
            var f = path.resolve(dir, file);
            if(!fs.statSync(f).isFile()) { return; }
            require(f);
        });
    });
}([
    './gulp/tasks'
]));


gulp.task('default', ['build']);

gulp.task('build', ['assets', 'vendor', 'client', 'sass']);
gulp.task('watch', ['build'], function() {
    gulp.watch(
        [
            './client/**/*.js',
            './client/**/*.jsx',
            './client/styles/**/*.scss',
            './client/**/*.jade'
        ],
        [
            'build'
        ]
    );

    gulp.watch(
        [
            '/assets/**/*'
        ],
        [
            'assets'
        ]
    );
});

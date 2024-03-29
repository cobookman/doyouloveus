"use strict";

var Hoek = require('hoek');
var jade = require('jade');
var fs = require('fs');
var indexTemplate = jade.compile(fs.readFileSync(__dirname + '/../client/index.jade'));

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: '', auth: false }, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    // serve up public javascript
    server.route({
        method: 'GET',
        path:  options.basePath + '/js/{param*}',
        config: {
            auth: options.auth
        },
        handler: {
            directory: {
                path: __dirname + '/../public/js'
            }
        }
    });

    // serve up public css
    server.route({
        method: 'GET',
        path:  options.basePath + '/css/{param*}',
        config: {
            auth: options.auth
        },
        handler: {
            directory: {
                path: __dirname + '/../public/css'
            }
        }
    });


    // serve up public imgs
    server.route({
        method: 'GET',
        path:  options.basePath + '/img/{param*}',
        config: {
            auth: options.auth
        },
        handler: {
            directory: {
                path: __dirname + '/../public/img'
            }
        }
    });

    // serve up public videos
    server.route({
        method: 'GET',
        path:  options.basePath + '/video/{param*}',
        config: {
            auth: options.auth
        },
        handler: {
            directory: {
                path: __dirname + '/../public/video'
            }
        }
    });

    // else serve up index.html
    server.route({
        method: 'GET',
        path: options.basePath + '/{p*}',
        config: {
            auth: {
                strategy: 'session',
                mode: 'try'
            },
            handler: function(request, reply) {
                var context = {
                    userInfo: request.auth && request.auth.credentials || {}
                };

                console.log(request.auth.credentials);
                reply(indexTemplate(context));
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'public',
    version: '1.0.0'
};

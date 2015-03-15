"use strict";

var Hoek = require('hoek');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: '', auth: false }, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function (options, server, next) {
    server.route({
        method: 'GET',
        path: options.basePath + '/logout',
        config: {
            auth: options.auth,
            handler: function (request, reply) {
                request.auth.session.clear();
                reply("logged out");
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'logout',
    version: '1.0.0'
};

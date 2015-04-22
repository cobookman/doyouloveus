"use strict";

var Hoek = require('hoek');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'DELETE',
        path: options.basePath + '/campaign/{name}',
        config: {
            auth: {
                strategy: 'session',
            },
            handler: exports.handler
        }
    });

    return next();
};

exports.handler = function(request, reply) {
    reply({error: "NOT YET IMPLEMENTED"}).code(500);
};

exports.register.attributes = {
    name: 'campaign/delete',
    version: '1.0.0'
};

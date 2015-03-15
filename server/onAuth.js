"use strict";

var Hoek = require('hoek');
var fs = require('fs');
var onAuthJS = fs.readFileSync(__dirname + '/../assets/onAuth.html', 'utf-8');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);

    server.route({
        method: 'GET',
        path: options.basePath + '/onAuth',
        config: {
            auth: false,
            handler: function(request, reply) {
                reply(onAuthJS);
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'onAuth',
    version: '1.0.0'
};

"use strict";

var config = require('../../config');

exports.register = function (server, options, next) {
    server.dependency(["bell", "hapi-auth-cookie"], exports.resolved);

    return next();
};

exports.resolved = function(server, next) {
    exports.registerSessionAuth(server);
    exports.registerTwitterAuth(server);

    return next();
};

exports.registerSessionAuth = function(server) {
    server.auth.strategy('session', 'cookie', {
        password: 'my secret password :D',
        cookie: 'sid',
        isSecure: false,
        mode: 'optional'
    });

    server.auth.default('session');
};

exports.registerTwitterAuth = function(server) {
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: config.twitter.cookie.password,
        clientId: config.twitter.oauth.clientId,
        clientSecret: config.twitter.oauth.clientSecret,
        isSecure: false
    });
};


exports.register.attributes = {
    name: 'lib/auth',
    version: '1.0.0'
};

"use strict";
var Good = require('good');

exports.register = function (server, options, next) {
    server.register({
        register: Good,
        options: {
            reporters: [{
                reporter: require('good-console'),
                events: {
                    response: '*',
                    log: '*'
                }
            }]
        }
    }, exports.resolved);

    return next();
};

exports.resolved = function(err) {
    if(err) {
        console.warn('ERROR: Could not start good-console', {err: err});
    }

};

exports.register.attributes = {
    name: 'lib/good-console',
    version: '1.0.0'
};

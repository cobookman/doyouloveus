var Hoek = require('hoek');

exports.register = function (server, options, next) {
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'GET',
        path: options.basePath + '/login',
        config: {
            auth: {
                strategy: 'twitter',
                mode: 'try'
            },
            handler: function (request, reply) {
                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                if(request.auth.isAuthenticated) {
                    console.log("hi", {twitter: {
                        token: request.auth.credentials.token,
                        secret: request.auth.credentials.secret
                    }});
                    request.auth.session.set({
                        twitter: {
                            token: request.auth.credentials.token,
                            secret: request.auth.credentials.secret
                        }
                    });
                }

                return reply.redirect('/home');
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'twitter/login',
    version: '1.0.0'
};

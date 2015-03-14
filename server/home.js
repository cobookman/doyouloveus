var Hoek = require('hoek');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);

    server.route({
        method: 'GET',
        path: options.basePath + '/home',
        config: {
            handler: exports.handler
        }
    });

    return next();
};

exports.handler = function (request, reply) {
    reply("logged into the webapp as:\n" + JSON.stringify(request.auth.credentials.profile));
};

exports.register.attributes = {
    name: 'home',
    version: '1.0.0'
};

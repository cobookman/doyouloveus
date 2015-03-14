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
        redirectTo: '/login',
        isSecure: false
    });

    server.auth.default('session');
};

exports.registerTwitterAuth = function(server) {
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password',
        clientId: 'gUKpG3OEvmsvBUzqoExm6jS2Y',
        clientSecret: 'm1duHDoyROOfuUPVU95g1mzyyq8PEw1CFucZjLT7Ys89zCjjos',
        isSecure: false
    });
};


exports.register.attributes = {
    name: 'lib/auth',
    version: '1.0.0'
};

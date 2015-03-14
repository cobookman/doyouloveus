var Confidence = require('confidence');

var criteria = {
    env: process.env.NODE_ENV
};

var manifest = {
    $meta: 'this file definces the plot device',
    server: {
        debug: {
            request: ['error']
        },
        connections: {
            routes: {
                security: true
            }
        }
    },
    connections: [
        {
            port: 8080,
            labels: ['http']
        }
    ],
    plugins: {
        'hapi-auth-cookie': {},
        'bell': {},
        './server/lib/auth': {},
    
        './server/twitter/login': { basePath: '/twitter' },
        './server/twitter/logout': { basePath: '/twitter' },
        './server/home': { basePath: '' }
    }
};

var store = new Confidence.Store(manifest);

exports.get = function (key) {
    return store.get(key, criteria);
};

exports.meta = function (key) {
    return store.meta(key, criteria);
};

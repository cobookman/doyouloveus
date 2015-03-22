"use strict";

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
        './server/logout': { basePath: '', auth: false },
        './server/onAuth': { basePath: '' },
        './server/public': { basePath: '', auth: false },

        './server/api/love/twitter': { basePath: '/api/love' },
        './server/api/queueCampaignMsgs': { basePath: '/api' },
        './server/tasks/sendTweets': {}
    }
};

// make connection port be 80 for production
if(criteria.env === 'production') {
    manifest.connections[0].port = 80;
}
var store = new Confidence.Store(manifest);

exports.get = function (key) {
    return store.get(key, criteria);
};

exports.meta = function (key) {
    return store.meta(key, criteria);
};

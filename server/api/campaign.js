"use strict";

var Hoek = require('hoek');
var campaigns = require('../collection/campaigns');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);

    server.route({
        method: 'GET',
        path: options.basePath + '/campaign/{name}',
        config: {
            auth: false,
            handler: exports.handler
        }
    });

    return next();
};

exports.handler = function(request, reply) {
    campaigns.get({name: request.params.name})
        .then(function(data) {
            reply({
                name: data.name,
                owner: data.twitter_username,
                description: data.description
            });
        })
        .catch(function(err) {
            reply({
                err: err,
                msg: "Failed to grab campaign"
            }).code(500);
        });
};

exports.register.attributes = {
    name: 'campaigns',
    version: '1.0.0'
};


function formatCampaignName(name) {
    return name.replace(/[^\w\s\d]/gi, '');
}

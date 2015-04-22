"use strict";

var Hoek = require('hoek');
var campaigns = require('../../collection/campaigns');
var subscriptions = require('../../collection/campaignSubscriptions');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'GET',
        path: options.basePath + '/account',
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
    var username = request.auth.credentials.twitter_username;
    var output = {
        username: username,
        displayName: request.auth.credentials.displayName
    };

    campaigns.getAll({twitter_username: username})
        .then(function(campaigns) {
            output.campaigns = campaigns.map(function(campaign) {
                delete campaign.stripe_customer_id;
                return campaign;
            });

            return subscriptions.getAll({username: username});
        })
        .then(function(subscriptions) {
            output.subscriptions = subscriptions;
            reply(output);
        })
        .catch(function(err) {
            console.warn("Failed to fetch user information", {err: err});

            reply({
                err: err,
                msg: "Failed to grab account information",
                username: username
            }).code(500);
        });
};

exports.register.attributes = {
    name: 'account/user',
    version: '1.0.0'
};

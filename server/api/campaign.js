"use strict";

var Hoek = require('hoek');
var campaigns = require('../collection/campaigns');
var subscriptions = require('../collection/campaignSubscriptions');

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
    var output = {};
    campaigns.get({name: request.params.name})
        .then(function(campaign) {
            output.campaign = {
                name: campaign.name,
                owner: campaign.twitter_username,
                description: campaign.description,
                plan: campaign.plan,
                last_sent_msg: campaign.last_sent_msg
            };

            return subscriptions.getAll({campaign: request.params.name});
        })
        .then(function(people) {
            output.subscriptions = people;
            reply(output);
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

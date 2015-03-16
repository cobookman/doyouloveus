"use strict";

var Hoek = require('hoek');
var campaignSubscriptions = require('../../collection/campaignSubscriptions');
var moment = require('moment');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'GET',
        path: options.basePath + '/twitter/{campaign}/{amount}',
        config: {
            auth: {
                strategy: 'session',
            },
            handler: function (request, reply) {


                campaignSubscriptions.add({
                    campaign: request.params.campaign,
                    type: 'twitter',
                    expires_at: moment().add(request.params.amount, 'month').utc().format('YYYY-MM-DD HH:MM:SS'),
                    username: request.auth.credentials.twitter_username
                })
                .then(function() {
                    return reply.redirect('/subscribed/' + request.params.campaign + '/' + request.params.amount);
                })
                .catch(function(err) {
                    reply(err || 'error could not subscribe to the ' + request.params.campaign + ' on twitter for ' + request.auth.credentials.twitter_username)
                        .code(500);
                });
            }
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'love/twitter',
    version: '1.0.0'
};

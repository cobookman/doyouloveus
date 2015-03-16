"use strict";

var Hoek = require('hoek');
var moment = require('moment');
var Joi = require('joi');
var campaign = require('../model/campaign');
var campaignSubscriptions = require('../collection/campaignSubscriptions');
var Promise = require('promise'); // jshint ignore:line
var rabbitmq = require('../lib/rabbitmq');


exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'POST',
        path: options.basePath + '/queue/{campaign}',
        config: {
            auth: {
                strategy: 'session',
            },
            validate: {
                params: {
                    campaign: Joi.string().min(1)
                },
                payload: {
                    message: Joi.string().min(1)
                }
            },
            handler: exports.handler
        }
    });

    return next();
};

exports.handler = function(request, reply) {
    if(request.auth.credentials.campaigns.indexOf(request.params.campaign) === -1) {
        return reply({status: 'not authorized to send out campaign'}).code(401);
    }

    // generate list of campaign subscribers
    campaign.get({
        name: request.params.campaign
    })
    .then(function(campaign) {
        if(!exports.canSendMsg(campaign)){
            throw new Error("you sent a message this month already");
        }
        else {
            return exports.queueMsgs(campaign, request.payload.message);
        }
    })
    .then(function(queued) {
        console.log("queued msgs for campaign " + request.params.campaign, queued);
        return reply({status: 'success', queued: queued});
    })
    .catch(function(err) {
        console.log("ERROR couldn't send out campaign " + request.params.campaign, err);
        return reply({status: 'faiuled to send out campaign', err: err}).code(500);
    });
};

exports.queueMsgs = function(campaign, msg) {
    var promise = new Promise(function(resolve, reject) {
        // get a list of users who belong to the campaign
        campaignSubscriptions.getAll({
            campaign: campaign.name
        })
        .then(function(subscriptions) {
            var queued = {};
            subscriptions.forEach(function(subscription) {
                console.log('queing msg for', campaign.name, subscription.type, subscription.username);

                if( !queued[subscription.type] ) {
                    queued[subscription.type] = [];
                }
                queued[subscription.type].push(subscription.username);

                rabbitmq.publish(subscription.type + '_queue', {
                    msg: msg,
                    user: subscription.username
                });
            });

            resolve(queued);
        })
        .catch(reject);
    });
    return promise;
};


exports.canSendMsg = function(campaign) {
    var lastMsgYM = moment(campaign.last_sent_msg || 0).utc().format('YYYY-MM');
    var currentYM = moment().utc().format('YYYY-MM');
    if(lastMsgYM === currentYM) {
        return false;
    }
    else {
        return true;
    }
};

exports.register.attributes = {
    name: 'queueCampaignMsgs',
    version: '1.0.0'
};

"use strict";

var Hoek = require('hoek');
var Joi = require('joi');
var Promise = require('promise');
var campaigns = require('../collection/campaigns');

var config = require('../../config');
var stripe = require('stripe')(config.stripe);
var email = require('../lib/email');
var stacklead = require('../lib/stacklead');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);

    server.route({
        method: 'POST',
        path: options.basePath + '/payments',
        config: {
            auth: false,
            validate: {
                payload: {
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    campaign_name: Joi.string().required(),
                    campaign_description: Joi.string().required(),
                    twitter_username: Joi.string().required(),
                    email: Joi.string().required(),
                    token: Joi.string().required(),
                    coupon: Joi.any().optional(),
                    plan: Joi.string().required()
                }
            },
            handler: exports.handler
        }
    });

    return next();
};

exports.handler = function(request, reply) {
    exports.addStripeCustomer(request)
        .then(function(customer) {
            console.log("Adding customer to db");
            return campaigns.add({
                name: formatCampaignName(request.payload.campaign_name).trim(),
                description: request.payload.campaign_description.trim(),
                created_at: new Date(),
                updated_at: new Date(),
                last_sent_msg: null,
                twitter_username: request.payload.twitter_username,
                stripe_customer_id: customer.id,
                coupon: request.payload.coupon || null,
                plan: request.payload.plan
            });
        })
        .then(exports.sendEmail.bind(exports, request))
        .then(function() {
            console.log("Campaign Creation SUCCESS", request.payload);
            reply({msg: 'Campaign Creation Success', payload: request.payload});

            // send stacklead
            stacklead(request.payload.email)
                .then(function() { console.log("Sent stacklead on", request.payload.email); })
                .catch(function() { console.log("Failed to send stacklead on", request.payload.email); });
        })
        .catch(function(err) {
            console.warn("Campaign Creation FAILURE", request.payload, err);
            reply({err: err, msg: "Campaign Creation FAILURE"}).code(500);
        });
};

exports.sendEmail = function(request) {
    var campaignName = formatCampaignName(request.payload.campaign_name);
    var campaignUrl = 'http://doyouloveus.com/love/' + encodeURIComponent(campaignName);
    var msg = {
        from: 'Kumar <kumar@doyouloveus.com>',
        to: request.payload.email,
        subject: "Welcome to doyouloveus.com",
        text: [
            'Hi ' + request.payload.first_name +',',
            '',
            'Some quick info and bam, you\'ll be on your way to growth.',
            'Employees and supporters of a company and/or nonprofit have 10X',
            'the social reach of the companies and organizations that they love.',
            '',
            'We help you tap into that power. Simply follow these steps and',
            'watch as your monthly content and PR pushes reach a higher share',
            'count and exposure.',
            '',
            '1) Send out your campaign link to your lovers: ' + campaignUrl,
            '2) Watch as you gain soo many lovers',
            '3) Go to: http://doyouloveus.com/campaign/' + encodeURIComponent(campaignName) + ' to syndicate tweets',
            '   Make sure its a good tweet as you only get 1 tweet / month',
            '',
            '',
            'Feel free to ping any of us at support@doyouloveus.com or call us directly.',
            '',
            'Sincerely,',
            'Kumar, Brian, Colin',
            'support@doyouloveus.com',
            'Ph:832-795-9744'
        ].join('\n')
    };

    return email.send(msg);
};

exports.addStripeCustomer = function (request) {
    return new Promise(function (resolve, reject) {
        var params = {
            email: request.payload.email,
            description: request.payload.first_name + request.payload.last_name,
            metadata: {
                first_name: request.payload.first_name,
                last_name: request.payload.last_name,
                campaign: request.payload.campaign_name,
                twitter_username: request.payload.twitter_username
            },
            source: request.payload.token
        };

        if(request.payload.coupon) {
            params.coupon = request.payload.coupon;
        }

        stripe.customers.create(params, function(err, customer) {
            if(!err && customer) {
                return resolve(customer);
            }
            else {
                return reject(err || "Campaign creation failure");
            }
        });
    });
};

exports.register.attributes = {
    name: 'payments',
    version: '1.0.0'
};


function formatCampaignName(name) {
    return name.replace(/[^\w\s\d]/gi, '');
}

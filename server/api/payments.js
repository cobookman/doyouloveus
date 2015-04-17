"use strict";

var Hoek = require('hoek');
var Joi = require('joi');
var Promise = require('promise');
var campaigns = require('../collection/campaigns');

var config = require('../../config');
var stripe = require('stripe')(config.stripe);

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
                    twitter_username: Joi.string().required(),
                    email: Joi.string().required(),
                    token: Joi.string().required()
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
                name: request.payload.campaign_name.replace(/[^\w\s\d]/gi, ''),
                created_at: new Date(),
                updated_at: new Date(),
                last_sent_msg: null,
                twitter_username: request.payload.twitter_username,
                stripe_customer_id: customer.id,
                coupon: request.payload.coupon || null
            });
        })
        .then(function() {
            console.log("Campaign Creation SUCCESS", request.payload);
            reply({msg: 'Campaign Creation Success', payload: request.payload});
        })
        .catch(function(err) {
            console.warn("Campaign Creation FAILURE", request.payload, err);
            reply({err: err, msg: "Campaign Creation FAILURE"}).status(500);
        });
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

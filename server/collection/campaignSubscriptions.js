"use strict";

var knex = require('../lib/knex');
var Promise = require('promise'); // jshint ignore:line
var _ = require('lodash');


exports.add = function(obj) {
    var where = _.clone(obj);
    delete where.amount;

    var promise = new Promise(function(resolve, reject) {
        exports.get(where)
            .then(function(subscription) {
                if(subscription) {
                    console.log("updating campaign subscription");
                    return exports.update(obj);
                }
                else {
                    console.log("inserting new campaign subscription");
                    return exports.insert(obj);
                }
            })
            .then(resolve)
            .catch(reject);
    });
    return promise;
};

/**
 * Returns a promise
 */
exports.insert = function(row) {
    row = _.clone(row);
    row.created_at = knex.raw('CURRENT_TIMESTAMP');
    row.updated_at = knex.raw('CURRENT_TIMESTAMP');

    return knex('campaign_subscriptions')
        .insert(row);
};

/**
 * Returns a promise
 */
exports.get = function (query) {
    return knex('campaign_subscriptions')
        .where(query)
        .first();
};

/**
 * Returns a promise
 */
exports.update = function(row) {
    row = _.clone(row);
    row.updated_at = knex.raw('CURRENT_TIMESTAMP');
    delete row.createdAt;

    return knex('campaign_subscriptions')
        .update(row)
        .where({
            campaign: row.campaign,
            type: row.type,
            username: row.username
        });
};

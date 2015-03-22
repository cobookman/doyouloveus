"use strict";

var knex = require('../lib/knex');
var Promise = require('promise'); // jshint ignore:line
var _ = require('lodash');


exports.add = function(obj) {
    var where = {
        campaign: obj.campaign,
        type: obj.type,
        username: obj.username
    };

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
    console.log('inserting', row);
    return knex('campaign_subscriptions')
        .insert(row);
};

/**
 * Returns a promise
 */
exports.update = function(row) {
    row = _.clone(row);
    row.updated_at = knex.raw('CURRENT_TIMESTAMP');
    return knex('campaign_subscriptions')
        .update(row)
        .where({
            campaign: row.campaign,
            type: row.type,
            username: row.username
        });
};

/**
 * Returns a promise
 */
exports.get = function (query) {
    return exports.getAll(query)
        .first();
};

/**
 * Returns a promise
 */
exports.getAll = function (query) {
    return knex('campaign_subscriptions')
        .select()
        .where(query)
        .andWhere('expires_at', '>', knex.raw('CURRENT_TIMESTAMP'));
};

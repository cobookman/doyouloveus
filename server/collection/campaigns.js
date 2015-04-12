"use strict";

var knex = require('../lib/knex');
var Promise = require('promise'); // jshint ignore:line
var _ = require('lodash');

/**
 * Returns a promise
 */
exports.add = exports.insert = function(row) {
    row = _.clone(row);
    row.created_at = knex.raw('CURRENT_TIMESTAMP');
    row.updated_at = knex.raw('CURRENT_TIMESTAMP');
    console.log('inserting into campaigns', row);
    return knex('campaigns')
        .insert(row);
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
    return knex('campaigns')
        .select()
        .where(query);
};

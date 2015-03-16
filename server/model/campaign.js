'use strict';
var _ = require('lodash');
var knex = require('../lib/knex');

exports.get = function(query) {
    return knex('campaigns')
        .select()
        .first()
        .where(query);

};

exports.update = function(row) {
    var query = {
        name: row.name
    };

    row = _.clone(row);
    row.updated_at = knex.raw('CURRENT_TIMESTAMP');

    return knex('campaigns')
        .where(query)
        .update(row);
};

exports.updateLastSentMsg = function(name) {
    var query = {
        name: name
    };

    var row = {
        updated_at: knex.raw('CURRENT_TIMESTAMP'),
        last_sent_msg: knex.raw('CURRENT_TIMESTAMP')
    };
    return knex('campaigns')
        .where(query)
        .update(row);
};

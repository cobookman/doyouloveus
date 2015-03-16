'use strict';

exports.up = function(knex) {
    return knex.schema
        .table('campaign_subscriptions', function(table) {
            table.dropColumn('amount');
            table.timestamp('expires_at').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaign_subscriptions', function(table) {
            table.addColumn('amount').notNullable();
            table.dropColumn('expires_at');
        });
};

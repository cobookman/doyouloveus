'use strict';

exports.up = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.string('stripe_customer_id').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.dropColumn('stripe_customer_id');
        });
};

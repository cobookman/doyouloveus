'use strict';

exports.up = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.string('coupon').nullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.dropColumn('coupon');
        });
};

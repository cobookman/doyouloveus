'use strict';

exports.up = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.string('plan').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.dropColumn('plan');
        });
};

'use strict';

exports.up = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.text('description').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.dropColumn('description');
        });
};

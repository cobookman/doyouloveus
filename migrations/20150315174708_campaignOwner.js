'use strict';

exports.up = function(knex) {
    console.log("LAST MIGRATION");
    return knex.schema
        .table('campaigns', function(table) {
            table.string('twitter_username').notNullable();
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function(table) {
            table.dropColumn('twitter_username');
        });
};

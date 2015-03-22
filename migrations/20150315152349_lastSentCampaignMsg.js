'use strict';

exports.up = function(knex) {
    console.log("UP4");
    return knex.schema
        .table('campaigns', function(table) {
            table.timestamp('last_sent_msg');
        });
};

exports.down = function(knex) {
    return knex.schema
        .table('campaigns', function (table) {
            table.dropColumn('last_sent_msg');
        });
};

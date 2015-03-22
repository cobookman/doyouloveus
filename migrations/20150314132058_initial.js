"use strict";

/* global exports */

exports.up = function(knex) {
    console.log("UP");
    return knex.schema
        .createTable('users', function(table) {
            table.string('first_name');
            table.string('last_name');

            table.string('twitter_username').unique();
            table.string('twitter_id').unique();
            table.integer('twitter_followers').unsigned();
            table.integer('twitter_friends').unsigned();
            table.integer('twitter_statuses').unsigned();
            table.string('twitter_profileimg');
            table.string('twitter_lang');

            table.string('twitter_oauth_token');
            table.string('twitter_oauth_secret');

            table.timestamp('created_at').nullable();
        });
};

exports.down = function(knex) {
    return knex.schmea
        .dropTable('users');
};

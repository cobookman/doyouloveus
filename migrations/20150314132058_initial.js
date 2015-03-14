/* global exports */

exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.bigIncrements();
            table.string('first_name');
            table.string('last_name');
            table.string('twitter_username').unique();
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').notNullable().defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );

        })
        .createTable('twitter', function(table) {
            table.bigIncrements();
            table.string('twitter_id').unique();
            table.string('username').unique();
            table.string('name');
            table.integer('followers_count').unsigned();
            table.integer('friends_count').unsigned();
            table.integer('statuses_count').unsigned();
            table.string('profile_image');
            table.string('lang');
            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').notNullable().defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );

        });
};

exports.down = function(knex, Promise) {
    return knex.schmea
        .dropTable('users')
        .dropTable('twitter');
};

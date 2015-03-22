'use strict';

exports.up = function(knex) {
    return knex.schema
        .createTable('sent_msgs', function(table) {
            table.string('type').notNullable();
            table.string('username').notNullable();
            table.string('campaign').notNullable();
            table.string('message').notNullable();
            table.timestamp('created_at').notNullable();
        });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('sent_msgs');
};

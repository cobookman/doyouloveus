'use strict';

exports.up = function(knex) {
    console.log("UP3");
    return knex.schema
        .createTable('sent_msgs', function(table) {
            table.string('type').notNullable();
            table.string('username').notNullable();
            table.string('campaign').notNullable();
            table.string('message').notNullable();
            table.timestamp('created_at').notNullable().defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
        });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('sent_msgs');
};

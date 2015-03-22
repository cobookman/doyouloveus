'use strict';

exports.up = function(knex) {
    return knex.schema
        .createTable('campaign_subscriptions', function(table) {
            table.string('campaign').notNullable();
            table.string('type').notNullable();
            table.string('amount').notNullable();
            table.string('username').notNullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        })
        .createTable('campaigns', function(table) {
            table.string('name').notNullable();

            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
        });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('campaign_subscriptions')
    .dropTable('campaigns');
};

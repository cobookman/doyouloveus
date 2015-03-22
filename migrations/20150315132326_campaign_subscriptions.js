'use strict';

exports.up = function(knex) {
    console.log("UP2");
    return knex.schema
        .createTable('campaign_subscriptions', function(table) {
            table.string('campaign').notNullable();
            table.string('type').notNullable();
            table.string('amount').notNullable();
            table.string('username').notNullable();

            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').notNullable().defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
        })
        .createTable('campaigns', function(table) {
            table.string('name').notNullable();

            table.timestamp('created_at').nullable();
            table.timestamp('updated_at').notNullable().defaultTo(
                knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
            );
        });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('campaign_subscriptions')
    .dropTable('campaigns');
};

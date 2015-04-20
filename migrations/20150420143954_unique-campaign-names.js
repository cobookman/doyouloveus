'use strict';

exports.up = function(knex) {
    return knex.schema.raw([
        'CREATE UNIQUE INDEX unique_names',
        'ON campaigns (name)'
    ].join(' '));
};

exports.down = function(knex) {
    return knex.schema.raw([
        'ALTER TABLE campaigns',
        'DROP INDEX unique_names'
    ].join(' '));
};

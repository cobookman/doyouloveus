"use strict";

var knex = require('knex');
var config = require('../../knexfile');

if(process.env.NODE_ENV) {
    config = config[process.env.NODE_ENV];
}
else {
    config = config.development;
}

knex = knex(config);
knex.migrate.latest({});
knex.migrate.currentVersion().then(function(name) {
    console.log("Currently on migration", name);
});
module.exports = knex;

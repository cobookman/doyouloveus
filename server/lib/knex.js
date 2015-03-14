var knex = require('knex');
var config = require('../../knexfile');

if(process.env.NODE_ENV) {
    config = config[process.env.NODE_ENV];
}
else {
    config = config.development;
}

knex = knex(config);

module.exports = knex;

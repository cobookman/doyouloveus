'use strict';

var amqp = require('amqp');
var config = require('../../rabbitmq-config');

var host;
if(process.env.NODE_ENV) {
    host = config[process.env.NODE_ENV].host;
}
else {
    host = 'localhost';
}

var connection = amqp.createConnection({
    host: host
});

module.exports = connection;

'use strict';

var amqp = require('amqp');
var config = require('../../config').rabbitmq;

var connection = amqp.createConnection({
    host: config.host || 'localhost'
});

console.log('listening rabbitmq', typeof connection);
module.exports = connection;

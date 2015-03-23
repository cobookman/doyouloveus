'use strict';

var amqp = require('amqp');
var config = require('../../config').rabbitmq;

var connection = amqp.createConnection({
    host: config.host || 'localhost'
});

module.exports = connection;

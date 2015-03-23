'use strict';

var amqp = require('amqp');
var config = require('../../config').rabbitmq;

var connection = amqp.createConnection(config);

module.exports = connection;

'use strict';

var config = require('../../config').rabbitmq;
var amqp = require('amqplib').connect(config);

module.exports = amqp;

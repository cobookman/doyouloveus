"use strict";
var rabbitmq = require('../lib/rabbitmq');
var RATE_LIMIT = 5 * 1000;
exports.register = function (server, options, next) {
    console.log("Waiting for tweets");

    rabbitmq.on('ready', function() {
        rabbitmq.queue('twitter_queue', { autoDelete: false, durable: true}, function (queue) {
            console.log("INFO: Listening for msgs posted to twitter_queue");

            queue.subscribe({ ack: true, prefetchCount: 1}, function (msg) {
                exports.sendTweet(msg, function() {
                    setTimeout(function ack() {
                         queue.shift();  //ack
                    }, RATE_LIMIT);
                });
            });
        });
    });

    return next();
};

exports.sendTweet = function (msg, cb) {
    console.log("SENDING TWEET", msg);
    cb();
};

exports.register.attributes = {
    name: 'tasks/sendTweets',
    version: '1.0.0'
};

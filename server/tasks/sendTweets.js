"use strict";
var rabbitmq = require('../lib/rabbitmq');
var RATE_LIMIT = 5 * 1000;
var Twitter = require('../lib/twitter');
var user = require('../model/user');
var noop =  function() {};

exports.register = function (server, options, next) {
    rabbitmq.on('ready', function() {
        console.log("Waiting for tweets");
        rabbitmq.queue('twitter_queue', { autoDelete: false, durable: true}, function (queue) {
            console.log("INFO: Listening for msgs posted to twitter_queue");

            queue.subscribe({ ack: true, prefetchCount: 1}, function (msg) {
                var sendFn = noop;

                if(msg.type) {
                    sendFn = exports.sendTweet;
                }

                sendFn(msg, function(err) {
                    if(err) {
                        queue.shift(true, true); // reject, failed to send, and reque
                    }
                    else {
                        setTimeout(function() {
                            queue.shift(); //ack, successfully sent out
                        }, RATE_LIMIT);
                    }
                });
            });
        });
    });

    return next();
};

exports.sendTweet = function (msg, cb) {
    // get user credentials
    var onFail = function(err) {
        console.log('ERROR:', err, msg);
        cb(err, null);
    };

    user.get({
        twitter_username:  msg.username
    })
    .then(function(user) {
        var client = Twitter({
            key: user.twitter_oauth_token,
            secret: user.twitter_oauth_secret
        });

        client.updateStatus(msg.text, function(err) {
            if(err) {
                return onFail(err);
            }
            else {
                console.log("SENT TWEET", msg);
                return cb(null);
            }
        });
    })
    .catch(onFail);
};

exports.register.attributes = {
    name: 'tasks/sendTweets',
    version: '1.0.0'
};

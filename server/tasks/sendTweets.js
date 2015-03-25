"use strict";
var rabbitmq = require('../lib/rabbitmq');
var RATE_LIMIT = 5 * 1000;
var Twitter = require('../lib/twitter');
var user = require('../model/user');

exports.register = function (server, options, next) {
    rabbitmq.then(function onRabbitMQConn (conn) {
        var ok = conn.createChannel();
        ok = ok.then(function onChannel (channel) {
            channel.assertQueue('twitter_queue');
            channel.consume('twitter_queue', exports.onMsg.bind(exports, channel));
        });
        return ok;
    })
    .then(null, console.warn);

    return next();
};

exports.onMsg = function(channel, msg) {
    if (msg === null) {
        console.warn(new Error("NULL MESSAGE"));
        return false;
    }

    var data = JSON.parse(msg.content.toString());

    exports.sendTweet(data, function(err) {
        if(!err) {
            setTimeout(function() {
                channel.ack(msg);
            }, RATE_LIMIT);
        }
        else {
            console.warn("FAILED TO SEND", data);
        }
    });
};

exports.sendTweet = function (msg, cb) {
    // get user credentials
    var onFail = function(err) {
        console.warn('ERROR:', err, msg);
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
                console.warn("SENT TWEET", msg);
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

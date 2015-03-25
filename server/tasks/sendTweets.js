"use strict";
var rabbitmq = require('../lib/rabbitmq');
var RATE_LIMIT = 5 * 1000;
var Twitter = require('../lib/twitter');
var user = require('../model/user');
var knex = require('../lib/knex');

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


exports.onTweetFail = function(msg, cb, err) {
    console.warn(new Error("ERROR, failed to send tweet"), err, msg);
    cb(err, null);
};

exports.onTweetSuccess = function(msg, cb) {
    knex('sent_msgs').insert({
        type: msg.type,
        username: msg.username,
        campaign: msg.campaign,
        message: msg.text,
        created_at: new Date()
    })
    .then(function() {
        console.log("Logged Sent Tweet for", msg);
    })
    .catch(function(err) {
        console.warn("Unable to log sent tweet for", msg, err);
    });

    return cb(null);
};

exports.sendTweet = function (msg, cb) {
    // get user credentials
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
                exports.onFail(msg, cb, err);
            }
            else {
                return exports.onTweetSuccess(msg, cb);

            }
        });
    })
    .catch(exports.onTweetFail.bind(exports, msg, cb));
};

exports.register.attributes = {
    name: 'tasks/sendTweets',
    version: '1.0.0'
};

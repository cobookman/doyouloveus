'use strict';

var Twitter = require('ntwitter');
var config = require('../../config').twitter;

module.exports = function(token) {
    return new Twitter({
        consumer_key: config.oauth.clientId,
        consumer_secret: config.oauth.clientSecret,
        access_token_key: token.key,
        access_token_secret: token.secret
    });
};

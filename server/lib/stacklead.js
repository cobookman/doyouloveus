"use strict";

var request = require('request');
var Promise = require('promise');
var config = require('../../config').stacklead;

module.exports = function (email) {
    return new Promise(function(resolve, reject) {
        var query = {
            url: 'https://' + config.api_key + ':@stacklead.com/api/leads',
            form: {
                email: email
            }
        };
        request.post(query, function(error, response, body) {
            if(error || response.statusCode !== 200) {
                reject(error || response.statusCode);
            }
            else {
                resolve(body);
            }
        });
    });
};

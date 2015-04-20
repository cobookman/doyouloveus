"use strict";

var config = require('../../config').mailgun;
var mailgun = require('mailgun-js')({apiKey: config.api_key, domain: config.domain});
var Promise = require('promise');

exports.send = function(msg) {
    ['from', 'to', 'subject', 'text'].forEach(function(key) {
        if(typeof msg[key] !== 'string') {
            throw new Error("Must provide the " + key + " parameter");
        }
    });

    return new Promise(function (resolve, reject) {
        mailgun.messages().send(msg, function(error, body) {
            if(error) {
                console.error("Failed to send email", error, msg);
                reject(error);
            }
            else {
                console.log("Sent email", body, msg);
                resolve(body);
            }
        });
    });
};

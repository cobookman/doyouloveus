var knex = require('../lib/knex');
var Promise = require('promise'); // jshint ignore:line
var _ = require('lodash');

/**
 * Returns a promise
 */
exports.create = function(userInfo) {
    var promise = new Promise(function(resolve, reject) {
        exports.get(userInfo)
            .then(function(user) {
                if(user) {
                    console.log("updating user record", user.twitter_username);
                    return exports.update(userInfo);
                }
                else {
                    console.log("inserting user");
                    return exports.insert(userInfo);
                }
            })
            .then(resolve)
            .catch(reject);
    });
    return promise;
};

/**
 * Returns a promise
 */
exports.insert = function(userInfo) {
    userInfo = _.clone(userInfo);
    userInfo.created_at = knex.raw('CURRENT_TIMESTAMP');
    userInfo.updated_at = knex.raw('CURRENT_TIMESTAMP');

    return knex('users')
        .insert(userInfo);
};

/**
 * Returns a promise
 */
exports.get = function (userInfo) {
    var query = {
        twitter_username: userInfo.twitter_username
    };
    return knex('users')
        .where(query)
        .first();
};

/**
 * Returns a promise
 */
exports.update = function(userInfo) {
    var query = {
        twitter_username: userInfo.twitter_username
    };

    userInfo = _.clone(userInfo);
    userInfo.updated_at = knex.raw('CURRENT_TIMESTAMP');
    delete userInfo.createdAt;

    return knex('users')
        .where(query)
        .update(userInfo);
};

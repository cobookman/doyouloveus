"use strict";

var Hoek = require('hoek');
var knex = require('../lib/knex');
var user = require('../model/user');

exports.register = function (server, options, next) {
    options = Hoek.applyToDefaults({ basePath: ''}, options);
    server.dependency(["lib/auth"], exports.resolved.bind(exports, options));

    return next();
};

exports.resolved = function(options, server, next) {
    server.route({
        method: 'GET',
        path: options.basePath + '/login',
        config: {
            auth: {
                strategy: 'twitter',
                mode: 'try'
            },
            handler: function (request, reply) {
                if (!request.auth.isAuthenticated) {
                    return reply('Authentication failed due to: ' + request.auth.error.message);
                }

                if(request.auth.isAuthenticated) {
                    var profile = request.auth.credentials.profile;

                    user.create({
                        first_name: profile.displayName.split(' ')[0] || null,
                        last_name: profile.displayName.split(' ')[1] || null,
                        twitter_username: profile.username,
                        twitter_id: profile.raw.id_str,
                        twitter_followers: profile.raw.followers_count,
                        twitter_friends: profile.raw.friends_count,
                        twitter_statuses: profile.raw.statuses_count,
                        twitter_profileimg: profile.raw.profile_background_image_url_https,
                        twitter_lang: profile.raw.lang,
                        twitter_oauth_token: request.auth.credentials.token,
                        twitter_oauth_secret: request.auth.credentials.secret
                    })
                    .then(function() {
                        console.log("USER CREATED");
                    })
                    .catch(function() {
                        console.log("USER NOT CREATED");
                    });

                    request.auth.session.set({
                        displayName: request.auth.credentials.profile.displayName,
                        twitter_username: request.auth.credentials.profile.username
                    });
                }

                return reply.redirect('/home');
            }
        }
    });

    return next();
};

exports.saveTwitterCredentials = function(credentials) {
    knex('users')
        .select()
};

exports.register.attributes = {
    name: 'twitter/login',
    version: '1.0.0'
};

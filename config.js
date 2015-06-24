'use strict';

var config = {
    development: {
        rabbitmq:  'amqp://localhost',
        twitter: {
            oauth: {
                clientId: '******',
                clientSecret: '*****'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000
        },
        stripe: '*****',
        mailgun: {
            api_key: '*****',
            public_api_key: '*****',
            domain: '*****'
        },
        stacklead: {
            api_key: '*****'
        }
    },
    production: {
        rabbitmq: process.env.CLOUDAMQP_URL,
        twitter: {
            oauth: {
                clientId: '*****',
                clientSecret: '*****'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000
        },
        stripe: '*****',
        mailgun: {
            api_key: '*****',
            public_api_key: '*****',
            domain: '*****'
        },
        stacklead: {
            api_key: '*****'
        }
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];

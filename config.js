'use strict';

var config = {
    development: {
        rabbitmq: 'amqp://localhost', // { host: 'localhost' }
        twitter: {
            oauth: {
                clientId: 'gUKpG3OEvmsvBUzqoExm6jS2Y',
                clientSecret: 'm1duHDoyROOfuUPVU95g1mzyyq8PEw1CFucZjLT7Ys89zCjjos'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000

        }
    },
    production: {
        rabbitmq: process.env.CLOUDAMQP_URL, // process.env.CLOUDAMQP_URL
        twitter: {
            oauth: {
                clientId: 'gUKpG3OEvmsvBUzqoExm6jS2Y',
                clientSecret: 'm1duHDoyROOfuUPVU95g1mzyyq8PEw1CFucZjLT7Ys89zCjjos'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000

        }
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];

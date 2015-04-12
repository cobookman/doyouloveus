'use strict';

var config = {
    development: {
        rabbitmq:  'amqp://localhost',
        twitter: {
            oauth: {
                clientId: 'gUKpG3OEvmsvBUzqoExm6jS2Y',
                clientSecret: 'm1duHDoyROOfuUPVU95g1mzyyq8PEw1CFucZjLT7Ys89zCjjos'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000
        },
        stripe: 'sk_live_lZzZpfKa4Tc11klJ9IyeZAC0',
    },
    production: {
        rabbitmq: process.env.CLOUDAMQP_URL,
        twitter: {
            oauth: {
                clientId: 'gUKpG3OEvmsvBUzqoExm6jS2Y',
                clientSecret: 'm1duHDoyROOfuUPVU95g1mzyyq8PEw1CFucZjLT7Ys89zCjjos'
            },
            cookie: {
                password: 'cookie_encryption_password'
            },
            rateLimit: 15*1000
        },
        stripe: 'sk_live_lZzZpfKa4Tc11klJ9IyeZAC0'
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];

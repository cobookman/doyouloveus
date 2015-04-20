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
        stripe: 'sk_test_yT6DTIBeBaYBYTb8AsydNSgW',
        mailgun: {
            api_key: 'key-ad4db81c0a6ab3f99d617c17937fa173',
            public_api_key: 'pubkey-c2228930a0e12d8d8894e2d75c16f0a8',
            domain: 'sandboxf2355cabc9c64895b6bd0c8b5aa22185.mailgun.org'
        }
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
        stripe: 'sk_live_lZzZpfKa4Tc11klJ9IyeZAC0',
        mailgun: {
            api_key: 'key-ad4db81c0a6ab3f99d617c17937fa173',
            public_api_key: 'pubkey-c2228930a0e12d8d8894e2d75c16f0a8',
            domain: 'doyouloveus.com'
        }
    }
};


module.exports = config[process.env.NODE_ENV || 'development'];

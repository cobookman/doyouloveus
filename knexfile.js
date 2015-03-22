// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host:     'localhost',
      database: 'doloveus',
      user:     'doloveus',
      password: 'doloveus'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host:     'localhost',
      database: 'doyouloveme',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      host:     'ec2-54-243-48-227.compute-1.amazonaws.com',
      port:     '5432',
      database: 'ddvh827aippop4',
      user:     'vsukgibtnuhloi',
      password: 'qjXv3Kze0mfD0YB3LKGVxrROfE'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

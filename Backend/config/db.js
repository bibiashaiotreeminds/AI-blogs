const pg = require('pg');

module.exports.pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'aisha@140',
});


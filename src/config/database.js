// env
const envConfig = require('./env');

// errors
const { DatabaseConnectionError } = require('./../helpers/errors');

// get the client
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
    host: envConfig.db.host,
    user: envConfig.db.user,
    password: envConfig.db.password,
    database: envConfig.db.name,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    // dateStrings: true,
    timezone: '+00:00'
}).promise();

pool.on('connection', async conn => {
    try {
        await conn.promise().query(`SET time_zone="+00:00"`);
    } catch (error) {
        throw new DatabaseConnectionError();
    }
})

module.exports = {
    pool
}
const configFile = `.env.${process.env.NODE_ENV}`;
require('dotenv').config({ path: configFile });

module.exports = {
    "node_env": process.env.NODE_ENV,
    "app_host": process.env.APP_HOST,
    "app_port": process.env.APP_PORT,
    "db": {
        "host": process.env.DB_HOST,
        "user": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "name": process.env.DB_NAME
    },
};
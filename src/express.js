const express = require('express');
const app = express();

const { NotFoundError } = require('./helpers/errors');
const { errorHandler, uncaughtExceptionListener, unhandledRejectionListener } = require('./middlewares/error-handlers');

// use json and url encode
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// database global
const dbConfig = require('./config/database');
global.pool = dbConfig.pool;

// swagger configuration
const { swaggerUiServe, swaggerUiSetup } = require('./config/swagger');
app.use('/api-doc', swaggerUiServe, swaggerUiSetup);

/**
 * @swagger
 *  /:
 *      get:
 *          summary: End point to check if app is running or not
 *          responses:
 *              200:
 *                  description: Success
 */
app.get('/', (req, res) => res.send('Hi'));

app.use('/users', require('./modules/users/routes'));

app.use(function(req, res){ throw new NotFoundError();  });
app.use(errorHandler);
app.use(uncaughtExceptionListener);
app.use(unhandledRejectionListener);


// express-api-cache - caching
// winston - log
// autocannm - benchmarking

module.exports = app;
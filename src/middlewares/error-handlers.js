const { CustomError } = require('./../helpers/errors');

// middleware with an arity of 4 are considered
// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ "errors": err.serializeErrors() });
    }
    return res.status(err.status || 500).json({ "errors": [{ message: err.message || 'Something went wrong' }] });
}

// The uncaughtException listener
const uncaughtExceptionListener = (err) => {
    return res.status(err.status || 500).json({ "errors": [{ message: err.message || 'Something went wrong' }] });
}

// The unhandledRejection listener
const unhandledRejectionListener = (err) => {
    return res.status(err.status || 500).json({ "errors": [{ message: err.message || 'Something went wrong' }] });
}

module.exports = {
    errorHandler,
    uncaughtExceptionListener,
    unhandledRejectionListener
}
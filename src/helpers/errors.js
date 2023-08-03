class CustomError extends Error {
    statusCode = 500;

    constructor(message = 'Something went wrong'){
        super(message);
        // Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

class DatabaseConnectionError extends CustomError {
    statusCode = 500;

    constructor(message = 'Error connecting to database'){
        super(message);
        // Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

class NotFoundError extends CustomError {
    statusCode = 404;

    constructor(message = 'Sorry, can\'t find that'){
        super(message);
        // Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message = 'Bad request'){
        super(message);
        // Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

class RequestValidationError extends CustomError {
    statusCode = 400;
    errors = [];

    constructor(err = []){
        super('Bad request');
        this.errors = err || [];
        // Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map((err) => {
            if (err?.type === 'field') {
                return { message: err.msg, field: err.path };
            }
            return { message: err.msg };
        });
    }
}

class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(message = 'Not Authorized'){
        super(message);
        // Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}

module.exports = {
    CustomError,
    DatabaseConnectionError,
    NotFoundError,
    BadRequestError,
    RequestValidationError,
    NotAuthorizedError
}

export class App_error extends  Error {
    constructor(message,statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
};

export const errorHandler = (err,req,res,next) =>  {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
}
import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // private is a short hand for using `this.errors`
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters");

    // only because we're extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.param
      }
    });
    return formattedErrors;
  }
}

import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Failed to connect to database"

  constructor(){
    super("Failed to connect to database");

    // only because we're extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{
      message: this.reason
    }];
  }
}
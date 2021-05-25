export abstract class CustomError extends Error {
  // subClasses must implement abstract fields
  abstract statusCode: number;

  constructor(message: string){
    // Pass this is to the Error class so that this message can be printed out in the log
    // This message will not be sent out to the user.
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
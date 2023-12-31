import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid request params");
    //because ts
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((error: ValidationError) => {
      return {
        message: error.msg,
        field: error.type === "field" ? error.path : "",
      };
    });
  }
}

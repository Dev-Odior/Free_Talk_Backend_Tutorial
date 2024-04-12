import { CustomError } from "./custom-error";
import { ValidationError } from "express-validator";

export class RequestValidationError extends CustomError {
  statusCode: number = 400;

  constructor(public errors: ValidationError[]) {
    super("Invalid Request");
  }

  generateErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.type };
    });
  }
}

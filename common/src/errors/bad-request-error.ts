import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode: number = 400;

  constructor(public message: string) {
    super(message);
  }

  generateErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}

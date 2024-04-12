import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
  statusCode: number = 404;

  constructor() {
    super("Not found!");
  }

  generateErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: "Not found!" }];
  }
}

import { ApplicationError } from "./application-error";

export class NotFoundError extends ApplicationError {
  constructor(message: string) {
    super(404, message)
   }
}

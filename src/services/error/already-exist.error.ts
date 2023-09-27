import { ApplicationError } from "./application-error";

export class AlreadyExistError extends ApplicationError {
  constructor(message: string) {
    super(409, message)
   }
}

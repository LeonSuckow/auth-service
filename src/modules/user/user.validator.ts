import { NotFoundError } from "../../services/error/not-found.error";
import { ValidationError } from "../../services/error/validation.error";
import { UserCreateCommand, UserUpdateCommand } from "./user.types";

class UserValidator {
  validateCreateCommand(command: UserCreateCommand): void {
    if (!command.name) {
      throw new ValidationError('Username is required');
    }
    if (!command.password) {
      throw new ValidationError('Password is required');
    }
    if (!command.name) {
      throw new ValidationError('Name is required');
    }
  }
  validateUpdateCommand(command: UserUpdateCommand): void {
    if(!command.id){
      throw new NotFoundError('User not found');
    }
    if (!command.name) {
      throw new ValidationError('Username is required');
    }
    if (!command.password) {
      throw new ValidationError('Password is required');
    }
    if (!command.name) {
      throw new ValidationError('Name is required');
    }
  }
  validateFindUser(username: string, password: string): void {
    if (!username) {
      throw new ValidationError('Username is required');
    }
    if (!password) {
      throw new ValidationError('Password is required');
    }
  }
}
const userValidator = new UserValidator();

export default userValidator;
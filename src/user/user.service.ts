import { NotFoundError } from "../services/error/not-found.error";
import { ValidationError } from "../services/error/validation.error";
import { UserRepository } from "./user.repository";
import { IUserRepository } from "./user.repository.interface";
import { IUserService } from "./user.service.interface";
import { UserCreateCommand, UserType, UserUpdateCommand } from "./user.types";

class UserService implements IUserService {
  constructor(
    private iUserRepository: IUserRepository
  ) { }

  create(command: UserCreateCommand): Promise<UserType | null> {
    if (!command.name) {
      throw new ValidationError('Username is required');
    }
    if (!command.password) {
      throw new ValidationError('Password is required');
    }
    if (!command.name) {
      throw new ValidationError('Name is required');
    }
    let user = this.iUserRepository.create(command);
    return user;

  };
  async getUserByUsernameAndPassword(username: string, password: string): Promise<UserType | null> {
    if (!username) {
      throw new ValidationError('Username is required');
    }
    if (!password) {
      throw new ValidationError('Password is required');
    }

    let user = await this.iUserRepository.getUserByUsernameAndPassword(username, password)

    return user;
  };
  getAll(): Promise<UserType[]> {
    return this.iUserRepository.getAll();
  };

  getById(id: string): Promise<UserType | null> {
    let user = this.iUserRepository.getById(id);
    if (!user) {
      throw new NotFoundError("User not found")
    }
    return user;
  };
  update(command: UserUpdateCommand): Promise<UserType | null> {
    if (!command.name) {
      throw new ValidationError('Username is required');
    }
    if (!command.password) {
      throw new ValidationError('Password is required');
    }
    if (!command.name) {
      throw new ValidationError('Name is required');
    }

    let updatedUser = this.iUserRepository.update(command);
    return updatedUser;
  };
  async delete(id: string): Promise<void> {
    this.iUserRepository.delete(id)
  };
  getUserWithSessions(id: string): Promise<UserType | null> {
    let userWithSessions = this.iUserRepository.getUserWithSessions(id);

    if (!userWithSessions) {
      throw new NotFoundError("User not found")
    }
    return userWithSessions
  }
}

const userService = new UserService(
  new UserRepository()
);

export default userService;

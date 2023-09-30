import { UserCreateCommand, UserType, UserUpdateCommand } from "./user.types";


export interface IUserService{
  create: (user: UserCreateCommand) => Promise<UserType | null>;
  getUserByUsernameAndPassword: (username: string, password: string) => Promise<UserType | null>;
  getAll: () => Promise<UserType[]>
  getById: (id: string) => Promise<UserType | null>
  update: (user: UserUpdateCommand) => Promise<UserType | null>
  delete: (id: string) => Promise<void>
  getUserWithSessions: (id: string) => Promise<UserType | null>
}
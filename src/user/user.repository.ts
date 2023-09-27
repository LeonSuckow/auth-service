import { prisma } from "../lib/prisma";
import { AlreadyExistError } from "../services/error/already-exist.error";
import { NotFoundError } from "../services/error/not-found.error";
import { IUserRepository } from "./user.repository.interface";
import { UserCreateCommand, UserType, UserUpdateCommand } from "./user.types";

export class UserRepository implements IUserRepository {
  async getUserByUsernameAndPassword(username: string, password: string): Promise<UserType | null> {
    return prisma.user.findFirst({
      where: {
        username,
        password,
      },
    })
  }

  getAll(): Promise<UserType[]> {
    return prisma.user.findMany();
  }

  getById(id: string): Promise<UserType | null> {
    return prisma.user.findFirst({
      where: {
        id
      }
    });
  }
  getUserWithSessions(id: string): Promise<UserType | null> {
    let userWithSession = prisma.user.findFirst({
      where: {
        id
      },
      include:{
        Session: true
      }
    });
    return userWithSession
  }

  async create(newUser: UserCreateCommand): Promise<UserType | null> {
    let user = await prisma.user.findFirst({
      where: {
        username: newUser.username,
      }
    })

    if (user) {
      throw new AlreadyExistError('Username already exists');
    }

    return prisma.user.create({ data: newUser })
  }

  async update(updatedUser: UserUpdateCommand): Promise<UserType | null> {
    let user = await prisma.user.findFirst({
      where: {
        username: updatedUser.username
      }
    })

    if (user) {
      throw new AlreadyExistError('User or already exists');
    }
    return prisma.user.update({
      data: updatedUser, where: {
        id: updatedUser.id
      }
    })
  }

  async delete(id: string): Promise<void> {
    let user = await prisma.user.findFirst({
      where: {
        id
      }
    })

    if (user) {
      throw new NotFoundError('User not found');
    }

    prisma.user.delete({
      where: {
        id
      }
    })
  }
}


const userRepository = new UserRepository();

export default userRepository
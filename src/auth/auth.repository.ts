import { hash } from "argon2";
import { prisma } from "../lib/prisma";
import { IAuthRepository } from "./auth.repository.interface";
import { SessionRepositoryCreateCommand, SessionType } from "./auth.types";

export class AuthRepository implements IAuthRepository {
  getAll():Promise<SessionType[]>{
    return prisma.session.findMany()
  };
  getById(id: string): Promise<SessionType | null>{
    return prisma.session.findFirst({
      where:{
        id
      }
    })
  };
  async delete(id: string):Promise<void> {
    prisma.session.delete({
      where:{
        id
      }
    })
  };
  async create({ hashCode, userId }: SessionRepositoryCreateCommand): Promise<string>{
     prisma.session.create({
      data: {
        hash: hashCode,
        userId
      }
    })
    return hashCode;
  }
}

const authRepository = new AuthRepository();

export default authRepository
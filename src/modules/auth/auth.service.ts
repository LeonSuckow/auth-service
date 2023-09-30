import { IUserRepository } from './../user/user.repository.interface';
import { hash } from "argon2"
import { NotFoundError } from "../../services/error/not-found.error"
import authRepository, { AuthRepository } from "./auth.repository"
import userRepository, { UserRepository } from "../user/user.repository"
import { IAuthService } from "./auth.service.interface"
import { SessionServiceCreateCommand, SessionType } from "./auth.types"
import { IAuthRepository } from "./auth.repository.interface"

export class AuthService implements IAuthService {
  constructor(
    private iAuthRepository: IAuthRepository,
    private iUserRepository: IUserRepository

  ) {
  }
  getAll(): Promise<SessionType[]> {
    let sessions = this.iAuthRepository.getAll();
    return sessions;
  }

  getById(id: string): Promise<SessionType | null> {
    let session = this.iAuthRepository.getById(id);
    if (!session) {
      throw new NotFoundError('Session not found')
    }
    return session;
  }


  async create ({ username, password }: SessionServiceCreateCommand) {
    const user = await this.iUserRepository.getUserByUsernameAndPassword(username, password)

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const hashCode = await hash(`${username}${password}${new Date().toString()}`)
    await authRepository.create({ hashCode, userId: user.id })

    return hashCode;
  }

  async delete(id: string): Promise<void> {
    let session = this.iAuthRepository.getById(id);
    if (!session) {
      throw new NotFoundError('Session not found')
    }
    this.iAuthRepository.delete(id);
  }
}

const authService = new AuthService(
  new AuthRepository(),
  new UserRepository()
);

export default authService;


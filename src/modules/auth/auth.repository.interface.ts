import { SessionRepositoryCreateCommand, SessionType } from "./auth.types"


export interface IAuthRepository{
  create: (data: SessionRepositoryCreateCommand) => Promise<string>
  getAll: () => Promise<SessionType[]>
  getById: (id: string) => Promise<SessionType | null>
  delete: (id: string) => Promise<void>
}
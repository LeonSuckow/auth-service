import { SessionRepositoryCreateCommand, SessionServiceCreateCommand, SessionType } from "./auth.types"


export interface IAuthService{
  create: (data: SessionServiceCreateCommand) => Promise<string>
  getAll: () => Promise<SessionType[]>
  getById: (id: string) => Promise<SessionType | null>
  delete: (id: string) => Promise<void>
}
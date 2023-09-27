export type SessionType = {
  id: string;
  hash: string;
  createdAt: Date;
}

export type SessionServiceCreateCommand = {
  username: string,
  password: string
}

export type SessionRepositoryCreateCommand = {
  hashCode: string,
  userId: string
}


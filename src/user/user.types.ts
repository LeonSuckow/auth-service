export type SessionType = {
  id: string;
  hash: string;
  createdAt: Date;
}

export type UserType = {
  id: string,
  username: string,
  password: string,
  name: string,
  createdAt: Date
  Session?: SessionType[];
}

export type UserCreateCommand ={
  username: string,
  password: string,
  name: string,
}

export type UserUpdateCommand ={
  id: string,
  username: string,
  password: string,
  name: string,
}
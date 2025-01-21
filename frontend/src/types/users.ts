export interface IUser extends ICreateUser {
  id: number;
  creationTime: string;
}

export interface ICreateUser {
  username: string;
  password: string;
  email: string;
  mobile: number;
  active: boolean;
}
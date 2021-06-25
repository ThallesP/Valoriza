interface IRequestUser {
  id: string;
}

declare namespace Express {
  export interface Request {
    user: IRequestUser;
  }
}

import type { IQuizee } from "./quizeeTypes";

export interface IUser {
  email: string;
  username: string;
  quizees: {
    user: IQuizee[];
    favourite: IQuizee[];
  };
  isLoading?: boolean;
}
export interface IAuth {
  email: string;
  password: string;
}

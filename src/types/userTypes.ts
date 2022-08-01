import type { IQuizee } from "./quizeeTypes";

export interface IUser {
  email: string;
  username: string;
  quizees: IQuizee[];
  isLoading?: boolean;
}
export interface IAuth {
  email: string;
  password: string;
}

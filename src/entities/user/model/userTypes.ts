import type { IQuizee } from "../../quizee/model/quizeeTypes";

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

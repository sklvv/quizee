import type { IQuizee } from "@/entities/quizee";

export interface IUser {
  id: string;
  email: string;
  username: string;
  quizees: {
    user: IQuizee[];
    favourite: IQuizee[];
  };
  isLoading?: boolean;
}
export interface IUserInDB {
  id: string;
  email: string;
  username: string;
  quizees: {
    user: string[];
    favourite: string[];
  };
  isLoading?: boolean;
}
export interface IAuth {
  email: string;
  password: string;
}

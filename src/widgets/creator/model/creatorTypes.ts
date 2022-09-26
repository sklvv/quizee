import type { IQuizee } from "@/entities/quizee";

export interface ICreator extends IQuizee {
  currentQuestion: number;
}

import type { IQuestion } from "@/entities/quizee";

export interface ICreator {
  id: string;
  title: string;
  visibility: "public" | "private";
  category: "none" | "math" | "history" | "art" | "music";
  mainImgUrl: string;
  questions: IQuestion[];
  currentQuestion: IQuestion;
}

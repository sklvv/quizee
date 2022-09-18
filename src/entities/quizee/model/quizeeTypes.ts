export interface IQuizee {
  category: "none" | "math" | "history" | "art" | "music";
  id: string;
  author: string;
  mainImgUrl: string;
  players: number;
  plays: number;
  visibility: "public" | "private";
  title: string;
  questions: IQuestion[];
}
export interface IQuestion {
  id: string;
  rightAnswer: number[];
  queImgUrl: string;
  answerOption: "single" | "multiple";
  answerVariants: [string, string, string, string] | [string, string];
  points: "standart" | "double";
  timeLimit: 10 | 20 | 30 | 60;
  title: string;
  type: "quiz" | "trueFalse";
}

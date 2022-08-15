export interface IQuizee {
  id: string;
  author: string;
  mainImgUrl: string | null;
  players: number;
  plays: number;
  private: boolean;
  title: string;
  questions: IQuestion[];
}
interface IQuestion {
  queImgUrl: string | null;
  answerOption: "single" | "multiple" | null;
  answerVariants: [string, string, string, string] | [string, string];
  points: "standart" | "double";
  timeLimit: 10 | 20 | 30 | 60;
  title: string;
  type: "quiz" | "trueFalse";
}

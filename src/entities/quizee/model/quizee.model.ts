export interface IQuestion {
  name: string;
}

export interface IQuizee {
  title: string;
  questions: IQuestion[];
}

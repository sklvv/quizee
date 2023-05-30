export interface IAnswers {
    author: string;
    answer: string;
    date: string;
}

export interface IQuestion {
    content: string;
    answers: IAnswers[];
}

export interface IQuizee {
    id: string;
    title: string;
    questions: IQuestion[];
    author: string;
    date: Date;
}

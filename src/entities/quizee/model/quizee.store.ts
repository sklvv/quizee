import { createNewQuizee } from "@/features/getNewQuizee";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { IQuizee } from "./quizee.model";
import { firestore } from "@/shared/api/firebase";
import { doc, setDoc } from "firebase/firestore";

// interface BearState {
//   bears: number;
//   increase: (by: number) => void;
//   sell: (by: RequestInfo | URL) => void;
// }

// const useBearStore = create<BearState>()(
//   devtools(
//     persist(
//       set => ({
//         bears: 0,
//         increase: by => set(state => ({ bears: state.bears + by })),
//         sell: async by => {
//           const response = await fetch(by);
//           set({ bears: await response.json() });
//         },
//       }),
//       { name: "bears" }
//     )
//   )
// );

// const nuts = useBearStore(state => state.bears);
// const honey = useBearStore(state => state.increase);
// honey(1);

interface QuizeeStore extends IQuizee {
    setTitle: (title: string) => void;
    addQuestion: () => void;
    deleteQuestion: (id: number) => void;
    setQuestion: (content: string, id: number) => void;
    // submit
    getNewQuizee: (quizee: IQuizee) => void;
}

const useQuizeeStore = create<QuizeeStore>()(
    devtools(
        persist(
            set => ({
                id: "",
                title: "",
                author: "",
                date: new Date(),
                questions: [{ content: "", answers: [] }],
                setTitle: newTitle => {
                    set(state => ({ title: newTitle }));
                },
                addQuestion: () => {
                    set(state => ({
                        questions: [
                            ...state.questions,
                            { content: "", answers: [] },
                        ],
                    }));
                },
                deleteQuestion: id => {
                    set(state => ({
                        questions: state.questions.filter((value, ind) => {
                            return id != ind;
                        }),
                    }));
                },
                setQuestion: (text, id) => {
                    set(state => ({
                        questions: state.questions.map((question, index) => {
                            if (index === id) {
                                question.content = text;
                            }
                            return question;
                        }),
                    }));
                },
                getNewQuizee: async (quizee: IQuizee) => {
                    const quizeeId = await createNewQuizee(quizee);
                    set(state => ({ id: quizeeId }));
                },
            }),
            { name: "quizee" }
        )
    )
);

export default useQuizeeStore;

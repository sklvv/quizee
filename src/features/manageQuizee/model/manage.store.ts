import { IQuizee } from "@/entities/quizee";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface ManageStore extends IQuizee {
    initStore: (quizee: IQuizee) => void;
    deleteQuize: () => void;
    deleteAnswer: (index: number) => void;
}

const useManageStore = create<ManageStore>()(
    devtools(
        persist(
            set => ({
                id: "",
                title: "",
                author: "",
                date: new Date(),
                questions: [{ content: "", answers: [] }],
                deleteAnswer: () => {},
                deleteQuize: () => {},
                initStore: quizee => {
                    set(state => ({
                        author: quizee.author,
                        date: quizee.date,
                        id: quizee.id,
                        title: quizee.title,
                        questions: quizee.questions,
                    }));
                },
            }),
            { name: "quizee" }
        )
    )
);

export default useManageStore;

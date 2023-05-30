import { IQuizee } from "@/entities/quizee";
import { firestore } from "@/shared/api/firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const createNewQuizee = async (quizee: IQuizee) => {
    const quizeeID = uuidv4();
    const result = await setDoc(doc(firestore, "quizees", quizeeID), {
        id: quizeeID,
        author: quizee.author,
        date: quizee.date,
        questions: quizee.questions,
        title: quizee.title,
    });
    return quizeeID;
};

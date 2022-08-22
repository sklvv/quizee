import { IUserInDB } from "@/entities/user";
import { database } from "@/shared/config";
import {
  doc,
  getDoc,
  updateDoc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { IQuizee } from "./quizeeTypes";

export const getQuizeeFromDB = async (
  userRef: DocumentReference<DocumentData>,
  userLinks: string[],
  favLinks: string[]
): Promise<{ userQuizees: IQuizee[]; favQuizees: IQuizee[] }> => {
  const userQuizees: IQuizee[] = [];
  const favQuizees: IQuizee[] = [];
  try {
    for (const quizeeId of userLinks) {
      const quizeeRef = doc(database, "quizees", `${quizeeId}`);
      const quizeeSnap = await getDoc(quizeeRef);
      if (quizeeSnap.exists()) {
        const quizee = quizeeSnap.data() as IQuizee;
        userQuizees.push(quizee);
      } else {
        await updateDoc(userRef, {
          quizees: {
            user: userLinks.filter((quizee) => quizee !== quizeeId),
            favourite: favLinks,
          },
        } as Partial<IUserInDB>);
      }
    }

    for (const quizeeId of favLinks) {
      const quizeeRef = doc(database, "quizees", `${quizeeId}`);
      const quizeeSnap = await getDoc(quizeeRef);
      if (quizeeSnap.exists()) {
        const quizee = quizeeSnap.data() as IQuizee;
        favQuizees.push(quizee);
      } else {
        await updateDoc(userRef, {
          quizees: {
            user: userLinks,
            favourite: favLinks.filter((quizee) => quizee !== quizeeId),
          },
        } as Partial<IUserInDB>);
      }
    }
  } catch (error) {
    console.log(error);
  }
  return { userQuizees, favQuizees };
};

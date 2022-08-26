import { IQuizee } from "@/entities/quizee";
import { IUserInDB } from "@/entities/user";
import { database } from "@/shared/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

interface IArg {
  uid: string;
  id: string;
  title: string;
  visibility: "public" | "private";
  mainImgUrl: string;
  author: string;
}
export const createNewQuizee = createAsyncThunk<IQuizee, IArg>(
  "user/createQuizee",
  async ({ id, title, visibility, mainImgUrl, author, uid }) => {
    const userRef = doc(database, "users", `${uid}`);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data() as IUserInDB; // request for user
    data.quizees.user.unshift(id);
    await updateDoc(userRef, {
      ...data,
      quizees: {
        favourite: data.quizees.favourite,
        user: data.quizees.user,
      },
    } as Partial<IUserInDB>);
    const newQuizee: IQuizee = {
      author,
      id,
      players: 0,
      plays: 0,
      questions: [],
      category: "none",
      title,
      mainImgUrl,
      visibility,
    };
    const quizeeRef = doc(database, "quizees", `${id}`);
    await setDoc(quizeeRef, newQuizee);
    return newQuizee;
  }
);

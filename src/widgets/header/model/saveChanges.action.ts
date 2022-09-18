import { IQuestion, IQuizee } from "@/entities/quizee";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { database } from "@/shared/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const saveChanges = createAsyncThunk<
  void,
  { id: string; questions: IQuestion[] }
>("creator/saveChanges", async ({ id, questions }) => {
  try {
    const quizeeRef = doc(database, "quizees", `${id}`);
    const quizeeSnap = await getDoc(quizeeRef);
    const data = quizeeSnap.data() as IQuizee;
    console.log(questions);
    await updateDoc(quizeeRef, {
      ...data,
      questions,
    } as Partial<IQuizee>);
  } catch (error) {
    console.log(error);
  }
});

export const fulfilledSaveChanges = () => {};

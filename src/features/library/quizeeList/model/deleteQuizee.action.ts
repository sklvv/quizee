import { IUser } from "@/entities/user";
import { database } from "@/shared/config";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc } from "firebase/firestore";

export const deleteQuizee = createAsyncThunk<string, string>(
  "user/deleteQuizee",
  async (id) => {
    await deleteDoc(doc(database, "quizees", `${id}`)); // deleting from quizees colection
    return id;
  }
);

export const fulfilledDeleteQuizee = (
  state: IUser,
  action: PayloadAction<string>
) => {
  state.quizees.user = state.quizees.user.filter(
    (quizee) => quizee.id !== action.payload
  );
};

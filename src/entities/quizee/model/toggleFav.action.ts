import type { IUser, IUserInDB } from "@/entities/user";
import type { IQuizee } from "./quizeeTypes";
import { database } from "@/shared/config";
import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getQuizeeFromDB } from "./getQuizeeFromDB";

export const toggleFav = createAsyncThunk<
  { userQuizees: IQuizee[]; favQuizees: IQuizee[] },
  { quizeeId: string; userId: string }
>("user/toggleFav", async ({ quizeeId, userId }) => {
  // try {
  const userRef = doc(database, "users", `${userId}`);
  const userSnap = await getDoc(userRef);
  const { quizees } = userSnap.data() as IUserInDB;
  // if (userSnap.exists()) {
  if (quizees.favourite.includes(quizeeId)) {
    quizees.favourite = quizees.favourite.filter((id) => id !== quizeeId);
    await updateDoc(userRef, {
      quizees: {
        favourite: quizees.favourite,
        user: quizees.user,
      },
    } as Partial<IUserInDB>);
  } else {
    quizees.favourite.push(quizeeId);
    await updateDoc(userRef, {
      quizees: {
        favourite: quizees.favourite,
        user: quizees.user,
      },
    } as Partial<IUserInDB>);
  }
  const { favQuizees, userQuizees } = await getQuizeeFromDB(
    userRef,
    quizees.user,
    quizees.favourite
  );
  return { favQuizees, userQuizees };
  // }
  // } catch (error) {
  //   console.log(error);
  //   rejectWithValue(error);
  // }
});
export const fulfilledToggleFav = (
  state: IUser,
  action: PayloadAction<{ userQuizees: IQuizee[]; favQuizees: IQuizee[] }>
) => {
  state.quizees.favourite = action.payload.favQuizees;
  state.quizees.user = action.payload.userQuizees;
};

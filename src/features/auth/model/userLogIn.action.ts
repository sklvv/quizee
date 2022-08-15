import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../../shared/config";
import { IQuizee } from "../../../entities/quizee/model/quizeeTypes";
import { IAuth, IUser } from "../../../entities/user/model/userTypes";

export const userLogIn = createAsyncThunk<
  IUser,
  IAuth,
  { rejectValue: string }
>("user/userLogIn", async ({ email, password }) => {
  // getting user with firebase auth
  const response = await signInWithEmailAndPassword(auth, email, password);
  // getting user from firestore
  const userRef = doc(database, "users", `${response.user.uid}`);
  const userSnap = await getDoc(userRef);
  const rawUser = userSnap.data() as IUser; // request for user

  const rawFavQuizees = rawUser.quizees.favourite; // links to quizees
  const rawUsersQuizees = rawUser.quizees.user; // links to quizees

  const finalFavQuizees: IQuizee[] = [];
  const finalUsersQuizees: IQuizee[] = [];
  try {
    for (const quizeeId of rawUsersQuizees) {
      const quizeeRef = doc(database, "quizees", `${quizeeId}`);
      const quizeeSnap = await getDoc(quizeeRef);
      if (quizeeSnap.exists()) {
        const quizee = quizeeSnap.data() as IQuizee;
        finalUsersQuizees.push(quizee);
      }
    }

    for (const quizeeId of rawFavQuizees) {
      const quizeeRef = doc(database, "quizees", `${quizeeId}`);
      const quizeeSnap = await getDoc(quizeeRef);
      if (quizeeSnap.exists()) {
        const quizee = quizeeSnap.data() as IQuizee;
        finalFavQuizees.push(quizee);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return {
    ...rawUser,
    quizees: { user: finalUsersQuizees, favourite: finalFavQuizees },
  };
});

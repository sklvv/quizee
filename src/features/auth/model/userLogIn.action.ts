import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "@/shared/config";
import { IAuth, IUser, IUserInDB } from "@/entities/user";
import { getQuizeeFromDB } from "@/entities/quizee";

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
  const rawUser = userSnap.data() as IUserInDB; // request for user

  const rawFavQuizees = rawUser.quizees.favourite; // links to quizees
  const rawUsersQuizees = rawUser.quizees.user; // links to quizees
  const { favQuizees, userQuizees } = await getQuizeeFromDB(
    userRef,
    rawUsersQuizees,
    rawFavQuizees
  );

  return {
    ...rawUser,
    quizees: { user: userQuizees, favourite: favQuizees },
  };
});

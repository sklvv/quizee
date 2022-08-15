import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "../../../shared/config";

import { IAuth, IUser } from "../../../entities/user/model/userTypes";

export const userSignUp = createAsyncThunk<
  IUser,
  IAuth,
  { rejectValue: string }
>("user/userSignUp", async ({ email, password }) => {
  // getting user with firebase auth
  const response = await createUserWithEmailAndPassword(auth, email, password);
  // set user to firestore
  const userRef = doc(database, "users", `${response.user.uid}`);
  await setDoc(userRef, {
    email: response.user.email,
    username: response.user.displayName || response.user.email,
    quizees: {
      fav: [],
      user: [],
    },
  });

  return {
    email: response.user.email,
    username: response.user.displayName || response.user.email,
    quizees: {
      favourite: [],
      user: [],
    },
  } as IUser;
});

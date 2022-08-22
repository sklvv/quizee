import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, database } from "@/shared/config";
import { IAuth, IUser } from "@/entities/user";

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
    id: response.user.uid,
    email: response.user.email,
    username: response.user.displayName || response.user.email,
    quizees: {
      favourite: [],
      user: [],
    },
  });

  return {
    email: response.user.email,
    id: response.user.uid,
    username: response.user.displayName || response.user.email,
    quizees: {
      favourite: [],
      user: [],
    },
  } as IUser;
});

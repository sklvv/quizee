import { createAsyncThunk } from "@reduxjs/toolkit";

import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, database } from "../../../shared/config";
import { IQuizee } from "../../../entities/quizee/model/quizeeTypes";
import { IUser } from "../../../entities/user/model/userTypes";

export const logInPopup = createAsyncThunk<IUser>(
  "user/loginpopup",
  async () => {
    const provider = new OAuthProvider("google.com");
    const response = await signInWithPopup(auth, provider);
    const userRef = doc(database, "users", `${response.user.uid}`);
    const userSnap = await getDoc(userRef);

    // If user exist

    if (userSnap.exists()) {
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
    }

    // If user doesnt exist creating a new one
    else {
      await setDoc(userRef, {
        email: response.user.email,
        username: response.user.displayName || response.user.email,
        quizees: { user: [], fav: [] },
      });
      return {
        email: response.user.email,
        username: response.user.displayName || response.user.email,
        quizees: {
          favourite: [],
          user: [],
        },
      } as IUser;
    }
  }
);

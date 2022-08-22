import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithPopup, OAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, database } from "@/shared/config";
import { getQuizeeFromDB } from "@/entities/quizee";
import { IUser, IUserInDB } from "@/entities/user";

export const logInPopup = createAsyncThunk<IUser>(
  "user/loginpopup",
  async () => {
    const provider = new OAuthProvider("google.com");
    const response = await signInWithPopup(auth, provider);
    const userRef = doc(database, "users", `${response.user.uid}`);
    const userSnap = await getDoc(userRef);

    // If user exist

    if (userSnap.exists()) {
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
        id: response.user.uid,
        quizees: { user: userQuizees, favourite: favQuizees },
      };
    }

    // If user doesnt exist creating a new one
    else {
      await setDoc(userRef, {
        id: response.user.uid,
        email: response.user.email,
        username: response.user.displayName || response.user.email,
        quizees: { user: [], fav: [] },
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
    }
  }
);

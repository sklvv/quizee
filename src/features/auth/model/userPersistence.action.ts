import { createAsyncThunk } from "@reduxjs/toolkit";

import { doc, getDoc } from "firebase/firestore";
import { database } from "../../../shared/config/firebase";
import { IQuizee } from "../../../entities/quizee/model/quizeeTypes";
import { IUser } from "../../../entities/user/model/userTypes";

export const userPersistence = createAsyncThunk<IUser, string>(
  "user/persistence",
  async (uid) => {
    const userRef = doc(database, "users", `${uid}`);
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
  }
);

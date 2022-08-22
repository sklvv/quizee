import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { database } from "@/shared/config";
import { getQuizeeFromDB } from "@/entities/quizee";
import { IUser, IUserInDB } from "@/entities/user";

export const userPersistence = createAsyncThunk<IUser, string>(
  "user/persistence",
  async (uid) => {
    const userRef = doc(database, "users", `${uid}`);
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
  }
);

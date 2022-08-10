import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, database } from "../lib/api/firebase";
import { IQuizee } from "../types/quizeeTypes";
import { IAuth, IUser } from "../types/userTypes";

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

export const logOut = createAsyncThunk<void, void>("user/logOut", async () => {
  await signOut(auth);
});

const initialState: IUser = {
  email: "",
  username: "",
  quizees: { favourite: [], user: [] },
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userLogIn.fulfilled, (state: IUser, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.quizees.user = action.payload.quizees.user;
      state.quizees.favourite = action.payload.quizees.favourite;
      state.isLoading = false;
    });
    builder.addCase(userLogIn.rejected, (state: IUser) => {
      alert("Server Error!");
      state.isLoading = false;
    });
    builder.addCase(userSignUp.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(userSignUp.fulfilled, (state: IUser, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.quizees.user = action.payload.quizees.user;
      state.quizees.favourite = action.payload.quizees.favourite;
      state.isLoading = false;
    });
    builder.addCase(userSignUp.rejected, (state: IUser) => {
      state.isLoading = false;
      alert("Server Error!");
    });
    builder.addCase(logOut.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(logOut.rejected, (state: IUser) => {
      state.isLoading = false;
      alert("Server Error!");
    });
    builder.addCase(logOut.fulfilled, (state: IUser) => {
      state.email = "";
      state.username = "";
      state.quizees = { favourite: [], user: [] };
      state.isLoading = false;
    });
    builder.addCase(userPersistence.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(
      userPersistence.fulfilled,
      (state: IUser, action: PayloadAction<IUser>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.quizees.user = action.payload.quizees.user;
        state.quizees.favourite = action.payload.quizees.favourite;
        state.isLoading = false;
      }
    );
    builder.addCase(userPersistence.rejected, (state: IUser) => {
      state.isLoading = false;
    });
    builder.addCase(logInPopup.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(
      logInPopup.fulfilled,
      (state: IUser, action: PayloadAction<IUser>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.quizees.user = action.payload.quizees.user;
        state.quizees.favourite = action.payload.quizees.favourite;
        state.isLoading = false;
      }
    );
    builder.addCase(logInPopup.rejected, (state: IUser) => {
      state.isLoading = false;
      alert("Server Error!");
    });
  },
});

export default userSlice.reducer;

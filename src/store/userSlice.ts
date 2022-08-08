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
  const result = userSnap.data() as IUser;
  return result;
});

export const logInPopup = createAsyncThunk<IUser>(
  "user/loginpopup",
  async () => {
    const provider = new OAuthProvider("google.com");
    const response = await signInWithPopup(auth, provider);
    const userRef = doc(database, "users", `${response.user.uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const result = userSnap.data() as IUser;
      return result;
    } else {
      await setDoc(userRef, {
        email: response.user.email,
        username: response.user.displayName || response.user.email,
        quizees: [],
      });
      const userSnap = await getDoc(userRef);
      const result = userSnap.data() as IUser;
      return result;
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
  // getting user from firestore
  const userRef = doc(database, "users", `${response.user.uid}`);
  await setDoc(userRef, {
    email: response.user.email,
    username: response.user.displayName || response.user.email,
    quizees: [],
  });
  const userSnap = await getDoc(userRef);
  const result = userSnap.data() as IUser;
  return result;
});

export const userPersistence = createAsyncThunk<IUser, string>(
  "user/persistence",
  async (uid) => {
    const userRef = doc(database, "users", `${uid}`);
    const userSnap = await getDoc(userRef);
    const result = userSnap.data() as IUser;
    return result;
  }
);

export const logOut = createAsyncThunk<void, void>("user/logOut", async () => {
  await signOut(auth);
});

const initialState: IUser = {
  email: "",
  username: "",
  quizees: [],
  isLoading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userLogIn.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogIn.fulfilled, (state: IUser, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.quizees = action.payload.quizees;
      state.isLoading = false;
    });
    builder.addCase(userLogIn.rejected, (state: IUser) => {
      alert("Server Error!");
      state.isLoading = false;
    });
    builder.addCase(userSignUp.pending, (state: IUser, action) => {
      state.isLoading = true;
    });
    builder.addCase(userSignUp.fulfilled, (state: IUser, action) => {
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.quizees = action.payload.quizees;
      state.isLoading = false;
    });
    builder.addCase(userSignUp.rejected, (state: IUser) => {
      state.isLoading = false;
      alert("Server Error!");
    });
    builder.addCase(logOut.pending, (state: IUser, action) => {
      state.isLoading = true;
    });
    builder.addCase(logOut.rejected, (state: IUser, action) => {
      state.isLoading = false;
      alert("Server Error!");
    });
    builder.addCase(logOut.fulfilled, (state: IUser, action) => {
      state.email = "";
      state.username = "";
      state.quizees = [];
      state.isLoading = false;
    });
    builder.addCase(userPersistence.pending, (state: IUser, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      userPersistence.fulfilled,
      (state: IUser, action: PayloadAction<IUser>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.quizees = action.payload.quizees;
        state.isLoading = false;
      }
    );
    builder.addCase(userPersistence.rejected, (state: IUser) => {
      state.email = "";
      state.username = "";
      state.quizees = [];
      state.isLoading = false;
    });
    builder.addCase(logInPopup.pending, (state: IUser, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      logInPopup.fulfilled,
      (state: IUser, action: PayloadAction<IUser>) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.quizees = action.payload.quizees;
        state.isLoading = false;
      }
    );
    builder.addCase(logInPopup.rejected, (state: IUser) => {
      state.email = "";
      state.username = "";
      state.quizees = [];
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;

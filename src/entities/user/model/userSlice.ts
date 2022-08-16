import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logInPopup,
  userLogIn,
  userPersistence,
  userSignUp,
} from "@/features/auth";
import { logOut } from "@/widgets/header/model";

import { IUser } from "./userTypes";

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

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  logInPopup,
  setUser,
  userLogIn,
  userPersistence,
  userSignUp,
} from "@/features/auth";
import { logOut } from "@/widgets/header";
import { IUser } from "./userTypes";
import {
  createNewQuizee,
  deleteQuizee,
  fulfilledDeleteQuizee,
} from "@/features/library";
import { toggleFav, fulfilledToggleFav } from "@/entities/quizee";

const initialState: IUser = {
  id: "",
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
    builder.addCase(userLogIn.fulfilled, setUser);
    builder.addCase(userLogIn.rejected, (state: IUser) => {
      alert("Server Error!");
      state.isLoading = false;
    });
    builder.addCase(userSignUp.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(userSignUp.fulfilled, setUser);
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
      state.id = "";
      state.email = "";
      state.username = "";
      state.quizees = { favourite: [], user: [] };
      state.isLoading = false;
    });
    builder.addCase(userPersistence.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(userPersistence.fulfilled, setUser);
    builder.addCase(userPersistence.rejected, (state: IUser) => {
      state.isLoading = false;
    });
    builder.addCase(logInPopup.pending, (state: IUser) => {
      state.isLoading = true;
    });
    builder.addCase(logInPopup.fulfilled, setUser);
    builder.addCase(logInPopup.rejected, (state: IUser) => {
      state.isLoading = false;
      alert("Server Error!");
    });
    builder.addCase(deleteQuizee.fulfilled, fulfilledDeleteQuizee);
    builder.addCase(toggleFav.fulfilled, fulfilledToggleFav);
    builder.addCase(createNewQuizee.fulfilled, (state, action) => {
      state.quizees.user.unshift(action.payload);
    });
  },
});

export default userSlice.reducer;

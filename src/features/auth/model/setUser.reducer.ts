import { IUser } from "@/entities/user";
import { PayloadAction } from "@reduxjs/toolkit";

export const setUser = (state: IUser, action: PayloadAction<IUser>) => {
  state.id = action.payload.id;
  state.email = action.payload.email;
  state.username = action.payload.username;
  state.quizees.user = action.payload.quizees.user;
  state.quizees.favourite = action.payload.quizees.favourite;
  state.isLoading = false;
};

import { configureStore } from "@reduxjs/toolkit";
import librarySlice from "./librarySlice";
import themeSlice from "./themeSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: { theme: themeSlice, user: userSlice, library: librarySlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../../entities/user";
import { librarySlice } from "../../features/library";
import { themeSlice } from "../../shared/config";

export const store = configureStore({
  reducer: { theme: themeSlice, user: userSlice, library: librarySlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

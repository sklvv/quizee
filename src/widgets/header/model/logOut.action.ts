import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut } from "firebase/auth";
import { auth } from "../../../shared/config/firebase";

export const logOut = createAsyncThunk<void, void>("user/logOut", async () => {
  await signOut(auth);
});

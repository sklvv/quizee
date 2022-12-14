import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: { mode: "light" },
});

export const darkTheme = createTheme({
  palette: { mode: "dark" },
});

import { createSlice } from "@reduxjs/toolkit";

interface ITheme {
  isDarkTheme: boolean;
}

const initialState: ITheme = {
  isDarkTheme: false,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (store: ITheme) => {
      store.isDarkTheme = !store.isDarkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

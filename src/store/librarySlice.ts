import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILibrary, quizeeType } from "../types/libraryTypes";
const initialState: ILibrary = {
  searchQuery: "",
  filterValue: "my",
};
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setSearchQuery: (state: ILibrary, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilter: (state: ILibrary, action: PayloadAction<quizeeType>) => {
      state.filterValue = action.payload;
    },
  },
});

export default librarySlice.reducer;
export const { setSearchQuery, setFilter } = librarySlice.actions;

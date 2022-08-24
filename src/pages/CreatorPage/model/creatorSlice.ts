import { IQuizee } from "@/entities/quizee";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: Partial<IQuizee> = {
  author: "",
  category: "none",
  id: "",
  mainImgUrl: "",
  visibility: "public",
  title: "",
  questions: [],
};
const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setPrivate: (state, action: PayloadAction<"public" | "private">) => {
      state.visibility = action.payload;
    },
    setImgUrl: (state, action: PayloadAction<string>) => {
      state.mainImgUrl = action.payload;
    },
  },
  extraReducers: (builder) => {},
});
export default creatorSlice.reducer;
export const { setImgUrl, setPrivate, setTitle } = creatorSlice.actions;

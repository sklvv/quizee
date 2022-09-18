import type { IQuestion, IQuizee } from "@/entities/quizee";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { ICreator } from "./creatorTypes";
const initialState: ICreator = {
  id: "",
  category: "none",
  mainImgUrl: "",
  visibility: "public",
  title: "",
  questions: [],
  currentQuestion: {
    id: "",
    rightAnswer: [1],
    answerOption: "single",
    answerVariants: ["", "", "", ""],
    points: "standart",
    queImgUrl: "",
    timeLimit: 20,
    title: "",
    type: "quiz",
  },
};
const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.currentQuestion.id = action.payload.id;
      state.currentQuestion.rightAnswer = action.payload.rightAnswer;
      state.currentQuestion.answerOption = action.payload.answerOption;
      state.currentQuestion.answerVariants = action.payload.answerVariants;
      state.currentQuestion.points = action.payload.points;
      state.currentQuestion.queImgUrl = action.payload.queImgUrl;
      state.currentQuestion.timeLimit = action.payload.timeLimit;
      state.currentQuestion.title = action.payload.title;
      state.currentQuestion.type = action.payload.type;
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setPrivate: (state, action: PayloadAction<"public" | "private">) => {
      state.visibility = action.payload;
    },
    setImgUrl: (state, action: PayloadAction<string>) => {
      state.mainImgUrl = action.payload;
    },
    setQuizee: (state, action: PayloadAction<IQuizee>) => {
      state.id = action.payload.id;
      state.category = action.payload.category;
      state.title = action.payload.title;
      state.visibility = action.payload.visibility;
      state.mainImgUrl = action.payload.mainImgUrl;
      state.questions = action.payload.questions;
    },
    addNew: (state) => {
      state.questions.push({
        id: nanoid(),
        rightAnswer: [1],
        answerOption: "single",
        title: "",
        type: "quiz",
        points: "standart",
        answerVariants: ["", "", "", ""],
        queImgUrl: "",
        timeLimit: 20,
      });
    },
  },
  extraReducers: (builder) => {},
});
export default creatorSlice.reducer;
export const {
  setImgUrl,
  setPrivate,
  setTitle,
  setQuizee,
  addNew,
  setCurrentQuestion,
} = creatorSlice.actions;

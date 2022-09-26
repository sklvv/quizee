import type { IQuestion, IQuizee } from "@/entities/quizee";
import { fulfilledSaveChanges, saveChanges } from "@/widgets/header";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import type { ICreator } from "./creatorTypes";
const initialState: ICreator = {
  id: "",
  author: "",
  category: "none",
  mainImgUrl: "",
  visibility: "public",
  title: "",
  questions: [],
  currentQuestion: 0,
  players: 0,
  plays: 0,
};
const creatorSlice = createSlice({
  name: "creator",
  initialState,
  reducers: {
    setCurrentQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.questions[state.currentQuestion].id = action.payload.id;
      state.questions[state.currentQuestion].rightAnswer =
        action.payload.rightAnswer;
      state.questions[state.currentQuestion].answerOption =
        action.payload.answerOption;
      state.questions[state.currentQuestion].answerVariants =
        action.payload.answerVariants;
      state.questions[state.currentQuestion].points = action.payload.points;
      state.questions[state.currentQuestion].queImgUrl =
        action.payload.queImgUrl;
      state.questions[state.currentQuestion].timeLimit =
        action.payload.timeLimit;
      state.questions[state.currentQuestion].title = action.payload.title;
      state.questions[state.currentQuestion].type = action.payload.type;
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
    setQuestionImg: (state, action: PayloadAction<string>) => {
      state.questions[state.currentQuestion].queImgUrl = action.payload;
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
  extraReducers: (builder) => {
    builder.addCase(saveChanges.fulfilled, fulfilledSaveChanges);
  },
});
export default creatorSlice.reducer;
export const {
  setImgUrl,
  setPrivate,
  setTitle,
  setQuizee,
  addNew,
  setCurrentQuestion,
  setQuestionImg,
} = creatorSlice.actions;

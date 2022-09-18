import { Box } from "@mui/material";

import {
  QuestionSettingsBar,
  CurrentQuestion,
  QuestionsBar,
} from "@/features/creator";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setQuizee } from "@/widgets/creator";

const CreatorPage = () => {
  const { quizeeId } = useParams();
  const { user } = useAppSelector((state) => state.user.quizees);
  const dispatch = useAppDispatch();
  useEffect(() => {
    user.forEach((quizee) => {
      if (quizee.id === quizeeId) {
        dispatch(setQuizee(quizee));
      }
    });
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      sx={{ width: "100vw", mt: "12px" }}
    >
      <QuestionsBar />
      <CurrentQuestion />
      <QuestionSettingsBar />
    </Box>
  );
};

export default CreatorPage;

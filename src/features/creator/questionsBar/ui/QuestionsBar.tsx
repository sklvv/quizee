import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { addNew } from "@/widgets/creator";
import { Box, Button, Divider, Stack } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import QuestionPreview from "./QuestionPreview";
import { styles } from "./styles";

const QuestionsBar = () => {
  const { questions } = useAppSelector((state) => state.creator);
  const dispatch = useAppDispatch();
  const handleAddNew = async () => {
    console.log("click");
    dispatch(addNew());
  };
  return (
    <Box sx={styles.questionsBar}>
      <Stack
        divider={<Divider orientation="horizontal" flexItem />}
        spacing={2}
        display="flex"
        // justifyContent="center"
        alignItems="center"
        // justifyItems="center"
      >
        {questions?.map((question) => {
          return (
            <QuestionPreview
              id={question.id}
              answers={question.answerVariants}
              key={nanoid()}
              imgUrl={question.queImgUrl}
              rightAnswer={question.rightAnswer}
              timeLimit={question.timeLimit}
              title={question.title}
            />
          );
        })}
        <Button variant="contained" onClick={handleAddNew}>
          +
        </Button>
      </Stack>
    </Box>
  );
};

export default QuestionsBar;

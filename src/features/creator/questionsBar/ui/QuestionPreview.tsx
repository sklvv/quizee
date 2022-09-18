import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { setCurrentQuestion } from "@/widgets/creator";
import { Box, Grid, Icon, Typography } from "@mui/material";
import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import { styles } from "./styles";

interface IProps {
  id: string;
  answers: string[];
  title: string;
  timeLimit: number;
  imgUrl: string;
  rightAnswer: number[];
}

const QuestionPreview: React.FC<IProps> = ({
  id,
  answers,
  imgUrl,
  rightAnswer,
  timeLimit,
  title,
}) => {
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.creator);
  const handleClick = () => {
    questions.forEach((question) => {
      if (question.id === id) {
        dispatch(setCurrentQuestion(question));
      }
    });
    console.log("click");
  };
  return (
    <Box
      onClick={handleClick}
      width="140px"
      height="88px"
      sx={styles.questionPreview}
      padding="8px"
      borderRadius="8px"
    >
      <Typography textAlign="center" variant="subtitle2">
        {title ? title : <>Title</>}
      </Typography>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="90%"
      >
        <Box
          width="25px"
          height="25px"
          border="1px solid"
          borderRadius="12.5px"
          borderColor="gray"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="caption">{timeLimit}</Typography>
        </Box>
        <Box width="20px" height="20px">
          {imgUrl ? (
            <img src={imgUrl} alt="img" width="100%" height="100%" />
          ) : (
            <Icon>panorama</Icon>
          )}
        </Box>
      </Box>
      <Grid container spacing={1}>
        {answers.map((value, index) => {
          const isRight = rightAnswer.includes(index);
          return (
            <Grid item xs={6} key={nanoid()}>
              <Box
                border="1px solid"
                height="10px"
                // borderColor={isRight ? "green" : "gray"}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default QuestionPreview;

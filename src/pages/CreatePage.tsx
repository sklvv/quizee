import { CreateNewQuestion } from "@/features/createNewQuestion";
import { Question } from "@/features/editQuestion";
import { GetNewQuizee } from "@/features/getNewQuizee";
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React from "react";

const CreatePage = () => {
  // for question in questions
  // some submit
  return (
    <Box>
      <Heading>Create new Quizee</Heading>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input placeholder="Poll for my weekend`s party 🍾" variant="filled" />
        <FormHelperText>It is a name of your Quizee.</FormHelperText>

        <Question />
        <CreateNewQuestion />
        <GetNewQuizee />
      </FormControl>
    </Box>
  );
};

export default CreatePage;

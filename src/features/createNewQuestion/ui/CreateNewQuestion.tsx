import { useQuizeeStore } from "@/entities/quizee";
import { Button } from "@chakra-ui/react";
import React from "react";

const CreateNewQuestion = () => {
  const addNewQuestion = useQuizeeStore(state => state.addQuestion);

  return (
    <Button colorScheme={"purple"} onClick={addNewQuestion}>
      Add
    </Button>
  );
};

export default CreateNewQuestion;

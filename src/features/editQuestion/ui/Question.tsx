import { useQuizeeStore } from "@/entities/quizee";
import { CloseButton, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const Question: React.FC<{ content: string; id: number }> = ({
  content,
  id,
}) => {
  const setQuestion = useQuizeeStore(state => state.setQuestion);
  const deleteQuestion = useQuizeeStore(state => state.deleteQuestion);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value, id - 1);
  };

  return (
    <>
      <FormLabel
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        Question {id}.
        <CloseButton size={"sm"} onClick={() => deleteQuestion(id - 1)} />
      </FormLabel>

      <Input
        type="text"
        variant="outline"
        placeholder="Vodka?"
        value={content}
        onChange={e => handleChange(e)}
        mb="4"
      />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </>
  );
};

export default Question;

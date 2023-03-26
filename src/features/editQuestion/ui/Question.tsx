import { FormHelperText, FormLabel, Input } from "@chakra-ui/react";
import React from "react";

const Question = () => {
  return (
    <>
      <FormLabel>Question 1.</FormLabel>
      <Input type="text" variant="outline" placeholder="Vodka?" />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </>
  );
};

export default Question;

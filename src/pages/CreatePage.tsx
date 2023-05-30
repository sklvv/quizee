import { useQuizeeStore } from "@/entities/quizee";
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
    const questions = useQuizeeStore(state => state.questions);
    const setTitle = useQuizeeStore(state => state.setTitle);
    const title = useQuizeeStore(state => state.title);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    return (
        <Box>
            <Heading>Create new Quizee</Heading>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                    placeholder="Poll for my weekend`s party 🍾"
                    variant="filled"
                    onChange={e => handleChange(e)}
                    value={title}
                />
                <FormHelperText>It is a name of your Quizee.</FormHelperText>
                {questions.map((question, ind) => {
                    return (
                        <Question
                            key={ind}
                            content={question.content}
                            id={ind + 1}
                        />
                    );
                })}
                <Box
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <CreateNewQuestion />
                    <GetNewQuizee />
                </Box>
            </FormControl>
        </Box>
    );
};

export default CreatePage;

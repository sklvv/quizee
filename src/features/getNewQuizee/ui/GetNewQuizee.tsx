import { useQuizeeStore } from "@/entities/quizee";
import { Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const GetNewQuizee = () => {
    const store = useQuizeeStore(state => state);
    const createNew = useQuizeeStore(state => state.getNewQuizee);
    const nav = useNavigate();
    const quizeeId = useQuizeeStore(state => state.id);
    const handleSumbit = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        console.log(quizeeId);

        await createNew(store);
        console.log(quizeeId);
        nav(`/manage/${quizeeId}`);
    };

    return (
        <Button colorScheme={"purple"} onClick={e => handleSumbit(e)}>
            Create
        </Button>
    );
};

export default GetNewQuizee;

import { Box } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../../shared/lib/hooks";
import QuizeeCard from "../../../../entities/quizee/ui/QuizeeCard";

const Quizees = () => {
  const { favourite, user } = useAppSelector((state) => state.user.quizees);
  const { filterValue, searchQuery } = useAppSelector((state) => state.library);
  const isUsersQuizee = filterValue === "my";
  return (
    <Box sx={{ mt: "10px" }}>
      {isUsersQuizee
        ? searchQuery
          ? user.map((quizee) => {
              if (quizee.title.includes(searchQuery)) {
                return (
                  <QuizeeCard
                    author={quizee.author}
                    isPrivate={quizee.private}
                    imgUrl={quizee.mainImgUrl}
                    plays={quizee.plays}
                    title={quizee.title}
                    key={quizee.id}
                  />
                );
              }
            })
          : user.map((quizee) => {
              return (
                <QuizeeCard
                  author={quizee.author}
                  isPrivate={quizee.private}
                  imgUrl={quizee.mainImgUrl}
                  plays={quizee.plays}
                  title={quizee.title}
                  key={quizee.id}
                />
              );
            })
        : searchQuery
        ? favourite.map((quizee) => {
            if (quizee.title.includes(searchQuery)) {
              return (
                <QuizeeCard
                  author={quizee.author}
                  isPrivate={quizee.private}
                  imgUrl={quizee.mainImgUrl}
                  plays={quizee.plays}
                  title={quizee.title}
                  key={quizee.id}
                />
              );
            }
          })
        : favourite.map((quizee) => {
            return (
              <QuizeeCard
                author={quizee.author}
                isPrivate={quizee.private}
                imgUrl={quizee.mainImgUrl}
                plays={quizee.plays}
                title={quizee.title}
                key={quizee.id}
              />
            );
          })}
    </Box>
  );
};

export default Quizees;

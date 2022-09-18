import { useAppSelector } from "@/shared/lib/hooks";
import { Box } from "@mui/material";

const CurrentQuestion = () => {
  const { id, title } = useAppSelector(
    (state) => state.creator.currentQuestion
  );
  return (
    <>
      <Box>{id}</Box>
      <Box>{title}</Box>
    </>
  );
};

export default CurrentQuestion;

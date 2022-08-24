import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const CreatorPage = () => {
  const { quizeeId } = useParams();
  return <Box>CreatorPage {quizeeId}</Box>;
};

export default CreatorPage;

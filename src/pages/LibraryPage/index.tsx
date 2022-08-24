import { Box } from "@mui/material";
import { Search, Quizees, CreateNewQuizee } from "@/features/library";
const LibraryPage = () => {
  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Search />
        <CreateNewQuizee />
      </Box>
      <Quizees />
    </Box>
  );
};

export default LibraryPage;

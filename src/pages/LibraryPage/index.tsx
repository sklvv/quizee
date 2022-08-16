import { Box, Button, Typography } from "@mui/material";
import { Search, Quizees } from "@/features/library";

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
        <Button variant="contained">
          <Typography variant="button">Create</Typography>
        </Button>
      </Box>

      <Quizees />
    </Box>
  );
};

export default LibraryPage;

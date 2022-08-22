import { Box, Button, Typography } from "@mui/material";
import { Search, Quizees } from "@/features/library";
import { v4 as uuidv4 } from "uuid";
import { IQuizee } from "@/entities/quizee";
import { doc, setDoc } from "firebase/firestore";
import { database } from "@/shared/config";
const LibraryPage = () => {
  const handleClick = async () => {
    const id = uuidv4();
    console.log(id);
    const quizee: IQuizee = {
      author: "kilercom15@gmail.com",
      category: "history",
      id: id,
      mainImgUrl: null,
      players: 0,
      plays: 0,
      private: false,
      questions: [],
      title: "im second",
    };
    const quizeeRef = doc(database, "quizees", `${id}`);
    await setDoc(quizeeRef, quizee);
  };
  return (
    <Box width="100%">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width="100%"
      >
        <Search />
        <Button variant="contained" onClick={handleClick}>
          <Typography variant="button">Create</Typography>
        </Button>
      </Box>

      <Quizees />
    </Box>
  );
};

export default LibraryPage;

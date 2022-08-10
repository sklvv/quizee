import { Box, Typography } from "@mui/material";
import React from "react";
interface IProps {
  title: string;
  imgUrl: string | null;
  isPrivate: boolean;
  author: string;
  plays: number;
}
const QuizeeCard: React.FC<IProps> = ({
  title,
  imgUrl,
  isPrivate,
  author,
  plays,
}) => {
  return (
    // <Box>
    //   <Typography>{title}</Typography>
    //   <Typography>{imgUrl}</Typography>
    //   <Typography>{isPrivate}</Typography>
    //   <Typography>{author}</Typography>
    //   <Typography>{plays}</Typography>
    // </Box>
    <Box>
      <Box width="180px" height="120px">
        {imgUrl !== null ? (
          <img alt="image" src={imgUrl} width="100%" height="100%" />
        ) : (
          <>null</>
        )}
      </Box>
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{author}</Typography>
        <Typography variant="caption">{plays} plays</Typography>
      </Box>
    </Box>
  );
};

export default QuizeeCard;

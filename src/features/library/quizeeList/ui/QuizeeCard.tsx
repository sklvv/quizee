import React from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { styles } from "./styles";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { deleteQuizee } from "../model/deleteQuizee.action";
import { toggleFav } from "@/entities/quizee";

interface IProps {
  title: string;
  imgUrl: string | null;
  visibility: "public" | "private";
  author: string;
  plays: number;
  quizeeId: string;
}
const QuizeeCard: React.FC<IProps> = ({
  title,
  imgUrl,
  visibility,
  author,
  plays,
  quizeeId,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { favourite, user } = useAppSelector((state) => state.user.quizees);
  const { id } = useAppSelector((state) => state.user);

  const open = Boolean(anchorEl);

  const isFav = favourite.some((quizee) => quizee.id === quizeeId);
  const isUser = user.some((quizee) => quizee.id === quizeeId);
  const isPrivate = visibility === "private";
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleFav = async () => {
    await dispatch(toggleFav({ quizeeId: quizeeId, userId: id }));
    handleClose();
  };
  const handleDelete = async () => {
    await dispatch(deleteQuizee(quizeeId));
    handleClose();
  };
  return (
    <Box sx={styles.container}>
      <Box width="180px" height="120px" sx={styles.img}>
        {imgUrl !== null ? (
          <img alt="image" src={imgUrl} width="100%" height="100%" />
        ) : (
          <>img form</>
        )}
      </Box>
      <Box sx={styles.mainInfo}>
        <Typography variant="h6">{title}</Typography>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="row" alignItems="center">
            <Typography variant="subtitle1">{author}</Typography>
            <Icon fontSize="small" color="action">
              {isPrivate ? <>person</> : <>public</>}
            </Icon>
          </Box>
          <Typography variant="subtitle2">{plays} plays</Typography>
        </Box>
      </Box>
      <Box sx={styles.actions}>
        <Box>
          <IconButton onClick={handleClick}>
            <Icon>more_vert</Icon>
          </IconButton>
          <>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={handleFav}>
                {isFav ? <>Remove from favourite</> : <>Add to favourite</>}
              </MenuItem>
              {isUser && <MenuItem onClick={handleDelete}>Delete</MenuItem>}
            </Menu>
          </>
        </Box>
        <Box>
          <Button variant="outlined" sx={{ mr: "4px" }}>
            Edit
          </Button>
          <Button variant="contained">Start</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default QuizeeCard;

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { setImgUrl, setPrivate, setTitle } from "@/widgets/creator";
import { createNewQuizee } from "../model/createNewQuizee.action";

const CreateNew = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const { username, id } = useAppSelector((state) => state.user);
  const { title, mainImgUrl, visibility } = useAppSelector(
    (state) => state.creator
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleTitle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setTitle(e.target.value));
  };
  const handleImgUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(setImgUrl(e.target.value));
  };
  const handleVisibility = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPrivate(e.target.value as "public" | "private"));
  };
  const handleSubmit = async () => {
    const quizeeId = uuidv4();
    await dispatch(
      createNewQuizee({
        uid: id,
        id: quizeeId,
        title: title!,
        visibility: visibility!,
        mainImgUrl: mainImgUrl!,
        author: username,
      })
    );
    handleClose();
    navigate(`/creator/${id}`);
  };

  const handleOpenDialog = () => {
    setDialogIsOpen(true);
  };
  const handleClose = () => {
    setDialogIsOpen(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpenDialog}>
        <Typography variant="button">Create</Typography>
      </Button>
      <Dialog
        open={dialogIsOpen}
        onClose={handleClose}
        fullWidth
        maxWidth={"md"}
      >
        <Box sx={{ p: "8px" }}>
          <DialogTitle>Create new Quizee</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Title"
              value={title}
              onChange={(e) => handleTitle(e)}
              type="text"
              fullWidth
              maxRows={1}
              variant="standard"
            />
            <TextField
              margin="dense"
              id="imgUrl"
              label="Image url"
              value={mainImgUrl}
              onChange={(e) => handleImgUrl(e)}
              type="text"
              fullWidth
              maxRows={1}
              variant="standard"
            />
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Visibility
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={visibility}
                onChange={(e) => handleVisibility(e)}
              >
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
              </RadioGroup>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              disabled={title?.length === 0}
            >
              Create
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

export default CreateNew;

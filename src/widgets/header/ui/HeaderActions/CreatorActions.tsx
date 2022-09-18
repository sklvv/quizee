import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ActionButton from "./ActionButton";
import { saveChanges } from "../../model/saveChanges.action";

const CreatorActions = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { questions } = useAppSelector((state) => state.creator);
  const { quizeeId } = useParams();
  const handleSettings = () => {};
  const handleExit = () => {
    navigate("/");
  };
  const handleSave = () => {
    dispatch(saveChanges({ id: quizeeId!, questions }));
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-around"
      width="20rem"
    >
      <ActionButton icon="settings" title="Settings" onClick={handleSettings} />
      <Button variant="contained" color="info" onClick={handleExit}>
        exit
      </Button>
      <Button variant="contained" onClick={handleSave}>
        save
      </Button>
    </Box>
  );
};

export default CreatorActions;

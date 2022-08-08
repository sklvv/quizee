import { Box, Icon, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  icon: string;
  title: string;
}

const ActionButton: React.FC<IProps> = ({ icon, title }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (title === "Discover") {
      navigate(`/${title.toLowerCase()}`);
    } else {
      navigate(`/`);
    }
  };
  return (
    <Box
      alignItems="center"
      display="flex"
      sx={{ cursor: "pointer" }}
      onClick={handleClick}
    >
      <Icon>{icon}</Icon>
      <Typography variant="button" sx={{ ml: "5px" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default ActionButton;

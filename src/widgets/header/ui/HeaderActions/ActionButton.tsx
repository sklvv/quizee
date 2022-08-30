import { Box, Icon, Typography } from "@mui/material";
import React from "react";

interface IProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const ActionButton: React.FC<IProps> = ({ icon, title, onClick }) => {
  return (
    <Box
      alignItems="center"
      display="flex"
      sx={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <Icon>{icon}</Icon>
      <Typography variant="button" sx={{ ml: "5px" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default ActionButton;

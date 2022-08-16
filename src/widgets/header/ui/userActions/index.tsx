import { Box, Icon, IconButton, Menu, MenuItem } from "@mui/material";

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks";

import { logOut } from "@/widgets/header";

import ActionButton from "./ActionButton";

const UserActions = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };
  const handleLogOut = async () => {
    await dispatch(logOut());
    handleClose();
  };
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="20rem"
    >
      <ActionButton icon="near_me" title="Discover" />
      <ActionButton icon="format_list_bulleted" title="Library" />
      <IconButton color="inherit" size="medium" onClick={handleClick}>
        <Icon>person_filled</Icon>
      </IconButton>
      <>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </>
    </Box>
  );
};

export default UserActions;

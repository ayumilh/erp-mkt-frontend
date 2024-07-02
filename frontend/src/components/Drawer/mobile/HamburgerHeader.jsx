import React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const HamburgerHeader = ({handleDrawerToggle, open}) => {
  return (
    <DrawerHeader>
      <IconButton onClick={handleDrawerToggle}>
        {open ? ( <ChevronLeftIcon sx={{fontSize: '38px'}} /> ) : ( <ChevronRightIcon sx={{fontSize: '38px'}} /> )}
      </IconButton>
    </DrawerHeader>
   );
};

export default HamburgerHeader;
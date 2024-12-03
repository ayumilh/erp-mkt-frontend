'use client'
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ModalConectarLojas from "@/components/Config/ModalConectarLojas";
import HamburgerList from "./HamburgerList";
import HamburgerHeader from "./HamburgerHeader";
import { useTheme } from '@mui/material/styles';

const drawerWidth = 240;

export default function HamburgerContent() {
  const theme = useTheme();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleSetIsModalOpen = (isModalOpen) => {
    setIsModalOpen(isModalOpen);
  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleDrawerToggle = () => {
    if (open) {
      handleDrawerClose();
    } else {
      handleDrawerOpen();
    }
  };

  return (
    <div className="lg:hidden">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <MenuRoundedIcon sx={{fontSize: '28px'}} className="dark:text-gray-200"/>
      </IconButton>

      {open ? (
        <ClickAwayListener onClickAway={handleDrawerClose}>
          <Drawer
            sx={{
              width: "100%",
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                backgroundColor: theme.palette.mode === 'dark' ? "rgba(36, 36, 38)" : "#ffffff",
                color: theme.palette.mode === 'dark' ? "#e5e7eb" : "#000000",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <HamburgerHeader handleDrawerToggle={handleDrawerToggle} open={open}/>
            <HamburgerList open={open} onSetIsModalOpen={handleSetIsModalOpen} onIsModalOpen={isModalOpen}/>
          </Drawer>
        </ClickAwayListener>
      ) : (
        <Drawer
          sx={{
            width: "100%",
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: theme.palette.mode === 'dark' ? "#363638" : "#ffffff",
              color: theme.palette.mode === 'dark' ? "#e5e7eb" : "#000000",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <HamburgerHeader handleDrawerToggle={handleDrawerToggle} open={open}/>
          <HamburgerList open={open} onSetIsModalOpen={handleSetIsModalOpen} onIsModalOpen={isModalOpen}/>
        </Drawer>
      )}
      {isModalOpen && <ModalConectarLojas onClose={toggleModal} drawerClose={handleDrawerClose} />}
    </div>
  );
}
'use client'
import * as React from "react";

import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import ModalConectarLojas from "@/components/Config/ModalConectarLojas";
import HamburgerList from "./HamburgerList";
import HamburgerHeader from "./HamburgerHeader";

const drawerWidth = 240;
export default function HamburgerContent() {
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
        <MenuRoundedIcon sx={{fontSize: '28px'}}/>
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
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <HamburgerHeader handleDrawerToggle={handleDrawerToggle} open={open}/>
            <HamburgerList open={open}  onSetIsModalOpen={handleSetIsModalOpen} onIsModalOpen={isModalOpen}/>
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

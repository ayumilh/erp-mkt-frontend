'use client'
import * as React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { styled, useTheme } from '@mui/material/styles';
import SidebarList from './SidebarList'
import ModalConectarLojas from '@/components/Config/ModalConectarLojas'
import LogoContent from '@/components/Geral/LogoContent'

const SidebarContent = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
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

  const drawerWidth = 190;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    display: 'flex',
    position: 'block',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '36px',
    padding: '12px 0',
    background: theme.palette.mode === 'dark' ? '#333' : '#F6F6FB',
    zIndex: 2,
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
    overflowX: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '30px',
    padding: '12px 0',
  });

  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      background: theme.palette.mode === 'dark' ? '#333' : '#F6F6FB',
      height: 'auto',
      marginLeft: '16px',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 50px 80px 2px rgb(0 0 0 / 0.1)',
      overflow: 'hidden',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
          ...openedMixin(theme),
          position: 'sticky',
          transition: 'all 1s ease-out',
          background: theme.palette.mode === 'dark' ? '#333' : '#F6F6FB',
          border: 'none',
        },
      }),
      ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
          ...closedMixin(theme),
          position: 'sticky',
          transition: 'all 1s ease-out',
          background: 'transparent',
          border: 'none',
        },
      }),
    }),
  );

  return (
    <div className='hidden lg:flex flex-col gap-36 items-center'>
      <LogoContent />
      <Drawer variant="permanent" open={open}>
        <SidebarList open={open} onSetIsModalOpen={handleSetIsModalOpen} onIsModalOpen={isModalOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
      </Drawer>
      {isModalOpen && <ModalConectarLojas onClose={toggleModal} drawerClose={handleDrawerClose} />}
    </div>
  );
};

export default SidebarContent;
'use client'
import * as React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Header from './SidebarHeader'
import ListDrawer from './SidebarList'

const SidebarContent = () => {
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
  const handleDrawerToggle = () => {
		if (open) {
			handleDrawerClose()
		} else {
			handleDrawerOpen()
		}
	}
  
  const drawerWidth = 240;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '30px',  
    marginLeft: '16px',
    marginTop: '40px',
    marginBottom: '40px',
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
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '30px',  
    marginLeft: '16px',
    marginTop: '40px',
    marginBottom: '40px',
  });
    
  const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      background: '#F6F6FB',
      height: 'calc(100vh - 80px)',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 50px 80px 2px rgb(0 0 0 / 0.1)',
      overflow: 'hidden',
      ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
          ...openedMixin(theme),
          position: 'sticky',
          transition: 'all 1s ease-out',
          background: 'transparent',
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
      // mudar a transição do drawer e do IconButton
      <div className='hidden lg:block'>
        <Drawer variant="permanent" open={open}>
          <Header handleDrawerToggle={handleDrawerToggle} open={open}/>
          <ListDrawer open={open}/>
        </Drawer>
      </div>
  )
}

export default SidebarContent
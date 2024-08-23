'use client'
import * as React from 'react'
import MuiDrawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import SidebarHeader from './SidebarHeader'
import SidebarList from './SidebarList'
import ModalConectarLojas from '@/components/Config/ModalConectarLojas'

const SidebarContent = () => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [open, setOpen] = React.useState(true);

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
            handleDrawerClose()
        } else {
            handleDrawerOpen()
        }
    }

    const drawerWidth = 190;
    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '30px',
        marginLeft: '16px',
        margin: 'auto',
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
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '28px',
        margin: 'auto',
        zIndex: 2,
    });

    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            height: '100%',
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            background: '#F6F6FB',
            height: 'auto',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 50px 80px 2px rgb(0 0 0 / 0.1)',
            overflow: 'hidden',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': {
                    ...openedMixin(theme),
                    transition: 'all 1s ease-out',
                    background: '#F6F6FB',
                    border: 'none',
                },
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': {
                    ...closedMixin(theme),
                    transition: 'all 1s ease-out',
                    background: '#F6F6FB',
                    border: 'none',
                },
            }),
        }),
    );

    return (
        <div className='hidden lg:flex justify-center items-center h-full ml-3'>
            <Drawer variant="permanent" open={open}>
                <div className='w-full flex items-end justify-end mt-2'>
                    <SidebarHeader handleDrawerToggle={handleDrawerToggle} open={open} />
                </div>
                <SidebarList open={open} onSetIsModalOpen={handleSetIsModalOpen} onIsModalOpen={isModalOpen} handleDrawerClose={handleDrawerClose} handleDrawerOpen={handleDrawerOpen} />
            </Drawer>
            {isModalOpen && <ModalConectarLojas onClose={toggleModal} drawerClose={handleDrawerClose} />}
        </div>
    )
}

export default SidebarContent
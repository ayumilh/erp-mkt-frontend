import * as React from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const SidebarHeader = ({handleDrawerToggle, open}) => {
  return (
    <DrawerHeader>
      <IconButton onClick={handleDrawerToggle}>
        {open ? <Image src="../../img/sidebar/expand-right.svg" alt="expand left" width={34} height={34} /> : <Image src="../../img/sidebar/expand-left.svg" alt="expand right" width={34} height={34} className='w-8 h-8'/>}
      </IconButton>
    </DrawerHeader>
  )
}

export default SidebarHeader
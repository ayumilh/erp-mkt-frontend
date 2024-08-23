import * as React from 'react'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));
const BtnExpandirDrawer = ({handleDrawerToggle, open}) => {
  if (!open) return null;

  return (
    <DrawerHeader>
      <span className='font-medium'>Expandir menu</span>
      <IconButton onClick={handleDrawerToggle}>
        <Checkbox
          checked={open}
          onChange={handleDrawerToggle}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </IconButton>
    </DrawerHeader>
  )
}

export default BtnExpandirDrawer
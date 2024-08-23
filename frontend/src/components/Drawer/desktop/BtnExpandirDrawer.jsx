import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Tooltip from '@mui/material/Tooltip';
import { grey } from '@mui/material/colors';

const BtnExpandirDrawer = ({ open, handleDrawerToggle }) => {
    if (!open) return null;
    return (
        <div className="flex items-center justify-center py-2 mx-2">
            <Tooltip title={open ? "Contrair menu" : "Expandir menu"}>
                <FormControlLabel
                    label={open ? "Contrair menu" : "Expandir menu"}
                    control={
                        <Switch
                            checked={open}
                            onChange={handleDrawerToggle}
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: grey[300],
                                    opacity: 1,
                                },
                                '& .MuiSwitch-switchBase': {
                                    color: grey[300],
                                    transform: 'translateX(0px)',
                                },
                                '& .MuiSwitch-track': {
                                    backgroundColor: grey[300],
                                    opacity: 1,
                                    borderRadius: 15 / 2, 
                                },
                                '& .MuiSwitch-thumb': {
                                    color: '#624DE3',
                                    marginTop: 0.44,
                                    width: 15,
                                    height: 15,
                                },
                            }}
                        />
                    }
                />
            </Tooltip>
        </div>
    );
};

export default BtnExpandirDrawer;


// <div className="flex items-center justify-center p-2">
//   <Tooltip title={open ? "Contrair menu" : "Expandir menu"}>
//     <IconButton onClick={handleDrawerToggle} color="primary">
//       {open ? <MenuOpenIcon /> : <MenuIcon />}
//     </IconButton>
//   </Tooltip>
//   <span className="font-medium text-sm ml-2">
//     {open ? "Contrair menu" : "Expandir menu"}
//   </span>
// </div>
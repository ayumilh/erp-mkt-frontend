import { Switch } from '@headlessui/react';

const BtnExpandirDrawer = ({ open, handleDrawerToggle }) => {
    return (
        <div className="w-[200px] flex items-center justify-center px-2 py-2">
            <div className="flex items-center w-full">
                {open ? (
                    <>
                        <span className="mr-2 text-gray-700 font-medium text-sm">Contrair menu</span>
                        <Switch
                            checked={open}
                            onChange={handleDrawerToggle}
                            className={`${open ? 'bg-gray-300' : 'bg-gray-200'} relative inline-flex items-center h-4 rounded-full w-10 transition-colors duration-200 ease-in-out`}
                        >
                            <span
                                className={`${open ? 'translate-x-6' : 'translate-x-1'} inline-block w-3 h-3 transform bg-segundaria-900 rounded-full transition-transform duration-200 ease-in-out`}
                            />
                        </Switch>
                    </>
                ) : (
                    <>
                        <Switch
                            checked={open}
                            onChange={handleDrawerToggle}
                            className={`${open ? 'bg-gray-300' : 'bg-gray-200'} relative inline-flex items-center h-4 rounded-full w-10 transition-colors duration-200 ease-in-out`}
                        >
                            <span
                                className={`${open ? 'translate-x-6' : 'translate-x-1'} inline-block w-3 h-3 transform bg-segundaria-900 rounded-full transition-transform duration-200 ease-in-out`}
                            />
                        </Switch>
                        <span className="ml-2 text-gray-700 font-medium text-sm">Expandir menu</span>
                    </>
                )}
            </div>
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
import { useState } from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import BtnExpandirDrawer from "./BtnExpandirDrawer";

import ProductsIcon from "@mui/icons-material/Store";
import LinkIcon from '@mui/icons-material/Link';
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import AnalysisIcon from "@mui/icons-material/BarChart";
import StockIcon from "@mui/icons-material/Inventory";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Zoom } from "@mui/material";

const iconsNav = [
    <DashboardIcon key="dashboard" fontSize='small' />,
    <ProductsIcon key="products" fontSize='small' />,
    <OrdersIcon key="orders" fontSize='small' />,
    <StockIcon key="stock" fontSize='small' />,
    <AnalysisIcon key="analysis" fontSize='small' />,
    <SupportAgentIcon key="feedback" fontSize='small' />,
];

const SidebarList = ({ open, onIsModalOpen, onSetIsModalOpen, handleDrawerClose, handleDrawerOpen }) => {
    const toggleModal = () => {
        onSetIsModalOpen(!onIsModalOpen);
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const isOpen = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerToggle = () => {
        if (open) {
            handleDrawerClose()
        } else {
            handleDrawerOpen()
        }
    }

    return (
        <>
            <div>
                <ul className="w-[200px] px-2 ml-1">
                    {["Dashboard", "Produtos", "Pedidos", "Estoque", "Analise", "Feedback"].map(
                        (text, index) => (
                            <li key={text} className="flex flex-col items-center">
                                <Link href={`/${text.toLowerCase()}`}>
                                    <Tooltip title={text} placement="bottom" TransitionComponent={Zoom} followCursor>
                                        <button
                                            className={`flex  py-3 ${open ? "justify-start w-[124px]" : "justify-center w-[160px]"
                                                } relative items-center group hover:text-indigo-500`}
                                        >
                                            <span className={`relative flex justify-center text-neutral-700 dark:text-gray-300 group-hover:text-indigo-500 transition duration-300 ease-out ${open ? "mr-0" : "mr-auto"}`}>
                                                {iconsNav[index]}
                                            </span>
                                            <span className={`ml-3 ${open ? "opacity-100" : "opacity-0"} text-neutral-700 dark:text-gray-300 group-hover:text-indigo-500 font-medium transition duration-300 ease-out`}>
                                                {text}
                                            </span>
                                        </button>
                                    </Tooltip>
                                </Link>
                            </li>
                        )
                    )}
                </ul>
            </div>
            <div>
                <ul className="mt-7 w-[180px] px-2">
                    <li className="flex flex-col">
                        <div>
                            <BtnExpandirDrawer handleDrawerToggle={handleDrawerToggle} open={open} />
                        </div>
                        {/* {open && (
                            <div>
                                <button onClick={toggleModal} className={`flex rounded-full items-center group hover:text-segundaria-900 dark:text-indigo-600 w-[160px] py-2 px-3 ${open ? "justify-start" : "justify-center"}`}
                                >
                                    <span> <LinkIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 dark:text-indigo-600 transition duration-300 ease-out" /> </span>
                                    <span className={`${open ? "opacity-100" : "opacity-0"} text-sm font-medium group-hover:text-segundaria-900 dark:text-indigo-600 transition duration-300 ease-out`}>Conectar Conta</span>
                                </button>
                                <button
                                    className={`flex rounded-full items-center group hover:bg-segundaria-200 w-[160px] py-2 px-3 ${open ? "justify-start" : "justify-center"
                                        }`}
                                    onClick={handleClick}
                                >
                                    <span className='flex justify-center'>
                                        <SettingsIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 dark:text-indigo-600 transition duration-300 ease-out" />
                                    </span>
                                    <span className={`${open ? "opacity-100" : "opacity-0"} text-sm font-medium group-hover:text-segundaria-900 dark:text-indigo-600 transition duration-300 ease-out`}>Ajuste</span>
                                </button>
                                <BtnSignOut />
                            </div>
                        )} */}
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SidebarList;
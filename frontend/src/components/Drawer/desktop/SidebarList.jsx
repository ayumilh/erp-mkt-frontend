import { useState } from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import BtnExpandirDrawer from "./BtnExpandirDrawer";

import ProductsIcon from "@mui/icons-material/Store";
import LinkIcon from '@mui/icons-material/Link';
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import BuyIcon from "@mui/icons-material/LocalAtm";
import AnalysisIcon from "@mui/icons-material/BarChart";
import StockIcon from "@mui/icons-material/Inventory";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

import SettingsIcon from '@mui/icons-material/Settings';
import BtnSignOut from "../BtnSignOut";
import { Zoom } from "@mui/material";

const iconsNav = [
    <DashboardIcon key="dashboard" fontSize='small' />,
    <ProductsIcon key="products" fontSize='small' />,
    <OrdersIcon key="orders" fontSize='small' />,
    <BuyIcon key="buy" fontSize='small' />,
    <AnalysisIcon key="analysis" fontSize='small' />,
    <StockIcon key="stock" fontSize='small' />,
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
            <ul className="w-[180px] px-2">
                {["Dashboard", "Produtos", "Pedidos", "Comprar", "Analise", "Estoque", "Feedback"].map(
                    (text, index) => (
                        <li key={text} className="flex flex-col">
                            <Link href={`/${text.toLowerCase()}`}>
                                <Tooltip title={text} placement="bottom" TransitionComponent={Zoom} followCursor>
                                    <button
                                        className={`flex w-[160px] h-12 px-3 ${open ? "justify-start" : "justify-center"
                                            } relative items-center group hover:text-segundaria-900`}
                                    >
                                        <span className={`relative flex justify-center text-neutral-700 group-hover:text-segundaria-900 transition duration-300 ease-out`}>
                                            {iconsNav[index]}
                                        </span>
                                        <span className={`ml-3 ${open ? "opacity-100" : "opacity-0"} text-neutral-700 group-hover:text-segundaria-900 font-medium transition duration-300 ease-out`}>
                                            {text}
                                        </span>
                                    </button>
                                </Tooltip>
                            </Link>
                        </li>
                    )
                )}
            </ul>

            <ul className="mt-7 w-[180px] px-2">
                {open && (
                    <li className="flex flex-col mb-5">
                        <div>
                            <BtnExpandirDrawer handleDrawerToggle={handleDrawerToggle} open={open} />
                            <button onClick={toggleModal} className={`flex rounded-full items-center group hover:text-segundaria-900 w-[160px] py-2 px-3 ${open ? "justify-start" : "justify-center"}`}
                            >
                                <span> <LinkIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-out" /> </span>
                                <span className={`${open ? "opacity-100" : "opacity-0"} text-sm font-medium group-hover:text-segundaria-900 transition duration-300 ease-out`}>Conectar Conta</span>
                            </button>
                            <button
                                className={`flex rounded-full items-center group hover:bg-segundaria-200 w-[160px] py-2 px-3 ${open ? "justify-start" : "justify-center"
                                    }`}
                                onClick={handleClick}
                            >
                                <span className='flex justify-center'>
                                    <SettingsIcon fontSize="small" className="mr-2 text-neutral-600 group-hover:text-segundaria-900 transition duration-300 ease-out" />
                                </span>
                                <span className={`${open ? "opacity-100" : "opacity-0"} text-sm font-medium group-hover:text-segundaria-900 transition duration-300 ease-out`}>Ajuste</span>
                            </button>
                            <BtnSignOut />
                        </div>
                    </li>
                )}
            </ul>
        </>
    );
};

export default SidebarList;
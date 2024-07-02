import { useState } from "react";
import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ProductsIcon from "@mui/icons-material/Store";
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import BuyIcon from "@mui/icons-material/LocalAtm";
import AnalysisIcon from "@mui/icons-material/BarChart";
import StockIcon from "@mui/icons-material/Inventory";
import SacIcon from "@mui/icons-material/Help";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DashboardIcon from '@mui/icons-material/Dashboard';

import SettingsIcon from '@mui/icons-material/Settings';
import BtnSignOut from "../BtnSignOut";
import { Zoom } from "@mui/material";

const iconsNav = [
  <DashboardIcon key="dashboard" sx={{ width: 34 }}/>,
  <ProductsIcon key="products" sx={{ width: 34 }} />,
  <OrdersIcon key="orders" sx={{ width: 34 }} />,
  <BuyIcon key="buy" sx={{ width: 34 }} />,
  <AnalysisIcon key="analysis" sx={{ width: 34 }} />,
  <StockIcon key="stock" sx={{ width: 34 }} />,
  <SacIcon key="sac" sx={{ width: 34 }} />,
];

const SidebarList = ({ open }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ul className="my-10">
        {["Dashboard", "Produtos", "Pedidos", "Comprar", "Analise", "Estoque", "SAC"].map(
          (text, index) => (
            <li key={text} className="flex flex-col mb-5">
              <Link href={`/${text.toLowerCase()}`}>
                <Tooltip title={text} placement="bottom" TransitionComponent={Zoom} followCursor>
                  <button
                    className={`flex w-[160px] h-12 px-3 ${
                      open ? "justify-start" : "justify-start"
                    } relative items-center group hover:bg-gray-200 transition-shadow duration-200 ease-in-out rounded-full`}
                  >
                    <span className={`relative flex justify-center text-segundaria-900 ${ open ? "mr-3" : "mr-auto" }`}>
                      {iconsNav[index]}
                    </span>
                    <span className={`opacity-${open ? "100" : "0"}, font-medium `}>
                      {text}
                    </span>
                  </button>
                </Tooltip>
              </Link>
            </li>
          )
        )}
      </ul>

      <ul className="my-10">
        <li className="flex flex-col mb-5">
          <div>
            <button
              className={`flex rounded-full items-center focus:bg-gray-200 w-[180px] h-12 px-3 ${
                open ? "justify-start" : "justify-start"
              }`}
              aria-controls={isOpen ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : undefined}
              onClick={handleClick}
            >
              <span
                className={`flex justify-center text-segundaria-900 ${
                  open ? "mr-3" : "mr-auto"
                }`}
              >
                <MoreVertIcon className="w-[34px] h-7 text-segundaria-900" />
              </span>
              <span className={`opacity-${open ? "100" : "0"}, font-medium `}>
                Configuração
              </span>
            </button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{ '.MuiPaper-root': { borderRadius: 2 } }}
            >
              <MenuItem onClick={handleClose}>
                <button className="flex w-full text-sm hover:bg-gray-100">
                  <span><SettingsIcon className="h-4 w-4 mr-2"></SettingsIcon></span>
                  <span>Ajuste</span>
                </button>
              </MenuItem>
              <MenuItem onClick={handleClose}><BtnSignOut/></MenuItem>
            </Menu>
          </div>
        </li>
      </ul>
    </>
  );
};

export default SidebarList;

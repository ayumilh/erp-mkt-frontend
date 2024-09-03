'use client'
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ProductsIcon from "@mui/icons-material/Store";
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import BuyIcon from "@mui/icons-material/LocalAtm";
import AnalysisIcon from "@mui/icons-material/BarChart";
import StockIcon from "@mui/icons-material/Inventory";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LinkIcon from '@mui/icons-material/Link';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { EmailAddressUser } from "../EmailAddressUser";

const iconsNav = [
  <DashboardIcon key="dashboard" sx={{ fontSize: '26px' }}/>,
  <ProductsIcon key="products" sx={{ fontSize: '26px' }} />,
  <OrdersIcon key="orders" sx={{ fontSize: '26px' }} />,
  <BuyIcon key="buy" sx={{ fontSize: '26px' }} />,
  <AnalysisIcon key="analysis" sx={{ fontSize: '26px' }} />,
  <StockIcon key="stock" sx={{ fontSize: '26px' }} />,
  <SupportAgentIcon key="feedback" sx={{ fontSize: '26px' }} />,
];

const iconConfig = [
  <NotificationsIcon key="bell" sx={{fontSize: '26px'}} />,
  <HelpIcon key="help" sx={{fontSize: '26px'}} />,
  <SettingsIcon key="settings" sx={{fontSize: '26px'}} />,
];
const HamburgerList = ({ open, onIsModalOpen, onSetIsModalOpen}) => {
  const toggleModal = () => {
    onSetIsModalOpen(!onIsModalOpen);
  }
  
  return (<>
    <ul className="flex flex-col px-4 my-10">
      {["Dashboard","Produtos", "Pedidos", "Comprar", "Analise", "Estoque", "Feedback"].map(
        (text, index) => (
          <li key={text} className="flex flex-col mb-5">
            <Link href={`/${text.toLowerCase()}`}>
              <button className='flex items-center w-[170px] h-12 px-4 justify-start hover:bg-gray-100 active:bg-gray-200 rounded-full transition duration-500 ease-out'>
                <span
                  className={`flex justify-center text-neutral-700 ${
                    open ? "mr-3" : "mr-auto"
                  }`}
                >
                  {iconsNav[index]}
                </span>
                <span className={`opacity-${open ? "100" : "0"}, text-neutral-700 font-medium active:text-black`}>
                  {text}
                </span>
              </button>
            </Link>
          </li>
        )
      )}
    </ul>

    <Divider sx={{ color: "#99999999", width: "80%", marginX: "auto" }} />

    <ul className="flex flex-col px-4 mt-10">
      <li className="flex items-center mb-7">
        <button
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "between",
            alignItems: "center",
            gap: "10px",
            color: "blue",
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          <AccountCircleIcon sx={{fontSize: '28px'}} className="ml-2 text-neutral-700" />
          <div className="flex">
            <EmailAddressUser />
          </div>
        </button>
      </li>

      <li className="flex flex-col mb-1">
        <button onClick={toggleModal} 
          className="flex items-center w-[160px] h-12 px-4 justify-start hover:bg-gray-100 active:bg-gray-100 rounded-full transition duration-500 ease-out"
        >
          <span
            className={`flex justify-center text-neutral-700 ${
              open ? "mr-3" : "mr-auto"
            }`}
          > <LinkIcon sx={{fontSize: '26px'}} className="text-neutral-700"/> </span>
          <span className="text-neutral-700 font-medium whitespace-nowrap">Conectar Conta</span>
        </button>
      </li>

      {["Notificação", "Ajuda", "Configuração"].map((text, index) => (
        <li key={text} className="flex flex-col mb-1">
          <button className='flex items-center w-[190px] h-12 px-4 justify-start active:bg-gray-100 rounded-full transition duration-500 ease-out'>
            <span
              className={`flex justify-center text-neutral-700 ${
                open ? "mr-3" : "mr-auto"
              }`}
            >
              {iconConfig[index]}
            </span>
            <span className={`opacity-${open ? "100" : "0"}, text-neutral-700 font-medium `}>{text}</span>
          </button>
        </li>
      ))}
      <li className="flex flex-col mb-1">
        <button 
          onClick={() => signOut()}
          className='flex w-[160px] h-12 px-4 justify-start'
        >
          <span
            className={`flex justify-center text-neutral-700 ${
              open ? "mr-3" : "mr-auto"
            }`}
          >
            <span><LogoutRoundedIcon className="w-8 text-neutral-700"></LogoutRoundedIcon></span>
          </span>
          <span className={`opacity-${open ? "100" : "0"}, text-neutral-700 font-medium `}>Sair</span>
        </button>
      </li>
    </ul>
  </>);
};

export default HamburgerList;

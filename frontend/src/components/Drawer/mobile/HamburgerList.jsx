import Link from "next/link";
import { signOut } from "next-auth/react";
import { Divider } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ProductsIcon from "@mui/icons-material/Store";
import OrdersIcon from "@mui/icons-material/ShoppingCart";
import BuyIcon from "@mui/icons-material/LocalAtm";
import AnalysisIcon from "@mui/icons-material/BarChart";
import StockIcon from "@mui/icons-material/Inventory";
import SacIcon from "@mui/icons-material/Help";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { EmailAddressUser } from "../EmailAddressUser";

const iconsNav = [
  <DashboardIcon key="dashboard" sx={{ width: 34 }}/>,
  <ProductsIcon key="products" sx={{ width: 34 }} />,
  <OrdersIcon key="orders" sx={{ width: 34 }} />,
  <BuyIcon key="buy" sx={{ width: 34 }} />,
  <AnalysisIcon key="analysis" sx={{ width: 34 }} />,
  <StockIcon key="stock" sx={{ width: 34 }} />,
  <SacIcon key="sac" sx={{ width: 34 }} />,
];

const iconConfig = [
  <NotificationsIcon key="bell" className="w-8 text-segundaria-900" />,
  <HelpIcon key="help" className="w-8 text-segundaria-900" />,
  <SettingsIcon key="settings" className="w-8 text-segundaria-900" />,
];
const HamburgerList = ({ open }) => {
  return (<>
    <ul className="flex flex-col px-4 my-10">
      {["Dashboard","Produtos", "Pedidos", "Comprar", "Analise", "Estoque", "SAC"].map(
        (text, index) => (
          <li key={text} className="flex flex-col mb-5">
            <Link href={`/${text.toLowerCase()}`}>
              <button
                className={`flex w-[160px] h-12 px-4 ${
                  open ? "justify-start" : "justify-start"
                }`}
              >
                <span
                  className={`flex justify-center text-segundaria-900 ${
                    open ? "mr-3" : "mr-auto"
                  }`}
                >
                  {iconsNav[index]}
                </span>
                <span className={`opacity-${open ? "100" : "0"}, font-medium `}>
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
      <li className="flex items-center mb-14">
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
          <AccountCircleIcon className="h-9 w-9 text-colorFont-200" />
          <div className="flex">
            <EmailAddressUser />
          </div>
        </button>
      </li>

      {["Notificação", "Ajuda", "Configuração"].map((text, index) => (
        <li key={text} className="flex flex-col mb-1">
          <button className='flex w-[160px] h-12 px-4 justify-start'>
            <span
              className={`flex justify-center text-segundaria-900 ${
                open ? "mr-3" : "mr-auto"
              }`}
            >
              {iconConfig[index]}
            </span>
            <span className={`opacity-${open ? "100" : "0"}, font-medium `}>{text}</span>
          </button>
        </li>
      ))}
      <li className="flex flex-col mb-1">
        <button 
          onClick={() => signOut()}
          className='flex w-[160px] h-12 px-4 justify-start'
        >
          <span
            className={`flex justify-center text-segundaria-900 ${
              open ? "mr-3" : "mr-auto"
            }`}
          >
            <span><LogoutRoundedIcon className="w-8 text-segundaria-900"></LogoutRoundedIcon></span>
          </span>
          <span className={`opacity-${open ? "100" : "0"}, font-medium `}>Sair</span>
        </button>
      </li>
    </ul>
  </>);
};

export default HamburgerList;

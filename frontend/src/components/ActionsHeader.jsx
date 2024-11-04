'use client'
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ModalMessageAction from "@/components/Geral/Notifications/ModalMessageAction";
import { EmailAddressUser } from "./Drawer/EmailAddressUser";
import ToggleTheme from "@/components/Geral/Button/ToggleTheme";


const ActionsHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="items-center justify-center lg:flex hidden gap-4">
            <ModalMessageAction />
            <ToggleTheme />
            <div onClick={toggleMenu} className="bg-primaria-900 dark:bg-neutral-700 bg-opacity-70 shadow-sm flex px-3 py-2 rounded-full cursor-pointer">
                <AccountCircleIcon className="text-neutral-700 dark:text-gray-400" />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "24px",
                        color: "blue",
                        fontSize: "16px",
                        marginLeft: "12px",
                    }}
                >
                    <EmailAddressUser menuOpen={menuOpen} toggleMenuOpen={toggleMenu} />
                </div>
            </div>
        </div>
    );
};

export default ActionsHeader;

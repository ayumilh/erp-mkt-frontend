'use client'
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { EmailAddressUser } from "./Drawer/EmailAddressUser";

const ActionsHeader = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="items-center justify-center lg:flex hidden">
            <NotificationsNoneIcon className="h-6 w-6 mr-4 text-neutral-700" />
            <div onClick={toggleMenu} className="bg-primaria-900 bg-opacity-70 shadow-sm flex px-3 py-2 rounded-full cursor-pointer">
                <AccountCircleIcon className="h-6 w-6 text-neutral-700" />
                <button
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
                    <EmailAddressUser menuOpen={menuOpen} toggleMenu={toggleMenu} />
                </button>
            </div>
        </div>
    );
};

export default ActionsHeader;

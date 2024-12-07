'use client'
import { useContext, useRef, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkIcon from '@mui/icons-material/Link';
import { useSession } from "next-auth/react";
import ModalConectarLojas from "@/components/Config/ModalConectarLojas";
import ToggleTheme from "@/components/Config/ActionsConfig/ToggleTheme";
import BtnSignOut from "./BtnSignOut";

export const EmailAddressUser = ({ menuOpen, onMenuOpen }) => {
    const { userInfo } = useContext(AuthContext);
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);


    useEffect(() => {
        setIsOpenDropdown(menuOpen);
    }, [menuOpen]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
        if (onMenuOpen) onMenuOpen(false);
    }

    const toggleDropdown = () => {
        setIsOpenDropdown(!isOpenDropdown);
        if (onMenuOpen) onMenuOpen(!isOpenDropdown);
    }


    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpenDropdown(false);
                if (onMenuOpen) onMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownRef]);

    return (
        <div className="w-full flex" ref={dropdownRef}>
            <span
                className="font-medium max-w-20 md:w-full overflow-hidden text-sm"
                style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                title={session?.session?.user?.email || (userInfo.length > 0 ? userInfo[0].email : "")}
            >
                {session?.session?.user?.email || (userInfo.length > 0 ? userInfo[0].email : "")}
            </span>
            <div className="relative">
                <KeyboardArrowDownIcon
                    onClick={toggleDropdown}
                    sx={{
                        transform: isOpenDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out'
                    }} className="-mr-1 ml-2 text-segundaria-900" aria-hidden="true" />
                {isOpenDropdown && (
                    <div className={`absolute top-8 -right-2 z-20 mt-2 w-44 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenDropdown ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                        <div className="m-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            <button onClick={toggleModal} className='flex items-center group hover:text-segundaria-900 px-2 py-1'>
                                <span> <LinkIcon fontSize="small" className="mr-2 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900 transition duration-300 ease-out" /> </span>
                                <span className='text-xs py-1 dark:text-gray-200 font-medium group-hover:text-segundaria-900 transition duration-300 ease-out'>Conectar Conta</span>
                            </button>
                            <ToggleTheme />
                            <BtnSignOut />
                        </div>
                    </div>
                )}
                {isModalOpen && <ModalConectarLojas onClose={toggleModal} />}
            </div>
        </div>
    );
};
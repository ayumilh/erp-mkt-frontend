import React from 'react'
import { useState, useRef, useEffect } from 'react'
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const ModalMessageAction = () => {
    const [isNotificationActive, setIsNotificationActive] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const notificationCount = 4;

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
        setIsNotificationActive(!isNotificationActive);
    };


    const dropdownMoreRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMoreRef.current && !dropdownMoreRef.current.contains(event.target)) {
                setIsOpenModal(false);
                setIsNotificationActive(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownMoreRef]);

    const renderIcon = () => {
        if (notificationCount > 0) {
            return (
                <NotificationsActiveIcon
                    className="h-6 w-6 text-neutral-700 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-out cursor-pointer"
                    onClick={toggleModal}
                />
            );
        } else if (isNotificationActive) {
            return (
                <NotificationsIcon
                    className="h-6 w-6 text-neutral-700 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-out cursor-pointer"
                    onClick={toggleModal}
                />
            );
        } else {
            return (
                <NotificationsNoneIcon
                    className="h-6 w-6 text-neutral-700 dark:text-gray-300 dark:hover:text-white transition duration-300 ease-out cursor-pointer"
                    onClick={toggleModal}
                />
            );
        }
    };

    return (
        <div className="relative" ref={dropdownMoreRef}>
            {renderIcon()}
            {notificationCount > 0 && (
                <span className="absolute top-4 left-4 inline-flex items-center justify-center p-1 text-[11px] font-medium leading-none text-red-100 bg-red-600 rounded-full">
                    {/* {notificationCount} */}
                </span>
            )}
            {isOpenModal && (
                <div className={`w-[280px] absolute top-8 right-0 z-20 mt-2 rounded-md shadow-lg bg-primaria-900 dark:bg-dark-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenModal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className='my-2 h-20' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="px-4 py-2">
                            <h3 className="font-semibold dark:text-gray-200">Notificação</h3>
                            <hr className="my-2 border-gray-300 dark:border-gray-600" />
                        </div>
                        {/* Conteúdo do menu */}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ModalMessageAction
'use client'
import React, { useContext } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from '@/contexts/AuthContext'

const BtnSignOut = () => {
  const { toggleModal } = useContext(AuthContext)

  return (
    <button
      onClick={toggleModal}
      className="flex items-center group hover:text-segundaria-900 px-2 py-1"
    >
      <LogoutIcon fontSize="small" className="mr-2 text-neutral-700 dark:text-gray-300 group-hover:text-segundaria-900 transition duration-300 ease-out"></LogoutIcon>
      <span className="text-sm dark:text-gray-200 group-hover:text-segundaria-900 font-medium transition duration-300 ease-out">Sair</span>
    </button>
  );
};

export default BtnSignOut;
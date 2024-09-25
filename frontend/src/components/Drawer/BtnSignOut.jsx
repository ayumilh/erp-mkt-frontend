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
      <span><LogoutIcon fontSize="small" className="mr-2 text-neutral-700 group-hover:text-segundaria-900 transition duration-300 ease-out"></LogoutIcon></span>
      <span className="text-sm group-hover:text-segundaria-900 font-medium transition duration-300 ease-out">Sair</span>
    </button>
  );
};

export default BtnSignOut;
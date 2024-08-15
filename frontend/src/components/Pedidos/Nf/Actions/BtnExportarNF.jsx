"use client";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BtnRoute from "@/components/Geral/Button/BtnRoute";
import CircularProgress from '@mui/material/CircularProgress';
import ExportarNFDataModal from "../Actions/ExportarNFDataModal";

export const BtnExportarNF = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingRouting, setLoadingRouting] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOpenModal = () => {
    setLoadingRouting(true);
    setTimeout(() => {
      try {
        setIsModalOpen(true);
      } catch (error) {
        return
      } finally {
        setLoadingRouting(false);
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const dropdownExportarRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownExportarRef.current &&
        !dropdownExportarRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownExportarRef]);

  return (
    <div className="relative inline-block text-left" ref={dropdownExportarRef}>
      <div>
        <button
          type="button"
          className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={handleButtonClick}
        >
          <span className="text-white text-sm">Exportar</span>
          <KeyboardArrowDownIcon
            className="-mr-1 ml-1 h-5 w-5 text-white"
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div className="max-w-max origin-top-right right-2 absolute z-10 mt-2 px-2 rounded-md bg-white items-start">
          <div
            className="flex flex-col py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={handleOpenModal}
              className="flex px-2 py-1 no-underline"
              role="menuitem"
            >
                {loadingRouting 
                    ? <CircularProgress color="inherit" className="text-segundaria-900" size={12} /> 
                    : <a className="w-[110px] md:w-full hover:text-black cursor-pointer font-medium overflow-hidden text-sm opacity-90 text-start">Exportar por Data</a>
                    }
            </button>

            <BtnRoute
              route="/pedidos/nf"
              size="dropdown"
              btn="dropdown"
              txt="dropdown"
            >
              Exportar por Selecionado
            </BtnRoute>

            <BtnRoute
              route="/pedidos/nf"
              size="dropdown"
              btn="dropdown"
              txt="dropdown"
            >
              Exportar por Periodicamente
            </BtnRoute>
          </div>
        </div>
      )}

      <ExportarNFDataModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

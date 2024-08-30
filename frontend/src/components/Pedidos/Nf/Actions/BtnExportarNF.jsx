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
                <div className={`absolute top-11 right-0 z-20 w-auto rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div
                        className="w-60 flex flex-col my-2"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                    >
                        <button
                            onClick={handleOpenModal}
                            className="w-full flex px-4 py-2 text-sm text-neutral-700 font-medium hover:bg-gray-200 active:bg-gray-100 rounded-sm transition duration-300 ease-in-out"
                            role="menuitem"
                        >
                            {loadingRouting
                                ? <CircularProgress color="inherit" className="text-segundaria-900" size={12} />
                                : <a>Exportar por Data</a>
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

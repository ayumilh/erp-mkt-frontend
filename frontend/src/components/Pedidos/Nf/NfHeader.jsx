import { useState, useRef, useEffect } from "react";
import { BtnExportarNF } from "./Actions/BtnExportarNF";
import axios from "axios";
import BtnRoute from "@/components/Geral/Button/BtnRoute";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SuccessNotification from "@/components/Geral/Notifications/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notifications/ErrorNotification";
import CircularProgress from '@mui/material/CircularProgress';

const NfHeader = () => {
    const [loading, setLoading] = useState(false);
    const [statusRequestSync, setStatusRequestSync] = useState(null);
    const [isOpenMore, setIsOpenMore] = useState(false);
    const [isVertical, setIsVertical] = useState(false);

    const toggleDropdown = () => {
        setIsOpenMore(!isOpenMore);
        setIsVertical(!isVertical);
    };

    const handleSync = async () => {
        setLoading(true);
        try {
            await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/sync-notes');
            setStatusRequestSync(true);
        } catch (error) {
            setStatusRequestSync(false);
        } finally {
            setLoading(false);
        }
    };


    const dropdownMoreRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownMoreRef.current && !dropdownMoreRef.current.contains(event.target)) {
                setIsOpenMore(false);
                setIsVertical(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownMoreRef]);

    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col md:flex-row justify-between mb-6">
            <div className="flex gap-6">
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base' activePage={true}>
                    Todas as NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base'>
                    Invalidar Nº da NF-e
                </BtnRoute>
                <div className="hidden md:flex">
                    <BtnRoute route="/pedidos/nf/config" size='full' btn='base' txt='base'>
                        Configurar
                    </BtnRoute>
                </div>

                <div className="relative inline-block text-left md:hidden" ref={dropdownMoreRef}>
                    <button
                        className="flex items-center transition duration-300 ease-in-out rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 cursor-pointer"
                        onClick={toggleDropdown}
                    >
                        <MoreHorizIcon
                            className="text-gray-700 dark:text-white"
                            sx={{
                                width: '34px',
                                transform: isVertical ? 'rotate(90deg)' : 'rotate(0deg)',
                                transition: 'transform 0.3s ease-in-out'
                            }}
                        />
                    </button>

                    {isOpenMore && (
                        <div className={`w-auto absolute top-8 right-0 z-20 rounded-md shadow-lg bg-primaria-900 dark:bg-neutral-800 ring-1 ring-black ring-opacity-5 transition-transform duration-300 ease-out transform ${isOpenMore ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                            <div className='w-60 my-2' role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="flex flex-col">
                                    <BtnRoute route="/pedidos/nf/config" size='full' btn='dropdown' txt='dropdown'>
                                        Configurar
                                    </BtnRoute>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-3 justify-end mt-4 md:mt-0">
                <div>
                    <button
                        onClick={handleSync}
                        type="button"
                        className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        <span className="text-white text-sm">
                            {loading ? <CircularProgress size={18} className="text-white" /> : <span className="text-white text-sm">Sincronizar NF-e</span>}
                        </span>
                    </button>
                </div>
                <div>
                    <BtnExportarNF />
                </div>
            </div>
            {
                statusRequestSync === true && <SuccessNotification message='Sincronização das NF-e feita com sucesso!' />
            }
            {
                statusRequestSync === false && <ErrorNotification message='Não foi possível sincronizar as NF-e!' />
            }
        </div>
    );
};

export default NfHeader;

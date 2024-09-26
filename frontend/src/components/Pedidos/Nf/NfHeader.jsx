import { useState } from "react";
import { BtnExportarNF } from "./Actions/BtnExportarNF";
import axios from "axios";
import BtnRoute from "@/components/Geral/Button/BtnRoute";
import SuccessNotification from "@/components/Geral/Notifications/SuccessNotification";
import ErrorNotification from "@/components/Geral/Notifications/ErrorNotification";
import CircularProgress from '@mui/material/CircularProgress';

const NfHeader = () => {
    const [loading, setLoading] = useState(false);
    const [statusRequestSync, setStatusRequestSync] = useState(null);

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

    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col md:flex-row justify-between mb-6">
            <div className="flex gap-6">
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base' activePage={true}>
                    Todas as NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base'>
                    Invalidar Nº da NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf/config" size='full' btn='base' txt='base'>
                    Configurar
                </BtnRoute>
            </div>

            <div className="flex gap-3 justify-end">
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

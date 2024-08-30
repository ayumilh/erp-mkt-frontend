import { BtnExportarNF } from "./Actions/BtnExportarNF";
import BtnRoute from "@/components/Geral/Button/BtnRoute";

const NfHeader = () => {
    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-row justify-between mb-6">
            <div className="flex gap-6">
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base' activePage={true}>
                    Todas as NF-e
                </BtnRoute>
                <BtnRoute route="/estoque/sincronizarAnuncios" size='full' btn='base' txt='base'>
                    Invalidar Nº da NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf/config" size='full' btn='base' txt='base'>
                    Configurar
                </BtnRoute>
            </div>

            <div className="flex gap-3 justify-end">
                <div>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                    >
                        <span className="text-white text-sm">Sincronizar</span>
                    </button>
                </div>
                <div>
                    <BtnExportarNF />
                </div>
            </div>
        </div>
    );
};

export default NfHeader;

import { BtnExportarNF } from "../Actions/BtnExportarNF";
import BtnRoute from "@/components/Geral/Button/BtnRoute";

const NfConfigHeader = () => {
    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-row justify-between mb-6">
            <div className="flex gap-6">
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base'>
                    Todas as NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf" size='full' btn='base' txt='base'>
                    Invalidar Nº da NF-e
                </BtnRoute>
                <BtnRoute route="/pedidos/nf/config" size='full' btn='base' txt='base' activePage={true}>
                    Configurações
                </BtnRoute>
            </div>

            <div className="flex gap-3 justify-end">
                <div>
                    <BtnExportarNF />
                </div>
            </div>
        </div>
    );
};

export default NfConfigHeader;

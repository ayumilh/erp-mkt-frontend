import { BtnExportarNF } from "../Actions/BtnExportarNF";
import BtnRoute from "@/components/Geral/Button/BtnRoute";

const NfConfigHeader = () => {
    return (
        <div className="w-full flex flex-col xl:flex-row justify-between mb-6">
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

            <div className="flex gap-3 justify-end items-center">
                <div>
                    <BtnRoute route="/pedidos/nf/config/criar" size='full' btn='base' txt='base'>
                        Criar configuração
                    </BtnRoute>
                </div>
                <div>
                    <BtnExportarNF />
                </div>
            </div>
        </div>
    );
};

export default NfConfigHeader;

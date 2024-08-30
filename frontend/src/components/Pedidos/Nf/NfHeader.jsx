import { useRouter } from "next/navigation";
import { BtnExportarNF } from "./Actions/BtnExportarNF";

const NfHeader = () => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push("/pedidos/nf/config");
    };

    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-col mb-6">
            <div className="flex mb-8 gap-6">
                <div style={{ display: "inline-block" }}>
                    <p className="hover:text-black font-medium hover:cursor-pointer">
                        Todas as NF-e
                    </p>
                    <hr className="border-segundaria-900 border-[1.5px]" />
                </div>
                <div style={{ display: "inline-block" }}>
                    <p
                        className="hover:text-black font-medium hover:cursor-pointer"
                    >
                        Invalidar Nº da NF-e
                    </p>
                    {/* <hr className="hover:border-segundaria-900 hover:border-[1.5px]" /> */}
                </div>
                <div style={{ display: "inline-block" }}>
                    <p onClick={handleRedirect} className="hover:text-black font-medium hover:cursor-pointer">
                        Configurar
                    </p>
                    {/* <hr className="hover:border-segundaria-900 hover:border-[1.5px]" /> */}
                </div>
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

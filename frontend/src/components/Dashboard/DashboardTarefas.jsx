'use client'
import { useRouter } from "next/navigation";
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import StockIcon from "@mui/icons-material/Inventory";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const DashboardTarefas = () => {
    const router = useRouter()

    const handleRetiradaClick = () => {
        router.push('/pedidos?activeTable=Retirada');
    };

    return (
        <div className="max-w-[373px] md:max-w-[688px] lg:w-[596px] xl:min-w-[958px]">
            <div className="flex flex-col gap-3 w-full xl:4">
                {/* Pedidos */}
                <div className="bg-primaria-900 shadow-md hover:shadow-lg border border-slate-100 rounded-2xl w-full flex flex-col gap-3 justify-center lg:mx-0 min-h-max px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mx-2 xs:mx-auto transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <LocalShippingIcon className='w-6 h-6 text-blue-500' />
                        <span className="text-center font-medium text-blue-500">Pedidos</span>
                    </div> 
                    <div className="w-full flex justify-start">
                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/4 h-[60px] flex flex-col items-center justify-center cursor-pointer"
                        >
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Para Enviar</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/4 h-[60px] flex flex-col items-center justify-center cursor-pointer"
                        >
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Para Emitir</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Expirará em Breve</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Retirada</p>
                        </div>
                    </div>
                </div>

                {/* Estoque */}
                <div className="bg-primaria-900 shadow-md hover:shadow-lg border border-slate-100 rounded-2xl w-full flex flex-col gap-3 justify-center lg:mx-0 min-h-max px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mx-2 xs:mx-auto transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <StockIcon className="w-8 h-8 text-amber-500" />
                        <span className="text-center font-medium text-amber-500">Estoque</span>
                    </div> 
                    <div className="w-full flex justify-start">
                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Estoque Baixo</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Sem Estoque</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Estoque Baixo(MELI Full)</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Sem Estoque(MELI Full)</p>
                        </div>
                    </div>
                </div>

                {/* SAC */}
                <div className="bg-primaria-900 shadow-md hover:shadow-lg border border-slate-100 rounded-2xl w-full flex flex-col gap-3 justify-center lg:mx-0 min-h-max px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 mx-2 xs:mx-auto transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <SupportAgentIcon className="w-8 h-8 text-green-500" />
                        <span className="text-center font-medium text-green-500">SAC</span>
                    </div> 
                    <div className="w-full flex justify-start">
                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Perguntas Pendente do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Mensagens não lidos do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Reclamação pendente do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] mx-2"></div>

                        <div className="w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold">0</p>
                            <p className="w-full px-[6px] text-center opacity-90 hover:opacity-100 hover:cursor-pointer text-sm font-medium">Devolução pendente/reembolso do Shopee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTarefas;

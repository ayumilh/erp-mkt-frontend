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
        <div className="w-full lg:mx-0 lg:mb-0">
            <div className="flex flex-col gap-3 xl:gap-6">
                {/* Pedidos */}
                <div className="bg-primaria-900 dark:bg-dark-primaria-900 shadow-md hover:shadow-lg border-r-4 border-blue-500 rounded-2xl w-full flex flex-col justify-center lg:mx-0 min-h-max p-4 mx-2 xs:mx-auto transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <LocalShippingIcon sx={{fontSize: '28px'}} className='text-blue-500' />
                        <span className="text-center font-medium text-blue-500">Pedidos</span>
                    </div> 
                    <div className="w-full flex flex-wrap md:flex-nowrap justify-start">
                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center cursor-pointer"
                        >
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Para Enviar</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center cursor-pointer"
                        >
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Para Emitir</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Expirará em Breve</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div
                            onClick={handleRetiradaClick}
                            className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Retirada</p>
                        </div>
                    </div>
                </div>

                {/* Estoque */}
                <div className="bg-primaria-900 dark:bg-dark-primaria-900 shadow-md hover:shadow-lg border-r-4 border-yellow-500 rounded-2xl w-full flex flex-col justify-center lg:mx-0 min-h-max p-4 mx-2 xs:mx-auto transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <StockIcon className="w-8 h-8 text-amber-500" />
                        <span className="text-center font-medium text-amber-500">Estoque</span>
                    </div> 
                    <div className="w-full flex flex-wrap md:flex-nowrap justify-start">
                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-200">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Estoque Baixo</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Sem Estoque</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Estoque Baixo(MELI Full)</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 lg:w-full px-[6px] text-xs lg:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Sem Estoque(MELI Full)</p>
                        </div>
                    </div>
                </div>

                {/* SAC */}
                <div className="bg-primaria-900 dark:bg-dark-primaria-900 shadow-md hover:shadow-lg border-r-4 border-green-500 rounded-2xl w-full flex flex-col justify-center lg:mx-0 min-h-max p-4 mx-2 py-5 xs:mx-auto mb-7 transition duration-300 ease-in-out">
                    <div className="flex justify-start items-center gap-1">
                        <SupportAgentIcon className="w-8 h-8 text-green-500" />
                        <span className="text-center font-medium text-green-500">SAC</span>
                    </div> 
                    <div className="w-full flex flex-wrap md:flex-nowrap justify-start">
                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 xl:w-36 px-[6px] text-xs xl:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Perguntas Pendente do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 xl:w-36 px-[6px] text-xs xl:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Mensagens não lidos do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 xl:w-36 px-[6px] text-xs xl:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Reclamação pendente do MELI</p>
                        </div>

                        <div className="border-l border-gray-300 h-[60px] hidden md:block"></div>

                        <div className="w-1/2 md:w-1/4 h-[60px] flex flex-col items-center justify-center mb-2">
                            <p className="font-semibold dark:text-gray-300">0</p>
                            <p className="w-32 xl:w-36 px-[6px] text-xs xl:text-sm text-center text-neutral-600 dark:text-gray-200 hover:text-neutral-800 hover:cursor-pointer font-medium hover:underline transition duration-200 ease-in-out">Devolução pendente/reembolso do Shopee</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTarefas;

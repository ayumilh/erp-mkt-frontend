import { useState } from "react";
import { DropdownRelatoriosHeader } from "./Actions/DropdownRelatoriosHeader";
import FilterPlataformasHeader from "./Actions/FilterPlataformasHeader";

export const AnaliseHeader = ({ setActiveTable }) => {
    const [currentText, setCurrentText] = useState('Geral');
    const handleClick = (text) => {
        setActiveTable(text);
        setCurrentText(text);
    };

    return (
        <div className="w-full lg:w-[876px] xl:w-[1270px] flex flex-row justify-between mb-6">
            <div className="flex gap-4">
                {/* <DropdownRelatoriosHeader setActiveTable={setActiveTable} /> */}
                <button onClick={() => handleClick('Geral')} className={`${currentText === 'Geral' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black font-medium cursor-pointer">Geral</p>
                </button>
                <button onClick={() => handleClick('Vendas')} className={`${currentText === 'Vendas' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black font-medium cursor-pointer">Vendas</p>
                </button>
                <button onClick={() => handleClick('Lucros')} className={`${currentText === 'Lucros' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black font-medium cursor-pointer">Lucros</p>
                </button>
                <button onClick={() => handleClick('Estoque')} className={`${currentText === 'Estoque' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black font-medium cursor-pointer">Estoque</p>
                </button>
            </div>

            <div className="hidden lg:flex flex-wrap gap-3 justify-start md:justify-end px-4 md:px-0 md:gap-6">
                <div className="flex flex-row">
                    <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Últimos 7 dias
                    </button>
                    <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Últimos 30 dias
                    </button>
                    <button className="px-4 py-2 text-sm text-neutral-800 hover:text-black font-medium border border-gray-200 hover:bg-gray-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-gray-300">
                        Este mês
                    </button>
                </div>
                {/* <div>
                        <FilterPlataformasHeader />
                    </div> */}
            </div>

        </div>
    )
}

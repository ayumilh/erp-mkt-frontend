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
                <div onClick={() => handleClick('Geral')} className="inline-block group">
                    <p className="hover:text-black font-medium cursor-pointer">Geral</p>
                    {currentText === 'Geral' && <hr className="border-segundaria-900 border-[1.5px]" />}
                    <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
                </div>
                <div onClick={() => handleClick('Vendas')} className="inline-block group">
                    <p className="hover:text-black font-medium cursor-pointer">Vendas</p>
                    {currentText === 'Vendas' && <hr className="border-segundaria-900 border-[1.5px]" />}
                    <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
                </div>
                <div onClick={() => handleClick('Lucros')} className="inline-block group">
                    <p className="hover:text-black font-medium cursor-pointer">Lucros</p>
                    {currentText === 'Lucros' && <hr className="border-segundaria-900 border-[1.5px]" />}
                    <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
                </div>
                <div onClick={() => handleClick('Estoque')} className="inline-block group">
                    <p className="hover:text-black font-medium cursor-pointer">Estoque</p>
                    {currentText === 'Estoque' && <hr className="border-segundaria-900 border-[1.5px]" />}
                    <hr className="border-transparent group-hover:border-gray-300 border-[1.5px] transition duration-300 ease-in-out" />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-start md:justify-end px-4 md:px-0 md:gap-6">
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

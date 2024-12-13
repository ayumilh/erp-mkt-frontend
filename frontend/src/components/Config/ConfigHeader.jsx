import { useState } from "react";

export const ConfigHeader = ({ setActiveTable }) => {
    const [currentText, setCurrentText] = useState('Etiquetas');
    const handleClick = (text) => {
        setActiveTable(text);
        setCurrentText(text);
    };

    return (
        <div className="w-full flex flex-col xl:flex-row justify-between mb-6">
            <div className="flex gap-4">
                {/* <DropdownRelatoriosHeader setActiveTable={setActiveTable} /> */}
                {/* <button onClick={() => handleClick('Pedidos')} className={`${currentText === 'Pedidos' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Pedidos</p>
                </button> */}
                <button onClick={() => handleClick('Etiquetas')} className={`${currentText === 'Etiquetas' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Etiquetas</p>
                </button>
                <button onClick={() => handleClick('Impressão')} className={`${currentText === 'Impressão' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Modelo de impressão</p>
                </button>
                {/* <button onClick={() => handleClick('NF')} className={`${currentText === 'NF' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Notas fiscais</p>
                </button> */}
                {/* <button onClick={() => handleClick('Estoque')} className={`${currentText === 'Estoque' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Estoque</p>
                </button>
                <button onClick={() => handleClick('Permissões')} className={`${currentText === 'Permissões' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Permissões</p>
                </button>                
                <button onClick={() => handleClick('Registro')} className={`${currentText === 'Registro' ? 'border-b-2 border-segundaria-900' : 'border-transparent'} flex items-center justify-center px-2 md:px-3 py-2 border-b-2 border-segundaria-900 hover:border-b-2 hover:border-gray-300 transform focus:-translate-y-0.5 focus:scale-60 transition duration-300 ease-in-out`}>
                    <p className="hover:text-black dark:text-gray-300 dark:hover:text-white  font-medium cursor-pointer">Registro de atividades</p>
                </button> */}
            </div>
        </div>
    )
}

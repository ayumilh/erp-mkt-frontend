'use client'
import { useState } from 'react';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsContent from '../Config/ActionsConfig/ActionsContent';
import TitlePage from '../Geral/TitlePage';
import { ConfigHeader } from './ConfigHeader';
import PedidosConfigContent from './Pedidos/PedidosConfigContent';
import ImpressaoContent from './Impressao/ImpressaoContent';
import EtiquetasConfigContent from './Etiquetas/EtiquetasConfigContent';


const ConfigContent = () => {
    const [activeTable, setActiveTable] = useState('Etiquetas');

    return (
        <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
            <div className="w-full flex justify-between items-center h-12 pt-5">
                <div className='flex items-center'>
                    <HamburgerContent />
                    <TitlePage title='Configuração' />
                </div>
                <ActionsContent />
            </div>

            <div className='w-full flex flex-col items-center mt-7 lg:mb-10'>
                <ConfigHeader setActiveTable={setActiveTable} />
                {activeTable === 'Pedidos' && <PedidosConfigContent />} 
                {activeTable === 'Etiquetas' && <EtiquetasConfigContent />}
                {activeTable === 'Impressão' && <ImpressaoContent />}
                {activeTable === 'NF' && <h1>Notas fiscais</h1>}
                {activeTable === 'Estoque' && <h1>Estoque</h1>}
                {activeTable === 'Permissões' && <h1>Permissões</h1>}
                {activeTable === 'Registro' && <h1>Registro de atividades</h1>}
            </div>

        </div>
    )
}

export default ConfigContent
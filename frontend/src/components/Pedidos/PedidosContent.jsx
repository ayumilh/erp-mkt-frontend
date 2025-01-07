'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsContent from '../Config/ActionsConfig/ActionsContent';
import TitlePage from '../Geral/TitlePage';
import PedidosActionsFilter from './PedidosActionsFilter';
import PedidosTabela from './PedidosTabela';
import EmitirTabela from './Emitir/EmitirTabela';
import ImprimirTabela from './Imprimir/ImprimirTabela';
import { PedidosHeader } from './PedidosHeader';
import EnviarTabela from './Enviar/EnviarTabelas';
import RetiradaTabela from './Retirada/RetiradaTabela';
import EnviadosTabela from './Enviados/EnviadosTabela';

const PedidosContent = () => {
  const [activeTable, setActiveTable] = useState('Pedidos');
  const [searchTerm, setSearchTerm] = useState(null);  
  const [searchColumn, setSearchColumn] = useState('title');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query && router.query.activeTable) {
      setActiveTable(router.query.activeTable);
    }
  }, [router.isReady, router.query]);

  return (
    <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Pedidos'/>
        </div>
        <ActionsContent/>
      </div>

      <div className='w-full flex flex-col items-center mt-7 lg:mb-10'>
        <PedidosHeader setActiveTable={setActiveTable}/>
        <PedidosActionsFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchColumn={searchColumn} setSearchColumn={setSearchColumn} />
        {activeTable === 'Pedidos' && <PedidosTabela searchTerm={searchTerm} searchColumn={searchColumn} />}
        {activeTable === 'Emitir' && <EmitirTabela />}
        {activeTable === 'Imprimir' && <ImprimirTabela />}
        {activeTable === 'Enviar' && <EnviarTabela />}
        {activeTable === 'Retirada' && <RetiradaTabela />}
        {activeTable === 'Enviado' && <EnviadosTabela />}
      </div>
    </div>
  )
}

export default PedidosContent
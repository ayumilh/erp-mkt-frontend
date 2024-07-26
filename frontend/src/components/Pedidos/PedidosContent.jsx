'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import PedidosActionsFilter from './PedidosActionsFilter';
import PedidosTabela from './PedidosTabela';
import EmitirTabela from './Emitir/EmitirTabela';
import ImprimirTabela from './Imprimir/ImprimirTabela';
import { PedidosHeader } from './PedidosHeader';
import EnviadosTabela from './Enviados/EnviadosTabelas';
import RetiradaTabela from './Retirada/RetiradaTabela';

const PedidosContent = () => {
  const [activeTable, setActiveTable] = useState('Pedidos');
  const router = useRouter();

  useEffect(() => {
    if (router.isReady && router.query && router.query.activeTable) {
      setActiveTable(router.query.activeTable);
    }
  }, [router.isReady, router.query]);
  
  return (
    <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Pedidos'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center' style={{height: '1000px'}}>
        <PedidosHeader setActiveTable={setActiveTable}/>
        <PedidosActionsFilter />
        {activeTable === 'Pedidos' && <PedidosTabela />}
        {activeTable === 'Emitir' && <EmitirTabela />}
        {activeTable === 'Imprimir' && <ImprimirTabela />}
        {activeTable === 'Enviados' && <EnviadosTabela />}
        {activeTable === 'Retirada' && <RetiradaTabela />}
      </div>
    </div>
  )
}

export default PedidosContent
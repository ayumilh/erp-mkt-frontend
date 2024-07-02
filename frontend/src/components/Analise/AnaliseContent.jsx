'use client'
import { useState } from 'react';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import TitlePage from '../Geral/TitlePage';
import { AnaliseHeader } from './AnaliseHeader';
import { GeralContent } from './Geral/GeralContent';
import LucrosContent from './Lucros/LucrosContent';
import VendasContent from './Vendas/VendasContent';

const AnaliseContent = () => {
  const [activeTable, setActiveTable] = useState('Geral');
  return (
    <div className='w-full px-4 lg:px-0 lg:mx-5 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full lg:w-[876px] xl:w-[1270px] flex justify-between items-center h-12 pt-4 mb-8">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Análise'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center' style={{height: '1000px'}}>
        <AnaliseHeader setActiveTable={setActiveTable} />
        {/* <AnaliseActionsFilter />   */}
        {activeTable === 'Geral' && <GeralContent />}
        {activeTable === 'Lucros' && <LucrosContent />}
        {activeTable === 'Vendas' && <VendasContent />}
      </div>
    </div>
  )
}

export default AnaliseContent
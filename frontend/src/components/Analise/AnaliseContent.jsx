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
    <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Análise'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center mt-7 lg:mb-10' style={{height: '1000px'}}>
        <AnaliseHeader setActiveTable={setActiveTable} />
        {activeTable === 'Geral' && <GeralContent />}
        {activeTable === 'Lucros' && <LucrosContent />}
        {activeTable === 'Vendas' && <VendasContent />}
      </div>
    </div>
  )
}

export default AnaliseContent
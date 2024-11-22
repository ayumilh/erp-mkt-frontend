'use client'
import { useState } from 'react';
import HamburgerContent from '../Drawer/mobile/HamburgerContent';
import ActionsHeader from '../ActionsHeader';
import ProdutosTabela from './ProdutosTabela';
import ProdutosActionsFilter from './ProdutosActionsFilter';
import ProdutosHeader from './ProdutosHeader';
import TitlePage from '../Geral/TitlePage';

const ProdutosContent = () => {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterChange = (newFilter) => {
    setFilterStatus(newFilter);
  };
  return (
    <div className='w-full px-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Produtos'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='w-full flex flex-col items-center mt-7 lg:mb-10'>
        <ProdutosHeader/>
        <ProdutosActionsFilter onFilterChange={handleFilterChange}/>
        <ProdutosTabela onFilterStatus={filterStatus}/>
      </div>
    </div>
  )
}

export default ProdutosContent
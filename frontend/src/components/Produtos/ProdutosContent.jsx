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
    <div className='max-w-[373px] md:max-w-[740px] lg:max-w-[760px] xl:max-w-screen-xl 2xl:max-w-screen-2xl px-4 lg:px-0 lg:mx-4 lg:mt-4 xl:mx-8 xl:flex xl:flex-col xl:items-center justify-center'>
      <div className="w-full flex justify-between items-center h-12 pt-5">
        <div className='flex items-center'>
          <HamburgerContent/>
          <TitlePage title='Produtos'/>
        </div>
        <ActionsHeader/>
      </div>

      <div className='max-w-[373px] md:max-w-[740px] lg:max-w-[760px] xl:max-w-screen-xl 2xl:max-w-screen-2xl flex flex-col items-center lg:mb-10' style={{height: '1000px'}}>
        <ProdutosHeader/>
        <ProdutosActionsFilter onFilterChange={handleFilterChange}/>
        <ProdutosTabela onFilterStatus={filterStatus}/>
      </div>
    </div>
  )
}

export default ProdutosContent
import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChartCardsLucros from '../Actions/ChartCardsLucros'

const ChartLineLucros = dynamic(() => import('./ChartLineLucros'), { ssr: false });

export const ChartContentLucros = () => {
  const [selectedItem, setSelectedItem] = useState('Lucros Totais');

  const handleItemSelected = (item) => {
    setSelectedItem(item);
  }; 
  
  return (
    <div className='bg-primaria-900 dark:bg-dark-primaria-900 shadow-md rounded-3xl w-full xl:max-w-[950px] px-4 lg:px-5 py-5 xl:py-7 xl:pb-0'>
      <ChartCardsLucros onItemSelected={handleItemSelected} />
      <div className='mt-10'>
        <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 dark:text-gray-200 font-semibold'>{selectedItem.titulo}</h2>
        <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 dark:text-gray-200 font-medium'>{selectedItem.valor}</span>
      </div>
      <ChartLineLucros />
    </div>
  )
}

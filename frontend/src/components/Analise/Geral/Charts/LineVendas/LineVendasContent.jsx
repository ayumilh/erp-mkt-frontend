import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartTypeSelector } from '@/components/Geral/Dropdown/ChartTypeSelector';
import ChartFilterLojas from '@/components/Geral/Dropdown/ChartFilterLojas';

const LineVendasChart = dynamic(() => import('./LineVendasChart'), { ssr: false });
const MultipleYStep = dynamic(() => import('../LineVendas/MultipleYStep'), { ssr: false });

export const LineVendasContent = () => {
  const [chartTypeSelected, setChartTypeSelected] = useState('bar');

  return (
    <div className='bg-primaria-900 dark:bg-dark-primaria-900 shadow-md rounded-3xl w-full p-5 md:px-4 md:py-8 xl:px-6'>
      <div className='pb-5'>
        <div className='flex items-end flex-col'>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 dark:text-gray-200 font-semibold'>Tendências de Vendas</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 dark:text-gray-200 font-medium'>R$9.032,98</span>
        </div>

        <div className='flex gap-2 md:gap-4 items-center'>
          <ChartFilterLojas />
          <ChartTypeSelector onChartTypeSelected={setChartTypeSelected} />
        </div>
      </div>
      {chartTypeSelected === 'candlestick' ? (
        <MultipleYStep />
      ) : (
        <LineVendasChart />
      )}
    </div>
  )
}

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { ChartTypeSelector } from '@/components/Geral/Dropdown/ChartTypeSelector';
import ChartFilterLojas from '@/components/Geral/Dropdown/ChartFilterLojas';

const BarEstoqueChart = dynamic(() => import('./BarEstoqueChart'), { ssr: false });
const MultipleYStep = dynamic(() => import('../LineVendas/MultipleYStep'), { ssr: false });

export const BarEstoqueContent = () => {
  const [chartTypeSelected, setChartTypeSelected] = useState('bar');

  return (
    <div className='bg-primaria-900 shadow-md rounded-3xl w-[345px] md:w-full mx-auto p-5 mt-7 md:px-4 md:py-8 xl:px-6'>
      <div>
        <div className='flex items-end flex-col'>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>Estoque</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>R$9.032,98</span>
        </div>

        <div className='flex gap-2 md:gap-4 items-center'>
          <ChartFilterLojas />
          <ChartTypeSelector onChartTypeSelected={setChartTypeSelected} />
        </div>
      </div>
      {chartTypeSelected === 'candlestick' ? (
        <MultipleYStep />
      ) : (
        <BarEstoqueChart />
      )}
    </div>
  )
}

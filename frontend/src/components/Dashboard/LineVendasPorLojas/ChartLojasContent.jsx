'use client'
import { useState } from "react";
import dynamic from "next/dynamic";
import ChartFilterLojas from "../../Geral/Dropdown/ChartFilterLojas";
import { ChartTypeSelector } from "@/components/Geral/Dropdown/ChartTypeSelector";

const LineLojasChart = dynamic(() => import('./LineLojasChart'), { ssr: false });
const MultipleYLojasChart = dynamic(() => import('./MultipleYLojasChart'), { ssr: false });

const ChartLojasContent = () => {
  const [chartTypeSelected, setChartTypeSelected] = useState('bar');
  
  return (
    <div className="bg-primaria-900 dark:bg-dark-primaria-900 shadow-lg border border-slate-100 dark:border-neutral-800 rounded-2xl w-full px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 lg:mb-0 mx-2 xs:mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className='text-base text-neutral-700 dark:text-gray-300 font-semibold'>Lojas</h2> 
        <div className="flex items-center gap-2">
          <ChartTypeSelector onChartTypeSelected={setChartTypeSelected} />
          <ChartFilterLojas />
        </div>
      </div>
     
      <div className="flex flex-row flex-wrap gap-6">
        <div>
          <h2 className="text-lg font-semibold dark:text-gray-300">0</h2>
          <h2 className="text-base font-normal text-neutral-700 dark:text-gray-200 flex-wrap text-start">
            Quantidade de Vendas (Últimos 30 dias)
          </h2>
        </div>
        <div>
          <h2 className="text-lg font-semibold dark:text-gray-300">R$ 0,00</h2>
          <h2 className="text-base font-normal text-neutral-700 dark:text-gray-200 flex-wrap text-center">
            Valor de Vendas (Últimos 30 dias)
          </h2>
        </div>
      </div>
      
      {chartTypeSelected === 'candlestick' ? (
        <MultipleYLojasChart  />
      ) : (
        <LineLojasChart  />
      )}
    </div>
  );
};

export default ChartLojasContent;

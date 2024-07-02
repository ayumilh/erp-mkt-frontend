'use client'
import dynamic from 'next/dynamic';
import UltimasVendas from '../Tabelas/UltimasVendas';
import { AreaContent } from '../Charts/AreaSazonais/AreaSazonaisContent';
import { LineVendasContent } from '../Charts/LineVendas/LineVendasContent';

const BlockAnaliseGeral = dynamic(() => import('./BlockAnaliseGeral'), { ssr: false });
const BarProdutosVendidos = dynamic(() => import('../Charts/BarProdutosVendidos'), { ssr: false });
const PieVendasPorLojas = dynamic(() => import('../Charts/PieVendasPorLojas'), { ssr: false });

export const GeralContent = () => {
  return (
    <div>
      <BlockAnaliseGeral />
      <div className='lg:flex lg:w-full lg:gap-7 justify-center items-center'>
        <LineVendasContent />
      </div>

      <div className='lg:flex lg:w-full lg:gap-7 mt-7 justify-center items-center'>
        <PieVendasPorLojas />
        <BarProdutosVendidos/>
      </div>

      <div className='lg:flex lg:w-full lg:gap-7 my-7 justify-center items-center'>
        <AreaContent />
        <UltimasVendas />
      </div>
    </div>
  )
}

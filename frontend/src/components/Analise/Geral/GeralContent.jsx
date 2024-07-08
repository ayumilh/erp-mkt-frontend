'use client'
import UltimasVendas from './Tabelas/UltimasVendas';
import { AreaContent } from './Charts/AreaSazonais/AreaSazonaisContent';
import { LineVendasContent } from './Charts/LineVendas/LineVendasContent';
import { PieProdutosContent } from './Charts/PieProdutos/PieProdutosContent';
import { BarEstoqueContent } from './Charts/BarEstoque/BarEstoqueContent';
import BlockAnaliseGeral from './BlockAnaliseGeral';

export const GeralContent = () => {
  return (
    <div>
      <BlockAnaliseGeral />
      <div className='lg:flex lg:w-full lg:gap-7 justify-center items-center'>
        <LineVendasContent />
      </div>

      <div className='lg:flex lg:w-full lg:gap-7 mt-7 justify-center items-center'>
        <PieProdutosContent />
        <BarEstoqueContent/>
      </div>

      <div className='lg:flex lg:w-full lg:gap-7 my-7 justify-center items-center'>
        <AreaContent />
        <UltimasVendas />
      </div>
    </div>
  )
}

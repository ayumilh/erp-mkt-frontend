import { useState } from 'react'
import dynamic from 'next/dynamic'
import ChartCardVendas from './ChartCardVendas';

const ChartLineVendas = dynamic(() => import('./ChartLineVendas'), { ssr: false });

export const ChartContentVendas = () => {
  const [selectedItem, setSelectedItem] = useState('Vendas Totais');
  const [valoresParaYAxis, setValoresParaYAxis] = useState([]);

  const tituloParaCampo = {
    "Total de Pedidos": "TotalDePedidos",
    "Valor Total de Vendas": "ValorTotalDeVendas",
    "Pedidos Válidos": "PedidosValidos",
    "Vendas Válidas": "ValorDeVendasValidas",
    "Pedidos Cancelados": "PedidosCancelados",
    "Valor de Vendas Canceladas": "ValorDeVendasCanceladas",
    "Clientes": "Clientes",
    "Vendas por Cliente": "VendasPorCliente"
  };

  const handleItemSelected = (item) => {
    setSelectedItem(item);
    setValoresParaYAxis(tituloParaCampo[item.titulo])
  }; 
  return (
    <div className='bg-primaria-900 shadow-md rounded-3xl w-full xl:max-w-[950px] px-4 lg:px-5 py-5 xl:py-7 xl:pb-0'>
      <ChartCardVendas onItemSelected={handleItemSelected}/>
      <div className='mt-10'>
        <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>{selectedItem.titulo}</h2>
        <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>{selectedItem.valor}</span>
      </div>
      <ChartLineVendas selectedItem={valoresParaYAxis}/>
    </div>
  )
}

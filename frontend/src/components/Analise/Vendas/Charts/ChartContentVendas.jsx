import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import ChartCardVendas from './ChartCardVendas';
import MultipleYAxis from './MultipleYAxis';
import BarChartIcon from '@mui/icons-material/BarChart';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';

const ChartLineVendas = dynamic(() => import('./ChartLineVendas'), { ssr: false });

export const ChartContentVendas = () => {
  const [selectedItem, setSelectedItem] = useState('Vendas Totais');
  const [valoresParaYAxis, setValoresParaYAxis] = useState([]);
  const [chartTypeSelected, setChartTypeSelected] = useState('bar');
  const [selectedChartType, setSelectedChartType] = useState('bar');

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenuChart = () => setIsOpen(!isOpen);

  const handleChartTypeChange = (type) => {
    setSelectedChartType(type);
    setChartTypeSelected(type);
  };

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

  const menuChartRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuChartRef.current && !menuChartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuChartRef]);

  return (
    <div className='bg-primaria-900 shadow-md rounded-3xl w-full xl:max-w-[950px] px-4 lg:px-5 py-5 xl:py-7 xl:pb-0'>
      <ChartCardVendas onItemSelected={handleItemSelected}/>
      <div className='mt-10'>
        <div>
          <h2 className='mb-1 md:mb-2 text-sm md:text-base text-neutral-800 font-semibold'>{selectedItem.titulo}</h2>
          <span className='ml-2 md:ml-4 text-base md:text-2xl text-neutral-800 font-medium'>{selectedItem.valor}</span>
        </div>
        <div className='flex pl-4 pt-3'>
          <div className='w-full relative inline-block text-left'>
            <button onClick={toggleMenuChart}>
              {chartTypeSelected === 'bar' ? <BarChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> : <CandlestickChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" />}
            </button>

            {isOpen && (
              <div className="top-6 absolute z-10 mt-2 px-2 rounded-md bg-white" ref={menuChartRef}>
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <button onClick={() => handleChartTypeChange('bar')} className="flex items-center w-full px-2 my-2 focus:bg-primaria-900" role="menuitem">
                    <span> <BarChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> </span>
                    <span className='text-neutral-800 hover:text-black text-sm font-medium'>Gráfico barra</span>
                  </button>
                  <button onClick={() => handleChartTypeChange('candlestick')} className="flex items-center w-full px-2 my-2 focus:bg-primaria-900" role="menuitem">
                    <span> <CandlestickChartIcon className="text-neutral-700 hover:text-black mr-2 w-3 h-3 cursor-pointer" /> </span>
                    <span className='text-neutral-800 hover:text-black text-sm font-medium'>Gráfico candle</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {selectedChartType === 'candlestick' ? (
        <MultipleYAxis selectedItem={valoresParaYAxis} />
      ) : (
        <ChartLineVendas selectedItem={valoresParaYAxis} />
      )}
    </div>
  )
}

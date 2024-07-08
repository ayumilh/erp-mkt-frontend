import { useEffect, useState } from "react";
import axios from "axios";

export default function ChartCardVendas({ onItemSelected }) {
  const [selectedItem, setSelectedItem] = useState('Valor Total de Vendas');
  const [sales, setSales] = useState([]);
  const info = [
    { titulo: 'Total de Pedidos', valor: sales.TotalDePedidos },
    { titulo: 'Valor Total de Vendas', valor: sales.ValorTotalDeVendas },
    { titulo: 'Pedidos Válidos', valor: sales.PedidosValidos },
    { titulo: 'Vendas Válidas', valor: sales.ValorDeVendasValidas },
    { titulo: 'Pedidos Cancelados', valor: sales.PedidosCancelados },
    { titulo: 'Valor de Vendas Canceladas', valor: sales.ValorDeVendasCanceladas },
    { titulo: 'Clientes', valor: sales.Clientes },
    { titulo: 'Vendas por Cliente', valor: sales.VendasPorCliente }
  ];

  useEffect(() => {
    if (sales.ValorTotalDeVendas) {
      onItemSelected({ titulo: 'Valor Total de Vendas', valor: sales.ValorTotalDeVendas });
    }
  }, [sales, onItemSelected]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/statistics/sales");
        if (response.data && Array.isArray(response.data.statistics)) {
          const restructuredData = response.data.statistics.map((sales) => {
            return {
              Data: sales.Data,
              TotalDePedidos: sales["Total de Pedidos"],
              ValorTotalDeVendas: sales["Valor Total de Vendas"],
              PedidosValidos: sales["Pedidos Válidos"],
              ValorDeVendasValidas: sales["Valor de Vendas Válidas"],
              PedidosCancelados: sales["Pedidos Cancelados"],
              ValorDeVendasCanceladas: sales["Valor de Vendas Canceladas"],
              Clientes: sales.Clientes,
              VendasPorCliente: sales["Vendas por Cliente"],       
            };
          })[0];
          setSales(restructuredData);
        } else {
          setSales([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };
  
    fetchSales();
  }, []);

  const handleItemClick = (item) => {
    onItemSelected(item);
    setSelectedItem(item.titulo);
  };

  return (
    <div className="min-w-full flex justify-around items-center flex-wrap gap-2 mb-6">
      {info.map((item) => (
        <div key={item.titulo} onClick={() => handleItemClick(item)} className={`w-[150px] md:w-40 lg:w-44 h-24 flex flex-col justify-center shadow-md rounded-lg p-3 ${selectedItem === item.titulo ? 'bg-gray-200' : ''}`}>
          <div className="flex gap-1 xl:gap-2 items-center justify-start">
            <span className="lg:text-lg font-semibold text-left">{item.valor}</span>
          </div>
          <div className="mt-1">
            <span className="text-xs text-neutral-700">{item.titulo}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChartCardVendas({ onItemSelected }) {
    const [selectedItem, setSelectedItem] = useState('Valor Total de Vendas');
    const [sales, setSales] = useState({
        TotalDePedidos: 0,
        ValorTotalDeVendas: 0,
        PedidosValidos: 0,
        ValorDeVendasValidas: 0,
        PedidosCancelados: 0,
        ValorDeVendasCanceladas: 0,
        Clientes: 0,
        VendasPorCliente: 0
    });

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

    // useEffect(() => {
    //   const fetchSales = async () => {
    //     try {
    //       const response = await axios.get("https://erp-mkt.vercel.app/api/statistics/sales");
    //       if (response.data && Array.isArray(response.data.statistics)) {
    //         const restructuredData = response.data.statistics.map((sales) => {
    //           return {
    //             Data: sales.Data,
    //             TotalDePedidos: sales["Total de Pedidos"] || 0,
    //             ValorTotalDeVendas: sales["Valor Total de Vendas"] || 0,
    //             PedidosValidos: sales["Pedidos Válidos"] || 0,
    //             ValorDeVendasValidas: sales["Valor de Vendas Válidas"] || 0,
    //             PedidosCancelados: sales["Pedidos Cancelados"] || 0,
    //             ValorDeVendasCanceladas: sales["Valor de Vendas Canceladas"] || 0,
    //             Clientes: sales.Clientes || 0,
    //             VendasPorCliente: sales["Vendas por Cliente"] || 0
    //           };
    //         })[0];
    //         setSales(restructuredData);
    //       } else {
    //         setSales({
    //           TotalDePedidos: 0,
    //           ValorTotalDeVendas: 0,
    //           PedidosValidos: 0,
    //           ValorDeVendasValidas: 0,
    //           PedidosCancelados: 0,
    //           ValorDeVendasCanceladas: 0,
    //           Clientes: 0,
    //           VendasPorCliente: 0
    //         });
    //       }
    //     } catch (error) {
    //       console.error(`Error: ${error}`);
    //       setSales({
    //         TotalDePedidos: 0,
    //         ValorTotalDeVendas: 0,
    //         PedidosValidos: 0,
    //         ValorDeVendasValidas: 0,
    //         PedidosCancelados: 0,
    //         ValorDeVendasCanceladas: 0,
    //         Clientes: 0,
    //         VendasPorCliente: 0
    //       });
    //     }
    //   };

    //   fetchSales();
    // }, []);

    const handleItemClick = (item) => {
        onItemSelected(item);
        setSelectedItem(item.titulo);
    };

    return (
        <div className="min-w-full flex justify-around items-center flex-wrap gap-2 mb-6">
            {info.map((item) => (
                <div key={item.titulo} onClick={() => handleItemClick(item)} className={`w-[150px] md:w-40 lg:w-44 h-24 flex flex-col justify-cente shadow-md hover:shadow-lg rounded-md hover:rounded-lg p-3 cursor-pointer transition duration-300 ease-in-out ${selectedItem === item.titulo ? 'bg-segundaria-900' : ''}`}>
                    <div className="flex gap-1 xl:gap-2 items-center justify-start ">
                        <span className={`lg:text-lg font-semibold text-left transition duration-300 ease-in-out ${selectedItem === item.titulo ? 'text-gray-200' : ''}`}>{item.valor}</span>
                    </div>
                    <div className="mt-1">
                        <span className={` ${selectedItem === item.titulo ? 'text-gray-200' : ''} text-xs transition duration-300 ease-in-out `}>{item.titulo}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import { useRouter } from 'next/navigation';

export default function VendasRow () {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

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
          });
          setSales(restructuredData);
        } else {
          setLucros([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchSales();
  }, []);


  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={9}/>
    ) : sales.length > 0 ? (
      sales.map((sale, index) => (
      <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
        <td className="pl-6 pr-4 py-4 md:py-5 text-center">{new Date(sale.Data).toLocaleDateString()}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.TotalDePedidos}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.ValorTotalDeVendas}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.PedidosValidos}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.ValorDeVendasValidas}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.PedidosCancelados}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.ValorDeVendasValidas}</td>
        <td className="px-4 py-4 md:py-5 text-center">{sale.Clientes}</td>
        <td className="pl-4 pr-6 py-4 md:py-5 text-center">{sale.VendasPorCliente}</td>
      </tr>
    ))
      ) : (
      <tr>
        <td className="text-center" colSpan="9">
          <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
            <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8">Ei, parece que você não tem relatorios no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};
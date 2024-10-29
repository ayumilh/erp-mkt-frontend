'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import { useRouter } from 'next/navigation';

export default function LucrosRow () {
  const [lucros, setLucros] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLucros = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/statistics/real");
        if (response.data && Array.isArray(response.data.orders)) {
          const restructuredData = response.data.orders.map((lucro) => {
            return {
              Comissao: lucro["Comissão"] || "0", 
              DataPedido: lucro["Data de pedido"],
              DescontoESubsidio: lucro["Desconto e Subsídio"] || "0",
              Loja: lucro["Loja"],
              Lucro: lucro["Lucro"],
              MargemDeLucro: lucro["Margem de Lucro"],
              OutraTaxaDaPlataforma: lucro["Outra Taxa da Plataforma"] || "0", 
              Pedido: lucro["Pedido"],
              Receita: lucro["Receita"],
              ReembolsoDoComprador: lucro["Reembolso do Comprador"] || "", 
              Status: lucro["Status"],
              TaxaDeADS: lucro["Taxa de ADS"] || "0",
              TaxaDeFreteComprador: lucro["Taxa de Frete Comprador"] || null,
              TaxaDeServico: lucro["Taxa de Serviço"] || "",
              TaxaDeTransacao: lucro["Taxa de Transação"] || "",
              TaxaDoFrete: lucro["Taxa do Frete"] || "0",
              ValorDoPedido: lucro["Valor do Pedido"],
              VendasDeProdutos: lucro["Vendas de Produtos"]
            };
          });
          setLucros(restructuredData);
        } else {
          setLucros([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchLucros();
  }, []);


  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={16}/>
    ) : lucros.length > 0 ? (
      lucros.map((lucro, index) => (
        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
          <td className="pr-4 pl-6 py-4 md:py-5 dark:text-gray-200">{new Date(lucro.DataPedido).toLocaleDateString()}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200 lg:sticky" style={{ zIndex: 1, left: 0, backgroundColor: '#F6F6FB' }}>{lucro.Pedido}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200 lg:sticky" style={{ zIndex: 1, left: 'calc(200px)', backgroundColor: '#F6F6FB' }}>{lucro.Loja}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200 lg:sticky" style={{ zIndex: 1, left: 'calc(140px)', backgroundColor: '#F6F6FB' }}>{lucro.ValorDoPedido}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.Receita}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.VendasDeProdutos}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.Comissao}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.TaxaDeTransacao}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.TaxaDeFreteComprador}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.TaxaDeServico}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.TaxaDeADS}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.TaxaDoFrete}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.OutraTaxaDaPlataforma}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.DescontoESubsidio}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.ReembolsoDoComprador}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.MargemDeLucro}</td>
          <td className="pr-6 pl-4 py-4 md:py-5 dark:text-gray-200">{lucro.Status}</td>
          <td className="px-4 py-4 md:py-5 dark:text-gray-200">{lucro.Lucro}</td>
        </tr>
    ))
      ) : (
      <tr>
        <td className="text-center" colSpan="18">
          <div className="w-full py-12">
            <span className='dark:text-gray-200'><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8 mx-10 dark:text-gray-200">Ei, parece que você não tem relatorios no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};
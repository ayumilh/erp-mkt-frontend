import { useEffect, useState } from "react";
import axios from "axios";

const ChartCardsLucros = ({ onItemSelected }) => {
    const [selectedItem, setSelectedItem] = useState('Lucro Total');
    const [lucros, setLucros] = useState([]);

    const info = [
        { titulo: 'Lucro Total', valor: lucros.TaxaDeADS, porcentagem: '6,2%' },
        { titulo: 'Taxa Média de Lucro', valor: lucros.ValorDoPedido, porcentagem: '2,0%' },
        { titulo: 'Qtd. Total do Pedido', valor: lucros.ValorDoPedido, porcentagem: '5,4%' },
        { titulo: 'Receita Total', valor: lucros.Receita, porcentagem: '6,2%' },
        { titulo: 'Custo Total', valor: lucros.custo_total, porcentagem: '-%' },
        { titulo: 'Taxa Total', valor: lucros.TaxaDeADS, porcentagem: '0,3%' },
        { titulo: 'Reembolso Total', valor: lucros.TaxaDoFrete, porcentagem: '-18,8%' },
        { titulo: 'Desconto Total', valor: lucros.DescontoESubsidio, porcentagem: '-4,2%' },
    ];

    // useEffect(() => {
    //   const fetchLucros = async () => {
    //     try {
    //       const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/statistics/real`);
    //       if (response.data && Array.isArray(response.data.orders)) {
    //         const restructuredData = response.data.orders.map((lucro) => {
    //           return {
    //             Comissao: lucro["Comissão"] || "0", 
    //             DataPedido: lucro["Data de pedido"],
    //             DescontoESubsidio: lucro["Desconto e Subsídio"] || "0",
    //             Loja: lucro["Loja"],
    //             Lucro: lucro["Lucro"],
    //             MargemDeLucro: lucro["Margem de Lucro"],
    //             OutraTaxaDaPlataforma: lucro["Outra Taxa da Plataforma"] || "0", 
    //             Pedido: lucro["Pedido"],
    //             Receita: lucro["Receita"],
    //             ReembolsoDoComprador: lucro["Reembolso do Comprador"] || "", 
    //             Status: lucro["Status"],
    //             TaxaDeADS: lucro["Taxa de ADS"] || "0",
    //             TaxaDeFreteComprador: lucro["Taxa de Frete Comprador"] || null,
    //             TaxaDeServico: lucro["Taxa de Serviço"] || "",
    //             TaxaDeTransacao: lucro["Taxa de Transação"] || "",
    //             TaxaDoFrete: lucro["Taxa do Frete"] || "0",
    //             ValorDoPedido: lucro["Valor do Pedido"],
    //             VendasDeProdutos: lucro["Vendas de Produtos"]          
    //           };
    //         })[0];
    //         setLucros(restructuredData);
    //       } else {
    //         setLucros([]);
    //       }
    //     } catch (error) {
    //       console.error(`Error: ${error}`);
    //     }
    //   };

    //   fetchLucros();
    // }, [onItemSelected]);

    useEffect(() => {
        if (lucros.TaxaDeADS) {
            onItemSelected({ titulo: 'Valor Total de Vendas', valor: lucros.TaxaDeADS });
        }
    }, [lucros, onItemSelected]);

    const handleItemClick = (item) => {
        onItemSelected(item);
        setSelectedItem(item.titulo);
    };

    return (
        <div className="min-w-full flex justify-around items-center flex-wrap gap-2 mb-6">
            {info.map((item) => (
                <div key={item.titulo} onClick={() => handleItemClick(item)} className={`w-[150px] md:w-40 lg:w-44 h-24 flex flex-col justify-cente shadow-md hover:shadow-lg rounded-md hover:rounded-lg p-3 cursor-pointer transition duration-300 ease-in-out ${selectedItem === item.titulo ? 'bg-segundaria-900 bg-opacity-85' : ''}`}>
                    <div className="flex gap-1 xl:gap-2 items-center justify-start">
                        <span className={`lg:text-lg font-semibold text-left transition duration-300 dark:text-gray-200 ease-in-out ${selectedItem === item.titulo ? 'text-white' : ''}`}>0</span>
                        <div className="flex justify-start items-center">
                            <span className={`text-sm  dark:text-gray-300 font-medium ${selectedItem === item.titulo ? 'text-white' : ''}`}>{item.porcentagem}</span>
                            {item.porcentagem && item.porcentagem.includes('-') ? (
                                <span className="text-red-500 font-bold text-xs ml-2">↓</span>
                            ) : (
                                <span className="text-green-500 font-bold text-xs md:text-sm ml-2">↑</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-1">
                        <span className={` ${selectedItem === item.titulo ? 'text-white' : ''} text-xs dark:text-gray-300 transition duration-300 ease-in-out `}>{item.titulo}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default ChartCardsLucros;
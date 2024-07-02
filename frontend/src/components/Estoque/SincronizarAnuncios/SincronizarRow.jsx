'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"

export default function SincronizarRow () {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://erp-mkt.vercel.app/api/stock/products");
        if (response.data && Array.isArray(response.data)) {
          const restructuredData = response.data.map((product) => {
            return {
              sku: product.sku, 
              categorias: product.categorias, 
              nome_do_produto: product.nome_do_produto, 
              custo_de_compra: product.custo_de_compra, 
              peso_do_pacote: product.peso_do_pacote, 
              data_de_lancamento: format(new Date(product.data_de_lancamento), 'dd-MM-yyyy HH:mm'),
            };
          });
          setProducts(restructuredData);
        } else {
          console.error('Não foi possível obter os produtos');
          setProducts([]);
        }
      } catch (error) {
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProducts();
  }, []);

  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={7}/>
    ) : products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index} className="cursor-pointer">
          <td className="pl-6 pr-4 py-4 md:py-5 text-center">{product.sku}</td>
          <td className="px-4 py-4 md:py-5 text-">{product.categorias}</td>
          <td className="px-4 py-4 md:py-5 font-medium text-start">{product.nome_do_produto}</td>
          <td className="px-4 py-4 md:py-5 text-center">{product.custo_de_compra}</td>
          <td className="px-4 py-4 md:py-5 text-center">{product.peso_do_pacote}</td>
          <td className="px-4 py-4 md:py-5 text-center">{product.data_de_lancamento}</td>
          <td className="pl-4 pr-6 px-4 py-4 md:py-5 text-center">
            <button className="px-2 py-1 bg-primaria-200 text-white rounded-md">Editar</button>
          </td>
        </tr>
      ))      
    ) : (
      <tr>
        <td className="text-center" colSpan="7">
          <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
            <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8">Ei, parece que você ainda não sincronizou nenhum produto. Sincronize seus produtos e comece a gerenciar seu estoque de maneira eficiente!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};
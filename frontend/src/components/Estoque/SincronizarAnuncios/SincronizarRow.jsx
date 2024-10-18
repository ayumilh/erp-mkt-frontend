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
          <td className="pl-6 pr-4 py-4 md:py-5 text-center dark:text-gray-200">{product.sku}</td>
          <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.categorias}</td>
          <td className="px-4 py-4 md:py-5 font-medium text-start dark:text-gray-200">{product.nome_do_produto}</td>
          <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.custo_de_compra}</td>
          <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.peso_do_pacote}</td>
          <td className="px-4 py-4 md:py-5 text-center dark:text-gray-200">{product.data_de_lancamento}</td>
          <td className="pl-4 pr-6 px-4 py-4 md:py-5 text-center dark:text-gray-200">
            <button className="px-2 py-1 bg-primaria-200 text-white rounded-md">Editar</button>
          </td>
        </tr>
      ))      
    ) : (
      <tr>
        <td className="text-center" colSpan="7">
          <div className="w-full py-12">
            <span><ProductionQuantityLimitsIcon className='dark:text-gray-200' style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8 mx-10 dark:text-gray-200">Ei, parece que você ainda não sincronizou nenhum produto. Sincronize seus produtos e comece a gerenciar seu estoque de maneira eficiente!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};
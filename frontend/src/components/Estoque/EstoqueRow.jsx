'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function EstoqueRow ({ setSku }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/stock/products`);
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


  const openEstoqueDetailsModal = (sku) => {
    const selectedOrder = products.find(p => p.sku === sku);
    setSku(selectedOrder);
  };

  const storeSkuAndOpenEditModal = (event, sku) => {
    event.stopPropagation();
    try {
      Cookies.set('selectedSku', sku);
      router.push('/estoque/editar');
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={4}/>
    ) : products.length > 0 ? (
      products.map((product, index) => (
        <tr key={index} onClick={() => openEstoqueDetailsModal(product.sku)} className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer'>
          <td className="w-40 md:w-52 lg:w-auto pl-6 pr-4 py-4 md:py-5 text-start"><p className="w-40 md:w-52 lg:w-auto font-medium">{product.nome_do_produto}</p></td>
          <td className="px-4 py-4 md:py-5 text-center">{product.sku}</td>
          <td className="px-4 py-4 md:py-5 text-center">{product.custo_de_compra}</td>
          <td className="px-4 py-2 md:py-5 text-center">{product.data_de_lancamento}</td>
          <td className="pl-4 pr-6 py-2 md:py-5 text-center">
            <button
              onClick={(event) => storeSkuAndOpenEditModal(event, product.sku)}
              className="flex items-center justify-center"
            >
              <EditIcon className="mr-1 h-4 md:h-5 w-4 md:w-5"/>
            </button>     
          </td>
        </tr>
    ))
      ) : (
      <tr>
        <td className="text-center" colSpan="4">
          <div className="w-full py-12">
            <span><ProductionQuantityLimitsIcon className='dark:text-gray-200' style={{ width: 46, height: 46 }}/></span>
            <p className="mt-8 mx-10 dark:text-gray-200">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
          </div>
        </td>
      </tr>
    )}
  </>);
};
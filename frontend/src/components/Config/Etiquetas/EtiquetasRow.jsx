'use client'
import React, { useEffect, useState } from 'react';
import SettingsIcon from "@mui/icons-material/Settings";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"

export default function EstoqueRow() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = [
                    {
                        metodo: '[Mercado BR] Mercado Envíos Flex',
                        tipo_de_etiqueta: 'Etiqueta Padrão',
                        tamanho: '10 x 15',
                        opcao_de_entrega: 'Entrega Rápida',
                        horarios_de_envio: 'Seg-Sex 9h-18h',
                    },
                    {
                        metodo: '[Mercado BR] Mercado Envíos Coleta',
                        tipo_de_etiqueta: 'Etiqueta Simples',
                        tamanho: '10 x 15',
                        opcao_de_entrega: 'Entrega Normal',
                        horarios_de_envio: 'Seg-Sex 9h-18h',
                    }
                ];
                if (response && Array.isArray(response)) {
                    const restructuredData = response.map((product) => {
                        return {
                            metodo: product.metodo,
                            tipo_de_etiqueta: product.tipo_de_etiqueta,
                            tamanho: product.tamanho,
                            opcao_de_entrega: product.opcao_de_entrega,
                            horarios_de_envio: product.horarios_de_envio
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
            <SkeletonLoader numColumns={7} />
        ) : products.length > 0 ? (
            products.map((product, index) => (
                <tr key={index} className='border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer'>
                    <td className="pl-6 pr-4 py-4 md:py-5 dark:text-gray-200">{product.metodo}</td>
                    <td className="px-4 py-4 md:py-5 text-start dark:text-gray-200">{product.tipo_de_etiqueta}</td>
                    <td className="px-4 py-2 md:py-5 text-end dark:text-gray-200">{product.tamanho}</td>
                    <td className="px-4 py-2 md:py-5 text-center dark:text-gray-200">{product.opcao_de_entrega}</td>
                    <td className="px-4 py-2 md:py-5 text-center dark:text-gray-200">{product.horarios_de_envio}</td>
                    <td className="px-4 py-2 md:py-5 text-center dark:text-gray-200">Filtro de Envio</td>
                    <td className="pl-4 pr-6 py-2 md:py-5 text-center">
                        <button
                            className="flex items-center justify-center"
                        >
                            <SettingsIcon fontSize='small' className='text-neutral-700 dark:text-gray-300 hover:text-segundaria-900 dark:hover:text-segundaria-900 transition duration-700 ease-in-out' />
                        </button>
                    </td>
                </tr>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="7">
                    <div className="w-full py-12">
                        <span><ProductionQuantityLimitsIcon className='dark:text-gray-200' style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8 mx-10 dark:text-gray-200">Ei, parece que seu estoque está vazio no momento. Estamos ansiosos para ver o que você tem para oferecer!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};
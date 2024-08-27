'use client'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ChartPie from './ChartPie';

export const DashboardResumoVendas = () => {
    const [data, setData] = useState([]);

    const handleButtonClick = async () => {
        try {
            await axios.post('https://erp-mkt.vercel.app/api/mercadolivre/item-visits');
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    };

    useEffect(() => {
        handleButtonClick();
        const fetchData = async () => {
            try {
                const response = await axios.get('https://erp-mkt.vercel.app/api/mercadolivre/visits');
                const restructuredData = response.data.visits.map((data) => {
                    return {
                        conversion_rate: data.conversion_rate,
                        total_visits: data.total_visits,
                    };
                });
                setData(restructuredData);
            } catch (error) {
                console.error(`Error: ${error}`);
            }
        };
        fetchData();
    }, []);


    const firstElement = data.length > 0 ? data[0] : { conversion_rate: 0, total_visits: 0 };

    return (
        <div className='bg-primaria-900 flex flex-col lg:flex-row shadow-lg border border-slate-100 rounded-2xl max-w-[373px] md:max-w-[688px] lg:max-w-[876px] xl:min-w-[1270px] lg:mx-0 min-h-max px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 mx-2 xs:mx-auto'>
            <div className='w-1/2 flex flex-wrap lg:flex-nowrap items-center'>
                <div className='full h-full'>
                    <h3 className='text-sm font-semibold text-neutral-700'>Pedidos de venda</h3>
                    <div className='w-full flex flex-col'>
                        <div className='w-full py-2 flex items-center'>
                            <div className='w-3 h-3 bg-blue-500 shadow-md rounded-full mr-2'></div>
                            <div className='py-2 flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600'>Total de Vendas</span>
                                <span className='w-10 font-medium text-neutral-600'>100</span>
                            </div>
                        </div>
                        <div className='w-full py-2 flex items-center'>
                            <div className='w-3 h-3 bg-green-500 shadow-md rounded-full mr-2'></div>
                            <div className='flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600'>Novos</span>
                                <span className='w-10 font-medium text-neutral-600'>25</span>
                            </div>
                        </div>
                        <div className='w-full py-2 flex items-center'>
                            <div className='w-3 h-3 bg-yellow-500 shadow-md rounded-full mr-2'></div>
                            <div className='flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600'>Em Andamento</span>
                                <span className='w-10 font-medium text-neutral-600'>50</span>
                            </div>
                        </div>
                        <div className='w-full py-2 flex items-center'>
                            <div className='w-3 h-3 bg-red-500 shadow-md rounded-full mr-2'></div>
                            <div className='flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600'>Cancelados</span>
                                <span className='w-10 font-medium text-neutral-600'>25</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full'>
                    <ChartPie />
                </div>
            </div>

            <hr className='w-1 h-full rounded-full bg-gray-200 mx-4' />

            <div className='w-1/2 flex flex-wrap'>
                <div className='w-full flex gap-4'>
                    <div className='w-1/2 px-4 py-2'>
                        <div className='flex gap-2 mb-2'>
                            <span className='text-green-500 font-semibold text-sm'>0</span>
                            <span className='text-neutral-600 font-semibold text-sm'>Contas a receber</span>
                        </div>
                        <div className='w-full flex justify-between py-1'>
                            <span className='w-2/3 text-neutral-500 font-medium text-sm'>Total</span>
                            <span className='w-1/3 text-neutral-500 font-medium text-sm'>0</span>
                        </div>
                        <div className='w-full flex justify-between py-1'>
                            <span className='w-2/3 text-neutral-500 font-medium text-sm'>Taxas</span>
                            <span className='w-1/3 text-neutral-500 font-medium text-sm'>0</span>
                        </div>

                        <hr className='w-48 border border-gray-200 my-4' />

                        <div className='w-full flex justify-between'>
                            <span className='w-2/3 text-green-500 text-sm'>Liquido</span>
                            <span className='w-1/3 text-neutral-600 font-medium text-sm'>0</span>
                        </div>
                    </div>
                    <div className='w-1/2 h-full flex-col p-3 gap-4'>
                        <div className='h-1/2'>
                            <div className='flex gap-2 mb-2'>
                                <span className='text-red-500 font-semibold text-sm'>0</span>
                                <span className='text-neutral-600 font-semibold text-sm'>Contas a pagar</span>
                            </div>
                            <div className='w-full flex justify-between py-1'>
                                <span className='w-2/3 text-neutral-500 font-medium text-sm'>Valor Total a pagar</span>
                                <span className='w-1/3 text-neutral-500 font-medium text-sm'>0</span>
                            </div>
                        </div>
                        <div className='h-1/2'>
                            <div className='flex gap-2 mb-2'>
                                <span className='text-neutral-600 font-semibold text-sm'>Notas fiscais</span>
                            </div>
                            <div className='w-full py-1'>
                                <span className='w-2/3 text-green-500 font-medium text-sm mr-3'>0</span>
                                <span className='w-1/3 text-neutral-500 font-medium text-sm'>Novas NF-es</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

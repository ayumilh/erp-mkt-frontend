'use client'
import { useEffect, useState, useCallback } from 'react';
import dynamic from "next/dynamic";
import axios from 'axios';
import { searchUserId } from '@/utils/searchUserId';
import { IconButton } from "@mui/material"
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ChartPie2 = dynamic(() => import('./ChartPie2'), { ssr: false });

export const DashboardResumoVendas = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState([]);
    const userId = searchUserId();

    const handleButtonClick = useCallback(async () => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/item-visits`, {
                userId: userId
            });
        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;
        handleButtonClick();
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/visits`, {
                    params: { userId }
                });
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
    }, [userId, handleButtonClick]);


    const handleClickShowPassword = () => (
        setShowPassword(!showPassword)
    )

    const firstElement = data.length > 0 ? data[0] : { conversion_rate: 0, total_visits: 0 };

    return (
        <div className='w-full bg-primaria-900 dark:bg-dark-primaria-900 flex flex-col xl:flex-row gap-7 xl:gap-0 shadow-lg border border-slate-100 dark:border-neutral-800 rounded-2xl lg:mx-0 min-h-max px-4 lg:px-5 xl:px-8 py-5 xl:py-7 mb-7 mt-7 mx-2'>
            <div className='w-full xl:w-1/2 h-full lg:h-auto flex px-4'>
                <div className='w-full h-full'>
                    <h3 className='text-sm font-semibold text-neutral-700 dark:text-gray-300'>Pedidos de venda</h3>
                    <div className='w-full lg:w-96 xl:w-full flex flex-col mt-2'>
                        <div className='w-full py-1 flex items-center'>
                            <div className='w-3 h-3 bg-blue-500 shadow-md rounded-full mr-2'></div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600 dark:text-gray-200'>Total de Vendas</span>
                                <span className='w-10 font-medium text-end text-neutral-600 dark:text-gray-200'>100</span>
                            </div>
                        </div>

                        <div className='w-full py-1 flex items-center'>     {/* novos */}
                            <div className='w-3 h-3 bg-green-500 shadow-md rounded-full mr-2'></div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600 dark:text-gray-200'>Novos</span>
                                <span className='w-10 font-medium text-end text-neutral-600 dark:text-gray-200'>25</span>
                            </div>
                        </div>
                        <div className='w-full py-1 flex items-center'>
                            <div className='w-3 h-3 bg-yellow-500 shadow-md rounded-full mr-2'></div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600 dark:text-gray-200'>Em Andamento</span>
                                <span className='w-10 font-medium text-end text-neutral-600 dark:text-gray-200'>50</span>
                            </div>
                        </div>
                        <div className='w-full py-1 flex items-center'>
                            <div className='w-3 h-3 bg-red-500 shadow-md rounded-full mr-2'></div>
                            <div className='w-full flex justify-between items-center'>
                                <span className='w-36 font-medium text-neutral-600 dark:text-gray-200'>Cancelados</span>
                                <span className='w-10 font-medium text-end text-neutral-600 dark:text-gray-200'>25</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-[700px] lg:w-[780px] xl:w-[900px] h-full mt-4 hidden md:flex relative bottom-8 left-10'>
                    <ChartPie2 />
                </div>
            </div>

            <hr className='w-1 h-full rounded-full bg-gray-200 mx-4 hidden xl:block' />

            <div className='w-full xl:w-1/2 flex'>
                <div className='w-full flex flex-col'>
                    <div className="relative flex items-center justify-end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <Visibility className='dark:text-gray-200 text-neutral-700' /> : <VisibilityOff className='dark:text-gray-200 text-neutral-700' />}
                        </IconButton>
                    </div>

                    <div className='flex flex-col md:flex-row justify-around gap-4'>
                        {/* conta a receber */}
                        <div className='w-full xl:w-64 px-4 py-2 flex flex-col items-center text-center'>
                            <div className='w-full flex gap-2'>
                                <span className='text-green-500 font-semibold text-sm'>0</span>
                                <span className='text-neutral-600 dark:text-gray-200 font-semibold text-sm'>Contas a receber</span>
                            </div>
                            <div className='w-full flex justify-between pt-2 pb-1'>
                                <span className='w-2/3 text-neutral-500 dark:text-gray-300 font-medium text-start text-sm'>Total</span>
                                <span className='w-1/3 text-neutral-500 dark:text-gray-300 font-medium text-end text-sm'>{showPassword ? '0' : '****'}</span>
                            </div>
                            <div className='w-full flex justify-between py-1'>
                                <span className='w-2/3 text-neutral-500 dark:text-gray-300 font-medium text-start text-sm'>Taxas</span>
                                <span className='w-1/3 text-neutral-500 dark:text-gray-300 font-medium text-end text-sm'>{showPassword ? '0' : '****'}</span>
                            </div>

                            <hr className='w-full border border-gray-200 my-2' />

                            <div className='w-full flex justify-between'>
                                <span className='w-2/3 text-green-500 text-start text-sm'>Liquido</span>
                                <span className='w-1/3 text-neutral-600 dark:text-gray-200 font-medium text-end text-sm'>{showPassword ? '0' : '****'}</span>
                            </div>
                        </div>
                        {/* conta a pagar */}
                        <div className='w-full xl:w-64 h-full px-4 py-2 flex flex-col items-center text-center'>
                            <div className='w-full h-1/2'>
                                <div className='flex gap-2'>
                                    <span className='text-red-500 font-semibold text-sm'>0</span>
                                    <span className='text-neutral-600 dark:text-gray-200 font-semibold text-sm'>Contas a pagar</span>
                                </div>
                                <div className='w-full flex justify-between pt-2'>
                                    <span className='w-2/3 text-neutral-500 dark:text-gray-300 font-medium text-start text-sm'>Valor Total a pagar</span>
                                    <span className='w-1/3 text-neutral-500 dark:text-gray-300 font-medium text-end text-sm'>{showPassword ? '0' : '****'}</span>
                                </div>
                            </div>

                            <hr className='w-full border border-gray-100 mt-2 mb-2 xl:mt-4 xl:mb-4' />

                            <div className='w-full h-1/2'>
                                <div className='flex'>
                                    <span className='text-neutral-600 dark:text-gray-200 font-semibold text-sm'>Notas fiscais</span>
                                </div>
                                <div className='w-full text-start py-1'>
                                    <span className='w-2/3 text-green-500 font-medium text-sm mr-3'>0</span>
                                    <span className='w-1/3 text-neutral-500 dark:text-gray-300 font-medium text-sm'>Novas NF-es</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

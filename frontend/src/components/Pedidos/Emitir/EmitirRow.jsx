'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { searchUserId } from '@/utils/searchUserId';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import { FaMapMarkerAlt } from 'react-icons/fa';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function EmitirRow({ setOrder, setToggleShowCheckboxes, toggleShowCheckboxesAll, setShippingIdOrder }) {
    const [pedido, setPedido] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupOrdersProducts, setGroupOrdersProducts] = useState([]);
    const [isOpen, setIsOpen] = useState({});
    const [selectedOrders, setSelectedOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const userId = searchUserId();
            if (!userId) return;

            try {
                const response = await axios.get(`https://erp-mkt.vercel.app/api/mercadolivre/issue`, {
                    params: { userId }
                });
                if (response.data && Array.isArray(response.data.orders)) {
                    const groupedOrderByShippingId = response.data.orders.reduce((groupedOrderByShippingId, order) => {
                        if (order.shipping_id !== null) {
                            if (!groupedOrderByShippingId[order.shipping_id]) {
                                groupedOrderByShippingId[order.shipping_id] = [];
                            }
                            groupedOrderByShippingId[order.shipping_id].push(order);
                        }
                        return groupedOrderByShippingId;
                    }, {});
                    setGroupOrdersProducts(groupedOrderByShippingId)
                    setPedido(response.data.orders);
                } else {
                    setPedido([]);
                }
            } catch (error) {
                setPedido([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, []);


    const shippingIdCounts = {};
    pedido.forEach(pedido => {
        if (shippingIdCounts[pedido.shipping_id]) {
            shippingIdCounts[pedido.shipping_id]++;
        } else {
            shippingIdCounts[pedido.shipping_id] = 1;
        }
    });

    // checkbox
    useEffect(() => {
        if (toggleShowCheckboxesAll) {
            const allOrderIds = pedido.map(order => order.shipping_id);
            setShippingIdOrder(allOrderIds);
        }
    }, [toggleShowCheckboxesAll, pedido, setShippingIdOrder]);

    const updateSelectedOrders = (isChecked, orders) => {
        let updatedSelectedOrders;

        if (isChecked) {
            updatedSelectedOrders = [...selectedOrders, orders];
        } else {
            updatedSelectedOrders = selectedOrders.filter(o => o !== orders);
        }

        setSelectedOrders(updatedSelectedOrders);
        setToggleShowCheckboxes(updatedSelectedOrders.length > 0);
    };

    const updateShippingIdOrder = (isChecked, orders) => {
        let orderArray = Array.isArray(orders) ? orders : [orders];
        const orderIds = orderArray.map(order => order.order_id);

        if (toggleShowCheckboxesAll || isChecked) {
            setShippingIdOrder(prevItems => [...prevItems, orderIds]);
        } else {
            setShippingIdOrder(prevItems => prevItems.filter(i => !i.includes(orderIds[0])));
        }
    };

    const handleCheckboxChange = (event, orders) => {
        event.stopPropagation();
        const isChecked = event.target.checked;

        updateSelectedOrders(isChecked, orders);
        updateShippingIdOrder(isChecked, orders);
    };


    // modal da tr
    const openOrderDetailsModal = (shipping_id, allOrders = false) => {
        if (allOrders) {
            const selectedOrders = pedido.filter(p => p.shipping_id === shipping_id);
            setOrder(selectedOrders);
        } else {
            const selectedOrder = pedido.find(p => p.shipping_id === shipping_id);
            setOrder(selectedOrder);
        }
    };

    const dropdownGroupOrderRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownGroupOrderRef.current && !dropdownGroupOrderRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }

    }, [dropdownGroupOrderRef]);


    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const menuMoreVertRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuMoreVertRef.current && !menuMoreVertRef.current.contains(event.target)) {
                setIsOpenMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [menuMoreVertRef])


    const getStatusColor = (status) => {
        switch (status) {
            case 'ready_to_ship':
                return 'bg-orange-200 text-orange-700';
            default:
                return 'bg-orange-200 text-orange-700';
        }
    }

    const translateStatus = (status) => {
        switch (status) {
            case 'ready_to_ship':
                return 'Emitir';
            default:
                return status;
        }
    }

    function translateTrackingMethod(method) {
        switch (method) {
            case 'MEL Distribution':
                return 'Agências MEL';
            case 'VAJU6732707 Super Express':
                return 'Flex';
            default:
                return method;
        }
    }

    const firstRender = [];
    return (<>
        {isLoading ? (
            <SkeletonLoader numColumns={9} />
        ) : pedido.length > 0 ? (
            Object.entries(groupOrdersProducts).map(([shipping_id, orders], groupIndex) => (
                <React.Fragment key={shipping_id}>
                    <tr className='group-header'>
                        <td colSpan={9} className="px-4 py-2 text-center bg-gray-100 dark:bg-neutral-800 dark:text-neutral-800 border-t border-gray-200 dark:border-neutral-800">
                            <div className='text-sm font-medium'>
                                <span className='text-zinc-600 dark:text-gray-200 text-xs font-semibold'>ID da compra: {shipping_id}</span>
                                <span className='text-zinc-600 dark:text-gray-200 text-xs font-semibold'> - {orders[0].seller_nickname}</span>
                            </div>
                        </td>
                    </tr>
                    {orders.map((pedido, index) => {
                        if (shippingIdCounts[pedido.shipping_id] > 1) {
                            if (!firstRender[pedido.shipping_id]) {
                                firstRender[pedido.shipping_id] = true;
                                return (
                                    <tr
                                        key={pedido.order_id}
                                        className='border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800'
                                    >
                                        <td className="pl-4">
                                            {!toggleShowCheckboxesAll && (
                                                <input
                                                    type="checkbox"
                                                    onClick={() => setToggleShowCheckboxes(true)}
                                                    onChange={(event) => { handleCheckboxChange(event, orders) }}
                                                />
                                            )}
                                            {toggleShowCheckboxesAll && (
                                                <input type="checkbox" checked={true} onChange={() => { }} />
                                            )}
                                        </td>
                                        <td className='pl-4 lg:pl-6 pr-3 py-4 md:py-5 align-top'>
                                            {groupOrdersProducts[pedido.shipping_id] && groupOrdersProducts[pedido.shipping_id].map((order, index) => (
                                                <div key={index} className="text-left flex items-center justify-center gap-4 mb-4">
                                                    <div className='w-10 h-10'>{order.pictureurls && <Image src={order.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10 object-cover" />}</div>
                                                    <div className='flex flex-col'>
                                                        <button
                                                            className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
                                                            onClick={() => openOrderDetailsModal(pedido.shipping_id, true)}
                                                        >
                                                            {pedido.product_sku}
                                                        </button>
                                                        <span className='text-neutral-700 dark:text-gray-300 text-sm font-medium'>R${order.unit_price}</span>
                                                        <div className='text-neutral-700 dark:text-gray-300 text-xs font-medium'>cor: {order.color_name}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-3 py-3 md:py-4 text-neutral-800 dark:text-gray-300 font-medium text-center whitespace-nowrap align-top"> x {pedido.quantity}</td>
                                        <td className="px-3 py-4 md:py-5 dark:text-gray-300 text-sm font-medium text-center align-top">R${pedido.total_paid_amount}</td>
                                        <td className="px-3 py-3 md:py-4 flex flex-col gap-1 align-top">
                                            <span className='text-neutral-700 dark:text-gray-200 font-medium text-sm'>{pedido.buyer_nickname}</span>
                                            <span className='text-neutral-60 dark:text-gray-300 font-medium text-xs items-center flex gap-1'><FaMapMarkerAlt style={{ fontSize: '12px' }} className='text-blue-500' /> {`${pedido.city}, ${pedido.state}`}</span>
                                        </td>
                                        <td className="px-3 py-3 md:py-4 text-sm font-medium text-start align-top">
                                            <span className='text-emerald-500 text-sm'>Pago</span><br />
                                            <span className='whitespace-nowrap font-medium text-neutral-600 dark:text-gray-200'>{new Date(pedido.date_last_modified).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span><br />
                                            <span className='text-amber-500 font-medium text-sm'>Saída</span><br />
                                            <span className='whitespace-nowrap font-medium text-neutral-600 dark:text-gray-200'>{new Date(pedido.date_created).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                        </td>
                                        <td className="px-3 py-3 md:py-4 dark:text-gray-200 text-sm font-medium text-center align-top">{translateTrackingMethod(pedido.tracking_method)}</td>
                                        <td className="pl-3 pr-4 py-3 md:py-4 dark:text-gray-200 text-sm font-medium text-center align-top">
                                            <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2 text-sm`}>
                                                {translateStatus(pedido.status)}
                                            </span>
                                        </td>
                                        <td className="flex pl-4 pr-6 py-2 md:py-5 justify-center gap-3">
                                            <button
                                                onClick={() => openOrderDetailsModal(pedido.shipping_id, true)}
                                                className="flex text-center items-center justify-center active:bg-gray-200 dark:active:bg-neutral-700 bg-opacity-80 rounded-full p-2"
                                            >
                                                <MoreVertIcon
                                                    className='text-neutral-600 dark:text-gray-200 hover:text-black transition duration-500 ease-in-out'
                                                    fontSize="small"
                                                    sx={{
                                                        transform: isOpenMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                                                        transition: 'transform 0.3s ease-in-out'
                                                    }} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                        } else {
                            return (
                                <tr
                                    key={pedido.order_id}
                                    className='border-b border-gray-200 dark:border-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-800'
                                >
                                    <td className="pl-4">
                                        {!toggleShowCheckboxesAll && (
                                            <input
                                                type="checkbox"
                                                onClick={() => setToggleShowCheckboxes(true)}
                                                onChange={(event) => { handleCheckboxChange(event, pedido) }} />
                                        )}
                                        {toggleShowCheckboxesAll && (
                                            <input type="checkbox" checked={true} onChange={() => { }} />
                                        )}
                                    </td>
                                    <td className='pl-4 pr-3 py-4 md:py-5 align-top'>
                                        <div className="text-left flex items-center justify-center gap-4 mb-4">
                                            <div className='w-10 h-10'>{pedido.pictureurls && <Image src={pedido.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10 object-cover" />}</div>
                                            <div className='flex flex-col'>
                                                <button
                                                    className="text-blue-600 text-sm font-medium hover:underline focus:outline-none cursor-pointer"
                                                    onClick={() => openOrderDetailsModal(pedido.shipping_id, true)}
                                                >
                                                    {pedido.product_sku}
                                                </button>
                                                <span className='text-neutral-700 dark:text-gray-300 text-sm font-medium'>R${pedido.unit_price}</span>
                                                <div className='text-neutral-700 dark:text-gray-300 text-xs font-medium'>cor: {pedido.color_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 text-neutral-800 dark:text-gray-300 font-medium text-center whitespace-nowrap align-top"> x {pedido.quantity}</td>
                                    <td className="px-3 py-3 md:py-4 dark:text-gray-300 text-sm font-medium text-center align-top">{pedido.total_amount}</td>
                                    <td className="px-3 py-3 md:py-4 flex flex-col gap-1 align-top">
                                        <span className='text-neutral-700 dark:text-gray-200 font-medium text-sm flex items-center'>
                                            {pedido.buyer_nickname}
                                        </span>
                                        <span className='text-neutral-600 dark:text-gray-300 font-medium text-xs flex items-center gap-1'>
                                            <FaMapMarkerAlt style={{ fontSize: '12px' }} className='text-blue-500' />
                                            {`${pedido.city}, ${pedido.state}`}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 text-sm font-medium text-start align-top">
                                        <span className='text-emerald-500 text-sm'>Pago</span><br />
                                        <span className='whitespace-nowrap font-medium text-neutral-600 dark:text-gray-200'>{new Date(pedido.date_last_modified).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span><br />
                                        <span className='text-amber-500 font-medium text-sm'>Saída</span><br />
                                        <span className='whitespace-nowrap font-medium text-neutral-600 dark:text-gray-200'>{new Date(pedido.date_created).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 dark:text-gray-200 text-sm font-medium text-center align-top">{translateTrackingMethod(pedido.tracking_method)}</td>
                                    <td className="pl-3 pr-4 py-3 md:py-4  text-sm font-medium text-center align-top">
                                        <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2 text-sm`}>{translateStatus(pedido.status)}</span>
                                    </td>
                                    <td className="flex pl-4 pr-6 py-2 md:py-5 justify-center gap-3">
                                        <button
                                            onClick={() => openOrderDetailsModal(pedido.shipping_id, true)}
                                            className="flex text-center items-center justify-center active:bg-gray-200 dark:active:bg-neutral-700 bg-opacity-80 rounded-full p-2"
                                        >
                                            <MoreVertIcon
                                                className='text-neutral-600 dark:text-gray-200 hover:text-black transition duration-500 ease-in-out'
                                                fontSize="small"
                                                sx={{
                                                    transform: isOpenMenu ? 'rotate(90deg)' : 'rotate(0deg)',
                                                    transition: 'transform 0.3s ease-in-out'
                                                }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </React.Fragment>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="9">
                    <div className="w-full py-12">
                        <span><ProductionQuantityLimitsIcon className='dark:text-gray-200' style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8 mx-10 dark:text-gray-200">Uh-oh! Parece que não há pedidos, estamos ansiosos para apoiar suas próximas vendas!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};
'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import { FaMapMarkerAlt } from 'react-icons/fa';

export default function EmitirRow({ setOrder, toggleShowCheckboxes, toggleShowCheckboxesAll, setShippingIdOrder }) {
    const [pedido, setPedido] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [groupOrdersProducts, setGroupOrdersProducts] = useState([]);
    const [isOpen, setIsOpen] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`https://erp-mkt.vercel.app/api/mercadolivre/issue`);
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
            const allOrderIds = pedido.map(order => order.order_id);
            setShippingIdOrder(allOrderIds);
        }
    }, [toggleShowCheckboxesAll, pedido, setShippingIdOrder]);

    const handleCheckboxChange = (event, orders) => {
        event.stopPropagation();
        let orderArray = Array.isArray(orders) ? orders : [orders];
        const orderIds = orderArray.map(order => order.order_id);
        if (toggleShowCheckboxesAll || event.target.checked) {
            setShippingIdOrder(prevItems => [...prevItems, orderIds]);
        } else {
            setShippingIdOrder(prevItems => prevItems.filter(i => !i.includes(orderIds[0])));
        }
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


    const getStatusColor = (status) => {
        switch (status) {
            case 'ready_to_ship':
                return 'bg-blue-200 text-blue-700';
            default:
                return '';
        }
    }

    const translateStatus = (status) => {
        switch (status) {
            case 'ready_to_ship':
                return 'Emitir';
            default:
                return 'Emitir';
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
            <SkeletonLoader numColumns={8} />
        ) : pedido.length > 0 ? (
            Object.entries(groupOrdersProducts).map(([shipping_id, orders], groupIndex) => (
                <React.Fragment key={shipping_id}>
                    <tr className='group-header'>
                        <td colSpan={8} className="px-4 py-2 text-center bg-gray-100 border-t border-gray-200">
                            <div className='text-sm font-medium'>
                                <span className='text-zinc-600 text-xs font-semibold'>ID da compra: {shipping_id}</span>
                                <span className='text-zinc-600 text-xs font-semibold'> - {orders[0].seller_nickname}</span>
                            </div>
                        </td>
                    </tr>
                    {orders.map((pedido, index) => {
                        if (shippingIdCounts[pedido.shipping_id] > 1) {
                            if (!firstRender[pedido.shipping_id]) {
                                firstRender[pedido.shipping_id] = true;
                                return (
                                    <tr key={pedido.order_id} className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer' onClick={() => openOrderDetailsModal(shipping_id, true)}>
                                        {toggleShowCheckboxes && <td className="pl-4"><input type="checkbox" onChange={(event) => { handleCheckboxChange(event, orders) }} /></td>}
                                        {toggleShowCheckboxesAll && <td className="pl-4"><input type="checkbox" checked={true} onChange={() => { }} /></td>}
                                        <td className='pl-4 lg:pl-6 pr-3 py-4 md:py-5 align-top'>
                                            {groupOrdersProducts[pedido.shipping_id] && groupOrdersProducts[pedido.shipping_id].map((order, index) => (
                                                <div key={index} className="text-left flex items-center justify-center gap-4 mb-4">
                                                    <div className='w-10 h-10'>{order.pictureurls && <Image src={order.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10 object-cover" />}</div>
                                                    <div className='flex flex-col'>
                                                        <span className="text-blue-600 text-sm hover:underline font-medium transition duration-300 ease-out">{order.product_sku}</span>
                                                        <span className='text-neutral-700 text-sm font-medium'>R${order.unit_price}</span>
                                                        <div className='text-neutral-700 text-xs font-medium'>cor: {order.color_name}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-3 py-3 md:py-4 text-neutral-800 font-medium text-center whitespace-nowrap align-top"> x {pedido.quantity}</td>
                                        <td className="px-3 py-4 md:py-5 text-sm font-medium text-center align-top">R${pedido.total_paid_amount}</td>
                                        <td className="px-3 py-3 md:py-4 flex flex-col gap-1 align-top">
                                            <span className='text-neutral-700 font-medium text-sm'>{pedido.buyer_nickname}</span>
                                            <span className='text-neutral-600 font-medium text-xs items-center flex gap-1'><FaMapMarkerAlt style={{ fontSize: '12px' }} className='text-blue-500' /> {`${pedido.city}, ${pedido.state}`}</span>
                                        </td>
                                        <td className="px-3 py-3 md:py-4 text-sm font-medium text-start align-top">
                                            <span className='text-emerald-500 text-sm'>Pago</span><br />
                                            <span className='whitespace-nowrap font-medium text-neutral-600'>{new Date(pedido.date_last_modified).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span><br />
                                            <span className='text-amber-500 font-medium text-sm'>Saída</span><br />
                                            <span className='whitespace-nowrap font-medium text-neutral-600'>{new Date(pedido.date_created).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                        </td>
                                        <td className="px-3 py-3 md:py-4 text-sm font-medium text-center align-top">{translateTrackingMethod(pedido.tracking_method)}</td>
                                        <td className="pl-3 pr-4 py-3 md:py-4 text-sm font-medium text-center align-top">
                                            <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2`}>
                                                {translateStatus(pedido.status)}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            }
                        } else {
                            return (
                                <tr key={pedido.order_id} className='cursor-pointer' onClick={() => openOrderDetailsModal(pedido.shipping_id)}>
                                    {toggleShowCheckboxes && <td className="pl-4"><input type="checkbox" onChange={(event) => handleCheckboxChange(event, pedido)} /></td>}
                                    {toggleShowCheckboxesAll && <td className="pl-4"><input type="checkbox" checked={true} onChange={() => { }} /></td>}
                                    <td className='pl-4 lg:pl-6 pr-3 py-4 md:py-5 align-top'>
                                        <div className="text-left flex items-center justify-center gap-4 mb-4">
                                            <div className='w-10 h-10'>{pedido.pictureurls && <Image src={pedido.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10 object-cover" />}</div>
                                            <div className='flex flex-col'>
                                                <span className="text-blue-600 text-sm hover:underline font-medium transition duration-300 ease-out">{pedido.product_sku}</span>
                                                <span className='text-neutral-700 text-sm font-medium'>R${pedido.unit_price}</span>
                                                <div className='text-neutral-700 text-xs font-medium'>cor: {pedido.color_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 text-neutral-800 font-medium text-center whitespace-nowrap align-top"> x {pedido.quantity}</td>
                                    <td className="px-3 py-3 md:py-4 text-sm font-medium text-center align-top">{pedido.total_amount}</td>
                                    <td className="px-3 py-3 md:py-4 flex flex-col gap-1 align-top">
                                        <span className='text-neutral-700 font-medium text-sm flex items-center'>
                                            {pedido.buyer_nickname}
                                        </span>
                                        <span className='text-neutral-600 font-medium text-xs flex items-center gap-1'>
                                            <FaMapMarkerAlt style={{ fontSize: '12px' }} className='text-blue-500' />
                                            {`${pedido.city}, ${pedido.state}`}
                                        </span>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 text-sm font-medium text-start align-top">
                                        <span className='text-emerald-500 text-sm'>Pago</span><br />
                                        <span className='whitespace-nowrap font-medium text-neutral-600'>{new Date(pedido.date_last_modified).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span><br />
                                        <span className='text-amber-500 font-medium text-sm'>Saída</span><br />
                                        <span className='whitespace-nowrap font-medium text-neutral-600'>{new Date(pedido.date_created).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' })}</span>
                                    </td>
                                    <td className="px-3 py-3 md:py-4 text-sm font-medium text-center align-top">{translateTrackingMethod(pedido.tracking_method)}</td>
                                    <td className="pl-3 pr-4 py-3 md:py-4 text-sm font-medium text-center align-top">
                                        <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2`}>{translateStatus(pedido.status)}</span>
                                    </td>
                                </tr>
                            )
                        }
                    })}
                </React.Fragment>
            ))
        ) : (
            <tr>
                <td className="text-center" colSpan="7">
                    <div className="w-full py-12">
                        <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }} /></span>
                        <p className="mt-8 mx-10">Uh-oh! Parece que há pedidos, estamos ansiosos para apoiar suas próximas vendas!</p>
                    </div>
                </td>
            </tr>
        )}
    </>);
};
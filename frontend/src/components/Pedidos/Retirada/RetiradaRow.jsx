'use client'
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import axios from 'axios';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SkeletonLoader from "@/components/Geral/SkeletonTableRow"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function RetiradaRow({ setOrder, toggleShowCheckboxes, toggleShowCheckboxesAll, setShippingIdOrder }){
  const [pedido, setPedido] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [groupOrdersProducts, setGroupOrdersProducts] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`https://erp-mkt.vercel.app/api/mercadolivre/printed`);
        console.log(response.data);
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
        console.error(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  
  const handleOpen = (order_id) => setIsOpen(prevState => ({ ...prevState, [order_id]: !prevState[order_id] }));
  const handleSelect = (order) => {
    setSelectedOrder(order);
    setIsOpen(false);
  };
  
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

  const handleCheckboxChange = (event, shipping_id) => {
    event.stopPropagation(); 
    if (toggleShowCheckboxesAll || event.target.checked) {
      setShippingIdOrder(prevItems => [...prevItems, shipping_id]);
    } else {
      setShippingIdOrder(prevItems => prevItems.filter(i => i !== shipping_id));
    }
  };

  
  // modal da tr
  const handleModal = (shipping_id, allOrders = false) => {
    if (allOrders) {
      const selectedOrders = pedido.filter(p => p.shipping_id === shipping_id);
      setOrder(selectedOrders);
    } else {
      const selectedOrder = pedido.find(p => p.shipping_id === shipping_id);
      setOrder(selectedOrder);
    }
  };

  const dropdownGroupOrderRef = useRef(null);
  useEffect(() =>{
    const handleClickOutside = (event) => {
      if(dropdownGroupOrderRef.current && !dropdownGroupOrderRef.current.contains(event.target)){
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
      case 'delivered':
        return 'bg-green-200';
      case 'ready_to_ship':
        return 'bg-blue-200';
      case 'shipped':
        return 'bg-yellow-200';
      case 'cancelled':
        return 'bg-red-200';
      case 'pending':
        return 'bg-red-200';
      default:
        return '';
    }
  }

  const firstRender = [];
  return (<>
    {isLoading ? (
      <SkeletonLoader numColumns={8}/>
    ) : pedido.length > 0 ? (
      Object.entries(groupOrdersProducts).map(([shipping_id, orders], groupIndex) => (
        <React.Fragment key={shipping_id}>
          <tr className='group-header'>
            <td colSpan={9} className="px-4 pt-4 text-center bg-gray-100">
              <span className='text-zinc-600 text-sm font-semibold'>ID da compra: {shipping_id}</span>
            </td>
          </tr>
          {orders.map((pedido, index) => {
            if (shippingIdCounts[pedido.shipping_id] > 1) {
              if(!firstRender[pedido.shipping_id]){
                firstRender[pedido.shipping_id] = true;
                return (
                <tr key={pedido.order_id} className='cursor-pointer' onClick={() => handleModal(shipping_id, true)}>
                  {toggleShowCheckboxes && <td className="pl-4"><input type="checkbox" onChange={(event) => handleCheckboxChange(event, pedido.shipping_id)}/></td>}
                  {toggleShowCheckboxesAll && <td className="pl-4"><input type="checkbox" checked={true} onChange={() => {}}/></td>}
                  <td className="w-16 flex items-center pl-6 py-4 md:py-5">
                    <span>{pedido.pictureurls && <Image src={pedido.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10" />}</span>
                  </td>
                  <td className='w-40 md:w-60 lg:w-64 xl:w-80 pl-3 pr-4 py-2 md:py-5'>
                    <div className="relative w-40 md:w-60 lg:w-64 xl:w-80" ref={dropdownGroupOrderRef}>
                      <button onClick={() => handleOpen(pedido.order_id)} className='text-start'>
                        <KeyboardArrowDownIcon className="h-5 w-5" aria-hidden="true" />
                        <span className='w-40 md:w-60 lg:w-64 xl:w-80 text-sm font-medium text-left'>{pedido ? pedido.reason : 'Selecione'}</span>
                      </button>

                      {isOpen[pedido.order_id] && (
                        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-primaria-900 ring-1 ring-black ring-opacity-5">
                          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                            {groupOrdersProducts[pedido.shipping_id].map((order, index) => (
                              <button
                                key={index}
                                onClick={() => handleSelect(pedido)}
                                className="block w-full text-start px-4 py-2 my-2 text-sm hover:text-black hover:bg-gray-200"
                                role="menuitem"
                              >
                                {order.reason}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.total_amount}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.buyer_nickname}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">
                    {new Date(pedido.date_created).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.tracking_method}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.seller_nickname}</td>
                  <td className="pr-6 pl-4 py-2 md:py-5 text-sm font-medium text-center">
                    <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2`}>{pedido.status}</span>
                  </td>
                </tr>
              );
              }
            }else{
              return (
                <tr key={pedido.order_id} className='cursor-pointer' onClick={() => handleModal(pedido.shipping_id)}>
                  {toggleShowCheckboxes && <td className="pl-4"><input type="checkbox" onChange={(event) => handleCheckboxChange(event, pedido.shipping_id)}/></td>}
                  {toggleShowCheckboxesAll && <td className="pl-4"><input type="checkbox" checked={true} onChange={() => {}}/></td>}
                  <td className="w-16 flex items-center pl-6 py-4 md:py-5">
                    <span>{pedido.pictureurls && <Image src={pedido.pictureurls} alt='Imagem do produto' width='42' height='42' className="w-10 h-10" />}</span>
                  </td>
                  <td className="w-40 md:w-60 lg:w-64 xl:w-80 pl-3 pr-4 py-2 md:py-5 text-start"><p className='w-40 md:w-60 lg:w-64 xl:w-80 text-sm font-medium'>{pedido.reason}</p></td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.total_amount}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.buyer_nickname}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">
                    {new Date(pedido.date_created).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.tracking_method}</td>
                  <td className="px-4 py-2 md:py-5 text-sm font-medium text-center">{pedido.seller_nickname}</td>
                  <td className="pr-6 pl-4 py-2 md:py-5 text-sm font-medium text-center">
                    <span className={`${getStatusColor(pedido.status)} rounded-full px-3 py-2`}>{pedido.status}</span>
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
            <div className="w-52 ml-10 md:ml-0 md:px-10 md:w-full py-12">
              <span><ProductionQuantityLimitsIcon style={{ width: 46, height: 46 }}/></span>
              <p className="mt-8">Uh-oh! Parece que há pedidos, estamos ansiosos para apoiar suas próximas vendas!</p>
            </div>
          </td>
        </tr>
    )}
  </>);
};
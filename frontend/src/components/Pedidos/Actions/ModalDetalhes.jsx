'use client'
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaListAlt, FaTag, FaHashtag, FaUserTie, FaRegCalendarAlt, FaMapMarkerAlt, FaRoad, FaHome, FaCity, FaUser, FaGlobe, FaEnvelope, FaTruck } from 'react-icons/fa';
import { SwipeableDrawer } from "@mui/material";
import Modal from 'react-modal';

Modal.setAppElement('body');

export default function ModalDetalhes ({ onClose, order }){
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('Resumo');
  const [changeDetailContent, setChangeDetailContent] = useState(null);

  const modalClose = () => {
    setIsOpen(false);
    onClose();
  }

  const handleDetailContent = (detailContent) => {
    setActiveContent(detailContent);
    if (detailContent === 'Resumo') {
      setChangeDetailContent(
        <div>
          <table>
            <tbody>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaListAlt className="mr-2 text-cyan-500 h-3 w-3" /> 
                  N° do pedido
                </td>
                <td className='w-40'>{Array.isArray(order) ? order[0].order_id : order.order_id}</td>
              </tr>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaUser className="mr-2 text-cyan-500 h-3 w-3" />
                  Comprador
                </td>
                <td className='w-40'>{Array.isArray(order) ? order[0].receiver_name : order.receiver_name}</td>
              </tr>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaUserTie className="mr-2 text-cyan-500 h-3 w-3" />
                  Vendedor
                </td>
                <td className='w-40'>{Array.isArray(order) ? order[0].seller_nickname : order.seller_nickname}</td>
              </tr>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaTag className="mr-2 text-cyan-500 h-4 w-4" />
                  Preço do produto
                </td>
                <td className='w-40'>{Array.isArray(order) ? order[0].total_paid_amount : order.total_paid_amount}</td>
              </tr>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaHashtag className="mr-2 text-cyan-500 h-3 w-3" />
                  Quantidade
                </td>
                <td className='w-40'>{Array.isArray(order) ? order[0].quantity : order.quantity}</td>
              </tr>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 flex justify-start items-center'>
                  <FaRegCalendarAlt className="mr-2 text-cyan-500 h-4 w-4" />
                  <span className='text-sm font-medium'>Última atualização</span>
                </td>
                <td className='w-28 md:w-full lg:w-40'>{new Date(Array.isArray(order) ? order[0].date_last_modified : order.date_last_modified).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }else if (detailContent === 'Endereço') {
      setChangeDetailContent(
        <div>
          <table>
          <tbody>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaUserTie className="mr-2 text-cyan-500 h-4 w-4" />
                Destinatario
              </td>
              <td className='w-28 md:w-full lg:w-40'><p>{Array.isArray(order) ? order[0].receiver_name : order.receiver_name}</p></td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaRoad className="mr-2 text-cyan-500 h-4 w-4" />
                Rua
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].street_name : order.street_name}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'> 
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaMapMarkerAlt className="mr-2 text-cyan-500 h-4 w-4" />
                Endereço
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].address_line : order.address_line}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaHome className="mr-2 text-cyan-500 h-4 w-4" />
                Bairro
              </td>
              <td className='w-40'>{Array.isArray(order) ? order[0].neighborhood : order.neighborhood}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaCity className="mr-2 text-cyan-500 h-4 w-4" />
                Cidade
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].city : order.city}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaMapMarkerAlt className="mr-2 text-cyan-500 h-4 w-4" />
                Estado
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].state : order.state}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaEnvelope className="mr-2 text-cyan-500 h-4 w-4" />
                CEP
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].zip_code : order.zip_code}</td>
            </tr>
            <tr className='flex flex-row gap-4 mb-4'>
              <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                <FaGlobe className="mr-2 text-cyan-500 h-4 w-4" />
                País
              </td>
              <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].country : order.country}</td>
            </tr>
          </tbody>
          </table>
        </div>
      );
    }else if (detailContent === 'Metodo de Envio') {
      setChangeDetailContent(
        <div>
          <table>
            <tbody>
              <tr className='flex flex-row gap-4 mb-4'>
                <td className='w-28 md:w-full lg:w-40 text-sm font-medium flex justify-start items-center'>
                  <FaTruck className="mr-2 text-cyan-500 h-4 w-4" />
                  Metodo de Envio
                </td>
                <td className='w-28 md:w-full lg:w-40'>{Array.isArray(order) ? order[0].tracking_method : order.tracking_method}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  };

  const renderContentBtn = (content, label) => {
    const isActive = activeContent === content
    return (
      <button onClick={() => handleDetailContent(content)}>
        <span className={`text-sm font-semibold ${isActive ? 'text-cyan-500' : 'opacity-90 hover:opacity-100'}`}>{label}</span>
        {isActive && <hr className='bg-cyan-500 h-1' />}
      </button>
    )
  }

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={modalClose}
        onOpen={toggleDrawer(true)}
      >
        <div className='w-[370px] md:w-[750px] lg:w-[1000px] h-[300px]'>
          <div className="mx-auto mt-11 pl-5">
            <BtnBackPage title='Detalhes do Pedido' modal={true} onClose={modalClose}/>
          </div>
        
          <div className='flex flex-col justify-around mt-8 md:mx-5 lg:mx-7'>
            <form className="bg-zinc-200 rounded-xl pl-5 md:px-7 lg:px-5 py-5 mt-5">
              <div>
                <table>
                <tbody className='flex flex-col md:flex-row gap-2 md:gap-7 lg:gap-10 xl:gap-auto'>
                  <tr className='flex flex-col gap-1 mb-4 md:mb-0'>
                    <td className='w-full text-sm font-medium'>Produtos</td>
                    <td className='w-72 md:w-64 break-words'>{Array.isArray(order) ? order[0].reason : order.reason}</td>
                  </tr>
                  <tr className='flex flex-col gap-1 mb-4 md:mb-0'>
                    <td className='w-full lg:w-28 text-sm font-medium lg:text-center'>Valor total do pedido</td>
                    <td className='w-72 md:w-20 lg:text-center'>{Array.isArray(order) ? order[0].total_amount : order.total_amount}</td>
                  </tr>
                  <tr className='flex flex-col gap-1 mb-4 md:mb-0'>
                    <td className='w-full text-sm font-medium md:text-right'>ID do comprador</td>
                    <td className='w-72 md:w-56 md:text-right'>{Array.isArray(order) ? order[0].buyer_nickname : order.buyer_nickname}</td>
                  </tr>
                </tbody>
                </table>
              </div>
            </form>

            <div className='lg:w-[400px] lg:flex mt-10 lg:gap-7 xl:gap-14 lg:justify-around lg:items-start'>
              <table className="min-w-full divide-y divide-gray-200 lg:w-[400px] px-4">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="pl-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th scope="col" className="pr-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(Array.isArray(order) ? order : [order]).map((product, index) => (
                    <tr key={index}>
                      <td className="w-64 md:w-full lg:w-64 xl:w-80 px-5 py-3 md:py-5 text-start items-center flex">
                        <Image src={product.pictureurls} alt={product.reason} width='42' height='42' className="w-10 h-10 object-cover" />
                        <p className='w-64 md:w-full lg:w-64 text-sm font-medium ml-2'> {product.reason}</p>
                      </td>
                      <td className="pr-3 py-4 whitespace-nowrap text-right">
                        R${product.total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div >
                <div className='flex justify-between px-4  mt-10 lg:mt-0'>
                  {renderContentBtn('Resumo', 'Resumo')}
                  {renderContentBtn('Endereço', 'Endereço')}
                  {renderContentBtn('Metodo de Envio', 'Metodo de Envio')}
                </div>
                <div className='w-auto pt-7 px-6'>{changeDetailContent}</div>
              </div>
            </div>
          </div>
        </div>
      </SwipeableDrawer>
    </div>
  );
};

'use client'
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import { useState, useEffect, act } from 'react';
import Image from 'next/image';
import { SwipeableDrawer } from "@mui/material";
import Modal from 'react-modal';
import { ModalDetailsResumo } from './ModalDetailsResumo';
import { ModalDetailsEndereco } from './ModalDetailsEndereco';
import { ModalDetailsEnvio } from './ModalDetailsEnvio';

Modal.setAppElement('body');

export default function ModalDetailsContent ({ onClose, order }){
  const [isOpen, setIsOpen] = useState(true);
  const [activeContent, setActiveContent] = useState('Resumo');
  const [changeDetailContent, setChangeDetailContent] = useState();

  useEffect(() => {
    if (activeContent === 'Resumo') {
      setChangeDetailContent(
        <ModalDetailsResumo order={order} />
      );
    }
  }, [activeContent, order]);

  const modalClose = () => {
    setIsOpen(false);
    onClose();
  }

  const handleDetailContent = (detailContent) => {
    setActiveContent(detailContent);
    if (detailContent === 'Resumo') {
      setChangeDetailContent( <ModalDetailsResumo order={order} /> );
    }else if (detailContent === 'Endereço') {
      setChangeDetailContent( <ModalDetailsEndereco order={order} /> );
    }else if (detailContent === 'Metodo de Envio') {
      setChangeDetailContent( <ModalDetailsEnvio order={order} /> );
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
        sx={{
          width: ['100%', '768px', '955px'],
          '& .MuiDrawer-paper': {
              width: ['100%', '768px','955px']
          }
       }}
      >
        <div className='mx-4'>
          <div className="w-full min-w-[320px] lg:w-[955px] px-2 mt-11">
            <div className="mt-11 pl-5">
              <BtnBackPage title='Detalhes do Pedido' modal={true} onClose={modalClose}/>
            </div>
          
            <div className='flex flex-col justify-around mt-8 md:mx-5 lg:mx-7'>
              <form className="bg-gray-50 rounded-xl pl-5 md:px-7 lg:px-5 py-5 mt-5">
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
        </div>
      </SwipeableDrawer>
    </div>
  );
};

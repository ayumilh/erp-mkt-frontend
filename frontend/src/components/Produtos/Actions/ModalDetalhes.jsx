import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import { useEffect, useState } from 'react';
import { SwipeableDrawer } from "@mui/material";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('body');

export default function ModalDetalhes({ onClose, selectedSku}){
   const [isOpen, setIsOpen] = useState(true);
   const [product, setProduct] = useState({});
   const productSKU = selectedSku;
   
   useEffect(() => {
      const fetchProduct = async () => {
         try{
            const response = await axios.get(
               `https://erp-mkt.vercel.app/api/mercadolivre/productid?sku=${productSKU}`
               );
            setProduct(response.data);
            console.log(response.data)
         }catch(error){
            console.error(`Error: ${error}`);
         }
      }
      fetchProduct();
   }, [productSKU]);


   const modalClose = () => {
      setIsOpen(false);
      onClose();
   }
   
   return (
      <div>
         <SwipeableDrawer
            anchor="right"
            open={isOpen}
            onClose={modalClose}
            onOpen={() => {}}
         >
            <div className='w-[370px] md:w-[540px] lg:w-[700px] h-[300px] px-5 lg:px-14'>
               <div className=" mx-auto mt-11">
                  <BtnBackPage title='Detalhes do Produto' modal={true} onClose={modalClose}/>
               </div>
      
               <div className='bg-primaria-900 rounded-2xl shadow-input border border-slate-100 mt-8'>
                  <div className="pl-5 md:px-14 py-5 lg:px-8 lg:mt-0">
                     <div className='flex flex-col gap-5'>
                        {/* <div>
                           <Image src={product.pictureurls} alt={product.title} width={150} height={150} className='rounded-lg'/>
                        </div> */}
                        <div className='flex flex-col gap-3'>
                           <div>
                              <HelpOutlineIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                              <span className='text-cyan-500 font-medium'>Informações basicas</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>Nome do produto</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.title}</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>Listagem</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.listing}</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>Marca</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.brand}</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>GTIN</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.gtin}</span>
                           </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                           <div>
                              <MonetizationOnOutlinedIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                              <span className='text-cyan-500 font-medium'>Informações do Preço</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>Preço</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.price}</span>
                           </div>
                        </div>

                        <div className='flex flex-col gap-3'>
                           <div>
                              <Inventory2OutlinedIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                              <span className='text-cyan-500 font-medium'>Inventario</span>
                           </div>
                           <div className='flex flex-row gap-4'>
                              <span className='w-24 text-sm font-medium'>Quantidade</span>
                              <span className='w-48 md:w-64 lg:w-80'>{product.quantity}</span>
                           </div>
                        </div>
                     <div/>
                     </div>
                  </div>
               </div>
            </div>
         </SwipeableDrawer>
      </div>
      );
};

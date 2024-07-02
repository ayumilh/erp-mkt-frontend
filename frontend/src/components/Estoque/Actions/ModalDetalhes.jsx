'use client'
import BtnBackPage from '@/components/Geral/Button/BtnBackPage';
import { useState } from "react";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { SwipeableDrawer } from "@mui/material";
import Modal from "react-modal";

Modal.setAppElement("body");
function ModalDetalhes({ onClose, sku }) {
  const [isOpen, setIsOpen] = useState(true);

  const modalClose = () => {
    setIsOpen(false);
    onClose();
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  console.log('sku: ', sku);
  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={modalClose}
        onOpen={toggleDrawer(true)}
      >
        <div className='w-[370px] md:w-[540px] lg:w-[700px] h-[300px] px-5 lg:px-14'>
          <div className=" mx-auto mt-11">
            <BtnBackPage title='Detalhes do Produto' modal={true} onClose={modalClose}/>
          </div>

          <div className='bg-primaria-900 rounded-2xl shadow-input border border-slate-100 mt-8'>
            <div className="pl-5 md:px-14 py-5 lg:px-8 lg:mt-0">
                <div className='flex flex-col gap-5'>
                  <div className='flex flex-col gap-3'>
                      <div>
                        <HelpOutlineIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                        <span className='text-cyan-500 font-medium'>Informações basicas</span>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='w-24 text-sm font-medium'>Nome do produto</span>
                        <span className='w-48 md:w-64 lg:w-80'>{sku.nome_do_produto}</span>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='w-24 text-sm font-medium'>Categoria</span>
                        <span className='w-48 md:w-64 lg:w-80'>{sku.categorias}</span>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='w-24 text-sm font-medium'>Peso do pacote</span>
                        <span className='w-48 md:w-64 lg:w-80'>{sku.peso_do_pacote}</span>
                      </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                      <div>
                        <MonetizationOnOutlinedIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                        <span className='text-cyan-500 font-medium'>Informações do Preço</span>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='w-24 text-sm font-medium'>Custo de compra</span>
                        <span className='w-48 md:w-64 lg:w-80'>{sku.custo_de_compra}</span>
                      </div>
                  </div>

                  <div className='flex flex-col gap-3'>
                      <div>
                        <Inventory2OutlinedIcon className='text-cyan-500 w-5 h-5 mr-2'/>
                        <span className='text-cyan-500 font-medium'>Inventario</span>
                      </div>
                      <div className='flex flex-row gap-4'>
                        <span className='w-24 text-sm font-medium'>Ultima atualização</span>
                        <span className='w-48 md:w-64 lg:w-80'>{sku.data_de_lancamento}</span>
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
}
export default ModalDetalhes;
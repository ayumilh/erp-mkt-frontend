'use client'
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Step from '@mui/material/Step';
import ModalAddSKU from './KitModalAddSKU';
import ModalMapearAnuncio from './KitModalMapearAnuncio';
import BtnActions from '@/components/Geral/Button/BtnActions';

const steps = [
  {titulo: 'Informações Basica', subtitulo: 'Preencha as informações básicas do seu produto'}, 
  {titulo: 'Informações do KIT', subtitulo: 'Informações adicionais do SKU'},
  {titulo:'Mapear o SKU', subtitulo: 'Controle do estoque ao mapear o SKU do anúncio para o SKU do produto'}
];

export default function FormularioCriar() {
  const [input, setInputs] = useState({
    SKUKIT: "",
    Nome_do_Produto: "",
    Apelido_do_Produto: "",
    Categorias: "",
    Status_da_Venda: "",
})
  
  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  
  // buscar sku selecionados
  const [products, setProducts] = useState([]);
  const handleIdProduct = (data) => {
    if (!data) return;
    const restructuredData = data.map((product) => {
      return {
        sku: product.sku, 
        custo_de_compra: product.custo_de_compra,
        quantidade: product.quantidade,
      };
    });

    setProducts(restructuredData);
  };

  // buscar mapear
  const [productsMapear, setProductsMapear] = useState([]);
  const handleMapear = (data) => {
    if (!data) return;
    const restructuredData = data.sku.map((item, index) => {
      return {
        sku: data.sku[index][`sku${index + 1}`],
        availableQuantities: data.availableQuantities[index][`available_quantity${index + 1}`],
        color: data.colorVariables[index][`color${index + 1}`]
      };
    });
    setProductsMapear(restructuredData);
  };


  const handleCriar = async (e) => {
    e.preventDefault()
    console.log(input)
    try {
      const sku = products.map(product => product.sku);
      const SkuMercado = productsMapear.map(product => product.sku);
      const custo_de_compra = products.map(product => product.custo_de_compra);

      await axios.post("https://erp-mkt.vercel.app/api/stock/productskit", {
        ...input,
        SKU: sku,
        SkuMercado: SkuMercado,
        custo_de_compra: custo_de_compra,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  // modal kit
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  }
  const closeKitModal = () => {
    setIsModalOpen(false);
    handleIdProduct();
  }


  // modal mapear
  const [isModalMapearOpen, setIsModalMapearOpen] = useState(false);

  const handleClickMapear = (event) => {
    event.preventDefault();
    setIsModalMapearOpen(true);
  }
  const closeMapearModal = () => {
    setIsModalMapearOpen(false);
    handleMapear();
  }


  return (
    <div className='lg:flex lg:gap-28'>
      <form className="rounded-xl w-[373px] md:w-[620px] lg:w-[720px] md:p-6 py-5 px-4">
        <div className="flex flex-col gap-4">
          <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.titulo}>
              <div>
                <h2 className="text-lg font-semibold opacity-90">{step.titulo}</h2>
                {activeStep === index && (<>
                  <p className="text-sm md:text-base font-medium opacity-90">{step.subtitulo}</p>
                  {index === 0 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                      <input onChange={inputChange} name='SKUKIT' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="SKU"/>

                      <input onChange={inputChange} name='Nome_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Nome do Produto"/>

                      <input onChange={inputChange} name='Apelido_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Apelido do Produto"/>

                      <input onChange={inputChange} name='Categorias' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Categorias"/>

                      <input onChange={inputChange} name='Status_da_Venda' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Status da Venda"/>
                    </div>
                  )}

                  {index === 1 && (
                    <div className="flex flex-col mt-8 mb-6 ml-4 overflow-x-auto">
                      <div className='absolute'>
                        <button type='button' onClick={handleButtonClick} className='rounded-lg flex items-center justify-center gap-1 text-base py-2 px-3'>
                          <span><AddIcon className='w-5 h-5'/></span>
                          <span className='text-sm hover:text-black font-medium'>Adicionar Produto SKU</span>
                        </button>
                      </div>
                      <div className="bg-primaria-900 rounded-2xl flex flex-col h-[400px] mx-auto lg:mx-0 mb-10 mt-14 overflow-x-auto">
                        <table className="table-auto min-w-full">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">SKU</th>
                              <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center w-min">Custo de Compra</th>
                              <th className="px-2 py-2 md:py-4 text-sm font-semibold text-center"></th>
                            </tr>
                          </thead>
                          <tbody>
                            {products.map((item, index) => (
                              <tr key={index}>
                                <td className='px-4 py-2 text-center'>{item.sku}</td>
                                <td className='px-4 py-2 text-center'>{item.custo_de_compra}</td>
                                <td className="px-2 py-2 md:py-4 text-center">
                                  <button className="px-2 py-1 bg-red-500 text-white text-sm rounded-md">Excluir</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {isModalOpen && (
                          <ModalAddSKU onClose={closeKitModal} onIdProduct={handleIdProduct}/>
                        )}
                      </div>
                    </div>
                  )}

                  {index === 2 && (
                    <div className="flex flex-col mt-8 mb-6 ml-4 overflow-x-auto">
                      <div className='absolute'>
                        <button type='button' onClick={handleClickMapear} className='rounded-lg flex items-center justify-center gap-1 text-base py-2 px-3'>
                          <span><AddIcon className='w-5 h-5'/></span>
                          <span className='text-sm hover:text-black font-medium'>Mapear SKU do anúncio</span>
                        </button>
                      </div>
                      <div className="bg-primaria-900 rounded-2xl flex flex-col h-[400px] mx-auto lg:mx-0 mb-6 mt-14 overflow-x-auto">
                        <table className="table-auto min-w-full">
                          <thead>
                          <tr>
                            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Valor da variante</th>
                            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">ID dos anúncios</th>
                            <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center">Nome da loja</th>
                          </tr>
                          </thead>
                          <tbody>
                          {productsMapear.map((product, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 md:py-4 text-center">{product.color}</td>
                                <td className="px-4 py-2 md:py-4 text-center">{product.sku}</td>
                                <td className="px-4 py-2 md:py-4 text-center">Lojinha</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {isModalMapearOpen && (
                          <ModalMapearAnuncio onClose={closeMapearModal} onIdProduct={handleMapear}/>
                        )}
                      </div>
                    </div>
                  )}
                </>)}
              </div>
            </Step>
          ))}
        </Stepper>
        <div className='flex gap-3 my-4'>
          {activeStep > 0 && (
            <BtnActions title='Voltar' onClick={handleBack} color='desativado'/>
          )}
          {activeStep < 2 ? (
            <BtnActions title='Próximo' onClick={handleNext} color='ativado'/>
          ) : (
            <BtnActions title='Criar produto' onClick={handleCriar} color='ativado'/>
          )}
        </div> 
        </div>
      </form>
    </div>
  );
}
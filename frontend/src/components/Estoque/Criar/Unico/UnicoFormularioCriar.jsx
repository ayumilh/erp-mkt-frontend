'use client'
import { useState } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import ModalMapearAnuncio from './UnicoModalMapearAnuncio';
import BtnActions from '@/components/Geral/Button/BtnActions';

const steps = [
  {titulo: 'Informações Basica', subtitulo: 'Preencha as informações básicas do seu produto'}, 
  {titulo: 'Venda', subtitulo: 'Defina a marca, garantia e o código GTIN'}, 
  {titulo:'Mídia', subtitulo: 'Adicione fotos e vídeos do seu produto'},
  {titulo:'Mapear o SKU', subtitulo: 'Controle do estoque ao mapear o SKU do anúncio para o SKU do produto'}
];

export default function CriarProdutoUnicoForm() {
  const [input, setInputs] = useState({
    SKU: "",
    Nome_do_Produto: "",
    Apelido_do_Produto: "",
    Categorias: "",
    Codigo_de_Barras: "",
    Data_de_Lancamento: "",
    Status_da_Venda: "",
    Vendedor: "",
    Preco_de_Varejo: "",
    Custo_de_Compra: "",
    Descricao: "",
    Link_do_Fornecedor: "",
    Marca: "",
    Peso_do_Pacote: "",
    Tamanho_de_Embalagem: "",
    Link_do_Video: "",
    NCM: "",
    CEST: "",
    Unidade: "",
    Origem: ""
  })
  
  const inputChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  // buscar de produtos
  const [products, setProducts] = useState([]);
  const handleIdProduct = (data) => {
    if (!data) return;
    
    const restructuredData = data.sku.map((item, index) => {
      return {
        sku: data.sku[index][`sku${index + 1}`],
        availableQuantities: data.availableQuantities[index][`available_quantity${index + 1}`],
        color: data.colorVariables[index][`color${index + 1}`]
      };
    });
    setProducts(restructuredData);
  };


  const handleCriar = async (e) => {
    e.preventDefault()
    try {
      const sku = products.map(product => product.sku);
      const quantities = products.map(product => product.availableQuantities);

      await axios.post("https://erp-mkt.vercel.app/api/stock/createProduct", {
        ...input,
        SkuMercado: sku,
        quantidade: quantities
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleButtonClick = (event) => {
    event.preventDefault();
    setIsModalOpen(true);
  }


  const closeModal = () => {
    setIsModalOpen(false);
    handleIdProduct();
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
                      <input onChange={inputChange} name='SKU' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="SKU"/>

                      <input onChange={inputChange} name='Nome_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Nome do Produto"/>

                      <input onChange={inputChange} name='Apelido_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Apelido do Produto"/>

                      <input onChange={inputChange} name='Categorias' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Categorias"/>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">

                      <input onChange={inputChange} name='Codigo_de_Barras' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Codigo de Barras"/>

                      <input onChange={inputChange} name='Data_de_Lancamento' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Data de Lancamento"/>

                      <input onChange={inputChange} name='Status_da_Venda' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Status da Venda"/>
                      <input onChange={inputChange} name='Vendedor' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Vendedor"/>

                      <input onChange={inputChange} name='Preco_de_Varejo' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Preco de Varejo"/>

                      <input onChange={inputChange} name='Custo_de_Compra' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Custo de Compra"/>

                      <input onChange={inputChange} name='Descricao' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Descricao"/>

                      <input onChange={inputChange} name='Link_do_Fornecedor' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Link do Fornecedor"/>
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                      <input onChange={inputChange} name='Marca' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Marca"/>

                      <input onChange={inputChange} name='Peso_do_Pacote' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Peso do Pacote"/>
                      <input onChange={inputChange} name='Tamanho_de_Embalagem' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Tamanho_de_Embalagem"/>

                      <input onChange={inputChange} name='Link_do_Video' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Link do Video"/>

                      <input onChange={inputChange} name='NCM' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="NCM"/>

                      <input onChange={inputChange} name='CEST' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="CEST"/>

                      <input onChange={inputChange} name='Unidade' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Unidade"/>

                      <input onChange={inputChange} name='Origem' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Origem"/>
                    </div>
                  )}
                  {index === 3 && (
                    <div className="flex flex-col mt-8 mb-6 ml-4 overflow-x-auto">
                      <div className='absolute'>
                        <button type='button' onClick={handleButtonClick} className='rounded-lg flex items-center justify-center gap-1 text-base py-2 px-3'>
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
                            {products.map((product, index) => (
                              <tr key={index}>
                                <td className="px-4 py-2 md:py-4 text-center">{product.color}</td>
                                <td className="px-4 py-2 md:py-4 text-center">{product.sku}</td>
                                <td className="px-4 py-2 md:py-4 text-center">Lojinha</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {isModalOpen && (
                          <ModalMapearAnuncio onIdProduct={handleIdProduct} onClose={closeModal}/>
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
          {activeStep < 3 ? (
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
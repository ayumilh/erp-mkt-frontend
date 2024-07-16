'use client'
import { useEffect, useState } from 'react';
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
  const [SKU, setSKU] = useState(null);
  const [Nome_do_Produto, setNome_do_Produto] = useState(null)
  const [Apelido_do_Produto, setApelido_do_Produto] = useState("");
  const [Categorias, setCategorias] = useState("");
  const [Codigo_de_Barras, setCodigo_de_Barras] = useState("");
  const [Data_de_Lancamento, setData_de_Lancamento] = useState(null);
  const [Status_da_Venda, setStatus_da_Venda] = useState("Ativo");
  const [Vendedor, setVendedor] = useState("");
  const [Preco_de_Varejo, setPreco_de_Varejo] = useState("");
  const [Custo_de_Compra, setCusto_de_Compra] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Link_do_Fornecedor, setLink_do_Fornecedor] = useState("");
  const [Marca, setMarca] = useState("");
  const [Tamanho, setTamanho] = useState("");
  const [Peso_do_Pacote, setPeso_do_Pacote] = useState("");
  const [Tamanho_de_Embalagem, setTamanho_de_Embalagem] = useState("");
  const [Link_do_Video, setLink_do_Video] = useState("");
  const [NCM, setNCM] = useState("");
  const [CEST, setCEST] = useState("");
  const [Unidade, setUnidade] = useState("");
  const [Origem, setOrigem] = useState("");
  
  const [isInvalidoPrecoDeVarejo, setIsInvalidoPrecoDeVarejo] = useState(null);
  const [isInvalidoCustoDeCompra, setIsInvalidoCustoDeCompra] = useState(null);
  const [isInvalidoPesoDoPacote, setIsInvalidoPesoDoPacote] = useState(null);

  const [secaoAtiva, setSecaoAtiva] = useState('gerais');

  const product = {
    SKU,
    Nome_do_Produto,
    Apelido_do_Produto,
    Categorias,
    Codigo_de_Barras,
    Data_de_Lancamento,
    Status_da_Venda,
    Vendedor,
    Preco_de_Varejo,
    Custo_de_Compra,
    Descricao,
    Link_do_Fornecedor,
    Marca,
    Tamanho,
    Peso_do_Pacote,
    Tamanho_de_Embalagem,
    Link_do_Video,
    NCM,
    CEST,
    Unidade,
    Origem,
  };
  const [isFormValid, setIsFormValid] = useState(false);

  const handleStepClick = (index, e) => {
    e.preventDefault();
    setActiveStep(index);
  };


  // useEffect(() => {
  //   const isAllFieldsFilled = Object.values(product).every(field => field.trim() !== '');
  //   setIsFormValid(isAllFieldsFilled);
  // }, [product]);


  const [products, setProducts] = useState([]);
  const handleIdProduct = (data) => {
    if (!data) return;
    
    const restructuredData = data.sku.map((item, index) => {
      return {
        sku: data.sku[index][`sku${index + 1}`],
        availableQuantities: data.availableQuantities[index][`availableQuantity${index + 1}`],
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

      const response = await axios.post("https://erp-mkt.vercel.app/api/stock/createProduct", {
        ...product,
        SkuMercado: sku,
        quantidade: quantities
      })
      
    } catch (error) {
      console.error(error)
    }
  }


  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    if(isFormValid){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      alert('Preencha todos os campos obrigatórios')
    }
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
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10'>
      <h3 className='text-neutral-700 text-xl font-medium '>{Nome_do_Produto || "Novo Produto"}</h3>

      <div className='flex gap-4 mt-7 mb-10 relative'>
        <button
          onClick={() => setSecaoAtiva('gerais')}
          className={`text-neutral-700 hover:text-black font-medium transition duration-300 ease-out ${secaoAtiva === 'gerais' ? 'border-b-2 border-segundaria-900' : ''}`}
        >
          dados básicos
        </button>
        <button
          onClick={() => setSecaoAtiva('infoDeVenda')}
          className={`text-neutral-700 hover:text-black font-medium transition duration-300 ease-out ${secaoAtiva === 'infoDeVenda' ? 'border-b-2 border-segundaria-900' : ''}`}
        >
          venda e atributo
        </button>
      </div>

      {secaoAtiva === 'gerais' && (
        <div className='flex flex-wrap gap-3 lg:gap-5 my-4 transition duration-300 ease-out'>
          <div className="w-4/12 mb-4">
            <label htmlFor="Nome_do_Produto" className="block mb-1 font-medium text-sm text-neutral-600">Nome do Produto <span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => setNome_do_Produto(e.target.value)}
              value={Nome_do_Produto || ""}
              maxLength={255}
              name='Nome_do_Produto' 
              required
              type="text"
              className="peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="w-3/5 mb-4">
            <label htmlFor="SKU" className="block mb-1 font-medium text-sm text-neutral-600">Código(SKU) <span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => setSKU(e.target.value)}
              value={SKU || ""}
              maxLength={55}
              name='SKU' 
              required
              type="text"
              placeholder="Código (SKU) ou referência do produto"
              className="peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Apelido_do_Produto" className="block mb-1 font-medium text-sm text-neutral-600">Apelido do Produto</label>
            <input
              onChange={(e) => setApelido_do_Produto(e.target.value)}
              value={Apelido_do_Produto || ""}
              maxLength={255}
              name='Apelido_do_Produto' 
              required
              type="text"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Categorias" className="block mb-1 font-medium text-sm text-neutral-600">Categorias <span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => setCategorias(e.target.value)}
              value={Categorias || ""}
              maxLength={255}
              name='Categorias' 
              required
              type="text"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Codigo_de_Barras" className="block mb-1 font-medium text-sm text-neutral-600">Código de Barras</label>
            <input 
              onChange={(e) => setCodigo_de_Barras(e.target.value)} 
              value={Codigo_de_Barras || ""}
              name='Codigo_de_Barras' 
              type="text" 
              maxLength={50}
              placeholder="EAN, UPC, GTIN"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Data_de_Lancamento" className="block mb-1 font-medium text-sm text-neutral-600">Data de Lançamento</label>
            <input 
              onChange={(e) => setData_de_Lancamento(e.target.value)}
              value={Data_de_Lancamento || ""} 
              name='Data_de_Lancamento' 
              type="date" 
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Status_da_Venda" className="block mb-1 font-medium text-sm text-neutral-600">Status de venda</label>
            <div className="flex flex-col md:flex-row gap-4">
              <label>
                <input
                  type="radio"
                  value="Ativo"
                  checked={Status_da_Venda === 'Ativo'}
                  name="Status_da_Venda"
                  onChange={(e) => setStatus_da_Venda(e.target.value)}
                />
                <span className="font-normal ml-2">Ativo</span>
              </label>
              <label>
                <input
                  type="radio"
                  value="Inativo"
                  name="Status_da_Venda"
                  checked={Status_da_Venda === 'Inativo'}
                  onChange={(e) => setStatus_da_Venda(e.target.value)}
                />
                <span className="font-normal ml-2">Inativo</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="Vendedor" className="block mb-1 font-medium text-sm text-neutral-600">Vendedor</label>
            <input 
              onChange={(e) => setVendedor(e.target.value)}
              value={Vendedor || ""} 
              name='Vendedor' 
              maxLength={100}
              type="text" 
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

        </div>
      )}

      {secaoAtiva === 'infoDeVenda' && (
        <div className='flex flex-wrap gap-3 xl:gap-7 my-4 transition duration-300 ease-out'>

          <div className='flex flex-col mb-4'>
            <label htmlFor="Preco_de_Varejo" className="block mb-1 font-medium text-sm text-neutral-600">Preço de Varejo</label>
            <input 
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setIsInvalidoPrecoDeVarejo(true);
                } else {
                  const regex = /^\d*(\.\d{0,2})?$/;
                  if (regex.test(value.toString())) {
                    setPreco_de_Varejo(value);
                    setIsInvalidoPrecoDeVarejo(false);
                  } else {
                    setIsInvalidoPrecoDeVarejo(true);
                  }
                }
              }}
              value={Preco_de_Varejo || ""}
              name='Preco_de_Varejo' 
              type="text" 
              placeholder="0,00"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
            {isInvalidoPrecoDeVarejo && <span className="text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
          </div>
          
          <div className='flex flex-col mb-4'>
            <label htmlFor="Custo_de_Compra" className="block mb-1 font-medium text-sm text-neutral-600">Custo de Compra</label>
            <input 
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setIsInvalidoCustoDeCompra(true);
                } else {
                  const regex = /^\d*(\.\d{0,2})?$/;
                  if (regex.test(value.toString())) {
                    setCusto_de_Compra(value);
                    setIsInvalidoCustoDeCompra(false);
                  } else {
                    setIsInvalidoCustoDeCompra(true);
                  }
                }
              }}
              value={Custo_de_Compra || ""}
              name='Custo_de_Compra' 
              type="text" 
              placeholder="0,00"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
            {isInvalidoCustoDeCompra && <span className="text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
          </div>

          <div className="mb-4">
            <label htmlFor="Descricao" className="block mb-1 font-medium text-sm text-neutral-600">Descrição</label>
            <input 
              onChange={(e) => setDescricao(e.target.value)} 
              value={Descricao || ""}
              name='Descricao' 
              type="text" 
              placeholder="Descricao"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Link_do_Fornecedor" className="block mb-1 font-medium text-sm text-neutral-600">Link do Fornecedor</label>
            <input 
              onChange={(e) => setLink_do_Fornecedor(e.target.value)} 
              value={Link_do_Fornecedor || ""}
              name='Link_do_Fornecedor' 
              max={255}
              type="text" 
              placeholder="Link do Fornecedor"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="Marca" className="block mb-1 font-medium text-sm text-neutral-600">Marca</label>
            <input 
              onChange={(e) => setMarca(e.target.value)} 
              value={Marca || ""}
              name='Marca' 
              type="text" 
              maxLength={100}
              placeholder="Marca"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="Peso_do_Pacote" className="block mb-1 font-medium text-sm text-neutral-600">Peso do Pacote</label>
            <input 
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setIsInvalidoPesoDoPacote(true);
                } else {
                  const regex = /^\d*(\.\d{0,2})?$/;
                  if (regex.test(value.toString())) {
                    setPeso_do_Pacote(value);
                    setIsInvalidoPesoDoPacote(false);
                  } else {
                    setIsInvalidoPesoDoPacote(true);
                  }
                }
              }}
              value={Peso_do_Pacote || ""} 
              name='Peso_do_Pacote' 
              type="text" 
              placeholder="em Kg"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
            {isInvalidoPesoDoPacote && <span className="text-red-500 text-sm font-medium ml-2 mt-1">Valor inválido</span>}
          </div>

          <div className='mb-4'>
            <label htmlFor="Tamanho_de_Embalagem" className="block mb-1 font-medium text-sm text-neutral-600">Tamanho de Embalagem</label>
            <input 
              onChange={(e) => setTamanho_de_Embalagem(e.target.value)} 
              value={Tamanho_de_Embalagem || ""}
              name='Tamanho_de_Embalagem' 
              type="text" 
              maxLength={50}
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div>


          {/* Unidade */}
          {/* <div className="mb-4">
            <label htmlFor="Unidade" className="block mb-1 font-medium text-sm text-neutral-600">Unidade</label>
            <input 
              onChange={(e) => setUnidade(e.target.value)}
              value={Unidade || ""} 
              name='Unidade' 
              maxLength={10}
              type="text" 
              placeholder="Unidade"
              className="peer rounded-sm border px-3 py-2 font-medium text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
            />
          </div> */}
        </div>
      )}
      {/* <form className="rounded-xl w-[373px] md:w-[620px] lg:w-[720px] md:p-6 py-5 px-4">
        <div className="flex flex-col gap-4">
          <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.titulo}>
              <div>
                <button
                  className="focus:outline-none cursor-pointer"
                  onClick={(e) => handleStepClick(index, e)}
                >
                  <h2 className="text-lg font-semibold text-neutral-700">{step.titulo}</h2>
                </button>
                {activeStep === index && (<>
                  <p className="text-sm md:text-base font-medium opacity-90">{step.subtitulo}</p>
                  {index === 0 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">



                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">

                      <input 
                        onChange={(e) => setCodigo_de_Barras(e.target.value)} 
                        value={Codigo_de_Barras || ""}
                        name='Codigo_de_Barras' 
                        type="text" 
                        maxLength={50}
                        placeholder="Codigo de Barras"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                      />
                      <div className='flex flex-col'>
                        <span className="mb-2 font-medium opacity-90">
                          Data de Lançamento
                        </span>
                        <input 
                          onChange={(e) => setData_de_Lancamento(e.target.value)}
                          value={Data_de_Lancamento || ""} 
                          name='Data_de_Lancamento' 
                          type="date" 
                          placeholder="Data de Lancamento"
                          className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                        />
                      </div>

                      <div className="flex flex-col">
                        <span className="mb-2 font-medium opacity-90">
                          Status de venda
                        </span>
                        <div className="flex flex-col md:flex-row gap-4">
                          <label>
                            <input
                              type="radio"
                              value="Ativo"
                              checked={Status_da_Venda === 'Ativo'}
                              name="Status_da_Venda"
                              onChange={(e) => setStatus_da_Venda(e.target.value)}
                            />
                            <span className="font-normal ml-2">Ativo</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              value="Inativo"
                              name="Status_da_Venda"
                              checked={Status_da_Venda === 'Inativo'}
                              onChange={(e) => setStatus_da_Venda(e.target.value)}
                            />
                            <span className="font-normal ml-2">Inativo</span>
                          </label>
                        </div>
                      </div>

                      <input 
                        onChange={(e) => setVendedor(e.target.value)}
                        value={Vendedor || ""} 
                        name='Vendedor' 
                        maxLength={100}
                        type="text" 
                        placeholder="Vendedor"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                      />
                    
                      
                      {isInvalidoCustoDeCompra && <span className="text-red-500 text-sm font-medium">Valor inválido</span>}
                      <input 
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setIsInvalidoCustoDeCompra(true);
                          } else {
                            const regex = /^\d*(\.\d{0,2})?$/;
                            if (regex.test(value.toString())) {
                              setCusto_de_Compra(value);
                              setIsInvalidoCustoDeCompra(false);
                            } else {
                              setIsInvalidoCustoDeCompra(true);
                            }
                          }
                        }}
                        value={Custo_de_Compra || ""}
                        name='Custo_de_Compra' 
                        type="text" 
                        placeholder="0,00"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />

                      <input 
                        onChange={(e) => setDescricao(e.target.value)} 
                        value={Descricao || ""}
                        name='Descricao' 
                        type="text" 
                        placeholder="Descricao"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />

                      <input 
                        onChange={(e) => setLink_do_Fornecedor(e.target.value)} 
                        value={Link_do_Fornecedor || ""}
                        name='Link_do_Fornecedor' 
                        max={255}
                        type="text" 
                        placeholder="Link do Fornecedor"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                      <input 
                        onChange={(e) => setMarca(e.target.value)} 
                        value={Marca || ""}
                        name='Marca' 
                        type="text" 
                        maxLength={100}
                        placeholder="Marca"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />

                      <input
                        onChange={(e) => setTamanho(e.target.value)}
                        value={Tamanho || ""}
                        name='Tamanho'
                        type="text"
                        maxLength={50}
                        placeholder="Tamanho"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                      />
                      
                      {isInvalidoPesoDoPacote && <span className="text-red-500 text-sm font-medium">Valor inválido</span>}
                      <input 
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "") {
                            setIsInvalidoPesoDoPacote(true);
                          } else {
                            const regex = /^\d*(\.\d{0,2})?$/;
                            if (regex.test(value.toString())) {
                              setPeso_do_Pacote(value);
                              setIsInvalidoPesoDoPacote(false);
                            } else {
                              setIsInvalidoPesoDoPacote(true);
                            }
                          }
                        }}
                        value={Peso_do_Pacote || ""} 
                        name='Peso_do_Pacote' 
                        type="text" 
                        placeholder="em Kg"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />
                      <input 
                        onChange={(e) => setTamanho_de_Embalagem(e.target.value)} 
                        value={Tamanho_de_Embalagem || ""}
                        name='Tamanho_de_Embalagem' 
                        type="text" 
                        maxLength={50}
                        placeholder="Tamanho_de_Embalagem"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />

                      <input 
                        onChange={(e) => setLink_do_Video(e.target.value)} 
                        value={Link_do_Video || ""}
                        name='Link_do_Video' 
                        type="url" 
                        maxLength={255}
                        placeholder="Link do Video"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />

                      <input 
                        onChange={(e) => setNCM(e.target.value)}
                        value={NCM || ""} 
                        name='NCM' 
                        type="text" 
                        maxLength={20}
                        placeholder="NCM"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                      />

                      <input 
                        onChange={(e) => setCEST(e.target.value)} 
                        value={CEST || ""}
                        name='CEST' 
                        type="text" 
                        maxLength={20}
                        placeholder="CEST"
                        className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" 
                      />



                      <div className="w-full mb-4">
                        <label htmlFor="Origem" className="block mb-1 font-medium text-sm text-neutral-600">Origem</label>
                        <select
                          onMouseOver={(e) => e.currentTarget.classList.add('bg-gray-100')}
                          onMouseOut={(e) => e.currentTarget.classList.remove('bg-gray-200')}
                          onChange={(e) => setOrigem(e.target.value)}
                          value={Origem || ""}
                          name='Origem'
                          className="peer w-full rounded-sm border px-3 py-2 font-medium text-sm text-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out"
                        >
                          <option value="">Selecione a Origem</option>
                          <option value="0">Nacional, exceto as indicadas nos códigos 3 a 5</option>
                          <option value="1">Estrangeira - Importação direta, exceto a indicada no código 6</option>
                          <option value="2">Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7</option>
                          <option value="3">Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%</option>
                          <option value="4">Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes</option>
                          <option value="5">Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%</option>
                          <option value="6">Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX</option>
                          <option value="7">Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX</option>
                          <option value="8">Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%</option>
                        </select>
                      </div>
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
      </form> */}
    </div>
  );
}
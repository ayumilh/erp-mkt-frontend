'use client'
import { useState } from 'react';
import axios from 'axios';
import BtnActions from '@/components/Geral/Button/BtnActions';
import AddIcon from '@mui/icons-material/Add';

export default function CriarVarianteForm() {
  const [SKU, setSKU] = useState("");
  const [Nome_do_Produto, setNome_do_Produto] = useState("");
  const [Apelido_do_Produto, setApelido_do_Produto] = useState("");
  const [Categorias, setCategorias] = useState("");
  const [Codigo_de_Barras, setCodigo_de_Barras] = useState("");
  const [Data_de_Lancamento, setData_de_Lancamento] = useState("");
  const [Status_da_Venda, setStatus_da_Venda] = useState("");
  const [Vendedor, setVendedor] = useState("");
  const [Preco_de_Varejo, setPreco_de_Varejo] = useState("");
  const [Custo_de_Compra, setCusto_de_Compra] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [Link_do_Fornecedor, setLink_do_Fornecedor] = useState("");
  const [isInvalidoSKU, setIsInvalidoSKU] = useState(false);
  const [isInvalidoNome_do_Produto, setIsInvalidoNome_do_Produto] = useState(false);
  const [isInvalidoApelido_do_Produto, setIsInvalidoApelido_do_Produto] = useState(false);
  const [isInvalidoCategorias, setIsInvalidoCategorias] = useState(false);
  const [isInvalidoCodigo_de_Barras, setIsInvalidoCodigo_de_Barras] = useState(false);
  const [isInvalidoData_de_Lancamento, setIsInvalidoData_de_Lancamento] = useState(false);
  const [isInvalidoStatus_da_Venda, setIsInvalidoStatus_da_Venda] = useState(false);
  const [isInvalidoVendedor, setIsInvalidoVendedor] = useState(false);
  const [isInvalidoPreco_de_Varejo, setIsInvalidoPreco_de_Varejo] = useState(false);
  const [isInvalidoCusto_de_Compra, setIsInvalidoCusto_de_Compra] = useState(false);
  const [isInvalidoDescricao, setIsInvalidoDescricao] = useState(false);
  const [isInvalidoLink_do_Fornecedor, setIsInvalidoLink_do_Fornecedor] = useState(false);

  const [variacoes, setVariacoes] = useState([]);

  const [Marca, setMarca] = useState("");
  const [Peso_do_Pacote, setPeso_do_Pacote] = useState("");
  const [Tamanho_de_Embalagem, setTamanho_de_Embalagem] = useState("");
  const [Link_do_Video, setLink_do_Video] = useState("");
  const [NCM, setNCM] = useState("");
  const [CEST, setCEST] = useState("");
  const [Unidade, setUnidade] = useState("");
  const [Origem, setOrigem] = useState("");

  const [secaoAtiva, setSecaoAtiva] = useState('gerais');

  const products = {
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
    variacoes,
    Marca,
    Peso_do_Pacote,
    Tamanho_de_Embalagem,
    Link_do_Video,
    NCM,
    CEST,
    Unidade,
    Origem
  };

  function handleInputChange(e, index, field) {
    const newVariacoes = [...variacoes];
    newVariacoes[index][field] = e.target.value;
    setVariacoes(newVariacoes);
  }

  function handleAddVariation(e) {
    e.preventDefault()
    const newVariation = {
      cor: "",
      tamanho: "",
      adicionar: "",
    };

    setVariacoes(prevVariacoes => [...prevVariacoes, newVariation]);
  }

  const handleCriar = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://erp-mkt.vercel.app/api/stock/productsVari', { products })
        .then(response => {
          console.log(response.data);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10'>
      <h3 className='text-neutral-800 dark:text-gray-200 text-xl font-medium'>
        {Nome_do_Produto || "Novo Produto"}
      </h3>

      <div className='flex gap-6 mt-5 mb-2 relative'>
        <button
          onClick={() => setSecaoAtiva('gerais')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'gerais' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          dados básicos
        </button>
        <button
          onClick={() => setSecaoAtiva('variacao')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'variacao' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          variantes
        </button>
        <button
          onClick={() => setSecaoAtiva('midia')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'midia' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          mídia
        </button>
      </div>

      {secaoAtiva === 'gerais' && (
        <div className='flex flex-wrap transition-transform duration-500 ease-in'>
          <div className='w-full flex flex-wrap mt-5 mb-7'>
            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="SKU" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Código(SKU)<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setSKU(value);
                    setIsInvalidoSKU(false);
                  } else {
                    setIsInvalidoSKU(true);
                  }
                }}
                value={SKU || ""}
                maxLength={255}
                name='SKU'
                required
                type="text"
                placeholder="Código (SKU) ou referência do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoSKU ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>
            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Nome_do_Produto" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Nome do Produto<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setNome_do_Produto(value);
                    setIsInvalidoNome_do_Produto(false);
                  } else {
                    setIsInvalidoNome_do_Produto(true);
                  }
                }}
                value={Nome_do_Produto || ""}
                maxLength={255}
                name='Nome_do_Produto'
                required
                type="text"
                placeholder="Nome do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoNome_do_Produto ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Apelido_do_Produto" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Apelido do Produto<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setApelido_do_Produto(value);
                    setIsInvalidoApelido_do_Produto(false);
                  } else {
                    setIsInvalidoApelido_do_Produto(true);
                  }
                }}
                value={Apelido_do_Produto || ""}
                maxLength={255}
                name='Apelido_do_Produto'
                required
                type="text"
                placeholder="Apelido do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoApelido_do_Produto ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="Categorias" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Categorias<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setCategorias(value);
                    setIsInvalidoCategorias(false);
                  } else {
                    setIsInvalidoCategorias(true);
                  }
                }}
                value={Categorias || ""}
                maxLength={255}
                name='Categorias'
                required
                type="text"
                placeholder="Categorias do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCategorias ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Codigo_de_Barras" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Código de Barras<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setCodigo_de_Barras(value);
                    setIsInvalidoCodigo_de_Barras(false);
                  } else {
                    setIsInvalidoCodigo_de_Barras(true);
                  }
                }}
                value={Codigo_de_Barras || ""}
                maxLength={255}
                name='Codigo_de_Barras'
                required
                type="text"
                placeholder="Código de barras do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCodigo_de_Barras ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Data_de_Lancamento" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Data de Lançamento<span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  setData_de_Lancamento(value)
                }}
                value={Data_de_Lancamento || ""}
                maxLength={255}
                name='Data_de_Lancamento'
                required
                type="date"
                placeholder="Data de lançamento do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoData_de_Lancamento ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full mt-3 mb-4 px-3">
              <label htmlFor="Descricao" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Descrição<span className='text-red-600'>*</span></label>
              <textarea
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setDescricao(value);
                    setIsInvalidoDescricao(false);
                  } else {
                    setIsInvalidoDescricao(true);
                  }
                }}
                value={Descricao || ""}
                maxLength={255}
                name='Descricao'
                required
                placeholder="Descrição do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoDescricao ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>
          </div>

          <div className='w-full'>
            <hr style={{ border: '1px solid #d1d5db' }} />
          </div>

          <div className='w-full flex flex-col mt-5 mb-7'>
            <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Informações de venda</h3>
            <div className='w-full flex flex-wrap mt-5'>
              <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                <label htmlFor="Status_da_Venda" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Status da Venda<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setStatus_da_Venda(value);
                      setIsInvalidoStatus_da_Venda(false);
                    } else {
                      setIsInvalidoStatus_da_Venda(true);
                    }
                  }}
                  value={Status_da_Venda || ""}
                  maxLength={255}
                  name='Status_da_Venda'
                  required
                  type="text"
                  placeholder="Status da venda do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoStatus_da_Venda ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>

              <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                <label htmlFor="Vendedor" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Vendedor<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setVendedor(value);
                      setIsInvalidoVendedor(false);
                    } else {
                      setIsInvalidoVendedor(true);
                    }
                  }}
                  value={Vendedor || ""}
                  maxLength={255}
                  name='Vendedor'
                  required
                  type="text"
                  placeholder="Vendedor do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoVendedor ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>

              <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                <label htmlFor="Preco_de_Varejo" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Preço de Varejo<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setPreco_de_Varejo(value);
                      setIsInvalidoPreco_de_Varejo(false);
                    } else {
                      setIsInvalidoPreco_de_Varejo(true);
                    }
                  }}
                  value={Preco_de_Varejo || ""}
                  maxLength={255}
                  name='Preco_de_Varejo'
                  required
                  type="text"
                  placeholder="Preço de varejo do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoPreco_de_Varejo ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>

              <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                <label htmlFor="Custo_de_Compra" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Custo de Compra<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setCusto_de_Compra(value);
                      setIsInvalidoCusto_de_Compra(false);
                    } else {
                      setIsInvalidoCusto_de_Compra(true);
                    }
                  }}
                  value={Custo_de_Compra || ""}
                  maxLength={255}
                  name='Custo_de_Compra'
                  required
                  type="text"
                  placeholder="Custo de compra do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCusto_de_Compra ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>
            </div>
          </div>

          <div className='w-full'>
            <hr style={{ border: '1px solid #d1d5db' }} />
          </div>

          <div className="w-full flex flex-col mt-5 mb-7">
            <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Links</h3>
            <div className='w-full flex flex-wrap mt-5'>
              <div className="w-full mt-3 mb-4 px-3">
                <label htmlFor="Link_do_Video" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Link do Vídeo<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setLink_do_Video(value);
                    }
                  }}
                  value={Link_do_Video || ""}
                  maxLength={255}
                  name='Link_do_Video'
                  required
                  type="text"
                  placeholder="Link do vídeo do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
                />
              </div>

              <div className="w-full mt-3 mb-4 px-3">
                <label htmlFor="Link_do_Fornecedor" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Link do Fornecedor<span className='text-red-600'>*</span></label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9]*$/;
                    if (value === '' || regex.test(value)) {
                      setLink_do_Fornecedor(value);
                      setIsInvalidoLink_do_Fornecedor(false);
                    } else {
                      setIsInvalidoLink_do_Fornecedor(true);
                    }
                  }}
                  value={Link_do_Fornecedor || ""}
                  maxLength={255}
                  name='Link_do_Fornecedor'
                  required
                  type="text"
                  placeholder="Link do fornecedor do produto"
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoLink_do_Fornecedor ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>
            </div>
          </div>

        </div>
      )}

      {secaoAtiva === 'variacao' && (
        <div className='flex flex-wrap transition-transform duration-500 ease-in'>
          {variacoes.map((variacao, index) => (
            <div key={index} className="flex flex-col gap-6 mt-8 mb-7 ml-4">
              <input
                className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                value={variacao.cor}
                onChange={(e) => handleInputChange(e, index, "cor")}
                placeholder="Cor"
              />
              <input
                className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                value={variacao.tamanho}
                onChange={(e) => handleInputChange(e, index, "tamanho")}
                placeholder="Tamanho"
              />
              <input
                className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0"
                value={variacao.adicionar}
                onChange={(e) => handleInputChange(e, index, "adicionar")}
                placeholder="Adicionar"
              />
            </div>
          ))}
          <div className='mt-8 mb-7 ml-4'>
            <button onClick={handleAddVariation} className='bg-[#F1F5F9] text-segundaria-800 flex justify-center gap-2 text-base py-2 px-3 rounded-2xl'>
              <span><AddIcon className='w-5 h-5' /></span>
              <span className='text-base hover:text-black'>Adicionar variação</span>
            </button>
          </div>
        </div>
      )}
      {secaoAtiva === 'midia' && (
        <div className='flex flex-wrap transition-transform duration-500 ease-in'>
          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="Marca" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Marca<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setMarca(value);
                }
              }}
              value={Marca || ""}
              maxLength={255}
              name='Marca'
              required
              type="text"
              placeholder="Marca do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
            <label htmlFor="Peso_do_Pacote" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Peso do Pacote<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setPeso_do_Pacote(value);
                }
              }}
              value={Peso_do_Pacote || ""}
              maxLength={255}
              name='Peso_do_Pacote'
              required
              type="text"
              placeholder="Peso do pacote do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="Tamanho_de_Embalagem" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Tamanho de Embalagem<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setTamanho_de_Embalagem(value);
                }
              }}
              value={Tamanho_de_Embalagem || ""}
              maxLength={255}
              name='Tamanho_de_Embalagem'
              required
              type="text"
              placeholder="Tamanho de embalagem do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="NCM" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">NCM<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setNCM(value);
                }
              }}
              value={NCM || ""}
              maxLength={255}
              name='NCM'
              required
              type="text"
              placeholder="NCM do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
            <label htmlFor="CEST" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">CEST<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setCEST(value);
                }
              }}
              value={CEST || ""}
              maxLength={255}
              name='CEST'
              required
              type="text"
              placeholder="CEST do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
            <label htmlFor="Unidade" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Unidade<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setUnidade(value);
                }
              }}
              value={Unidade || ""}
              maxLength={255}
              name='Unidade'
              required
              type="text"
              placeholder="Unidade do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>

          <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
            <label htmlFor="Origem" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Origem<span className='text-red-600'>*</span></label>
            <input
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[a-zA-Z0-9]*$/;
                if (value === '' || regex.test(value)) {
                  setOrigem(value);
                }
              }}
              value={Origem || ""}
              maxLength={255}
              name='Origem'
              required
              type="text"
              placeholder="Origem do produto"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out`}
            />
          </div>
        </div>
      )}

      <div className='flex gap-3 my-9'>
        {activeStep > 0 && (
          <BtnActions title='Voltar' onClick={handleBack} color='desativado' />
        )}
        {activeStep < 3 ? (
          <BtnActions title='Próximo' onClick={handleNext} color='ativado' />
        ) : (
          <BtnActions title='Criar produto' onClick={handleCriar} color='ativado' />
        )}
      </div>
    </div>

  );
}
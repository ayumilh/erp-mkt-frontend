'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import ModalMapearAnuncio from './UnicoModalMapearAnuncio';
import BtnActions from '@/components/Geral/Button/BtnActions';

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
  
  //  dados basicos
  const [isInvalidoNomeProduto, setIsInvalidoNomeProduto] = useState(null)
  const [isInvalidoSKU, setIsInvalidoSKU] = useState(null)
  const [isInvalidoCodigoBarras, setIsInvalidoCodigoBarras] = useState(null)
  const [isInvalidoApelidoProduto, setIsInvalidoApelidoProduto] = useState(null)
  const [isInvalidoVendedor, setIsInvalidoVendedor] = useState(null)
  const [isInvalidoCategorias, setIsInvalidoCategorias] = useState(null)
  const [isInvalidoMarca, setIsInvalidoMarca] = useState(null)

  const [isInvalidoNCM, setIsInvalidoNCM] = useState(null)
  const [isInvalidoCEST, setIsInvalidoCEST] = useState(null)
  const [isInvalidoUnidade, setIsInvalidoUnidade] = useState(null)
  const [isInvalidoOrigem, setIsInvalidoOrigem] = useState(null)


  // valores de venda
  const [isInvalidoPrecoDeVarejo, setIsInvalidoPrecoDeVarejo] = useState(null);
  const [isInvalidoCustoDeCompra, setIsInvalidoCustoDeCompra] = useState(null);
  const [isInvalidoPesoDoPacote, setIsInvalidoPesoDoPacote] = useState(null);
  const [isInvalidoTamanho, setIsInvalidoTamanho] = useState(null);
  const [isInvalidoComprimento, setIsInvalidoComprimento] = useState(null)
  const [isInvalidoAltura, setIsInvalidoAltura] = useState(null)
  const [isInvalidoLargura, setIsInvalidoLargura] = useState(null)

  const [comprimento, setComprimento] = useState('');
  const [altura, setAltura] = useState('');
  const [largura, setLargura] = useState('');

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


  useEffect(() => {
    setTamanho_de_Embalagem(`${comprimento}x${altura}x${largura}`);
  }, [comprimento, altura, largura]);


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

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stock/createProduct`, {
        ...product,
        SkuMercado: sku,
        quantidade: quantities
      })
      
    } catch (error) {
      console.error(error)
    }
  }


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
          onClick={() => setSecaoAtiva('midia')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'midia' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          mídia
        </button>
        <button
          onClick={() => setSecaoAtiva('mapear')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'mapear' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          mapear
        </button>
        <button
          onClick={() => setSecaoAtiva('infoTaxa')}
          className={`text-neutral-600 dark:text-gray-300 hover:text-black dark:hover:text-white font-medium transition-colors duration-300 ease-in ${secaoAtiva === 'infoTaxa' ? 'border-b-2 border-segundaria-900 text-neutral-800' : ''}`}
        >
          taxação
        </button>
      </div>

      {secaoAtiva === 'gerais' && (
        <div className='flex flex-wrap transition-transform duration-500 ease-in'>
          <div className='w-full flex flex-wrap mt-5 mb-7'>
            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Nome_do_Produto" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Nome do Produto <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)){
                    setNome_do_Produto(value);
                    setIsInvalidoNomeProduto(false);
                  } else {
                    setIsInvalidoNomeProduto(true);
                  }
                }}
                value={Nome_do_Produto || ""}
                maxLength={255}
                name='Nome_do_Produto' 
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoNomeProduto ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="SKU" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Código(SKU) <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9]*$/;
                  if (value === '' || regex.test(value)){
                    setSKU(value);
                    setIsInvalidoSKU(false);
                  } else {
                    setIsInvalidoSKU(true);
                  }
                }}
                value={SKU || ""}
                maxLength={55}
                name='SKU' 
                required
                type="text"
                placeholder="Código (SKU) ou referência do produto"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoSKU ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Apelido_do_Produto" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Apelido do Produto</label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)){
                    setApelido_do_Produto(value);
                    setIsInvalidoApelidoProduto(false);
                  } else {
                    setIsInvalidoApelidoProduto(true);
                  }
                }}
                value={Apelido_do_Produto || ""}
                maxLength={255}
                name='Apelido_do_Produto' 
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoApelidoProduto ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="Codigo_de_Barras" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Código de Barras</label>
              <input 
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)){
                    setCodigo_de_Barras(value);
                    setIsInvalidoCodigoBarras(false);
                  } else {
                    setIsInvalidoCodigoBarras(true);
                  }
                }}
                value={Codigo_de_Barras || ""}
                name='Codigo_de_Barras' 
                type="text" 
                maxLength={50}
                placeholder="EAN, UPC, GTIN"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCodigoBarras ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Data_de_Lancamento" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Data de Lançamento</label>
              <input 
                onChange={(e) => setData_de_Lancamento(e.target.value)}
                value={Data_de_Lancamento || ""} 
                name='Data_de_Lancamento' 
                type="date" 
                className="peer rounded-sm border w-full px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="Vendedor" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Vendedor</label>
              <input 
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)){
                    setVendedor(value);
                    setIsInvalidoVendedor(false);
                  } else {
                    setIsInvalidoVendedor(true);
                  }
                }}
                value={Vendedor || ""} 
                name='Vendedor' 
                maxLength={100}
                type="text" 
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoVendedor ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="Status_da_Venda" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Status de venda</label>
              <div className="flex flex-col md:flex-row gap-7 mt-1">
                <label>
                  <input
                    type="radio"
                    value="Ativo"
                    checked={Status_da_Venda === 'Ativo'}
                    name="Status_da_Venda"
                    onChange={(e) => setStatus_da_Venda(e.target.value)}
                  />
                  <span className="font-normal ml-2 dark:text-gray-200">Ativo</span>
                </label>
                <label>
                  <input
                    type="radio"
                    value="Inativo"
                    name="Status_da_Venda"
                    checked={Status_da_Venda === 'Inativo'}
                    onChange={(e) => setStatus_da_Venda(e.target.value)}
                  />
                  <span className="font-normal ml-2 dark:text-gray-200">Inativo</span>
                </label>
              </div>
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="Categorias" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Categorias <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)){
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
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCategorias ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

          </div>

          <div className='w-full'>
            <hr style={{ border: '1px solid #d1d5db' }} />
          </div>

          <div className='w-full flex flex-col mt-5 mb-7'>
            <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Informações de venda</h3>
            <div className='w-full flex flex-wrap mt-5'>

              <div className='w-full md:w-3/12 flex flex-col mt-3 mb-4 px-3'>
                <label htmlFor="Preco_de_Varejo" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Preço de Varejo</label>
                <div className="relative">
                  <div className="relative flex items-center">
                    <span className="absolute left-0 pl-4 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">R$</span>
                    <input 
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (value === "" || regex.test(value.toString())) {
                          setPreco_de_Varejo(value);
                          setIsInvalidoPrecoDeVarejo(false);
                        } else {
                          setIsInvalidoPrecoDeVarejo(true);
                        }
                      }}
                      value={Preco_de_Varejo || ""}
                      name='Preco_de_Varejo' 
                      type="text" 
                      placeholder="0,00"
                      className={`peer rounded-sm border w-full pl-12 pr-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoPrecoDeVarejo ? 'outline-red-500 focus:outline-red-500' : ''}`}
                    />
                  </div>
                  {isInvalidoPrecoDeVarejo && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
                </div>
              </div>
              
              <div className='w-full md:w-3/12 flex flex-col mt-3 mb-4 px-3'>
                <label htmlFor="Custo_de_Compra" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Custo de Compra</label>
                <div className="relative">
                  <div className="relative flex items-center">
                    <span className="absolute left-0 pl-4 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">R$</span>
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
                      className={`peer rounded-sm border w-full pl-12 pr-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCustoDeCompra ? 'outline-red-500 focus:outline-red-500' : ''}`}
                    />
                  </div>
                  {isInvalidoCustoDeCompra && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
                </div>
              </div>

              <div className="relative w-full md:w-3/12 flex flex-col mt-3 mb-4 px-3">
                <label htmlFor="Tamanho" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Tamanho</label>
                <div className="relative">
                  <input
                    onChange={(e) => {
                      const value = e.target.value;
                      const regex = /^[a-zA-Z0-9]*$/;
                      if (value === '' || regex.test(value)){
                        setTamanho(value);
                        setIsInvalidoTamanho(false);
                      } else {
                        setIsInvalidoTamanho(true);
                      }
                    }}
                    value={Tamanho || ""}
                    name='Tamanho'
                    type="text"
                    maxLength={10}
                    className={`peer rounded-sm border w-full p-4 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoTamanho ? 'outline-red-500 focus:outline-red-500' : ''}`}
                  />
                  {isInvalidoTamanho && <span className="absolute text-red-500 text-sm font-medium ml-2 mt-1" style={{ top: '100%', left: '0' }}>Valor inválido</span>}
                </div>
              </div>

              <div className="w-full md:w-3/12 flex flex-col mt-3 mb-4 px-3">
                <label htmlFor="Peso_do_Pacote" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Peso do Pacote</label>
                <div className='relative'>
                  <div className="relative flex items-center">
                    <span className="absolute right-0 pr-4 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">kg</span>
                    <input 
                      onChange={(e) => {
                        const value = e.target.value;
                        const regex = /^\d*(\.\d{0,2})?$/;
                        if (value === "" || regex.test(value.toString())) {
                          setPeso_do_Pacote(value)
                          setIsInvalidoPesoDoPacote(false);
                        } else {
                          setIsInvalidoPesoDoPacote(true)
                        }
                      }}
                      value={Peso_do_Pacote || ""} 
                      name='Peso_do_Pacote' 
                      type="text" 
                      className={`peer rounded-sm border w-full px-4 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoPesoDoPacote ? 'outline-red-500 focus:outline-red-500' : ''}`}
                    />
                  </div>
                  {isInvalidoPesoDoPacote && <span className="absolute text-red-500 text-sm font-medium ml-2 mt-1">Valor inválido</span>}
                </div>
              </div>

              <div className='w-full mt-5 mb-4'>
                <label htmlFor="Tamanho_de_Embalagem" className="block font-medium text-sm text-neutral-700 dark:text-gray-200 pl-3">Tamanho da Embalagem</label>
                <div className='flex'>
                  <div className="relative w-full md:w-3/12">
                    <div className="relative items-center flex mt-3 px-3">
                      <span className="absolute right-1 pr-5 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">cm</span>
                      <input 
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[a-zA-Z0-9]*$/;
                          if (value === "" || regex.test(value)) {
                            setComprimento(value);
                            setIsInvalidoComprimento(false)
                          } else {
                            setIsInvalidoComprimento(true)
                          }
                        }}
                        value={comprimento}
                        name='comprimento' 
                        type="text" 
                        maxLength={10}
                        placeholder="Comprimento"
                        className={`peer rounded-sm border w-full px-4 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoComprimento ? 'outline-red-500 focus:outline-red-500' : ''}`}
                      />
                    </div>
                    {isInvalidoComprimento && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
                  </div>
                  
                  <div className="relative w-full md:w-3/12">
                    <div className="relative items-center flex mt-3 px-3">
                    <span className="absolute right-1 pr-5 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">cm</span>
                      <input 
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[a-zA-Z0-9]*$/;
                          if (value === "" || regex.test(value)) {
                            setAltura(value);
                            setIsInvalidoAltura(false)
                          } else {
                            setIsInvalidoAltura(true)
                          }
                        }}
                        value={altura}
                        name='altura' 
                        type="text" 
                        maxLength={10}
                        placeholder="Altura"
                        className={`peer rounded-sm border w-full px-4 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoAltura ? 'outline-red-500 focus:outline-red-500' : ''}`}
                      />
                    </div>
                    {isInvalidoAltura && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
                  </div>
                    
                  <div className="relative w-full md:w-3/12">
                    <div className="relative items-center flex mt-3 px-3">
                      <span className="absolute right-1 pr-5 py-2 rounded-l-sm focus:rounded-lg font-medium text-neutral-600 dark:text-gray-300">cm</span>
                      <input  
                        onChange={(e) => {
                          const value = e.target.value;
                          const regex = /^[a-zA-Z0-9]*$/;
                          if (value === "" || regex.test(value)) {
                            setLargura(value);
                            setIsInvalidoLargura(false)
                          } else {
                            setIsInvalidoLargura(true)
                          }
                        }}
                        value={largura}
                        name='largura' 
                        type="text" 
                        maxLength={10}
                        placeholder="Largura"
                        className={`peer rounded-sm border w-full px-4 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoLargura ? 'outline-red-500 focus:outline-red-500' : ''}`}
                      />
                    </div>
                    {isInvalidoLargura && <span className="absolute text-red-500 text-sm ml-2 mt-1">Valor inválido</span>}
                  </div>

                  <input 
                    type="hidden" 
                    value={Tamanho_de_Embalagem}
                    name='Tamanho_de_Embalagem'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <hr style={{ border: '1px solid #d1d5db' }} />
          </div>
          
          <div className='w-full flex flex-col mt-5 mb-7'>
            <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Atributo</h3>
            <div className='flex flex-wrap mt-5'>
              <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
                <label htmlFor="Descricao" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Descrição</label>
                <input 
                  onChange={(e) => setDescricao(e.target.value)} 
                  value={Descricao || ""}
                  name='Descricao' 
                  type="text" 
                  className="peer rounded-sm border w-full px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
                />
              </div>

              <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
                <label htmlFor="Marca" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Marca</label>
                <input
                  onChange={(e) => {
                    const value = e.target.value;
                    const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                    if (value === '' || regex.test(value)){
                      setMarca(value);
                      setIsInvalidoMarca(false);
                    } else {
                      setIsInvalidoMarca(true);
                    }
                  }}
                  value={Marca || ""}
                  name='Marca'
                  type="text"
                  maxLength={50}
                  className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoMarca ? 'outline-red-500 focus:outline-red-500' : ''}`}
                />
              </div>

              <div className="w-full mt-3 mb-4 px-3">
                <label htmlFor="Link_do_Fornecedor" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Link do Fornecedor</label>
                <input 
                  onChange={(e) => setLink_do_Fornecedor(e.target.value)} 
                  value={Link_do_Fornecedor || ""}
                  name='Link_do_Fornecedor' 
                  max={255}
                  type="url" 
                  className="peer rounded-sm border w-full px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {secaoAtiva === 'midia' && (
        <div className='flex flex-wrap gap-3 xl:gap-7 my-4 transition-transform duration-500 ease-in'>
          <div className="w-full mb-4">
            <label htmlFor="Link_do_Video" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Link do Video</label>
            <input 
              onChange={(e) => setLink_do_Video(e.target.value)} 
              value={Link_do_Video || ""}
              name='Link_do_Video' 
              type="url" 
              maxLength={255}
              className="peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
            />
          </div>
        </div>
      )}

      {secaoAtiva === 'infoTaxa' && (
        <div className='w-full flex flex-wrap transition-transform duration-500 ease-in'>
          <div className="w-full md:w-1/3 mt-3 mb-4 px-3">
            <label htmlFor="NCM" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">NCM</label>
            <input 
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setNCM(value);
                  setIsInvalidoNCM(false)
                } else {
                  setIsInvalidoNCM(true);
                }
              }}
              value={NCM || ""} 
              name='NCM' 
              type="text" 
              maxLength={20}
              placeholder="NCM"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoNCM ? 'outline-red-500 focus:outline-red-500' : ''}`}
            />
          </div>

          <div className="w-full md:w-1/3 mt-3 mb-4 px-3">
            <label htmlFor="CEST" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">CEST</label>
            <input 
              onChange={(e) => {
                const value = e.target.value;
                const regex = /^[0-9]*$/;
                if (value === "" || regex.test(value)) {
                  setCEST(value);
                  setIsInvalidoCEST(false)
                } else {
                  setIsInvalidoCEST(true);
                }
              }}
              value={CEST || ""}
              name='CEST' 
              type="text" 
              maxLength={20}
              placeholder="CEST"
              className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out ${isInvalidoCEST ? 'outline-red-500 focus:outline-red-500' : ''}`}
            />
          </div>

          <div className="w-full md:w-1/3 mt-3 mb-4 px-3">
            <label htmlFor="Unidade" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Unidade</label>
            <select
              onChange={(e) => setUnidade(e.target.value)}
              value={Unidade || ""}
              name='Unidade'
              className="peer rounded-sm border w-full px-3 py-2 font-medium text-sm text-neutral-700 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
            >
              <option value="">Selecione uma unidade</option>
              <option value="Un">Unidade (Un)</option>
              <option value="Kg">Quilograma (Kg)</option>
              <option value="L">Litro (L)</option>
              <option value="m">Metro (m)</option>
              <option value="m²">Metro Quadrado (m²)</option>
              <option value="m³">Metro Cúbico (m³)</option>
              <option value="Cx">Caixa (Cx)</option>
              <option value="Pct">Pacote (Pct)</option>
              <option value="Par">Par (Par)</option>
              <option value="Dz">Dúzia (Dz)</option>
              <option value="cm">Centímetro (cm)</option>
              <option value="mm">Milímetro (mm)</option>
              <option value="Ton">Tonelada (Ton)</option>
              <option value="Pc">Peça (Pc)</option>
              <option value="Gal">Galão (Gal)</option>
            </select>
          </div>

          <div className="md:w-full mt-3 mb-4 px-3">
            <label htmlFor="Origem" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-200">Origem</label>
            <select
              onMouseOver={(e) => e.currentTarget.classList.add('bg-gray-100')}
              onMouseOut={(e) => e.currentTarget.classList.remove('bg-gray-200')}
              onChange={(e) => setOrigem(e.target.value)}
              value={Origem || ""}
              name='Origem'
              className="peer w-full rounded-sm border px-3 py-2 font-medium text-sm text-neutral-700 dark:text-gray-200 dark:text-gray-200 dark:bg-neutral-600 dark:border-neutral-700 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 dark:outline-gray-600 dark:focus:outline-gray-600 transition-all duration-500 ease-out"
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

      {secaoAtiva === 'mapear' && (
        <div className='flex flex-wrap gap-3 xl:gap-7 my-4 transition-transform duration-500 ease-in'>
          <div className="w-full md:w-full flex flex-col overflow-x-auto">
            <div className='absolute'>
              <button type='button' onClick={handleButtonClick} className='rounded-lg flex items-center justify-center gap-1 text-base py-2 px-3'>
                <span><AddIcon fontSize='small' className='dark:text-gray-200'/></span>
                <span className='text-sm hover:text-black dark:text-gray-200 dark:hover:text-white hover:underline font-medium'>Mapear SKU do anúncio</span>
              </button>
            </div>
            <div className="bg-primaria-900 dark:bg-dark-primaria-900 rounded-2xl flex flex-col h-[400px] mx-auto lg:mx-0 mb-6 mt-14 overflow-x-auto">
              <table className="table-auto min-w-full">
                <thead>
                <tr>
                  <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Valor da variante</th>
                  <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">ID dos anúncios</th>
                  <th className="px-4 py-2 md:py-4 text-sm font-semibold text-center dark:text-gray-200">Nome da loja</th>
                </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 md:py-4 text-center dark:text-gray-200">{product.color}</td>
                      <td className="px-4 py-2 md:py-4 text-center dark:text-gray-200">{product.sku}</td>
                      <td className="px-4 py-2 md:py-4 text-center dark:text-gray-200">Lojinha</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {isModalOpen && (
                <ModalMapearAnuncio onIdProduct={handleIdProduct} onClose={closeModal}/>
              )}
            </div>
          </div>
        </div>
      )}

      <div className='flex justify-between mt-10'>
        <BtnActions
          onClick={handleCriar}
          text='Criar'
          color='success'
          className='w-32'
        />
      </div>
    </div>
  );
}
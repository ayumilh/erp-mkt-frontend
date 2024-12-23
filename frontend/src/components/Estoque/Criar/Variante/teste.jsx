'use client'
import { useState } from 'react';
import axios from 'axios';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import AddIcon from '@mui/icons-material/Add';
import BtnActions from '@/components/Geral/Button/BtnActions';

const steps = [
  {titulo: 'Informações Basica', subtitulo: 'Preencha as informações básicas do seu produto'}, 
  {titulo: 'Venda', subtitulo: 'Defina a marca, garantia e o código GTIN'}, 
  {titulo: 'Informações de Variante', subtitulo: 'Defina a cor, tamanho e outras variações do seu produto'}, 
  {titulo:'Mídia', subtitulo: 'Adicione fotos e vídeos do seu produto'}
];

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

  const [variacoes, setVariacoes] = useState([]);

  const [Marca, setMarca] = useState("");
  const [Peso_do_Pacote, setPeso_do_Pacote] = useState("");
  const [Tamanho_de_Embalagem, setTamanho_de_Embalagem] = useState("");
  const [Link_do_Video, setLink_do_Video] = useState("");
  const [NCM, setNCM] = useState("");
  const [CEST, setCEST] = useState("");
  const [Unidade, setUnidade] = useState("");
  const [Origem, setOrigem] = useState("");

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
      await axios.post(`${process.env.BACKEND_URL}/api/stock/productsVari`, {products})
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
    <div className='lg:flex lg:gap-28'>
      <form className="rounded-xl w-[373px] md:w-[620px] lg:w-[548px] md:p-6 py-5 px-4">
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
                      <input onChange={(e) => setSKU(e.target.value)} name='SKU' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="SKU"/>

                      <input onChange={(e) => setNome_do_Produto(e.target.value)} name='Nome_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Nome do Produto"/>

                      <input onChange={(e) => setApelido_do_Produto(e.target.value)} name='Apelido_do_Produto' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Apelido do Produto"/>

                      <input onChange={(e) => setCategorias(e.target.value)} name='Categorias' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Categorias"/>
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                      <input onChange={(e) => setCodigo_de_Barras(e.target.value)} name='Codigo_de_Barras' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Codigo de Barras"/>

                      <input onChange={(e) => setData_de_Lancamento(e.target.value)} name='Data_de_Lancamento' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Data de Lancamento"/>

                      <input onChange={(e) => setStatus_da_Venda(e.target.value)} name='Status_da_Venda' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Status da Venda"/>
                      
                      <input onChange={(e) => setVendedor(e.target.value)} name='Vendedor' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Vendedor"/>

                      <input onChange={(e) => setPreco_de_Varejo(e.target.value)} name='Preco_de_Varejo' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Preco de Varejo"/>

                      <input onChange={(e) => setCusto_de_Compra(e.target.value)} name='Custo_de_Compra' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Custo de Compra"/>

                      <input onChange={(e) => setDescricao(e.target.value)} name='Descricao' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Descricao"/>

                      <input onChange={(e) => setLink_do_Fornecedor(e.target.value)} name='Link_do_Fornecedor' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Link do Fornecedor"/>
                    </div>
                  )}
                  {index === 2 && (
                    <div>
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
                        <span><AddIcon className='w-5 h-5'/></span>
                        <span className='text-base hover:text-black'>Adicionar variação</span>
                      </button>
                    </div>
                  </div>
                  )}
                  {index === 3 && (
                    <div className="flex flex-col gap-6 mt-8 mb-7 ml-4">
                      <input onChange={(e) => setMarca(e.target.value)} name='Marca' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Marca"/>

                      <input onChange={(e) => setPeso_do_Pacote(e.target.value)} name='Peso_do_Pacote' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Peso do Pacote"/>
                      
                      <input onChange={(e) => setTamanho_de_Embalagem(e.target.value)} name='Tamanho_de_Embalagem' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="text" placeholder="Tamanho de Embalagem"/>

                      <input onChange={(e) => setLink_do_Video(e.target.value)} name='Link_do_Video' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Link do Video"/>

                      <input onChange={(e) => setNCM(e.target.value)} name='NCM' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="NCM"/>

                      <input onChange={(e) => setCEST(e.target.value)} name='CEST' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="CEST"/>

                      <input onChange={(e) => setUnidade(e.target.value)} name='Unidade' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Unidade"/>

                      <input onChange={(e) => setOrigem(e.target.value)} name='Origem' className="bg-primaria-900 shadow-input w-full h-12 rounded-lg overflow-hidden text-sm md:text-base font-normal pl-4 py-2 focus:outline-none focus:ring-1 focus:ring-[rgba(211,211,211,0.4)] focus:ring-offset-0" type="url" placeholder="Origem"/>
                    </div>
                  )}
                </>)}
              </div>
            </Step>
          ))}
        </Stepper>
        <div className='flex gap-3 my-9'>
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
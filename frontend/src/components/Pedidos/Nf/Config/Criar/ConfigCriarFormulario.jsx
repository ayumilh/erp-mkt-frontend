'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import BtnActions from '@/components/Geral/Button/BtnActions';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function ConfigCriarFormulario() {
  const [cnpj, setCnpj] = useState('');
  const [nome_da_empresa, setNome_da_empresa] = useState('');
  const [tipo_de_tributacao, setTipoDeTributacao] = useState('');
  const [tipo_de_empresa, setTipoDeEmpresa] = useState('');
  const [ie, setIe] = useState('');
  const [email, setEmail] = useState('');

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [isInvalidoCnpj, setIsInvalidoCnpj] = useState(false);
  const [isInvalidoNomeDaEmpresa, setIsInvalidoNomeDaEmpresa] = useState(false);
  const [isInvalidoTipoDeTributacao, setIsInvalidoTipoDeTributacao] = useState(false);
  const [isInvalidoTipoDeEmpresa, setIsInvalidoTipoDeEmpresa] = useState(false);
  const [isInvalidoIe, setIsInvalidoIe] = useState(false);
  const [isInvalidoEmail, setIsInvalidoEmail] = useState(false);

  const [isInvalidoCep, setIsInvalidoCep] = useState(false);
  const [isInvalidoEndereco, setIsInvalidoEndereco] = useState(false);
  const [isInvalidoNumero, setIsInvalidoNumero] = useState(false);
  const [isInvalidoBairro, setIsInvalidoBairro] = useState(false);
  const [isInvalidoCidade, setIsInvalidoCidade] = useState(false);
  const [isInvalidoEstado, setIsInvalidoEstado] = useState(false);

  const [statusRequestSync, setStatusRequestSync] = useState('');

  const data = {
    cnpj,
    nome_da_empresa,
    tipo_de_tributacao,
    tipo_de_empresa,
    ie,
    email,
    cep,
    endereco,
    numero,
    bairro,
    cidade,
    estado
  };

  const handleCriar = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      await axios.post("https://erp-mkt.vercel.app/api/config/enterprise", {data})
      setStatusRequestSync(true)
    } catch (error) {
      setStatusRequestSync(false)
    }
  }

  return (
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10'>
      <h3 className='text-neutral-800 text-xl font-medium '>Criar configuração</h3>

      <div className='flex flex-wrap transition-transform duration-500 ease-in'>
        <div className='w-full flex flex-col mt-5 mb-7'>
          <h3 className='text-neutral-800 text-lg font-semibold'>Informações gerais</h3>
          <div className='w-full flex flex-wrap mt-5'>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="cnpj" className="block mb-1 font-medium text-sm text-neutral-700">CNPJ <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9.-]*$/;
                  if (value === '' || regex.test(value)) {
                    setCnpj(value);
                    setIsInvalidoCnpj(false);
                  } else {
                    setIsInvalidoCnpj(true);
                  }
                }}
                value={cnpj || ""}
                maxLength={18}
                name='cnpj'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCnpj ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="nome_da_empresa" className="block mb-1 font-medium text-sm text-neutral-700">Nome da Empresa <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setNome_da_empresa(value);
                    setIsInvalidoNomeDaEmpresa(false);
                  } else {
                    setIsInvalidoNomeDaEmpresa(true);
                  }
                }}
                value={nome_da_empresa || ""}
                maxLength={255}
                name='nome_da_empresa'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNomeDaEmpresa ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="tipo_de_empresa" className="block mb-1 font-medium text-sm text-neutral-700">Tipo de Empresa <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setTipoDeEmpresa(value);
                    setIsInvalidoTipoDeEmpresa(false);
                  } else {
                    setIsInvalidoTipoDeEmpresa(true);
                  }
                }}
                value={tipo_de_empresa || ""}
                maxLength={255}
                name='tipo_de_empresa'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTipoDeEmpresa ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="tipo_de_tributacao" className="block mb-1 font-medium text-sm text-neutral-700">Tipo de Tributação <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setTipoDeTributacao(value);
                    setIsInvalidoTipoDeTributacao(false);
                  } else {
                    setIsInvalidoTipoDeTributacao(true);
                  }
                }}
                value={tipo_de_tributacao || ""}
                maxLength={255}
                name='tipo_de_tributacao'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTipoDeTributacao ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="ie" className="block mb-1 font-medium text-sm text-neutral-700">IE <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9.-]*$/;
                  if (value === '' || regex.test(value)) {
                    setIe(value);
                    setIsInvalidoIe(false);
                  } else {
                    setIsInvalidoIe(true);
                  }
                }}
                value={ie || ""}
                maxLength={18}
                name='ie'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoIe ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="email" className="block mb-1 font-medium text-sm text-neutral-700">Email <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9@._-]*$/;
                  if (value === '' || regex.test(value)) {
                    setEmail(value);
                    setIsInvalidoEmail(false);
                  } else {
                    setIsInvalidoEmail(true);
                  }
                }}
                value={email || ""}
                maxLength={255}
                name='email'
                required
                type="email"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEmail ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>
          </div>
        </div>

        <div className='w-full'>
          <hr style={{ border: '1px solid #d1d5db' }} />
        </div>

        <div className='w-full flex flex-col mt-5'>
          <h3 className='text-neutral-800 text-lg font-semibold'>Endereço</h3>

          <div className='w-full flex flex-wrap mt-5'>
            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="cep" className="block mb-1 font-medium text-sm text-neutral-700">CEP <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9.-]*$/;
                  if (value === '' || regex.test(value)) {
                    setCep(value);
                    setIsInvalidoCep(false);
                  } else {
                    setIsInvalidoCep(true);
                  }
                }}
                value={cep || ""}
                maxLength={10}
                name='cep'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCep ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="endereco" className="block mb-1 font-medium text-sm text-neutral-700">Endereço <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setEndereco(value);
                    setIsInvalidoEndereco(false);
                  } else {
                    setIsInvalidoEndereco(true);
                  }
                }}
                value={endereco || ""}
                maxLength={255}
                name='endereco'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEndereco ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="numero" className="block mb-1 font-medium text-sm text-neutral-700">Número <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setNumero(value);
                    setIsInvalidoNumero(false);
                  } else {
                    setIsInvalidoNumero(true);
                  }
                }}
                value={numero || ""}
                maxLength={10}
                name='numero'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNumero ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="bairro" className="block mb-1 font-medium text-sm text-neutral-700">Bairro <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setBairro(value);
                    setIsInvalidoBairro(false);
                  } else {
                    setIsInvalidoBairro(true);
                  }
                }}
                value={bairro || ""}
                maxLength={255}
                name='bairro'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoBairro ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="cidade" className="block mb-1 font-medium text-sm text-neutral-700">Cidade <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setCidade(value);
                    setIsInvalidoCidade(false);
                  } else {
                    setIsInvalidoCidade(true);
                  }
                }}
                value={cidade || ""}
                maxLength={255}
                name='cidade'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCidade ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="estado" className="block mb-1 font-medium text-sm text-neutral-700">Estado <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setEstado(value);
                    setIsInvalidoEstado(false);
                  } else {
                    setIsInvalidoEstado(true);
                  }
                }}
                value={estado || ""}
                maxLength={255}
                name='estado'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoEstado ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>
          </div>

        </div>
      </div>

      <div className='flex justify-between mt-10'>
        <BtnActions
          onClick={handleCriar}
          title='Criar'
          color='ativado'
        />
      </div>

      {
        statusRequestSync === true && <SuccessNotification message='Configuração criada com sucesso!' />
      }
      {
        statusRequestSync === false && <ErrorNotification message='Não foi possível criar a configuração!' />
      }
    </div>
  );
}
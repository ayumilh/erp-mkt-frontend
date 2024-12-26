'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import BtnActions from '@/components/Geral/Button/BtnActions';
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export default function ConfigCriarFormulario() {
  const [cnpj, setCnpj] = useState('');
  const [serial_number, setSerial_number] = useState(1);
  const [company_name, setCompany_name] = useState('');
  const [tax_type, setTax_type] = useState('');
  const [company_type, setCompany_type] = useState('');
  const [state_registration, setState_registration] = useState('');
  const [email, setEmail] = useState('');

  const [postal_code, setPostal_code] = useState('');
  const [address, setAddress] = useState('');
  const [address_number, setAddress_number] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [isInvalidoCnpj, setIsInvalidoCnpj] = useState(false);
  const [isInvalidoSerial_number, setIsInvalidoSerial_number] = useState(false);
  const [isInvalidoCompany_name, setIsInvalidoCompany_name] = useState(false);
  const [isInvalidoTax_type, setIsInvalidoTax_type] = useState(false);
  const [isInvalidoCompany_type, setIsInvalidoCompany_type] = useState(false);
  const [isInvalidoState_registration, setIsInvalidoState_registration] = useState(false);
  const [isInvalidoEmail, setIsInvalidoEmail] = useState(false);

  const [isInvalidoPostal_code, setIsInvalidoPostal_code] = useState(false);
  const [isInvalidoAddress, setIsInvalidoAddress] = useState(false);
  const [isInvalidoAddress_number, setIsInvalidoAddress_number] = useState(false);
  const [isInvalidoNeighborhood, setIsInvalidoNeighborhood] = useState(false);
  const [isInvalidoCity, setIsInvalidoCity] = useState(false);
  const [isInvalidoState, setIsInvalidoState] = useState(false);

  const [statusRequestSync, setStatusRequestSync] = useState('');

  const data = {
    cnpj,
    serial_number,
    company_name,
    tax_type,
    company_type,
    state_registration,
    email,
    postal_code,
    address,
    address_number,
    neighborhood,
    city,
    state
  };

  const handleCriar = async (e) => {
    e.preventDefault()
    console.log(data)
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config/enterprise`, data)
      setStatusRequestSync(true)
    } catch (error) {
      setStatusRequestSync(false)
    }
  }

  return (
    <div className='w-full xl:max-w-screen-lg flex flex-col mt-10'>
      <h3 className='text-neutral-800 dark:text-gray-200 text-xl font-medium '>Criar configuração</h3>

      <div className='flex flex-wrap transition-transform duration-500 ease-in'>
        <div className='w-full flex flex-col mt-5 mb-7'>
          <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Informações gerais</h3>
          <div className='w-full flex flex-wrap mt-5'>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="cnpj" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">CNPJ <span className='text-red-600'>*</span></label>
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

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="serial_number" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Número de Série <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setSerial_number(value);
                    setIsInvalidoSerial_number(false);
                  } else {
                    setIsInvalidoSerial_number(true);
                  }
                }}
                value={serial_number || ""}
                maxLength={10}
                name='serial_number'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="company_name" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Nome da Empresa <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setCompany_name(value);
                    setIsInvalidoCompany_name(false);
                  } else {
                    setIsInvalidoCompany_name(true);
                  }
                }}
                value={company_name || ""}
                maxLength={255}
                name='company_name'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCompany_name ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="company_type" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Tipo de Empresa <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setCompany_type(value);
                    setIsInvalidoCompany_type(false);
                  } else {
                    setIsInvalidoCompany_type(true);
                  }
                }}
                value={company_type || ""}
                maxLength={255}
                name='company_type'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCompany_type ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="tax_type" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Tipo de Tributação <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setTax_type(value);
                    setIsInvalidoTax_type(false);
                  } else {
                    setIsInvalidoTax_type(true);
                  }
                }}
                value={tax_type || ""}
                maxLength={255}
                name='tax_type'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoTax_type ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="state_registration" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">IE <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9.-]*$/;
                  if (value === '' || regex.test(value)) {
                    setState_registration(value);
                    setIsInvalidoState_registration(false);
                  } else {
                    setIsInvalidoState_registration(true);
                  }
                }}
                value={state_registration || ""}
                maxLength={18}
                name='state_registration'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoState_registration ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="email" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Email <span className='text-red-600'>*</span></label>
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
          <h3 className='text-neutral-800 dark:text-gray-200 text-lg font-semibold'>Endereço</h3>

          <div className='w-full flex flex-wrap mt-5'>
            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="postal_code" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">CEP <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9.-]*$/;
                  if (value === '' || regex.test(value)) {
                    setPostal_code(value);
                    setIsInvalidoPostal_code(false);
                  } else {
                    setIsInvalidoPostal_code(true);
                  }
                }}
                value={postal_code || ""}
                maxLength={10}
                name='postal_code'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoPostal_code ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-3/5 mt-3 mb-4 px-3">
              <label htmlFor="address" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Endereço <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setAddress(value);
                    setIsInvalidoAddress(false);
                  } else {
                    setIsInvalidoAddress(true);
                  }
                }}
                value={address || ""}
                maxLength={255}
                name='address'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoAddress ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="address_number" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Número <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[0-9]*$/;
                  if (value === '' || regex.test(value)) {
                    setAddress_number(value);
                    setIsInvalidoAddress_number(false);
                  } else {
                    setIsInvalidoAddress_number(true);
                  }
                }}
                value={address_number || ""}
                maxLength={10}
                name='address_number'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoAddress_number ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="neighborhood" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Bairro <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-Z0-9À-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setNeighborhood(value);
                    setIsInvalidoNeighborhood(false);
                  } else {
                    setIsInvalidoNeighborhood(true);
                  }
                }}
                value={neighborhood || ""}
                maxLength={255}
                name='neighborhood'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoNeighborhood ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-2/5 mt-3 mb-4 px-3">
              <label htmlFor="city" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Cidade <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setCity(value);
                    setIsInvalidoCity(false);
                  } else {
                    setIsInvalidoCity(true);
                  }
                }}
                value={city || ""}
                maxLength={255}
                name='city'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoCity ? 'outline-red-500 focus:outline-red-500' : ''}`}
              />
            </div>

            <div className="w-full md:w-1/5 mt-3 mb-4 px-3">
              <label htmlFor="state" className="block mb-1 font-medium text-sm text-neutral-700 dark:text-gray-300">Estado <span className='text-red-600'>*</span></label>
              <input
                onChange={(e) => {
                  const value = e.target.value;
                  const regex = /^[a-zA-ZÀ-ÿ\s]*$/;
                  if (value === '' || regex.test(value)) {
                    setState(value);
                    setIsInvalidoState(false);
                  } else {
                    setIsInvalidoState(true);
                  }
                }}
                value={state || ""}
                maxLength={255}
                name='state'
                required
                type="text"
                className={`peer rounded-sm w-full border px-3 py-2 font-medium text-neutral-600 focus:rounded-lg focus:outline-2 outline-blue-400 focus:outline-blue-400 transition-all duration-500 ease-out ${isInvalidoState ? 'outline-red-500 focus:outline-red-500' : ''}`}
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
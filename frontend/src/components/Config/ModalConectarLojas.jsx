import { useEffect, useState } from 'react';
import axios from 'axios';

const ModalConectarLojas = ({ onClose, drawerClose }) => {
  const [nomeLoja, setNomeLoja] = useState('');
  const [plataforma, setPlataforma] = useState('');
  
  const sendDataStore = (e) => {
    e.preventDefault();
  
    const clientId = 8470533338689335;
    const redirectUri = encodeURIComponent('https://erp-mkt-frontend.vercel.app/authmercado');
    const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
  
    window.location.href = authUrl;
  }
  
  
  useEffect(() => {
    drawerClose();
  }, [drawerClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={onClose}>
      <div className="relative flex-col top-60 mx-auto py-5 px-6 border max-w-min rounded-md bg-primaria-900 shadow-lg" onClick={e => e.stopPropagation()}>
        <div className='flex items-center justify-between'>
          <h3 className="text-lg text-gray-800 font-medium">Conectar Conta</h3>
          <button onClick={onClose} className="text-gray-800 hover:text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className='px-2 pt-7 pb-4 w-full whitespace-normal text-neutral-700 text-sm'>Insira os detalhes da sua loja para conectá-la à nossa plataforma.</p>
        <form onSubmit={handleSubmit} className='pt-0 pb-4 px-2'>
          <div className='flex flex-col'>
            <div className='flex gap-3'>
              <label className="w-28 text-sm text-gray-800">Nome da Loja</label>
              <input
                type="text"
                placeholder="Nome da Loja"
                value={nomeLoja}
                onChange={(e) => setNomeLoja(e.target.value)}
                className="w-60 p-2 border rounded-md mb-4 text-sm"
              />
            </div>
            <div className="flex gap-3">
              <label className="w-28 text-sm text-gray-800">Plataforma</label>
              <select
                value={plataforma}
                onChange={(e) => setPlataforma(e.target.value)}
                className="w-60 p-2 border rounded-md mb-4 text-sm"
              >
                <option value="">Selecione a Plataforma</option>
                <option value="Mercado Livre">Mercado Livre</option>
                <option value="Amazon">Amazon</option>
                <option value="Shopee">Shopee</option>
                <option value="Magalu" className='hover:bg-gray-200'>Magalu</option>
              </select>
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <button onClick={sendDataStore} className="px-4 py-2 bg-segundaria-900 text-white rounded-md text-sm">Conectar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalConectarLojas;
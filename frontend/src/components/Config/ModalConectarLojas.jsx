'use client';
import { useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

const ModalConectarLojas = ({ onClose, drawerClose }) => {
  const [selectedStore, setSelectedStore] = useState('Mercado Livre');

  const handleStoreChange = (event) => {
    setSelectedStore(event.target.value);
  };

  const [nomeLoja, setNomeLoja] = useState("");

  const sendDataStore = () => {
    let authUrl = '';
    if (selectedStore === 'Mercado Livre') {
      const clientId = 5338784930427680;
      const redirectUri = "https://erp-mkt-frontend.vercel.app/authmercado/"
      authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;

    } else if (selectedStore === 'Shopee') {
      const partnerId = "2009306";
      const partnerKey = "656451597757546d506e525959634269464f4a76534a48415765586978536653";
      const redirectUri = "https://erp-mkt-frontend.vercel.app/authshopee";

      const generateSign = (partnerId, path, timestamp) => {
        const baseString = `${partnerId}${path}${timestamp}`;
        return CryptoJS.HmacSHA256(baseString, partnerKey).toString(CryptoJS.enc.Hex);
      };

      try {
        const timestamp = Math.floor(Date.now() / 1000);
        const path = '/api/v2/shop/auth_partner';
        const sign = generateSign(partnerId, path, timestamp);
    
        const shopeeAuthUrl = `https://partner.shopeemobile.com${path}?partner_id=${partnerId}&timestamp=${timestamp}&sign=${sign}&redirect=${encodeURIComponent(redirectUri)}`;
        authUrl = shopeeAuthUrl;
      } catch (error) {
        console.error('Erro ao gerar URL de autenticação da Shopee:', error);
      }
    }
    window.location.href = authUrl;
  };

  const storeNomeLoja = () => {
    localStorage.setItem("nome_loja", nomeLoja);
  };

  useEffect(() => {
    if (drawerClose) {
      drawerClose();
    }
  }, [drawerClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    storeNomeLoja();
    sendDataStore();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-10 bg-neutral-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative flex-col top-60 mx-auto py-5 px-6 border max-w-min rounded-md bg-primaria-900 dark:bg-dark-primaria-900 shadow-lg dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-neutral-800 dark:text-gray-300 font-medium">Conectar conta</h3>
          <button
            onClick={onClose}
            className="text-neutral-800 hover:text-neutral-600"
          >
            <svg
              className="h-6 w-6 dark:text-gray-300 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <p className="px-2 pt-7 pb-4 w-full whitespace-normal text-neutral-700 dark:text-gray-200 text-sm">
          Insira os detalhes da sua loja para conectá-la à nossa plataforma.
        </p>
        <form onSubmit={handleSubmit} className="pt-0 pb-4 px-2">
          <div className="flex flex-col">
            <div className="flex gap-3">
              <label className="w-28 text-sm text-neutral-800 dark:text-gray-200">Nome da Loja</label>
              <input
                type="text"
                placeholder="Nome da Loja"
                value={nomeLoja || ""}
                onChange={(e) => setNomeLoja(e.target.value)}
                className="w-60 p-2 border rounded-md mb-4 text-sm"
              />
            </div>
            <div className="flex gap-3">
              <label className="w-28 text-sm text-neutral-800 dark:text-gray-200">Plataforma</label>
              <select
                value={selectedStore}
                onChange={handleStoreChange}
                className="w-60 p-2 border rounded-md mb-4 text-sm"
              >
                <option value="">Selecione a Plataforma</option>
                <option value="Mercado Livre">Mercado Livre</option>
                <option value="Amazon">Amazon</option>
                <option value="Shopee">Shopee</option>
                <option value="Magalu" className="hover:bg-neutral-200">
                  Magalu
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-segundaria-900 text-white rounded-md text-sm"
            >
              Conectar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalConectarLojas;

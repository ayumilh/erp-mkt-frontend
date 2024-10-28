'use client'
import axios from "axios";
import { useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import BtnActive from "@/components/Geral/Button/BtnActive";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export const BtnSincronizarPerguntas = () => {
  const [loading, setLoading] = useState(false);
  const [statusRequestSync, setStatusRequestSync] = useState(null);

  const handleSync = async () => {
    setLoading(true);
    
    const userId = searchUserId();
    if (!userId) return

    try {
      const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/questions", {
        params: { userId }
    });
      if (response.status === 200) {
        setStatusRequestSync(true);
      }
    } catch (error) {
      console.error(error);
      setStatusRequestSync(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative inline-block text-left">
      <BtnActive
        title="Sincronizar"
        onClick={handleSync}
        size='btnHeader'
        width='full'
        disabled={loading}
      />
      {/* <button
        type="button"
        onClick={handleSyncOrders}
        className="w-[186px] flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        {loading ? <CircularProgress size={18} className="text-white" /> : <span className="text-white text-sm">Sincronizar</span>}
      </button> */}
      {statusRequestSync === true && <SuccessNotification message="Perguntas sincronizadas com sucesso" />}
      {statusRequestSync === false && <ErrorNotification message="Erro ao sincronizar perguntas" />}
    </div>
  )
}
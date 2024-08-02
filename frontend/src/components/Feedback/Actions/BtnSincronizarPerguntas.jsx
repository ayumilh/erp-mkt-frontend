'use client'
import axios from "axios";

export const BtnSincronizarPerguntas = () => {
  const handleSyncOrders = async () => {
    try {
      const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/questions");
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="relative inline-block text-left">
      <button 
        type="button" 
        onClick={handleSyncOrders}
        className="w-full flex items-center justify-center bg-gradient-to-r from-gradient-start to-gradient-end hover:bg-gradient-to-b hover:from-gradient-start-hover hover:to-gradient-end-hover transition-all duration-700 ease-out rounded-xl text-white hover:text-slate-50 px-3 xl:px-4 py-2" 
        id="options-menu" 
        aria-haspopup="true" 
        aria-expanded="true" 
      >
        <span className="text-white text-sm">Sincronizar perguntas</span>
      </button>
  </div>
  )
}

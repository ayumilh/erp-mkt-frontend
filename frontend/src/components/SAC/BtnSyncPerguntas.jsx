'use client';
import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";

export const BtnSyncPerguntas = () => {
  const handleSyncOrders = async () => {
    try {
      const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/questions");
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
      <BtnActive title="Sincronizar perguntas" onClick={handleSyncOrders} size='btnHeader' width='full'/>
    </div>
  )
}

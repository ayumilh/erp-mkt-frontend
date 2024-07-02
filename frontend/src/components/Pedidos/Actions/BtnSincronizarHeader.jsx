import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";

export const BtnSincronizarHeader = ({statusRequestSync, setStatusRequestSync}) => {
  const handleSyncOrders = async () => {
    try {
      const response = await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/ordersSync");
      if (response.data && Array.isArray(response.data.data)) {
        setStatusRequestSync(true);
      } else {
        console.error('Não foi possível sincronizar os pedidos');
        setStatusRequestSync(false);
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      setStatusRequestSync(false);
    }
  }
  return (
    <div>
      <BtnActive title="Sincronizar" onClick={handleSyncOrders} size='btnHeader' width='full'/>
    </div>
  )
}

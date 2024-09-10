import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";

export const BtnSincronizarPedidos = ({ statusRequestSync, setStatusRequestSync }) => {
    const handleSyncOrders = async () => {
        try {
            await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/ordersSync");
            setStatusRequestSync(true);
        } catch (error) {
            setStatusRequestSync(false);
        }
    }
    return (
        <div>
            <BtnActive title="Sincronizar" onClick={handleSyncOrders} size='btnHeader' width='full' />
        </div>
    )
}

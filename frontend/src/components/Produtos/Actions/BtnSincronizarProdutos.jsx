import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export const BtnSincronizarProdutos = ({ statusRequestSync, setStatusRequestSync }) => {
    const handleSyncOrders = async () => {
        try {
            await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/productsSync");
            setStatusRequestSync(true);
        } catch (error) {
            setStatusRequestSync(false);
        }
    }
    return (
        <div>
            <BtnActive title="Sincronizar" onClick={handleSyncOrders} size='btnHeader' width='full' />
            {
                statusRequestSync === true && <SuccessNotification message='Produtos sincronizados com sucesso!' />
            }
            {
                statusRequestSync === false && <ErrorNotification message='Não foi possível sincronizar os produtos!' />
            }
        </div>
    )
}

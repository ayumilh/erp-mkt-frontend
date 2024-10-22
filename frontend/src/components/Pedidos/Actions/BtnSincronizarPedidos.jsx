import { useState } from "react";
import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import Cookies from "js-cookie";

export const BtnSincronizarPedidos = ({ statusRequestSync, setStatusRequestSync }) => {
    const [loading, setLoading] = useState(false);
    const handleSyncOrders = async () => {
        const userId = Cookies.get("userId");
        if(!userId) {
            setStatusRequestSync(false);
            console.log("UserId não encontrado");
            return;
        } else {
            console.log("UserId encontrado:" + userId);
        }

        setLoading(true);

        const maxRetries = 3;
        const retryDelay = 2000;
    
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/ordersSync");
                setStatusRequestSync(true);
                return;
            } catch (error) {
                if (attempt === maxRetries) {
                    setStatusRequestSync(false);
                    setLoading(false);
                    return;
                }
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
        }
    };

    return (
        <div>
            <BtnActive 
                title="Sincronizar" 
                onClick={handleSyncOrders} 
                size='btnHeader' 
                width='full' 
                disabled={loading}
            />
            {
                statusRequestSync === true && <SuccessNotification message='Produtos sincronizados com sucesso!' />
            }
            {
                statusRequestSync === false && <ErrorNotification message='Não foi possível sincronizar os produtos!' />
            }
        </div>
    )
}

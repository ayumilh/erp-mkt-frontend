import { useState } from "react";
import { searchUserId } from '@/utils/searchUserId';
import axios from "axios";
import BtnActive from "@/components/Geral/Button/BtnActive";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';

export const BtnSincronizarPedidos = ({ statusRequestSync, setStatusRequestSync }) => {
    const [loading, setLoading] = useState(false);
    
    const handleSyncOrders = async () => {
        setLoading(true);
        const userId = searchUserId();
        if (!userId) return;

        const maxRetries = 3;
        const retryDelay = 2000;
    
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/ordersSync`, {
                    params: { userId }
                });
                setStatusRequestSync(true);
                setLoading(false);
                window.location.reload();
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

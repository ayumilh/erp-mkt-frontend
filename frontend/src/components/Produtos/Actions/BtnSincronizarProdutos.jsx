import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import BtnActive from "@/components/Geral/Button/BtnActive";
import SuccessNotification from '@/components/Geral/Notifications/SuccessNotification';
import ErrorNotification from '@/components/Geral/Notifications/ErrorNotification';
import Cookies from "js-cookie";

export const BtnSincronizarProdutos = ({ statusRequestSync, setStatusRequestSync }) => {
    const [loading, setLoading] = useState(false);

    const searchUserId = () => {
        const tokenId = Cookies.get("userId") ? JSON.parse(Cookies.get("userId")) : null;
        if (tokenId && tokenId.token) {
            try {
                const decodedToken = jwtDecode(tokenId.token);
                const userId = decodedToken.userid;
                return userId;
            } catch (error) {
                console.error(error);
                setStatusRequestSync(false);
                return;
            }
        } else {
            setStatusRequestSync(false);
            return;
        }
    }


    const handleSyncOrders = async () => {
        const userId = searchUserId();
        if (!userId) {
            return;
        } else {
            console.log(userId);
        }

        setLoading(true);
        const maxRetries = 3;
        const retryDelay = 2000;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                await axios.get("https://erp-mkt.vercel.app/api/mercadolivre/productsSync", {
                    params: { userId }
                });
                setStatusRequestSync(true);
                setLoading(false);
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
    }

    return (
        <div>
            <BtnActive title="Sincronizar" onClick={handleSyncOrders} size='btnHeader' width='full' disabled={loading} />
            {
                statusRequestSync === true && <SuccessNotification message='Produtos sincronizados com sucesso!' />
            }
            {
                statusRequestSync === false && <ErrorNotification message='Não foi possível sincronizar os produtos!' />
            }
        </div>
    )
}

import axios from 'axios';
import { searchUserId } from './searchUserId';

export const fetchOrders = async () => {
    const userId = searchUserId();
    if (!userId) return null;

    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/orders`, {
            params: { userId }
        });
        return response.data.orders;
    } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        return null;
    }
};
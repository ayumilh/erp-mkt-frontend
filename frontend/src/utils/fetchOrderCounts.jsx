import axios from 'axios';
import { searchUserId } from './searchUserId';

export const fetchOrderCounts = async () => {
    const userId = searchUserId();
    if (!userId) return null;

    try {
        const response = await axios.get(`${process.env.BACKEND_URL}/api/mercadolivre/count-orders`, {
            params: { userId }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar a quantidade de pedidos:', error);
        return null;
    }
};
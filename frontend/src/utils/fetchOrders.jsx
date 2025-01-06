import axios from 'axios';
import { searchUserId } from './searchUserId';

export const fetchOrders = async (searchTerm = '') => {
    const userId = searchUserId();
    if (!userId) return null;

    try {
        const params = { userId };
        if (searchTerm && searchTerm.trim() !== '') {
            params.searchTerm = searchTerm.toLowerCase();
        }
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/orders`, { params });
        return response.data.orders;
    } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        return null;
    }
};
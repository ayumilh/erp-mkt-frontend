import axios from 'axios';
import { searchUserId } from './searchUserId';

export const fetchOrders = async (searchTerm = '', searchColumn, filteredOrders) => {
    const userId = searchUserId();
    if (!userId) return null;

    try {
        const params = { userId };
        if (searchTerm && searchTerm.trim() !== '') {
            params.searchTerm = searchTerm.toLowerCase();
            params.searchColumn = searchColumn;
        }

        if (filteredOrders.precoMin) {
            params.precoMin = parseFloat(filteredOrders.precoMin);
          }
          if (filteredOrders.precoMax) {
            params.precoMax = parseFloat(filteredOrders.precoMax);
          }
          console.log('params:', params);
        
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mercadolivre/orders`, { params });
        console.log('response:', response.data.orders);
        return response.data.orders;
    } catch (error) {
        console.error('Erro ao buscar os pedidos:', error);
        return null;
    }
};
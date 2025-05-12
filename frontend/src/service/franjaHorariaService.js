import api from './axios';

export const obtenerFranjasHorarias = async () => {
    try {
        const response = await api.get('/franjas');
        return response.data;
    } catch (error) {
        console.error('Error al obtener franjas horarias', error);
        return [];
    }
};

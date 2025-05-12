import api from './axios';

// Obtener todas las salas
export const obtenerSalas = async () => {
    const response = await api.get('/salas');
    return response.data;
};
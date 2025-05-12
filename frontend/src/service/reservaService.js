import api from './axios';

export const crearReserva = async (formData) => {
    return await api.post('/reservas', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
};

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/sensores',
});

// Obtener sensores con filtro opcional por tipo
export const getSensores = async (tipo = '') => {
  const url = tipo ? `/?tipo=${tipo}` : '/';
  const response = await api.get(url);
  return response.data;
};

export default api;

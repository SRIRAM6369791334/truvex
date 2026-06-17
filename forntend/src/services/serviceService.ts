import apiClient from '../apiClient';

export const getServices = async (params?: { category?: string | number; search?: string }) => {
  const response = await apiClient.get('/services', { params });
  return response.data;
};

export const getServiceById = async (id: string | number) => {
  const response = await apiClient.get(`/services/${id}`);
  return response.data;
};

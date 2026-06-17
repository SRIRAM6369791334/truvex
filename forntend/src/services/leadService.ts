import apiClient from '../apiClient';

export interface ServiceLeadData {
  service_id?: string | number;
  full_name: string;
  mobile: string;
  email?: string;
  requirement_details?: string;
  quantity?: number | string;
  unit?: string;
  delivery_pincode?: string;
}

export const submitServiceLead = async (data: ServiceLeadData) => {
  const response = await apiClient.post('/service-leads', data);
  return response.data;
};

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

export interface ContactFormData {
  full_name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  message: string;
}

export const submitContactForm = async (data: ContactFormData) => {
  const response = await apiClient.post('/contacts', data);
  return response.data;
};

export interface RFQFormData {
  product_name: string;
  quantity: string;
  delivery_city: string;
  mobile: string;
  specifications?: string;
}

export const submitRFQ = async (data: RFQFormData) => {
  const response = await apiClient.post('/rfq', data);
  return response.data;
};

export interface EnquiryFormData {
  product_service: string;
  quantity_budget: string;
  mobile: string;
  requirement_details?: string;
  source_page?: string;
}

export const submitEnquiry = async (data: EnquiryFormData) => {
  const response = await apiClient.post('/enquiries', data);
  return response.data;
};

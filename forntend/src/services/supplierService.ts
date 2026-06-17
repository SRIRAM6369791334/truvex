import apiClient from '../apiClient';

export interface SupplierRegistrationData {
  company_name: string;
  contact_person: string;
  mobile: string;
  email?: string;
  core_product_segment: string;
  company_details: string;
  category_id?: string | number;
  factory_images?: File[];
}

export const registerSupplier = async (data: SupplierRegistrationData) => {
  const formData = new FormData();
  
  formData.append('company_name', data.company_name);
  formData.append('contact_person', data.contact_person);
  formData.append('mobile', data.mobile);
  if (data.email) {
    formData.append('email', data.email);
  }
  formData.append('core_product_segment', data.core_product_segment);
  formData.append('company_details', data.company_details);
  if (data.category_id !== undefined && data.category_id !== null) {
    formData.append('category_id', String(data.category_id));
  }
  
  if (data.factory_images) {
    data.factory_images.forEach((file) => {
      formData.append('factory_images', file);
    });
  }

  const response = await apiClient.post('/suppliers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

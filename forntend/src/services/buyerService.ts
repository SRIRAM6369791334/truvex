import apiClient from '../apiClient';

export interface BuyerFormData {
  buyer_name: string;
  phone: string;
  address: string;
  requirement_details: string;
  estimated_budget?: string;
  reference_image?: File | null;
}

export const submitBuyerForm = async (data: BuyerFormData) => {
  const formData = new FormData();
  
  formData.append('buyer_name', data.buyer_name);
  formData.append('phone', data.phone);
  formData.append('address', data.address);
  formData.append('requirement_details', data.requirement_details);
  if (data.estimated_budget) {
    formData.append('estimated_budget', data.estimated_budget);
  }
  if (data.reference_image) {
    formData.append('reference_image', data.reference_image);
  }

  const response = await apiClient.post('/buyers', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

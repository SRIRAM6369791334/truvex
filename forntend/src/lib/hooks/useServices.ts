import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../api';

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  long_description?: string | null;
  price?: number | null;
  price_unit?: string;
  in_stock: boolean;
  icon_name?: string | null;
  image?: string | null;
  images: string[];
  features: string[];
  benefits: string[];
  process_steps: unknown[];
  stats: unknown[];
  specs: unknown[];
  delivery_info?: string | null;
  moq?: number;
  category_id?: number | null;
  category_name?: string | null;
  category_slug?: string | null;
}

interface ServiceQueryOptions {
  category?: string | number;
  search?: string;
}

function serviceQuery(options: ServiceQueryOptions = {}) {
  const params = new URLSearchParams();
  if (options.category) params.set('category', String(options.category));
  if (options.search) params.set('search', options.search);
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function useServices(options: ServiceQueryOptions = {}) {
  return useQuery({
    queryKey: ['services', options.category ?? '', options.search ?? ''],
    queryFn: async () => {
      const response = await apiGet<Service[]>(`/services${serviceQuery(options)}`);
      return response.data ?? [];
    },
  });
}

export function useServiceDetail(serviceId?: string | number) {
  return useQuery({
    queryKey: ['services', serviceId],
    enabled: Boolean(serviceId),
    queryFn: async () => {
      const response = await apiGet<Service>(`/services/${encodeURIComponent(String(serviceId))}`);
      return response.data;
    },
  });
}

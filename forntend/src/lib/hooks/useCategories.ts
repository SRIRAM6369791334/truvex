import { useQuery } from '@tanstack/react-query';
import { apiGet } from '../api';

export interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  is_active: boolean;
  sort_order?: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  icon_name?: string | null;
  supplier_count: number;
  tags: string[];
  trending: boolean;
  is_active: boolean;
  sort_order?: number;
  subcategories: Subcategory[];
}

interface CategoryQueryOptions {
  includeInactive?: boolean;
}

function querySuffix(options: CategoryQueryOptions = {}) {
  const params = new URLSearchParams();
  if (options.includeInactive) params.set('includeInactive', 'true');
  const query = params.toString();
  return query ? `?${query}` : '';
}

export function useCategories(options: CategoryQueryOptions = {}) {
  return useQuery({
    queryKey: ['categories', options.includeInactive ?? false],
    queryFn: async () => {
      const response = await apiGet<Category[]>(`/categories${querySuffix(options)}`);
      return response.data ?? [];
    },
  });
}

export function useCategoryDetail(categoryId?: string | number, options: CategoryQueryOptions = {}) {
  return useQuery({
    queryKey: ['categories', categoryId, options.includeInactive ?? false],
    enabled: Boolean(categoryId),
    queryFn: async () => {
      const response = await apiGet<Category>(
        `/categories/${encodeURIComponent(String(categoryId))}${querySuffix(options)}`,
      );
      return response.data;
    },
  });
}

export function useSubcategories(categoryId?: string | number, options: CategoryQueryOptions = {}) {
  return useQuery({
    queryKey: ['subcategories', categoryId, options.includeInactive ?? false],
    enabled: Boolean(categoryId),
    queryFn: async () => {
      const response = await apiGet<Subcategory[]>(
        `/categories/${encodeURIComponent(String(categoryId))}/subcategories${querySuffix(options)}`,
      );
      return response.data ?? [];
    },
  });
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
}

export interface Stat {
  key: string;
  label: string;
  link: string;
  total: number;
}

export interface Activity {
  id: number | string;
  title: string;
  meta?: string;
  status: string;
  created_at: string;
  resource: string;
}

export interface FieldDescriptor {
  key: string;
  label: string;
}

export interface RecordConfig {
  title: string;
  columns: FieldDescriptor[];
  detailFields: FieldDescriptor[];
  statusOptions: string[];
}

export interface RecordListData {
  resource: string;
  config: RecordConfig;
  rows: Array<Record<string, unknown> & { id: number | string }>;
}

export interface RecordDetailData {
  resource: string;
  config: RecordConfig;
  record: Record<string, unknown> & { id: number | string; status?: string; admin_notes?: string };
}

export interface Subcategory {
  id: number | string;
  category_id: number | string;
  name: string;
  slug: string;
  description: string;
  image: string;
  is_active: boolean;
  sort_order: number;
}

export interface Category {
  id: number | string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon_name: string;
  tags: string[];
  trending: boolean;
  is_active: boolean;
  sort_order: number;
  supplier_count?: number;
  subcategories?: Subcategory[];
}

export interface CategoryOption {
  id: number | string;
  name: string;
}

export interface ServiceStat {
  label: string;
  value: string;
}

export interface Service {
  id: number | string;
  title: string;
  slug: string;
  description: string;
  long_description: string;
  price: number | '';
  price_unit: string;
  in_stock: boolean;
  icon_name: string;
  image: string;
  images: string[];
  features: string[];
  benefits: string[];
  process_steps: string[];
  stats: ServiceStat[];
  specs: Record<string, string>;
  delivery_info: string;
  moq: number;
  category_id: number | string;
  subcategory_id: number | string;
  category_name?: string;
  is_active: boolean;
  sort_order: number;
}

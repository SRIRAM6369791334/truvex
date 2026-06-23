import { BadgeIndianRupee, Boxes, Image as ImageIcon, ListChecks, Save, Settings2, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { api } from '../api';
import { confirmAction } from '../components/confirm';
import { KeyValueEditor, StringListEditor, type KeyValue } from '../components/DynamicEditors';
import { validateImage } from '../components/imageValidation';
import { ErrorPanel, Loading } from '../components/Loading';
import { useToast } from '../toast';
import { SummernoteEditor } from '../components/SummernoteEditor';
import type { CategoryOption, Service, Subcategory } from '../types';
import { errorMessage } from '../utils';

const emptyService: Service = {
  id: '',
  title: '',
  slug: '',
  description: '',
  long_description: '',
  price: '',
  price_unit: 'Piece',
  in_stock: true,
  icon_name: '',
  image: '',
  images: [],
  features: [],
  benefits: [],
  process_steps: [],
  stats: [],
  specs: {},
  delivery_info: '',
  moq: 1,
  category_id: '',
  subcategory_id: '',
  is_active: true,
  sort_order: 0,
};

export function ServiceFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [service, setService] = useState<Service>(emptyService);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [mainPreview, setMainPreview] = useState('');
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [statRows, setStatRows] = useState<string[]>([]);
  const [specRows, setSpecRows] = useState<KeyValue[]>([]);

  const title = editing ? 'Edit Service' : 'New Service';

  const loadService = useCallback(async () => {
    if (!id) return;
    const response = await api.get<Service>(`/api/services/${id}`);
    setService(response.data);
    if (response.data.stats) {
      setStatRows(response.data.stats.map((item: any) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          const label = item.label || item.name || item.key || '';
          const value = item.value || item.val || '';
          return value ? `${value} ${label}` : label;
        }
        return '';
      }).filter(Boolean));
    }
    if (response.data.process_steps) {
      response.data.process_steps = response.data.process_steps.map((item: any) => {
        if (typeof item === 'string') return item.replace(/\[object Object\]/g, 'Step Details');
        if (item && typeof item === 'object') {
          return item.title && item.description ? `${item.title}: ${item.description}` : item.step || item.title || item.name || item.value || JSON.stringify(item);
        }
        return '';
      }).filter(Boolean);
    }
    if (response.data.specs) {
      setSpecRows(Object.entries(response.data.specs).map(([key, value]) => ({ key, value: String(value) })));
    }
    setService(response.data);
  }, [id]);

  useEffect(() => {
    const requests: Promise<unknown>[] = [
      api.get<CategoryOption[]>('/api/categories/options').then((response) => setCategories(response.data)),
    ];
    if (editing) requests.push(loadService());
    Promise.all(requests)
      .catch((requestError) => setError(errorMessage(requestError)))
      .finally(() => setLoading(false));
  }, [editing, loadService]);

  useEffect(() => {
    if (!service.category_id) {
      setSubcategories([]);
      return;
    }
    api.get<Subcategory[]>(`/api/categories/${service.category_id}/subcategories`)
      .then((response) => setSubcategories(response.data))
      .catch((requestError) => showToast(errorMessage(requestError), 'error'));
  }, [service.category_id, showToast]);

  useEffect(() => () => {
    if (mainPreview) URL.revokeObjectURL(mainPreview);
    galleryPreviews.forEach((preview) => URL.revokeObjectURL(preview));
  }, [galleryPreviews, mainPreview]);

  async function selectMainImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await validateImage(file);
      if (mainPreview) URL.revokeObjectURL(mainPreview);
      setMainImage(file);
      setMainPreview(URL.createObjectURL(file));
    } catch (validationError) {
      event.target.value = '';
      showToast(errorMessage(validationError), 'error');
    }
  }

  async function selectGallery(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    try {
      await Promise.all(files.map(validateImage));
      setGalleryFiles((prev) => {
        const updated = [...prev, ...files].slice(0, 10);
        return updated;
      });
      setGalleryPreviews((prev) => {
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        const updated = [...prev, ...newPreviews].slice(0, 10);
        return updated;
      });
    } catch (validationError) {
      showToast(errorMessage(validationError), 'error');
    }
    event.target.value = '';
  }

  function removeGalleryImage(index: number, isExisting: boolean) {
    if (isExisting) {
      setService((prev) => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    } else {
      setGalleryFiles((prev) => prev.filter((_, i) => i !== index));
      setGalleryPreviews((prev) => {
        URL.revokeObjectURL(prev[index]);
        return prev.filter((_, i) => i !== index);
      });
    }
  }

  function updateStats(values: string[]) {
    setStatRows(values);
  }

  function updateSpecs(values: KeyValue[]) {
    setSpecRows(values);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editing && !mainImage) {
      showToast('Main image is required.', 'error');
      return;
    }
    const totalGalleryImages = (service.images?.length || 0) + galleryFiles.length;
    if (totalGalleryImages === 0) {
      showToast('At least one gallery image is required.', 'error');
      return;
    }
    if (service.process_steps.filter(Boolean).length === 0) {
      showToast('At least one process step is required.', 'error');
      return;
    }
    if (statRows.filter(Boolean).length === 0) {
      showToast('At least one service statistic is required.', 'error');
      return;
    }
    if (specRows.filter((item) => item.key.trim() !== '').length === 0) {
      showToast('At least one technical specification is required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const form = new FormData();
      form.append('title', service.title);
      form.append('slug', service.slug);
      form.append('description', service.description);
      form.append('long_description', service.long_description);
      form.append('price', String(service.price));
      form.append('price_unit', service.price_unit);
      form.append('in_stock', String(service.in_stock));
      form.append('icon_name', service.icon_name);
      form.append('features', JSON.stringify(service.features.filter(Boolean)));
      form.append('benefits', JSON.stringify(service.benefits.filter(Boolean)));
      form.append('process_steps', JSON.stringify(service.process_steps.filter(Boolean)));

      // Serialize stats and specs filtering out empty keys
      const formattedStats = statRows.filter(Boolean);
      const formattedSpecs = Object.fromEntries(
        specRows
          .filter((item) => item.key.trim() !== '')
          .map((item) => [item.key.trim(), item.value])
      );

      form.append('stats', JSON.stringify(formattedStats));
      form.append('specs', JSON.stringify(formattedSpecs));
      form.append('delivery_info', service.delivery_info);
      form.append('moq', String(service.moq));
      form.append('category_id', String(service.category_id));
      form.append('subcategory_id', String(service.subcategory_id));
      form.append('is_active', String(service.is_active));
      form.append('sort_order', String(service.sort_order));
      form.append('existing_image', service.image || '');
      form.append('existing_images', JSON.stringify(service.images));
      if (mainImage) form.append('image_file', mainImage);
      galleryFiles.forEach((file) => form.append('gallery_files', file));

      const response = editing
        ? await api.patch<{ id: string }>(`/api/services/${id}`, form)
        : await api.post<{ id: number | string }>('/api/services', form);
      showToast(response.message || `Service ${editing ? 'updated' : 'created'}.`);
      if (!editing) navigate(`/services/${response.data.id}/edit`, { replace: true });
      else await loadService();
    } catch (requestError) {
      showToast(errorMessage(requestError), 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!id || !(await confirmAction('Delete this service? This cannot be undone.', 'Delete service'))) return;
    try {
      const response = await api.delete(`/api/services/${id}`);
      showToast(response.message || 'Service deleted.');
      navigate('/services');
    } catch (requestError) {
      showToast(errorMessage(requestError), 'error');
    }
  }



  if (loading) return <Loading label="Loading service…" />;
  if (error) return <ErrorPanel message={error} />;

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
        <div><p className="eyebrow">Catalog</p><h2 className="text-3xl font-bold">{title}</h2></div>
        <Link className="button" to="/services">← Back</Link>
      </div>

      <form className="grid grid-cols-1 gap-8 xl:grid-cols-3" onSubmit={(event) => void handleSubmit(event)}>
        <div className="space-y-8 xl:col-span-2">
          <section className="bento-card">
            <h3 className="bento-header"><Boxes size={20} /> Service Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label htmlFor="service-title"><span className="tw-label">Title *</span><input className="tw-input" id="service-title" onChange={(event) => setService({ ...service, title: event.target.value })} required value={service.title} /></label>
              <label htmlFor="service-slug"><span className="tw-label">Slug</span><input className="tw-input" id="service-slug" onChange={(event) => setService({ ...service, slug: event.target.value })} placeholder="Auto-generated if blank" value={service.slug} /></label>
              <label className="md:col-span-2" htmlFor="service-description">
                <div className="flex justify-between items-center mb-1">
                  <span className="tw-label">Short Description *</span>
                  <span className="text-[11px] text-gray-500 font-medium">{service.description.length}/250</span>
                </div>
                <textarea className="tw-input mt-0" id="service-description" onChange={(event) => setService({ ...service, description: event.target.value })} required maxLength={250} rows={3} value={service.description} />
              </label>
              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="tw-label">Long Description *</span>
                </div>
                <SummernoteEditor
                  id="service-long-description"
                  value={service.long_description}
                  onChange={(value) => setService({ ...service, long_description: value })}
                />
              </div>
              <label htmlFor="service-features"><span className="tw-label">Features (one per line) *</span><textarea className="tw-input" id="service-features" onChange={(event) => setService({ ...service, features: event.target.value.split(/\r?\n/) })} required rows={6} value={service.features.join('\n')} /></label>
              <label htmlFor="service-benefits"><span className="tw-label">Benefits (one per line) *</span><textarea className="tw-input" id="service-benefits" onChange={(event) => setService({ ...service, benefits: event.target.value.split(/\r?\n/) })} required rows={6} value={service.benefits.join('\n')} /></label>
            </div>
          </section>

          <section className="bento-card">
            <h3 className="bento-header"><ImageIcon size={20} /> Service Images</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label htmlFor="service-image">
                <span className="tw-label">Main image (800×600, max 2 MB) {!editing && '*'}</span>
                <input accept="image/jpeg,image/png,image/webp" className="tw-input" id="service-image" onChange={(event) => void selectMainImage(event)} type="file" required={!editing} />
              </label>
              <label htmlFor="service-gallery">
                <span className="tw-label">Gallery images (800×600, up to 10) {!editing && '*'}</span>
                <input accept="image/jpeg,image/png,image/webp" className="tw-input" id="service-gallery" multiple onChange={(event) => void selectGallery(event)} type="file" />
              </label>
            </div>
            {(mainPreview || service.image) && (
              <div className="image-thumbs mt-3">
                <span className="tw-label block mb-1">Main Image Preview</span>
                <img alt="Main service preview" src={mainPreview || service.image} />
              </div>
            )}
            <div className="image-thumbs flex flex-wrap gap-4 mt-4">
              {/* Existing Gallery Images */}
              {service.images?.map((image, index) => (
                <div key={`existing-${image}`} className="thumb-wrapper">
                  <img alt="Service gallery existing" src={image} />
                  <button
                    aria-label="Remove existing gallery image"
                    className="thumb-remove-btn"
                    onClick={() => removeGalleryImage(index, true)}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {/* Newly Uploaded Gallery Previews */}
              {galleryPreviews.map((image, index) => (
                <div key={`new-${image}`} className="thumb-wrapper">
                  <img alt="Service gallery preview" src={image} />
                  <button
                    aria-label="Remove new gallery image"
                    className="thumb-remove-btn"
                    onClick={() => removeGalleryImage(index, false)}
                    type="button"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="bento-card">
            <h3 className="bento-header"><ListChecks size={20} /> Process Steps *</h3>
            <StringListEditor addLabel="Add step" onChange={(process_steps) => setService({ ...service, process_steps })} placeholder="Enter step description" values={service.process_steps} />
          </section>

          <section className="bento-card">
            <h3 className="bento-header">Service Statistics *</h3>
            <StringListEditor addLabel="Add statistic" onChange={updateStats} placeholder="Statistic, e.g. 200+ Clients" values={statRows} />
          </section>

          <section className="bento-card">
            <h3 className="bento-header">Technical Specifications *</h3>
            <KeyValueEditor addLabel="Add specification" keyPlaceholder="Specification" onChange={updateSpecs} valuePlaceholder="Value" values={specRows} />
          </section>
        </div>

        <div className="space-y-8">
          <section className="bento-card">
            <h3 className="bento-header mb-6"><Settings2 size={20} /> Classification</h3>
            <div className="space-y-6">
              <label htmlFor="service-category">
                <span className="tw-label mb-2 mt-2">Category *</span>
                <select
                  className="tw-input"
                  id="service-category"
                  onChange={(event) => setService({ ...service, category_id: event.target.value, subcategory_id: '' })}
                  required
                  value={service.category_id}
                >
                  <option value="">— Unassigned —</option>
                  {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
              </label>
              <label htmlFor="service-subcategory">
                <span className="tw-label mb-2 mt-2">Subcategory *</span>
                <select className="tw-input" id="service-subcategory" onChange={(event) => setService({ ...service, subcategory_id: event.target.value })} required value={service.subcategory_id}>
                  <option value="">— Unassigned —</option>
                  {subcategories.map((subcategory) => <option key={subcategory.id} value={subcategory.id}>{subcategory.name}</option>)}
                </select>
              </label>
              
              <div className="mt-8 space-y-6">
                <label className="flex items-center gap-3 cursor-pointer" htmlFor="service-stock">
                  <input checked={service.in_stock} className="!w-auto w-5 h-5" id="service-stock" onChange={(event) => setService({ ...service, in_stock: event.target.checked })} type="checkbox" />
                  <span className="text-gray-700 font-medium">In Stock</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer" htmlFor="service-active">
                  <input checked={service.is_active} className="!w-auto w-5 h-5" id="service-active" onChange={(event) => setService({ ...service, is_active: event.target.checked })} type="checkbox" />
                  <span className="text-gray-700 font-medium">Active / Published</span>
                </label>
              </div>
            </div>
          </section>

          <section className="bento-card">
            <h3 className="bento-header"><BadgeIndianRupee size={20} /> Commercial Details</h3>
            <div className="space-y-5">
              <label htmlFor="service-price"><span className="tw-label">Price (₹) *</span><input className="tw-input" id="service-price" min="0" onChange={(event) => setService({ ...service, price: event.target.value === '' ? '' : Number(event.target.value) })} required step="0.01" type="number" value={service.price} /></label>
              <label htmlFor="service-unit"><span className="tw-label">Price Unit *</span><input className="tw-input" id="service-unit" onChange={(event) => setService({ ...service, price_unit: event.target.value })} required value={service.price_unit} /></label>
              <label htmlFor="service-moq"><span className="tw-label">Minimum Order Quantity *</span><input className="tw-input" id="service-moq" min="1" onChange={(event) => setService({ ...service, moq: Number(event.target.value) })} required type="number" value={service.moq} /></label>
              <label htmlFor="service-delivery"><span className="tw-label">Delivery Info *</span><input className="tw-input" id="service-delivery" onChange={(event) => setService({ ...service, delivery_info: event.target.value })} required value={service.delivery_info} /></label>
            </div>
          </section>

          <section className="bento-card">
            <button className="button primary full" disabled={saving} type="submit"><Save size={16} /> {saving ? 'Saving…' : editing ? 'Update Service' : 'Create Service'}</button>
            {editing && <button className="button danger full mt-3" onClick={() => void handleDelete()} type="button"><Trash2 size={16} /> Delete Service</button>}
          </section>
        </div>
      </form>
    </>
  );
}

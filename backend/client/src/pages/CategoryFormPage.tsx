import { Check, FolderTree, Image as ImageIcon, Layers, Pencil, Plus, Save, Settings2, Trash2, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { api, getImageUrl } from '../api';
import { confirmAction } from '../components/confirm';
import { validateImage } from '../components/imageValidation';
import { ErrorPanel, Loading } from '../components/Loading';
import { StatusBadge } from '../components/StatusBadge';
import { useToast } from '../toast';
import type { Category, Subcategory } from '../types';
import { errorMessage } from '../utils';

const emptyCategory: Category = {
  id: '', name: '', slug: '', description: '', image: '',
  icon_name: '', tags: [], trending: false, is_active: true, sort_order: 0,
};

interface SubcategoryForm {
  name: string; slug: string; description: string; sort_order: number; is_active: boolean;
}

const emptySubcategory: SubcategoryForm = { name: '', slug: '', description: '', sort_order: 0, is_active: true };

export function CategoryFormPage() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [category, setCategory] = useState<Category>(emptyCategory);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [subcategory, setSubcategory] = useState<SubcategoryForm>(emptySubcategory);
  const [subcategoryImage, setSubcategoryImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(editing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editingSubId, setEditingSubId] = useState<number | string | null>(null);
  const [editDraft, setEditDraft] = useState<SubcategoryForm>(emptySubcategory);
  const [editImage, setEditImage] = useState<File | null>(null);
  const [savingSubId, setSavingSubId] = useState<number | string | null>(null);

  const title = editing ? 'Edit Category' : 'New Category';

  const load = useCallback(async () => {
    if (!id) return;
    const response = await api.get<{ category: Category; subcategories: Subcategory[] }>(`/api/categories/${id}`);
    setCategory(response.data.category);
    setSubcategories(response.data.subcategories);
  }, [id]);

  useEffect(() => {
    if (!editing) return;
    load().catch((e) => setError(errorMessage(e))).finally(() => setLoading(false));
  }, [editing, load]);

  useEffect(() => () => { if (imagePreview) URL.revokeObjectURL(imagePreview); }, [imagePreview]);

  async function selectImage(event: ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void, preview = false) {
    const file = event.target.files?.[0];
    if (!file) { setter(null); return; }
    try {
      await validateImage(file); setter(file);
      if (preview) { if (imagePreview) URL.revokeObjectURL(imagePreview); setImagePreview(URL.createObjectURL(file)); }
    } catch (e) { setter(null); event.target.value = ''; showToast(errorMessage(e), 'error'); }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!editing && !imageFile) {
      showToast('Category image is required.', 'error');
      return;
    }
    setSaving(true);
    try {
      const form = new FormData();
      form.append('name', category.name); form.append('slug', category.slug);
      form.append('description', category.description); form.append('icon_name', category.icon_name || '');
      form.append('tags', JSON.stringify(category.tags)); form.append('trending', String(category.trending));
      form.append('is_active', String(category.is_active)); form.append('sort_order', String(category.sort_order));
      form.append('existing_image', category.image || '');
      if (imageFile) form.append('image_file', imageFile);
      const response = editing
        ? await api.patch<{ id: string }>(`/api/categories/${id}`, form)
        : await api.post<{ id: number | string }>('/api/categories', form);
      
      if (!editing) {
        const { default: Swal } = await import('sweetalert2');
        await Swal.fire({
          title: 'Created!',
          text: 'Category has been created successfully.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: 'premium-swal-popup',
            title: 'premium-swal-title',
            htmlContainer: 'premium-swal-content'
          }
        });
        window.location.href = '/categories';
      } else {
        showToast(response.message || 'Category updated.');
        await load();
      }
    } catch (e) { showToast(errorMessage(e), 'error'); }
    finally { setSaving(false); }
  }

  async function handleDelete() {
    if (!id || !(await confirmAction('Delete this category and its subcategories? This cannot be undone.', 'Delete category'))) return;
    try {
      const response = await api.delete(`/api/categories/${id}`);
      showToast(response.message || 'Category deleted.'); navigate('/categories');
    } catch (e) { showToast(errorMessage(e), 'error'); }
  }

  async function addSubcategory(event: FormEvent) {
    event.preventDefault(); if (!id) return;
    try {
      const form = new FormData();
      form.append('name', subcategory.name); form.append('slug', subcategory.slug);
      form.append('description', subcategory.description); form.append('sort_order', String(subcategory.sort_order));
      form.append('is_active', String(subcategory.is_active));
      if (subcategoryImage) form.append('sub_image_file', subcategoryImage);
      const response = await api.post(`/api/categories/${id}/subcategories`, form);
      showToast(response.message || 'Subcategory added.');
      setSubcategory(emptySubcategory); setSubcategoryImage(null); await load();
    } catch (e) { showToast(errorMessage(e), 'error'); }
  }

  function startEdit(item: Subcategory) {
    setEditingSubId(item.id);
    setEditDraft({ name: item.name, slug: item.slug, description: item.description, sort_order: item.sort_order, is_active: item.is_active });
    setEditImage(null);
  }

  function cancelEdit() { setEditingSubId(null); setEditDraft(emptySubcategory); setEditImage(null); }

  async function saveEdit(subId: number | string) {
    if (!id) return;
    setSavingSubId(subId);
    try {
      const form = new FormData();
      form.append('name', editDraft.name); form.append('slug', editDraft.slug);
      form.append('description', editDraft.description); form.append('sort_order', String(editDraft.sort_order));
      form.append('is_active', String(editDraft.is_active));
      if (editImage) form.append('sub_image_file', editImage);
      const response = await api.patch(`/api/categories/${id}/subcategories/${String(subId)}`, form);
      showToast(response.message || 'Subcategory updated.');
      setEditingSubId(null); setEditDraft(emptySubcategory); setEditImage(null); await load();
    } catch (e) { showToast(errorMessage(e), 'error'); }
    finally { setSavingSubId(null); }
  }

  async function deleteSubcategory(subcategoryId: number | string) {
    if (!id || !(await confirmAction('Delete this subcategory?', 'Delete subcategory'))) return;
    try {
      const response = await api.delete(`/api/categories/${id}/subcategories/${subcategoryId}`);
      showToast(response.message || 'Subcategory deleted.'); await load();
    } catch (e) { showToast(errorMessage(e), 'error'); }
  }

  const displayedImage = useMemo(() => imagePreview || category.image, [category.image, imagePreview]);

  if (loading) return <Loading label="Loading category…" />;
  if (error) return <ErrorPanel message={error} />;

  return (
    <>
      <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-6">
        <div><p className="eyebrow">Catalog</p><h2 className="text-3xl font-bold">{title}</h2></div>
        <Link className="button" to="/categories">← Back</Link>
      </div>

      <form className="grid grid-cols-1 gap-8 xl:grid-cols-3" onSubmit={(e) => void handleSubmit(e)}>
        <div className="space-y-8 xl:col-span-2">
          <section className="bento-card">
            <h3 className="bento-header"><FolderTree size={20} /> Category Details</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <label htmlFor="category-name"><span className="tw-label">Name *</span>
                <input className="tw-input" id="category-name" onChange={(e) => setCategory({ ...category, name: e.target.value })} required value={category.name} />
              </label>
              <label htmlFor="category-slug"><span className="tw-label">Slug</span>
                <input className="tw-input" id="category-slug" onChange={(e) => setCategory({ ...category, slug: e.target.value })} placeholder="Auto-generated if blank" value={category.slug} />
              </label>
              <label className="md:col-span-2" htmlFor="category-description">
                <div className="flex justify-between items-center mb-1">
                  <span className="tw-label">Description *</span>
                  <span className="text-[11px] text-gray-500 font-medium">{category.description.length}/250</span>
                </div>
                <textarea className="tw-input mt-0" id="category-description" onChange={(e) => setCategory({ ...category, description: e.target.value })} required maxLength={250} rows={3} value={category.description} />
              </label>
            </div>
          </section>
          <section className="bento-card">
            <h3 className="bento-header"><ImageIcon size={20} /> Category Image</h3>
            <label htmlFor="category-image"><span className="tw-label">800×600 image, maximum 2 MB {!editing && '*'}</span>
              <input accept="image/jpeg,image/png,image/webp" className="tw-input" id="category-image" onChange={(e) => void selectImage(e, setImageFile, true)} type="file" required={!editing} />
            </label>
            {displayedImage && <div className="image-thumbs"><img alt="Category preview" src={getImageUrl(displayedImage)} /></div>}
          </section>
        </div>

        <div className="space-y-8">
          <section className="bento-card">
            <h3 className="bento-header"><Settings2 size={20} /> Classification</h3>
            <div className="space-y-5">
              <label className="flex items-center gap-3" htmlFor="category-trending">
                <input checked={category.trending} className="!w-auto" id="category-trending" onChange={(e) => setCategory({ ...category, trending: e.target.checked })} type="checkbox" />
                <span>Show on homepage (maximum 6)</span>
              </label>
              <label className="flex items-center gap-3" htmlFor="category-active">
                <input checked={category.is_active} className="!w-auto" id="category-active" onChange={(e) => setCategory({ ...category, is_active: e.target.checked })} type="checkbox" />
                <span>Active / Published</span>
              </label>
            </div>
          </section>
          <section className="bento-card">
            <button className="button primary full" disabled={saving} type="submit">
              <Save size={16} /> {saving ? 'Saving…' : editing ? 'Update Category' : 'Create Category'}
            </button>
            {editing && (
              <button className="button danger full mt-3" onClick={() => void handleDelete()} type="button">
                <Trash2 size={16} /> Delete Category
              </button>
            )}
          </section>
        </div>
      </form>

      {/* ===== SUBCATEGORIES CRUD SECTION ===== */}
      {editing && (
        <section className="sub-crud-section">
          {/* Header */}
          <div className="sub-crud-header">
            <h2 className="sub-crud-title">
              <Layers size={22} />
              Subcategories
              {subcategories.length > 0 && (
                <span className="sub-badge">{subcategories.length}</span>
              )}
            </h2>
          </div>

          <div className="sub-layout">

            {/* ===== LEFT: Subcategory list ===== */}
            <div className="sub-list-panel">
              {/* Column headers */}
              <div className="sub-panel-head">
                <span>Img</span>
                <span>Name / Slug</span>
                <span>Description</span>
                <span>Status</span>
                <span style={{ textAlign: 'right' }}>Actions</span>
              </div>

              {/* Empty state */}
              {!subcategories.length && (
                <div className="sub-empty">
                  <div className="sub-empty-icon">
                    <Layers size={36} />
                  </div>
                  <h4>No subcategories yet</h4>
                  <p>Use the form on the right to add your first subcategory.</p>
                </div>
              )}

              {/* Rows */}
              {subcategories.map((item) => {
                const isEditing = editingSubId === item.id;
                const isSaving = savingSubId === item.id;

                return (
                  <div className="sub-row-wrap" key={item.id}>
                    {/* Read-only row (always visible as a reference) */}
                    <div className={`sub-row ${isEditing ? 'bg-slate-50/50' : ''}`}>
                      {/* Thumb */}
                      <div className="sub-thumb">
                        {item.image
                          ? <img alt={item.name} src={getImageUrl(item.image)} />
                          : <Layers size={18} />
                        }
                      </div>
                      {/* Name */}
                      <div>
                        <span className="sub-name">{item.name}</span>
                        <span className="sub-slug">{item.slug}</span>
                      </div>
                      {/* Description */}
                      <div className="sub-desc-cell">{item.description || <em style={{ opacity: 0.45 }}>—</em>}</div>
                      {/* Status */}
                      <div><StatusBadge status={item.is_active ? 'active' : 'inactive'} /></div>
                      {/* Actions */}
                      <div className="sub-actions">
                        <button aria-label={`Edit ${item.name}`} className="sub-edit-btn" onClick={() => startEdit(item)} type="button">
                          <Pencil size={12} /> Edit
                        </button>
                        <button aria-label={`Delete ${item.name}`} className="sub-del-btn" onClick={() => void deleteSubcategory(item.id)} type="button">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Accordion edit block */}
                    {isEditing && (
                      <div className="sub-expand">
                        <div className="sub-expand-inner">
                          <div className="sub-expand-title">Edit Subcategory</div>
                          <div className="sub-expand-grid">
                            <div className="sub-fg">
                              <span className="sub-fl">Name *</span>
                              <input
                                className="sub-fi"
                                onChange={(e) => setEditDraft({ ...editDraft, name: e.target.value })}
                                required
                                value={editDraft.name}
                              />
                            </div>
                            <div className="sub-fg">
                              <span className="sub-fl">Slug</span>
                              <input
                                className="sub-fi"
                                onChange={(e) => setEditDraft({ ...editDraft, slug: e.target.value })}
                                placeholder="auto-generated"
                                value={editDraft.slug}
                              />
                            </div>
                            <div className="sub-fg md:col-span-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="sub-fl">Description *</span>
                                <span className="text-[11px] text-gray-500 font-medium">{editDraft.description.length}/250</span>
                              </div>
                              <textarea
                                className="sub-fi mt-0"
                                onChange={(e) => setEditDraft({ ...editDraft, description: e.target.value })}
                                placeholder="Description"
                                required
                                maxLength={250}
                                value={editDraft.description}
                              />
                            </div>

                            <div className="sub-fg">
                              <span className="sub-fl">Image</span>
                              <div className="sub-upload-row">
                                <span className="sub-upload-text">
                                  {editImage ? editImage.name : 'Choose image file…'}
                                </span>
                                <input
                                  accept="image/jpeg,image/png,image/webp"
                                  onChange={(e) => void selectImage(e, setEditImage)}
                                  type="file"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sub-expand-actions">
                            <div className="flex-1">
                              <label className="sub-add-toggle" style={{ maxWidth: '180px', padding: '0.45rem 0.75rem' }}>
                                <span className="sub-add-toggle-text" style={{ fontSize: '0.78rem' }}>Active / Published</span>
                                <div className="sub-ios">
                                  <input
                                    checked={editDraft.is_active}
                                    onChange={(e) => setEditDraft({ ...editDraft, is_active: e.target.checked })}
                                    type="checkbox"
                                  />
                                  <span className="sub-ios-track" />
                                </div>
                              </label>
                            </div>
                            <button
                              aria-label="Save"
                              className="sub-save-btn"
                              disabled={isSaving}
                              onClick={() => void saveEdit(item.id)}
                              type="button"
                            >
                              {isSaving ? 'Saving…' : <><Check size={14} /> Save</>}
                            </button>
                            <button
                              aria-label="Cancel"
                              className="sub-cancel-btn"
                              disabled={isSaving}
                              onClick={cancelEdit}
                              type="button"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ===== RIGHT: Add form ===== */}
            <form className="sub-add-card" onSubmit={(e) => void addSubcategory(e)}>
              <div className="sub-add-head">
                <div className="sub-add-head-icon">
                  <Plus size={16} />
                </div>
                <div>
                  <div className="sub-add-head-text">Add Subcategory</div>
                  <div className="sub-add-head-sub">Create new child node</div>
                </div>
              </div>
              <div className="sub-add-body">
                <div className="sub-fg">
                  <label className="sub-fl" htmlFor="sub-name">Name *</label>
                  <input className="sub-fi" id="sub-name" onChange={(e) => setSubcategory({ ...subcategory, name: e.target.value })} placeholder="e.g. Steel Pipes" required value={subcategory.name} />
                </div>
                <div className="sub-fg">
                  <label className="sub-fl" htmlFor="sub-slug">Slug</label>
                  <input className="sub-fi" id="sub-slug" onChange={(e) => setSubcategory({ ...subcategory, slug: e.target.value })} placeholder="auto-generated" value={subcategory.slug} />
                </div>
                <div className="sub-fg">
                  <div className="flex justify-between items-center mb-1">
                    <label className="sub-fl mb-0" htmlFor="sub-desc">Description *</label>
                    <span className="text-[11px] text-gray-500 font-medium">{subcategory.description.length}/250</span>
                  </div>
                  <textarea className="sub-fi" id="sub-desc" onChange={(e) => setSubcategory({ ...subcategory, description: e.target.value })} placeholder="Short description…" required maxLength={250} rows={3} value={subcategory.description} />
                </div>
                <div className="sub-fg">
                  <label className="sub-fl" htmlFor="sub-img">Image (800×600)</label>
                  <div className="sub-upload-row">
                    <span className="sub-upload-text">
                      {subcategoryImage ? subcategoryImage.name : 'Choose image file…'}
                    </span>
                    <input accept="image/jpeg,image/png,image/webp" id="sub-img" onChange={(e) => void selectImage(e, setSubcategoryImage)} type="file" />
                  </div>
                </div>

                
                <label className="sub-add-toggle" htmlFor="sub-active">
                  <span className="sub-add-toggle-text">Active / Published</span>
                  <div className="sub-ios">
                    <input checked={subcategory.is_active} id="sub-active" onChange={(e) => setSubcategory({ ...subcategory, is_active: e.target.checked })} type="checkbox" />
                    <span className="sub-ios-track" />
                  </div>
                </label>

                <button className="sub-add-btn" type="submit">
                  <Plus size={15} /> Add Subcategory
                </button>
              </div>
            </form>

          </div>
        </section>
      )}
    </>
  );
}

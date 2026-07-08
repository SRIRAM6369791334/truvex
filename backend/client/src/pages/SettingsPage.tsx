import { useEffect, useState, type ChangeEvent } from 'react';
import { api, getImageUrl } from '../api';
import { useToast } from '../toast';
import { confirmAction } from '../components/confirm';
import { ErrorPanel, Loading } from '../components/Loading';
import { errorMessage } from '../utils';
import { Trash2, Upload, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface Settings {
  homepage_banner_images?: string[];
}

export function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    try {
      const response = await api.get<Settings>('/api/settings');
      setSettings(response.data);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local validation
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('Only JPG, PNG, and WEBP images are allowed.', 'error');
      e.target.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast('Image size exceeds the 2 MB limit.', 'error');
      e.target.value = '';
      return;
    }

    setUploading(true);

    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(img.src);
      if (img.width !== 1024 || img.height !== 1024) {
        showToast(`Image dimensions must be exactly 1024x1024. Uploaded: ${img.width}x${img.height}`, 'error');
        setUploading(false);
        e.target.value = '';
        return;
      }

      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post<Settings>('/api/settings/banner', formData);
        setSettings(response.data);
        showToast(response.message || 'Banner image added successfully.', 'success');
      } catch (err) {
        showToast(errorMessage(err), 'error');
      } finally {
        setUploading(false);
        e.target.value = '';
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(img.src);
      showToast('Invalid image file.', 'error');
      setUploading(false);
      e.target.value = '';
    };
    img.src = URL.createObjectURL(file);
  }

  async function handleDeleteImage(imagePath: string) {
    const confirmed = await confirmAction('Are you sure you want to delete this banner image?');
    if (!confirmed) return;

    try {
      const response = await api.post<Settings>('/api/settings/banner/delete', { imagePath });
      setSettings(response.data);
      showToast(response.message || 'Banner image removed successfully.', 'success');
    } catch (err) {
      showToast(errorMessage(err), 'error');
    }
  }

  if (error) return <ErrorPanel message={error} />;
  if (loading || !settings) return <Loading label="Loading settings…" />;

  const bannerImages = settings.homepage_banner_images || [];

  return (
    <section className="panel" aria-label="Site settings">
      <div className="panel-header">
        <div>
          {/* <p className="eyebrow">Configuration</p> */}
          <h2>Banners</h2>
        </div>
      </div>

      <div className="dashboard-grid mt-6" style={{ gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Banner Images Management Card */}
        <article className="bento-card">
          <div className="flex items-center gap-2 mb-4">
            <ImageIcon className="text-primary" size={20} />
            <h3 className="bento-header m-0">Homepage Banner </h3>
          </div>
          
          {/* <p className="muted mb-6 text-sm">
            Configure the banner background images rotating on the homepage. If no custom images are uploaded, the default high-quality shipping/logistics images will be displayed.
          </p> */}

          {/* Current Images Gallery */}
          <div className="mb-8">
            <h4 className="tw-label mb-3">Current Images ({bannerImages.length})</h4>
            {bannerImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 border border-dashed border-neutral-300 rounded-lg bg-neutral-50 text-center">
                <AlertCircle className="text-neutral-400 mb-2" size={24} />
                <p className="text-sm font-medium text-neutral-600 m-0">No custom banner images uploaded</p>
                <p className="text-xs text-neutral-400 m-0 mt-1">Default rotating Unsplash images are active on the website.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {bannerImages.map((imgUrl, idx) => {
                  // If image is a local upload path, prepend root URL for preview
                  const previewUrl = getImageUrl(imgUrl);
                  return (
                    <div 
                      key={imgUrl} 
                      className="relative border rounded-lg overflow-hidden group shadow-sm bg-neutral-100" 
                      style={{ aspectRatio: '16/9' }}
                    >
                      <img 
                        src={previewUrl} 
                        alt={`Banner Slide ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDeleteImage(imgUrl)}
                          className="button danger flex items-center gap-1.5 py-1.5 px-3 rounded text-xs"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                      <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded font-mono">
                        Slide {idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Upload Section */}
          <div className="border-t pt-6">
            <h4 className="tw-label mb-3">Add Banner Image</h4>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <label 
                className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors bg-neutral-50 hover:bg-neutral-100 ${
                  uploading ? 'opacity-55 pointer-events-none' : 'border-neutral-300'
                }`}
              >
                <Upload className="text-neutral-400 mb-2" size={20} />
                <span className="text-sm font-semibold text-neutral-700">
                  {uploading ? 'Uploading image...' : 'Click to upload image'}
                </span>
                <span className="text-xs text-neutral-400 mt-1">
                  JPG, PNG, WEBP (1024x1024, Max 2MB)
                </span>
                <input 
                  type="file" 
                  accept="image/jpeg,image/png,image/webp" 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  disabled={uploading}
                />
              </label>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

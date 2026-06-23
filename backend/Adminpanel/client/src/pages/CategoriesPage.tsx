import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../api';
import { ErrorPanel, Loading } from '../components/Loading';
import { StatusBadge } from '../components/StatusBadge';
import type { Category } from '../types';
import { errorMessage } from '../utils';

export function CategoriesPage() {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<Category[]>('/api/categories')
      .then((response) => setCategories(response.data))
      .catch((requestError) => setError(errorMessage(requestError)));
  }, []);

  if (error) return <ErrorPanel message={error} />;
  if (!categories) return <Loading label="Loading categories…" />;

  return (
    <section className="panel" aria-label="Categories catalog">
      <div className="panel-header">
        <div>
          <p className="eyebrow">Catalog</p>
          <h2>Categories</h2>
        </div>
        <Link className="button primary" to="/categories/new">+ New Category</Link>
      </div>
      <div className="category-grid">
        {categories.map((category) => (
          <article className="category-card" key={category.id}>
            <div className="category-top">
              <div>
                <h3>{category.name}</h3>
                <p><small className="muted">{category.slug}</small></p>
              </div>
              <StatusBadge status={category.is_active ? 'active' : 'inactive'} />
            </div>
            <p className="muted">{category.description || 'No description provided.'}</p>
            <div className="meta-row">
              <span>{category.supplier_count || 0} suppliers</span>
              <span>{category.subcategories?.length || 0} subcategories</span>
            </div>
            {!!category.tags.length && (
              <div className="tag-row">
                {category.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            )}
            {!!category.subcategories?.length && (
              <div className="sub-list">
                {category.subcategories.slice(0, 5).map((subcategory) => (
                  <small key={subcategory.id}>{subcategory.name}</small>
                ))}
                {category.subcategories.length > 5 && (
                  <small>+{category.subcategories.length - 5} more</small>
                )}
              </div>
            )}
            <Link className="button small" to={`/categories/${category.id}/edit`}>Manage →</Link>
          </article>
        ))}
        {!categories.length && (
          <div className="empty-panel">No categories created yet. <Link to="/categories/new">Create your first →</Link></div>
        )}
      </div>
    </section>
  );
}

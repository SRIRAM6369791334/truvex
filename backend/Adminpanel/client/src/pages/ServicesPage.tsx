import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../api';
import { ErrorPanel, Loading } from '../components/Loading';
import { SearchToolbar } from '../components/SearchToolbar';
import { StatusBadge } from '../components/StatusBadge';
import type { Service } from '../types';
import { errorMessage } from '../utils';

export function ServicesPage() {
  const [services, setServices] = useState<Service[] | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<Service[]>('/api/services')
      .then((response) => setServices(response.data))
      .catch((requestError) => setError(errorMessage(requestError)));
  }, []);

  const filtered = useMemo(() => {
    if (!services) return [];
    const needle = search.trim().toLowerCase();
    if (!needle) return services;
    return services.filter((service) => (
      `${service.title} ${service.slug} ${service.category_name || ''}`.toLowerCase().includes(needle)
    ));
  }, [search, services]);

  if (error) return <ErrorPanel message={error} />;
  if (!services) return <Loading label="Loading services…" />;

  return (
    <section className="panel">
      <div className="panel-header">
        <div><p className="eyebrow">Catalog</p><h2>Services</h2></div>
        <Link className="button primary" to="/services/new">+ New Service</Link>
      </div>
      <SearchToolbar onChange={setSearch} placeholder="Search services by title or slug…" value={search} />
      <div className="table-wrap">
        <table>
          <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
          <tbody>
            {filtered.map((service) => (
              <tr key={service.id}>
                <td><span className="fw-medium">{service.title}</span><br /><small className="text-muted">{service.slug}</small></td>
                <td>{service.category_name ? <span className="pill">{service.category_name}</span> : '—'}</td>
                <td className="fw-medium">{service.price !== '' ? `₹${Number(service.price).toLocaleString('en-IN')} / ${service.price_unit}` : '—'}</td>
                <td><StatusBadge status={service.in_stock ? 'in stock' : 'out'} /></td>
                <td><StatusBadge status={service.is_active ? 'active' : 'inactive'} /></td>
                <td><Link className="button small" to={`/services/${service.id}/edit`}>Edit →</Link></td>
              </tr>
            ))}
            {!filtered.length && <tr><td className="empty" colSpan={6}>No services found.</td></tr>}
          </tbody>
        </table>
      </div>
    </section>
  );
}

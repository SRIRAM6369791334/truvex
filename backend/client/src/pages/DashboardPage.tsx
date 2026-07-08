import {
  Bell, ClipboardList, Factory, Folder, Mail, MessageSquare, Package, Phone, ShoppingBag, Wrench,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { api } from '../api';
import { ErrorPanel, Loading } from '../components/Loading';
import { StatusBadge } from '../components/StatusBadge';
import type { Activity, Stat } from '../types';
import { errorMessage, formatValue } from '../utils';

const statIcons: LucideIcon[] = [Package, Factory, ShoppingBag, ClipboardList, Phone, MessageSquare, Bell, Mail, Wrench, Folder];

export function DashboardPage() {
  const [data, setData] = useState<{ stats: Stat[]; recentActivity: Activity[] } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get<{ stats: Stat[]; recentActivity: Activity[] }>('/api/dashboard')
      .then((response) => setData(response.data))
      .catch((requestError) => setError(errorMessage(requestError)));
  }, []);

  if (error) return <ErrorPanel message={error} />;
  if (!data) return <Loading label="Loading dashboard…" />;

  return (
    <>
      <div className="welcome-banner">
        <div>
          <p className="eyebrow">Overview</p>
          <h2 className="welcome-title">Sourcing operations</h2>
          <p className="welcome-sub">Here is what is happening in your sourcing platform today.</p>
        </div>
        <div className="welcome-date">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <section className="stat-grid" aria-label="Dashboard statistics">
        {data.stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return (
            <article className="stat-card" key={stat.key}>
              <div className="stat-icon"><Icon /></div>
              <span>{stat.label}</span>
              <strong>{stat.total}</strong>
              <Link className="stat-link" to={stat.link}>View all →</Link>
            </article>
          );
        })}
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Overview</p>
            <h2>Recent Activity</h2>
          </div>
          <span className="count">{data.recentActivity.length} entries</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Type</th><th>Name</th><th>Meta</th><th>Status</th><th>Created</th><th><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {data.recentActivity.map((item) => (
                <tr key={`${item.resource}-${item.id}`}>
                  <td><span className="pill">{item.resource}</span></td>
                  <td className="fw-medium">{item.title}</td>
                  <td className="text-muted">{item.meta || '—'}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="text-muted text-sm">{formatValue(item.created_at)}</td>
                  <td><Link className="button small" to={`/submissions/${item.resource}/${item.id}`}>Open →</Link></td>
                </tr>
              ))}
              {!data.recentActivity.length && (
                <tr><td className="empty" colSpan={6}>No recent activity yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

import { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router';
import { api } from '../api';
import { ErrorPanel, Loading } from '../components/Loading';
import { SearchToolbar } from '../components/SearchToolbar';
import { StatusBadge } from '../components/StatusBadge';
import type { RecordListData } from '../types';
import { errorMessage, formatValue } from '../utils';

export function RecordListPage() {
  const { resource = '' } = useParams();
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<RecordListData | null>(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setData(null);
    setError('');
    const status = searchParams.get('status');
    const query = status ? `?status=${encodeURIComponent(status)}` : '';
    api.get<RecordListData>(`/api/submissions/${resource}${query}`)
      .then((response) => setData(response.data))
      .catch((requestError) => setError(errorMessage(requestError)));
  }, [resource, searchParams]);

  const filteredRows = useMemo(() => {
    if (!data) return [];
    const needle = search.trim().toLowerCase();
    if (!needle) return data.rows;
    return data.rows.filter((row) => data.config.columns.some((column) => (
      formatValue(row[column.key]).toLowerCase().includes(needle)
    )));
  }, [data, search]);

  if (error) return <ErrorPanel message={error} />;
  if (!data) return <Loading label="Loading submissions…" />;

  return (
    <section className="panel" aria-label={`${data.config.title} records`}>
      <div className="panel-header">
        <div>
          <p className="eyebrow">Submissions</p>
          <h2>{data.config.title}</h2>
        </div>
        <span className="count">{filteredRows.length} records</span>
      </div>
      <SearchToolbar
        onChange={setSearch}
        placeholder={`Search ${data.config.title.toLowerCase()}…`}
        value={search}
      />
      <div className="table-wrap">
        <table aria-label={`${data.config.title} submissions`}>
          <thead>
            <tr>
              {data.config.columns.map((column) => <th key={column.key}>{column.label}</th>)}
              <th><span className="visually-hidden">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id}>
                {data.config.columns.map((column) => (
                  <td key={column.key}>
                    {column.key === 'status'
                      ? <StatusBadge status={String(row[column.key] || 'unknown')} />
                      : column.key === 'is_active'
                        ? <StatusBadge status={row[column.key] ? 'active' : 'inactive'} />
                        : formatValue(row[column.key])}
                  </td>
                ))}
                <td><Link className="button small" to={`/submissions/${resource}/${row.id}`}>Open →</Link></td>
              </tr>
            ))}
            {!filteredRows.length && (
              <tr><td className="empty" colSpan={data.config.columns.length + 1}>No records found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

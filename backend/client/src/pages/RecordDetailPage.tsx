import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router';
import { api, getImageUrl } from '../api';
import { ErrorPanel, Loading } from '../components/Loading';
import { StatusBadge } from '../components/StatusBadge';
import { useToast } from '../toast';
import type { RecordDetailData } from '../types';
import { confirmAction } from '../components/confirm';
import { errorMessage, formatValue } from '../utils';

function DetailValue({ field, value }: { field: string; value: unknown }) {
  if (field === 'factory_images' && Array.isArray(value)) {
    return value.length ? (
      <div className="image-list image-thumbs">
        {value.map((image) => (
          <a href={getImageUrl(String(image))} key={String(image)} rel="noreferrer" target="_blank">
            <img alt="Factory" src={getImageUrl(String(image))} />
          </a>
        ))}
      </div>
    ) : <em className="muted">No images attached</em>;
  }
  if (field === 'reference_image' && value) {
    return (
      <div className="image-preview">
        <a href={getImageUrl(String(value))} rel="noreferrer" target="_blank">
          <img alt="Reference" src={getImageUrl(String(value))} />
        </a>
      </div>
    );
  }
  if (field === 'admin_notes') {
    let notesList: { text: string; timestamp: string; status?: string }[] = [];
    if (value) {
      try {
        const parsed = JSON.parse(String(value));
        if (Array.isArray(parsed)) {
          notesList = parsed;
        } else {
          notesList = [{ text: String(value), timestamp: '' }];
        }
      } catch (e) {
        notesList = [{ text: String(value), timestamp: '' }];
      }
    }
    if (!notesList.length) return <em className="muted">No notes</em>;
    return (
      <div className="space-y-3 mt-1">
        {notesList.map((note, index) => (
          <div key={index} className="text-sm border-l-2 border-teal-500 pl-3 py-1 bg-slate-50/50 rounded-r-md mb-2">
            <p className="text-slate-800 font-normal whitespace-pre-wrap">{note.text}</p>
            <div className="flex items-center gap-2 mt-1">
              {note.status && (
                <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full capitalize">{note.status.replaceAll('_', ' ')}</span>
              )}
              {note.timestamp && (
                <span className="text-[10px] text-slate-400">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <strong>{formatValue(value)}</strong>;
}

export function RecordDetailPage() {
  const { resource = '', id = '' } = useParams();
  const { showToast } = useToast();
  const [data, setData] = useState<RecordDetailData | null>(null);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [notesHistory, setNotesHistory] = useState<{ text: string; timestamp: string; status?: string }[]>([]);
  const [editingNoteIndex, setEditingNoteIndex] = useState<number | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const response = await api.get<RecordDetailData>(`/api/submissions/${resource}/${id}`);
    setData(response.data);
    setStatus(String(response.data.record.status || ''));
    
    const rawNotes = response.data.record.admin_notes;
    let parsedHistory: { text: string; timestamp: string; status?: string }[] = [];
    if (rawNotes) {
      try {
        const parsed = JSON.parse(String(rawNotes));
        if (Array.isArray(parsed)) {
          parsedHistory = parsed;
        } else {
          parsedHistory = [{ text: String(rawNotes), timestamp: '' }];
        }
      } catch (e) {
        parsedHistory = [{ text: String(rawNotes), timestamp: '' }];
      }
    }
    setNotesHistory(parsedHistory);
    setNewNote('');
  }, [id, resource]);

  useEffect(() => {
    setError('');
    load().catch((requestError) => setError(errorMessage(requestError)));
  }, [load]);

  async function handleStatus(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await api.patch(`/api/submissions/${resource}/${id}/status`, {
        status,
        admin_notes: newNote,
      });
      showToast(response.message || 'Status updated.');
      await load();
    } catch (requestError) {
      showToast(errorMessage(requestError), 'error');
    } finally {
      setSaving(false);
    }
  }

  async function handleEditNote(index: number) {
    if (savingNote) return;
    setSavingNote(true);
    try {
      const updatedNotes = [...notesHistory];
      updatedNotes[index] = { ...updatedNotes[index], text: editingNoteText };
      
      const response = await api.put(`/api/submissions/${resource}/${id}/notes`, {
        notes: updatedNotes,
      });
      showToast(response.message || 'Note updated.');
      setEditingNoteIndex(null);
      await load();
    } catch (requestError) {
      showToast(errorMessage(requestError), 'error');
    } finally {
      setSavingNote(false);
    }
  }

  async function handleDeleteNote(index: number) {
    if (!(await confirmAction('Are you sure you want to delete this note?', 'Delete Note'))) return;
    if (savingNote) return;
    setSavingNote(true);
    try {
      const updatedNotes = [...notesHistory];
      updatedNotes.splice(index, 1);
      
      const response = await api.put(`/api/submissions/${resource}/${id}/notes`, {
        notes: updatedNotes,
      });
      showToast(response.message || 'Note deleted.');
      if (editingNoteIndex === index) {
        setEditingNoteIndex(null);
      }
      await load();
    } catch (requestError) {
      showToast(errorMessage(requestError), 'error');
    } finally {
      setSavingNote(false);
    }
  }

  if (error) return <ErrorPanel message={error} />;
  if (!data) return <Loading label="Loading record…" />;

  return (
    <>
      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Detail View</p>
            <h2>{data.config.title} <small className="muted">#{data.record.id}</small></h2>
          </div>
          <Link className="button" to={`/submissions/${resource}`}>← Back</Link>
        </div>
        <div className="detail-grid">
          {data.config.detailFields.map((field) => (
            <div className="detail-item" key={field.key}>
              <span>{field.label}</span>
              <DetailValue field={field.key} value={data.record[field.key]} />
            </div>
          ))}
        </div>
      </section>

      {!!data.config.statusOptions.length && (
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Workflow</p>
              <h2>Update Status</h2>
            </div>
            <StatusBadge status={String(data.record.status || 'unknown')} />
          </div>
          <form className="form-grid compact" onSubmit={(event) => void handleStatus(event)}>
            <label htmlFor="status">
              <span>New Status</span>
              <select id="status" onChange={(event) => setStatus(event.target.value)} value={status}>
                {data.config.statusOptions.map((option) => (
                  <option key={option} value={option}>{option.replaceAll('_', ' ')}</option>
                ))}
              </select>
            </label>
            {Object.prototype.hasOwnProperty.call(data.record, 'admin_notes') && (
              <div className="wide space-y-4">
                {notesHistory.length > 0 && (
                  <div className="space-y-2">
                    <span className="tw-label">Notes History</span>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1 border border-slate-100 rounded-xl p-3 bg-slate-50/30">
                      {notesHistory.map((note, index) => (
                        <div key={index} className="bg-white rounded-lg p-3 border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Note #{index + 1}</span>
                              {note.status && (
                                <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full capitalize">{note.status.replaceAll('_', ' ')}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-3">
                              {note.timestamp && (
                                <span className="text-[10px] text-slate-400">
                                  {new Date(note.timestamp).toLocaleString()}
                                </span>
                              )}
                              {editingNoteIndex !== index && (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => { setEditingNoteIndex(index); setEditingNoteText(note.text); }}
                                    className="text-[10px] text-blue-600 hover:underline cursor-pointer font-medium"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => void handleDeleteNote(index)}
                                    className="text-[10px] text-red-600 hover:underline cursor-pointer font-medium"
                                  >
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                          
                          {editingNoteIndex === index ? (
                            <div className="mt-2">
                              <textarea
                                className="tw-input w-full text-sm mb-2"
                                rows={3}
                                value={editingNoteText}
                                onChange={(e) => setEditingNoteText(e.target.value)}
                              />
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded font-medium transition-colors hover:bg-teal-700 disabled:opacity-50"
                                  onClick={() => void handleEditNote(index)}
                                  disabled={savingNote}
                                >
                                  {savingNote ? 'Saving...' : 'Save Note'}
                                </button>
                                <button
                                  type="button"
                                  className="text-xs border border-slate-300 px-3 py-1.5 rounded font-medium hover:bg-slate-50 disabled:opacity-50"
                                  onClick={() => setEditingNoteIndex(null)}
                                  disabled={savingNote}
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-slate-800 whitespace-pre-wrap font-medium">{note.text}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <label className="wide" htmlFor="admin_notes">
                  <span>Add New Admin Note</span>
                  <textarea
                    id="admin_notes"
                    onChange={(event) => setNewNote(event.target.value)}
                    placeholder="Type new internal note to append to history…"
                    rows={3}
                    value={newNote}
                  />
                </label>
              </div>
            )}
            <div className="form-actions wide">
              <button className="button primary" disabled={saving} type="submit">
                {saving ? 'Saving…' : 'Save Status'}
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}

import { Plus, X } from 'lucide-react';

export function StringListEditor({
  values,
  onChange,
  placeholder,
  addLabel,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
  addLabel: string;
}) {
  const rows = values.length ? values : [''];
  return (
    <div>
      {rows.map((value, index) => (
        <div className="flex gap-3 mb-3 items-center" key={index}>
          <input
            className="tw-input flex-1"
            onChange={(event) => {
              const next = [...rows];
              next[index] = event.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            value={value}
          />
          <button
            aria-label={`Remove ${addLabel.toLowerCase()}`}
            className="btn-remove"
            onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
            type="button"
          >
            <X size={15} />
          </button>
        </div>
      ))}
      <button className="btn-add inline-flex items-center gap-2" onClick={() => onChange([...rows, ''])} type="button">
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

export interface KeyValue {
  key: string;
  value: string;
}

export function KeyValueEditor({
  values,
  onChange,
  keyPlaceholder,
  valuePlaceholder,
  addLabel,
}: {
  values: KeyValue[];
  onChange: (values: KeyValue[]) => void;
  keyPlaceholder: string;
  valuePlaceholder: string;
  addLabel: string;
}) {
  const rows = values.length ? values : [{ key: '', value: '' }];
  return (
    <div>
      {rows.map((row, index) => (
        <div className="flex flex-col sm:flex-row gap-3 mb-3 items-stretch sm:items-center" key={index}>
          <input
            className="tw-input w-full sm:w-1/3"
            onChange={(event) => {
              const next = [...rows];
              next[index] = { ...next[index], key: event.target.value };
              onChange(next);
            }}
            placeholder={keyPlaceholder}
            value={row.key}
          />
          <input
            className="tw-input flex-1 w-full"
            onChange={(event) => {
              const next = [...rows];
              next[index] = { ...next[index], value: event.target.value };
              onChange(next);
            }}
            placeholder={valuePlaceholder}
            value={row.value}
          />
          <button
            aria-label={`Remove ${addLabel.toLowerCase()}`}
            className="btn-remove"
            onClick={() => onChange(rows.filter((_, rowIndex) => rowIndex !== index))}
            type="button"
          >
            <X size={15} />
          </button>
        </div>
      ))}
      <button
        className="btn-add inline-flex items-center gap-2"
        onClick={() => onChange([...rows, { key: '', value: '' }])}
        type="button"
      >
        <Plus size={15} /> {addLabel}
      </button>
    </div>
  );
}

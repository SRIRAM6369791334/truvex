import { Search } from 'lucide-react';

export function SearchToolbar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="toolbar" role="search">
      <label className="visually-hidden" htmlFor="table-search-input">Search records</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
        <input
          className="table-search !pl-10"
          id="table-search-input"
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type="search"
          value={value}
        />
      </div>
    </div>
  );
}

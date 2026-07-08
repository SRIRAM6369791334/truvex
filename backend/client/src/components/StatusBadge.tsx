const greenStatuses = new Set(['approved', 'active', 'completed', 'in stock']);
const amberStatuses = new Set(['pending', 'contacted', 'new', 'processing', 'in_progress', 'quoted']);
const redStatuses = new Set(['rejected', 'suspended', 'inactive', 'out', 'no_answer']);
const blueStatuses = new Set(['read', 'replied', 'called', 'closed']);

export function statusClass(status: string) {
  const normalized = status.toLowerCase();
  if (greenStatuses.has(normalized)) return 'green';
  if (amberStatuses.has(normalized)) return 'amber';
  if (redStatuses.has(normalized)) return 'red';
  if (blueStatuses.has(normalized)) return 'blue';
  return 'gray';
}

export function StatusBadge({ status }: { status: string }) {
  return <span className={`status ${statusClass(status)}`}>{status.replaceAll('_', ' ')}</span>;
}

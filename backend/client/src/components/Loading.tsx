export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="loading-screen" role="status" aria-label={label}>
      <div>
        <div className="spinner" />
        <p>{label}</p>
      </div>
    </div>
  );
}

export function ErrorPanel({ message }: { message: string }) {
  return (
    <section className="panel empty-panel" role="alert">
      <h2>Unable to load this page</h2>
      <p>{message}</p>
    </section>
  );
}

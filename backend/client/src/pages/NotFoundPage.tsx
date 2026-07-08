import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="panel empty-panel">
      <h2>Page not found</h2>
      <p>The admin page you requested does not exist.</p>
      <Link className="button primary" to="/">Back to dashboard</Link>
    </section>
  );
}

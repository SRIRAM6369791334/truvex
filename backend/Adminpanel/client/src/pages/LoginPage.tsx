import { useState, type FormEvent } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { ApiError } from '../api';
import { useAuth } from '../auth';
import { Loading } from '../components/Loading';
import { useToast } from '../toast';

export function LoginPage() {
  const { user, loading, login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fields, setFields] = useState<Record<string, string | undefined>>({});

  if (loading) return <Loading label="Checking session…" />;
  if (user) return <Navigate replace to="/" />;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setFields({});
    try {
      const message = await login(email, password);
      if (message) showToast(message);
      const destination = (location.state as { from?: string } | null)?.from || '/';
      navigate(destination, { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to sign in.');
      if (requestError instanceof ApiError) setFields(requestError.fields || {});
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login-page">
      {/* Decorative background overlay */}
      <div className="login-bg-overlay" />

      <section className="login-card">
        <div className="brand login-brand" style={{ justifyContent: 'center', width: '100%' }}>
          <img src="/logo.png" alt="Truvex Logo" style={{ height: '56px', width: 'auto', objectFit: 'contain', background: 'white', padding: '6px', borderRadius: 'var(--radius-md)' }} />
        </div>
        <h1>Welcome back</h1>
        <p>Sign in to manage sourcing submissions, suppliers, services, and categories.</p>
        {error && <div className="flash error" role="alert">{error}</div>}
        <form className="form-stack mt-[15px]" onSubmit={(event) => void handleSubmit(event)}>
          <label htmlFor="email">
            <span>Email address</span>
            <input
              autoFocus
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@truvex.com"
              required
              type="email"
              value={email}
            />
            {fields.email && <small className="field-error">{fields.email}</small>}
          </label>
          <label htmlFor="password">
            <span>Password</span>
            <div className="password-field-wrap">
              <input
                id="password"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
                type={showPassword ? 'text' : 'password'}
                value={password}
              />
              <button
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="password-toggle-btn"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
                type="button"
              >
                {showPassword ? (
                  /* Eye-off icon */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  /* Eye icon */
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {fields.password && <small className="field-error">{fields.password}</small>}
          </label>
          <button className="button primary full" disabled={submitting} type="submit">
            {submitting ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>
      </section>
    </div>
  );
}

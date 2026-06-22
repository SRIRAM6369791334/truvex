import { Menu, X, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../auth';
import { useToast } from '../toast';

const links = [
  ['/', 'Dashboard'],
  ['/categories', 'Categories'],
  ['/services', 'Services'],
  ['/submissions/buyers', 'Buyers'],
  ['/submissions/suppliers', 'Suppliers'],
  ['/submissions/service-leads', 'Service Leads'],
  ['/submissions/rfq', 'RFQs'],
  ['/submissions/enquiries', 'Enquiries'],
  ['/submissions/contacts', 'Contacts'],
  ['/settings', 'Settings'],
];

function pageTitle(pathname: string) {
  if (pathname === '/') return 'Dashboard';
  if (pathname.startsWith('/services')) return 'Services';
  if (pathname.startsWith('/categories')) return 'Categories';
  const match = links.find(([path]) => path !== '/' && pathname.startsWith(path));
  return match?.[1] || 'Truvex Admin';
}

export function Layout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Unable to sign out.', 'error');
    }
  }

  return (
    <>
      <div className={`mobile-overlay ${open ? 'open' : ''}`} onClick={() => setOpen(false)} />
      <aside className={`sidebar ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="brand">
          <img src="/logo.png" alt="Truvex Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain', background: 'white', padding: '6px', borderRadius: 'var(--radius-md)' }} />
          <button
            aria-label="Close menu"
            className="button ghost sidebar-close ml-auto"
            onClick={() => setOpen(false)}
            type="button"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="nav" aria-label="Primary">
          {links.map(([path, label]) => (
            <NavLink
              className={({ isActive }) => isActive ? 'active' : undefined}
              end={path === '/'}
              key={path}
              onClick={() => setOpen(false)}
              to={path}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="shell" id="main-content">
        <header className="topbar">
          <div className="flex items-center gap-3">
            <button
              aria-label="Open menu"
              className="button ghost"
              id="mobile-menu-btn"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Menu size={19} />
            </button>
            <div>
              <p className="eyebrow">Truvex Sourcing</p>
              <h1>{pageTitle(location.pathname)}</h1>
            </div>
          </div>
          <div className="userbar">
            <div className="user-profile">
              <div className="user-avatar">
                <User size={16} />
              </div>
              <div className="user-info">
                <span className="user-role">Administrator</span>
                <span className="user-name">{user?.name || 'Truvex Admin'}</span>
              </div>
            </div>
            <div className="divider-h" />
            <button 
              className="logout-btn" 
              id="logout-btn" 
              onClick={() => void handleLogout()} 
              type="button"
            >
              <LogOut size={14} />
              <span>Logout</span>
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </>
  );
}

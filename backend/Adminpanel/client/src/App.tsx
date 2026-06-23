import { useEffect } from 'react';
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router';
import { useAuth } from './auth';
import { Layout } from './components/Layout';
import { Loading } from './components/Loading';
import { CategoriesPage } from './pages/CategoriesPage';
import { CategoryFormPage } from './pages/CategoryFormPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { RecordDetailPage } from './pages/RecordDetailPage';
import { RecordListPage } from './pages/RecordListPage';
import { ServiceFormPage } from './pages/ServiceFormPage';
import { ServicesPage } from './pages/ServicesPage';
import { SettingsPage } from './pages/SettingsPage';

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading label="Checking session…" />;
  if (!user) return <Navigate replace state={{ from: location.pathname + location.search }} to="/login" />;
  return <Outlet />;
}

function DocumentTitle() {
  const location = useLocation();
  useEffect(() => {
    const section = location.pathname === '/'
      ? 'Dashboard'
      : location.pathname.split('/').filter(Boolean).map((part) => (
        part.charAt(0).toUpperCase() + part.slice(1).replaceAll('-', ' ')
      )).join(' · ');
    document.title = `${section || 'Admin'} | Truvex Admin`;
  }, [location.pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <DocumentTitle />
      <Routes>
        <Route element={<LoginPage />} path="/login" />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route element={<DashboardPage />} index />
            <Route element={<RecordListPage />} path="/submissions/:resource" />
            <Route element={<RecordDetailPage />} path="/submissions/:resource/:id" />
            <Route element={<ServicesPage />} path="/services" />
            <Route element={<ServiceFormPage />} path="/services/new" />
            <Route element={<ServiceFormPage />} path="/services/:id/edit" />
            <Route element={<CategoriesPage />} path="/categories" />
            <Route element={<CategoryFormPage />} path="/categories/new" />
            <Route element={<CategoryFormPage />} path="/categories/:id/edit" />
            <Route element={<SettingsPage />} path="/settings" />
            <Route element={<NotFoundPage />} path="*" />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

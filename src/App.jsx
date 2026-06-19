import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';

// Lazy-loaded public pages
const Home       = lazy(() => import('./pages/Home'));
const About      = lazy(() => import('./pages/About'));
const Programs   = lazy(() => import('./pages/Programs'));
const Facilities = lazy(() => import('./pages/Facilities'));
const Gallery    = lazy(() => import('./pages/Gallery'));
const Admission  = lazy(() => import('./pages/Admission'));
const Contact    = lazy(() => import('./pages/Contact'));

// Lazy-loaded admin pages
const AdminLayout     = lazy(() => import('./pages/admin/Layout'));
const Dashboard       = lazy(() => import('./pages/admin/Dashboard'));
const AdminAdmissions = lazy(() => import('./pages/admin/Admissions'));
const AdminInquiries  = lazy(() => import('./pages/admin/Inquiries'));
const AdminGallery    = lazy(() => import('./pages/admin/Gallery'));
const AdminNotices    = lazy(() => import('./pages/admin/Notices'));
const AdminFaculty    = lazy(() => import('./pages/admin/Faculty'));
const AdminSettings   = lazy(() => import('./pages/admin/Settings'));
const Login           = lazy(() => import('./pages/admin/Login'));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 5 * 60 * 1000 } },
});

// Protected route wrapper
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

// Public layout (with Navbar + Footer)
function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* ── Public pages ── */}
              <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
              <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
              <Route path="/programs" element={<PublicLayout><Programs /></PublicLayout>} />
              <Route path="/facilities" element={<PublicLayout><Facilities /></PublicLayout>} />
              <Route path="/gallery" element={<PublicLayout><Gallery /></PublicLayout>} />
              <Route path="/admission" element={<PublicLayout><Admission /></PublicLayout>} />
              <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />

              {/* ── Admin login ── */}
              <Route path="/admin/login" element={<Login />} />

              {/* ── Admin (protected) ── */}
              <Route path="/admin" element={
                <ProtectedRoute><AdminLayout /></ProtectedRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="admissions" element={<AdminAdmissions />} />
                <Route path="inquiries"  element={<AdminInquiries />} />
                <Route path="gallery"    element={<AdminGallery />} />
                <Route path="notices"    element={<AdminNotices />} />
                <Route path="faculty"    element={<AdminFaculty />} />
                <Route path="settings"   element={<AdminSettings />} />
              </Route>

              {/* ── 404 ── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
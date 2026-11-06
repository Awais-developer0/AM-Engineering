import React from 'react';
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import FrontendLayout from './Frontend';
import DashboardPage from './Dashboard';
import NotFound from './NotFound';
import { useAuth } from '../context/AuthContext';

// ─── Protected Route: sirf logged-in users ke liye ────────────────────────────
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    // Token verify ho raha hai, wait karo
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-8 h-8 border-3 border-brand-blue border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        {/* Public: Main Website & Public Routes for SEO */}
        <Route path="/" element={<FrontendLayout />} />
        <Route path="/services" element={<FrontendLayout />} />
        <Route path="/spare-parts" element={<FrontendLayout />} />
        <Route path="/safety-standards" element={<FrontendLayout />} />
        <Route path="/contact" element={<FrontendLayout />} />

        {/* Protected: Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* 404 Page Not Found */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;

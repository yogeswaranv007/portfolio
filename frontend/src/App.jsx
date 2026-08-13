import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { PublicLayout } from './components/layouts/PublicLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Cursor } from './components/ui/Cursor';
import { Toaster } from 'react-hot-toast';

const DashboardView = lazy(() => import('./pages/DashboardView').then(module => ({ default: module.DashboardView })));
const ProjectDetailView = lazy(() => import('./pages/ProjectDetailView').then(module => ({ default: module.ProjectDetailView })));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin').then(module => ({ default: module.default })));
const AdminLayout = lazy(() => import('./components/layouts/AdminLayout').then(module => ({ default: module.default })));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(module => ({ default: module.default })));
const AdminProfile = lazy(() => import('./pages/admin/AdminProfile').then(module => ({ default: module.default })));
const AdminSkills = lazy(() => import('./pages/admin/AdminSkills').then(module => ({ default: module.default })));
const AdminProjects = lazy(() => import('./pages/admin/AdminProjects').then(module => ({ default: module.default })));
const AdminProjectEdit = lazy(() => import('./pages/admin/AdminProjectEdit').then(module => ({ default: module.default })));
const AdminAchievements = lazy(() => import('./pages/admin/AdminAchievements').then(module => ({ default: module.default })));
const AdminCodingProfiles = lazy(() => import('./pages/admin/AdminCodingProfiles').then(module => ({ default: module.default })));
const AdminMessages = lazy(() => import('./pages/admin/AdminMessages').then(module => ({ default: module.default })));

// A wrapper component to provide useLocation to AnimatePresence if needed, 
// but DashboardLayout already handles route transitions internally.
// We just mount the Cursor globally here.

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Cursor />
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-[-2]"></div>
      <div className="absolute left-0 right-0 top-0 -z-[2] m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>

      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="projects/:id" element={<ProjectDetailView />} />
            <Route path="*" element={<DashboardView />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="projects/:id/edit" element={<AdminProjectEdit />} />
            <Route path="achievements" element={<AdminAchievements />} />
            <Route path="coding-profiles" element={<AdminCodingProfiles />} />
            <Route path="messages" element={<AdminMessages />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

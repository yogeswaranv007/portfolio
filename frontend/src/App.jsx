import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './components/layouts/PublicLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { Cursor } from './components/ui/Cursor';
import { Toaster } from 'react-hot-toast';

const CinematicSpaceCanvas = lazy(() => import('./components/canvas/CinematicSpaceCanvas'));

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

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-cards text-text border border-borders shadow-lg text-xs font-medium',
          duration: 4000,
        }}
      />
      <Cursor />
      <Suspense fallback={null}>
        <CinematicSpaceCanvas />
      </Suspense>

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

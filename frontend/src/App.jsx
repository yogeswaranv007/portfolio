import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { LoadingSpinner } from './components/ui/LoadingSpinner';

const DashboardView = lazy(() => import('./pages/DashboardView').then(module => ({ default: module.DashboardView })));
const ProjectsListView = lazy(() => import('./pages/ProjectsListView').then(module => ({ default: module.ProjectsListView })));
const ProjectDetailView = lazy(() => import('./pages/ProjectDetailView').then(module => ({ default: module.ProjectDetailView })));
const ArchitectureView = lazy(() => import('./pages/ArchitectureView').then(module => ({ default: module.default })));
const ContactView = lazy(() => import('./pages/ContactView').then(module => ({ default: module.default })));
const GithubDashboardView = lazy(() => import('./pages/GithubDashboardView').then(module => ({ default: module.default })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<DashboardView />} />
            <Route path="projects" element={<ProjectsListView />} />
            <Route path="projects/:id" element={<ProjectDetailView />} />
            <Route path="architecture" element={<ArchitectureView />} />
            <Route path="github" element={<GithubDashboardView />} />
            <Route path="contact" element={<ContactView />} />
            <Route path="*" element={<DashboardView />} /> {/* Simple 404 Fallback */}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

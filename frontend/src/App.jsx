import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layouts/DashboardLayout';
import { DashboardView } from './pages/DashboardView';
import { ProjectsListView } from './pages/ProjectsListView';
import { ProjectDetailView } from './pages/ProjectDetailView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardView />} />
          <Route path="projects" element={<ProjectsListView />} />
          <Route path="projects/:id" element={<ProjectDetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

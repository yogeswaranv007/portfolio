import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardView } from './pages/DashboardView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<DashboardView />} />
          {/* We'll add more routes incrementally */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

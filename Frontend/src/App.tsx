import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { ClientAuthProvider } from './context/ClientAuthContext';

// Public Layout & Pages
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { ServicePage } from './pages/ServicePage';
import { TaxCalculator } from './pages/TaxCalculator';
import { TrackStatus } from './pages/TrackStatus';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

// Client Portal Components & Pages
import { ClientProtectedRoute } from './components/portal/ClientProtectedRoute';
import { ClientLayout } from './components/portal/ClientLayout';
import { ClientLogin } from './pages/portal/ClientLogin';
import { ClientRegister } from './pages/portal/ClientRegister';
import { ClientDashboard } from './pages/portal/ClientDashboard';
import { ClientApplications } from './pages/portal/ClientApplications';
import { ClientApplicationDetail } from './pages/portal/ClientApplicationDetail';
import { ClientDocuments } from './pages/portal/ClientDocuments';
import { ClientInvoices } from './pages/portal/ClientInvoices';
import { ClientProfile } from './pages/portal/ClientProfile';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ToastProvider>
        <ClientAuthProvider>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="services/:slug" element={<ServicePage />} />
              <Route path="calculator" element={<TaxCalculator />} />
              <Route path="track" element={<TrackStatus />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Client Portal Public Auth Routes */}
            <Route path="/portal/login" element={<ClientLogin />} />
            <Route path="/portal/register" element={<ClientRegister />} />

            {/* Protected Client Self-Service Portal */}
            <Route
              path="/portal"
              element={
                <ClientProtectedRoute>
                  <ClientLayout />
                </ClientProtectedRoute>
              }
            >
              <Route index element={<ClientDashboard />} />
              <Route path="applications" element={<ClientApplications />} />
              <Route path="applications/:id" element={<ClientApplicationDetail />} />
              <Route path="documents" element={<ClientDocuments />} />
              <Route path="invoices" element={<ClientInvoices />} />
              <Route path="profile" element={<ClientProfile />} />
            </Route>
          </Routes>
        </ClientAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

export default App;

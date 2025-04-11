import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Importando a nova landing page
import AdminLayout from './layouts/AdminLayout';
import ProLayout from './layouts/ProLayout';
import PublicLayout from './layouts/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminUsers from './pages/admin/Users';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMessages from './pages/admin/Messages';
import AdminStatistics from './pages/admin/Statistics';
import AdminRevenue from './pages/admin/Revenue';
import ProRegister from './pages/Register';
import ProLogin from './pages/Login';
import ProDashboard from './pages/pro/Dashboard';
import ProSettings from './pages/pro/Settings';
import ProServices from './pages/pro/Services';
import ProAvailabilities from './pages/pro/Availabilities';
import ProAppointments from './pages/pro/Appointments';
import ProCustomers from './pages/pro/Customers';
import ProSupport from './pages/pro/Support';
import Booking from './pages/client/Booking';
import Plans from './pages/Plans';
import Subscribe from './pages/Subscribe';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutCanceled from './pages/CheckoutCanceled';

function App() {
  return (
    <Routes>

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute role="ADMIN">
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="revenue" element={<AdminRevenue />} />
      </Route>

      {/* Professional Routes */}
      <Route path="/register" element={<ProRegister />} />
      <Route path="/login" element={<ProLogin />} />
      <Route path="/pro" element={
        <ProtectedRoute role="PROFESSIONAL">
          <ProLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<ProDashboard />} />
        <Route path="settings" element={<ProSettings />} />
        <Route path="services" element={<ProServices />} />
        <Route path="availabilities" element={<ProAvailabilities />} />
        <Route path="appointments" element={<ProAppointments />} />
        <Route path="customers" element={<ProCustomers />} />
        <Route path="support" element={<ProSupport />} />
      </Route>
      <Route path="/sucesso" element={<CheckoutSuccess />} />
      <Route path="/cancelado" element={<CheckoutCanceled />} />
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} /> {/* Isso renderiza a landing em "/" */}
        <Route path="agendar/:slug" element={<Booking />} />
        <Route path="plans" element={<Plans />} />
        <Route path="subscribe/:planId" element={<Subscribe />} />
      </Route>

    </Routes>
  );
}

export default App;
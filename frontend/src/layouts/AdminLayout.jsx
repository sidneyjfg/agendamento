import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar isAdmin={true} /> {/* Passa true para indicar que é um ADMIN */}
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
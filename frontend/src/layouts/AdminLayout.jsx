import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
import { Outlet } from 'react-router-dom';

function ProLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Professional Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}

export default ProLayout;
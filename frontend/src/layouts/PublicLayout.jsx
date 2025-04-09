import { Outlet } from 'react-router-dom';

function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default PublicLayout;
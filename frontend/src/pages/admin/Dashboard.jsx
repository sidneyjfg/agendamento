import { useState, useEffect } from 'react';

function AdminDashboard() {
  const [stats, setStats] = useState({
    appointments: 0,
    revenue: 0,
    activeUsers: 0,
    services: 0,
    upcomingAppointments: []
  });

  useEffect(() => {
    // Simulate API call
    const mockStats = {
      appointments: 45,
      revenue: 3200,
      activeUsers: 15, // Número de usuários ativos
      services: 5, // Número de serviços oferecidos
      upcomingAppointments: [
        { id: 1, customer: 'John Doe', service: 'Haircut', date: '2024-03-20 14:00' },
        { id: 2, customer: 'Jane Smith', service: 'Massage', date: '2024-03-21 15:30' },
      ]
    };
    setStats(mockStats);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Appointments</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.appointments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-bold text-green-600">${stats.revenue}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Active Users</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.activeUsers}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Services</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.services}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Upcoming Appointments</h3>
          <div className="divide-y divide-gray-200">
            {stats.upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{appointment.customer}</p>
                    <p className="text-sm text-gray-500">{appointment.service}</p>
                  </div>
                  <p className="text-sm text-gray-600">{appointment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
import { useState, useEffect } from 'react';

function ProAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('upcoming'); // upcoming, past, all

  useEffect(() => {
    // Simulate API call
    const mockAppointments = [
      {
        id: 1,
        customer: 'John Doe',
        service: 'Basic Consultation',
        date: '2024-03-20',
        time: '14:00',
        status: 'confirmed',
        price: 50
      },
      {
        id: 2,
        customer: 'Jane Smith',
        service: 'Full Service',
        date: '2024-03-21',
        time: '15:30',
        status: 'pending',
        price: 100
      }
    ];
    setAppointments(mockAppointments);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 rounded-md ${filter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'past' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('past')}
          >
            Past
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {appointment.customer.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{appointment.customer}</h3>
                      <p className="text-sm text-gray-500">{appointment.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${appointment.price}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <span>{appointment.date}</span>
                      <span className="mx-2">•</span>
                      <span>{appointment.time}</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProAppointments;
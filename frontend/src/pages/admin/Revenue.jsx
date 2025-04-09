import { useState, useEffect } from 'react';

function AdminRevenue() {
  const [revenue, setRevenue] = useState({
    total: 0,
    subscriptions: [],
    transactions: []
  });

  useEffect(() => {
    // Simulate API call
    const mockRevenue = {
      total: 15800,
      subscriptions: [
        { id: 1, user: 'John Doe', plan: 'PREMIUM', amount: 29.99, date: '2024-03-15' },
        { id: 2, user: 'Jane Smith', plan: 'PREMIUM', amount: 29.99, date: '2024-03-14' },
      ],
      transactions: [
        { id: 1, description: 'Service Booking', amount: 150, date: '2024-03-15' },
        { id: 2, description: 'Service Booking', amount: 200, date: '2024-03-14' },
      ]
    };
    setRevenue(mockRevenue);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Revenue Overview</h2>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
        <p className="text-3xl font-bold text-green-600">${revenue.total.toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Subscriptions</h3>
          <div className="divide-y divide-gray-200">
            {revenue.subscriptions.map((sub) => (
              <div key={sub.id} className="py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{sub.user}</p>
                    <p className="text-sm text-gray-500">{sub.plan}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${sub.amount}</p>
                    <p className="text-sm text-gray-500">{sub.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Recent Transactions</h3>
          <div className="divide-y divide-gray-200">
            {revenue.transactions.map((trans) => (
              <div key={trans.id} className="py-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{trans.description}</p>
                    <p className="text-sm text-gray-500">{trans.date}</p>
                  </div>
                  <p className="font-medium">${trans.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRevenue;
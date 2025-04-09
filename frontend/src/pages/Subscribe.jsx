import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Subscribe() {
  const { planId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: ''
  });

  useEffect(() => {
    // Simulate API call to fetch plan details
    const mockPlans = {
      free: { id: 'free', name: 'Free Plan', price: 0 },
      premium: { id: 'premium', name: 'Premium Plan', price: 29.99 }
    };

    setPlan(mockPlans[planId]);
    setLoading(false);
  }, [planId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful subscription
      alert('Subscription successful!');
      navigate('/pro/dashboard');
    } catch (error) {
      alert('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!plan) {
    return <div>Plan not found</div>;
  }

  if (plan.price === 0) {
    return (
      <div className="max-w-md mx-auto mt-10 px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Confirm Free Plan</h2>
          <p className="text-gray-600 mb-6">
            You're about to activate the Free Plan. No payment information is required.
          </p>
          <button
            onClick={() => navigate('/pro/dashboard')}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Activate Free Plan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Subscribe to {plan.name}</h2>
        <div className="mb-6">
          <p className="text-gray-600">
            You will be charged ${plan.price} per month
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Holder Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              required
              pattern="[0-9]{16}"
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={formData.cardNumber}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                required
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                CVC
              </label>
              <input
                type="text"
                name="cvc"
                required
                pattern="[0-9]{3,4}"
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.cvc}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Processing...' : 'Subscribe Now'}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
}

export default Subscribe;
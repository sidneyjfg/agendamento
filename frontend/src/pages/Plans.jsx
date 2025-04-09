import { Link } from 'react-router-dom';

function Plans() {
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: [
        'Up to 10 appointments per month',
        'Basic calendar',
        'Email notifications',
        'Single service type'
      ],
      limitations: [
        'No custom URL',
        'No WhatsApp integration',
        'Limited analytics'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 29.99,
      features: [
        'Unlimited appointments',
        'Advanced calendar with availability',
        'Email & WhatsApp notifications',
        'Multiple service types',
        'Custom URL',
        'Detailed analytics',
        'Priority support'
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Choose Your Plan
        </h2>
        <p className="mt-4 text-xl text-gray-600">
          Select the perfect plan for your business needs
        </p>
      </div>

      <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white"
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
              <p className="mt-4 text-3xl font-extrabold text-gray-900">
                ${plan.price}
                <span className="text-base font-medium text-gray-500">/month</span>
              </p>
              <Link
                to={`/subscribe/${plan.id}`}
                className="mt-8 block w-full bg-indigo-600 border border-transparent rounded-md py-2 text-sm font-semibold text-white text-center hover:bg-indigo-700"
              >
                {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
              </Link>
            </div>
            <div className="px-6 pt-6 pb-8">
              <h4 className="text-sm font-medium text-gray-900">Features included:</h4>
              <ul className="mt-6 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex space-x-3">
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-green-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-500">{feature}</span>
                  </li>
                ))}
                {plan.limitations && (
                  <>
                    <li className="border-t border-gray-200 pt-4">
                      <h4 className="text-sm font-medium text-gray-900">Limitations:</h4>
                    </li>
                    {plan.limitations.map((limitation) => (
                      <li key={limitation} className="flex space-x-3">
                        <svg
                          className="flex-shrink-0 h-5 w-5 text-red-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-500">{limitation}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Plans;
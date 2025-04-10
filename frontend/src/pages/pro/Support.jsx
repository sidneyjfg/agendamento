import { useState } from 'react';

function ProSupport() {
  const [ticket, setTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    console.log('Support ticket submitted:', ticket);
    alert('Support ticket submitted successfully');
    setTicket({ subject: '', description: '', priority: 'medium' });
  };

  const handleChange = (e) => {
    setTicket({
      ...ticket,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Submit a Support Ticket</h3>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={ticket.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  required
                  value={ticket.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Priority</label>
                <select
                  name="priority"
                  value={ticket.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Ticket
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Help Resources</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Documentation</h4>
              <p className="text-sm text-gray-500 mt-1">
                Browse our comprehensive documentation for detailed guides and tutorials.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-900 text-sm mt-2 inline-block">
                View Documentation →
              </a>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">FAQs</h4>
              <p className="text-sm text-gray-500 mt-1">
                Find answers to commonly asked questions about our platform.
              </p>
              <a href="#" className="text-indigo-600 hover:text-indigo-900 text-sm mt-2 inline-block">
                View FAQs →
              </a>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-medium">Contact Support</h4>
              <p className="text-sm text-gray-500 mt-1">
                Need immediate assistance? Our support team is available 24/7.
              </p>
              <a href="mailto:support@example.com" className="text-indigo-600 hover:text-indigo-900 text-sm mt-2 inline-block">
                Email Support →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProSupport;
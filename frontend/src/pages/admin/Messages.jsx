import { useState, useEffect } from 'react';

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate API call
    const mockMessages = [
      { id: 1, from: 'John Doe', subject: 'Support Request', date: '2024-03-15', status: 'unread' },
      { id: 2, from: 'Jane Smith', subject: 'Account Issue', date: '2024-03-14', status: 'read' },
    ];
    setMessages(mockMessages);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className={`p-4 ${message.status === 'unread' ? 'bg-blue-50' : ''}`}>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{message.subject}</h3>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
              <p className="text-gray-600">From: {message.from}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminMessages;
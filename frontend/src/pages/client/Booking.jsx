import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Booking() {
  const { slug } = useParams();
  const [professional, setProfessional] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Simulate API call to fetch professional data
    const mockProfessional = {
      id: 1,
      name: 'Dr. John Doe',
      specialty: 'General Practitioner',
      avatar: 'https://via.placeholder.com/150'
    };
    setProfessional(mockProfessional);

    // Simulate API call to fetch services
    const mockServices = [
      { id: 1, name: 'Basic Consultation', duration: 30, price: 50 },
      { id: 2, name: 'Full Examination', duration: 60, price: 100 }
    ];
    setServices(mockServices);
  }, [slug]);

  const availableTimes = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to create booking
    const booking = {
      ...formData,
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      professional: professional.id
    };
    console.log('Booking created:', booking);
    alert('Booking confirmed!');
  };

  if (!professional) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="h-16 w-16 rounded-full"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-bold text-gray-900">{professional.name}</h1>
              <p className="text-gray-600">{professional.specialty}</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {services.map((service) => (
                <button
                  key={service.id}
                  className={`p-4 border rounded-lg text-left ${
                    selectedService?.id === service.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-indigo-500'
                  }`}
                  onClick={() => setSelectedService(service)}
                >
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-500">{service.duration} minutes</p>
                  <p className="text-sm font-medium mt-2">${service.price}</p>
                </button>
              ))}
            </div>

            {selectedService && (
              <>
                <h2 className="text-lg font-semibold mb-4">Select Date & Time</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      minDate={new Date()}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Available Times</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`p-2 text-sm border rounded ${
                            selectedTime === time
                              ? 'bg-indigo-600 text-white'
                              : 'hover:border-indigo-500'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {selectedTime && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">Your Information</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Confirm Booking
                      </button>
                    </form>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
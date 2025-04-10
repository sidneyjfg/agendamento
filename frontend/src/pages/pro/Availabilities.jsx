import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function ProAvailabilities() {
  const [date, setDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, start: '09:00', end: '17:00', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'] }
  ]);
  const [exceptions, setExceptions] = useState([
    { date: '2024-03-25', available: false, reason: 'Holiday' }
  ]);

  const handleAddTimeSlot = () => {
    const newSlot = {
      id: timeSlots.length + 1,
      start: '09:00',
      end: '17:00',
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    };
    setTimeSlots([...timeSlots, newSlot]);
  };

  const handleAddException = () => {
    const newException = {
      date: date.toISOString().split('T')[0],
      available: false,
      reason: ''
    };
    setExceptions([...exceptions, newException]);
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Availability Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Regular Schedule</h3>
          <div className="space-y-4">
            {timeSlots.map((slot) => (
              <div key={slot.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex space-x-4">
                    <input
                      type="time"
                      value={slot.start}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    <input
                      type="time"
                      value={slot.end}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    Remove
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => (
                    <label key={day} className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={slot.days.includes(day)}
                        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">{day}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              onClick={handleAddTimeSlot}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Time Slot
            </button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Exceptions</h3>
          <div className="mb-4">
            <Calendar
              onChange={setDate}
              value={date}
              className="w-full"
            />
          </div>
          <button
            onClick={handleAddException}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Exception for Selected Date
          </button>
          <div className="mt-4 space-y-2">
            {exceptions.map((exception, index) => (
              <div key={index} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <span className="font-medium">{exception.date}</span>
                  <span className="ml-2 text-sm text-gray-500">{exception.reason}</span>
                </div>
                <button className="text-red-600 hover:text-red-800">
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProAvailabilities;
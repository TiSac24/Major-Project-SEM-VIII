import { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api.js';
import { Calendar, User, Package, Clock } from 'lucide-react';
import BookingActions from './BookingActions.jsx';

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const loadBookings = () => {
    setLoading(true);
    apiFetch('/bookings')
      .then((data) => {
        setBookings(data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-yellow-100 text-yellow-800';
      case 'issued':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      case 'returned':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    return booking.status === filter;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Booking Requests</h2>
          <div className="flex gap-2">
            {['all', 'booked', 'issued', 'returned', 'cancelled'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${filter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-600">
              {filter === 'all'
                ? 'No bookings have been made yet.'
                : `No ${filter} bookings at the moment.`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div
                key={booking._id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        {booking.equipmentId?.name ?? 'Equipment'}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {booking.userId?.name ?? 'User'}
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        {booking.sportId?.name ?? 'Sport'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Calendar className="w-3 h-3" />
                      Date
                    </div>
                    <p className="font-semibold text-gray-900">
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Clock className="w-3 h-3" />
                      Time
                    </div>
                    <p className="font-semibold text-gray-900">
                      {booking.timeSlot}
                    </p>
                  </div>
                </div>

                <BookingActions booking={booking} onUpdate={loadBookings} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
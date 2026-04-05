import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { mockDb } from '../../lib/mockData.js';
import { Calendar, Clock, Package, AlertCircle } from 'lucide-react';

export default function BookingHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    if (!user) return;
    setLoading(true);
    mockDb.getBookingsByStudent(user.id).then((data) => {
      setBookings(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, [user?.id]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'issued':
        return 'bg-green-100 text-green-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading bookings...</p>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
        <p className="text-gray-600">Start by booking some equipment from the Available Equipment tab.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{booking.equipment.name}</h3>
                <p className="text-sm text-gray-500">{booking.equipment.category}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <Calendar className="w-3 h-3" />
                Date
              </div>
              <p className="font-semibold text-gray-900">
                {new Date(booking.booking_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <Clock className="w-3 h-3" />
                Time
              </div>
              <p className="font-semibold text-gray-900">
                {booking.start_time.slice(0, 5)} - {booking.end_time.slice(0, 5)}
              </p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                <Package className="w-3 h-3" />
                Quantity
              </div>
              <p className="font-semibold text-gray-900">{booking.quantity}</p>
            </div>
            {booking.fine_amount > 0 && (
              <div>
                <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                  <AlertCircle className="w-3 h-3" />
                  Fine
                </div>
                <p className="font-semibold text-red-600">${booking.fine_amount}</p>
              </div>
            )}
          </div>

          {booking.admin_notes && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">Admin Notes:</p>
              <p className="text-sm text-gray-700">{booking.admin_notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

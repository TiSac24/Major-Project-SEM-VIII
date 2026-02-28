import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { apiFetch } from '../../lib/api.js';
import { LogOut, Calendar, Package } from 'lucide-react';
import EquipmentList from './EquipmentList.jsx';
import BookingHistory from './BookingHistory.jsx';
import { ToastContainer } from 'react-toastify';

export default function StudentDashboard() {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('equipment');
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaderVisible, setLoaderVisible] = useState(false);

  const loadEquipment = () => {
    setLoading(true);
    apiFetch('/equipment')
      .then((data) => {
        const mapped = (data || []).map((item) => ({
          id: item._id,
          name: item.name,
          description: item.sportId?.name || '',
          category: item.sportId?.name || 'Sport',
          total_quantity: item.totalQuantity,
          available_quantity: item.availableQuantity,
          image_url: null,
        }));
        setEquipment(mapped);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Sports Equipment</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-700">Welcome, {profile?.full_name}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('equipment')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'equipment'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Available Equipment
                </div>
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  My Bookings
                </div>
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'equipment' ? (
          <EquipmentList equipment={equipment} loading={loading} onBookingCreated={loadEquipment} />
        ) : (
          <BookingHistory />
        )}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

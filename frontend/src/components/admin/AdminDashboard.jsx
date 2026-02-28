import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { LogOut, Package, Calendar, Shield } from 'lucide-react';
import EquipmentManagement from './EquipmentManagement.jsx';
import BookingManagement from './BookingManagement.jsx';
import { ToastContainer } from 'react-toastify';

export default function AdminDashboard() {
  const { profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('equipment');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold text-white">Admin Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, {profile?.full_name}</span>
              <button
                onClick={() => signOut()}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-slate-700 rounded-lg transition"
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
          <div className="border-b border-gray-200 bg-white rounded-t-lg">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('equipment')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === 'equipment'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Equipment Management
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
                  Booking Management
                </div>
              </button>
            </nav>
          </div>
        </div>

        {activeTab === 'equipment' ? <EquipmentManagement /> : <BookingManagement />}
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

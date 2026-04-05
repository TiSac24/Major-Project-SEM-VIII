import { useState } from 'react';
import { mockDb } from '../../lib/mockData.js';
import { Check, X, Send, RotateCcw, DollarSign } from 'lucide-react';
import { toast } from 'react-toastify';

export default function BookingActions({ booking, onUpdate }) {
  const [notes, setNotes] = useState('');
  const [fineAmount, setFineAmount] = useState(0);
  const [showNotesInput, setShowNotesInput] = useState(false);
  const [showFineInput, setShowFineInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!confirm('Approve this booking?')) return;
    await updateBookingStatus('approved', notes);
  };

  const handleReject = async () => {
    setShowNotesInput(true);
    if (!notes) {
      alert('Please provide a reason for rejection');
      return;
    }
    if (!confirm('Reject this booking?')) return;
    await updateBookingStatus('rejected', notes);
  };

  const handleIssue = async () => {
    if (!confirm('Issue this equipment? Available quantity will be reduced.')) return;
    setLoading(true);

    try {
      const eq = mockDb.getEquipmentById(booking.equipment_id);
      if (!eq || eq.available_quantity < booking.quantity) {
        alert('Not enough equipment available to issue');
        return;
      }

      mockDb.updateEquipment(booking.equipment_id, {
        available_quantity: eq.available_quantity - booking.quantity,
      });
      mockDb.updateBooking(booking.id, {
        status: 'issued',
        issued_at: new Date().toISOString(),
        admin_notes: notes || null,
      });

      onUpdate();
      toast.success('Equipment issued successfully');
    } catch (error) {
      toast.error('Failed to issue equipment');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setNotes('');
      setShowNotesInput(false);
    }
  };

  const handleReturn = async () => {
    setShowFineInput(true);
    if (!confirm(`Process return${fineAmount > 0 ? ` with fine of $${fineAmount}` : ''}?`)) return;
    setLoading(true);

    try {
      const eq = mockDb.getEquipmentById(booking.equipment_id);
      if (!eq) throw new Error('Equipment not found');

      mockDb.updateEquipment(booking.equipment_id, {
        available_quantity: eq.available_quantity + booking.quantity,
      });
      mockDb.updateBooking(booking.id, {
        status: 'returned',
        returned_at: new Date().toISOString(),
        fine_amount: fineAmount,
        admin_notes: notes || null,
      });

      onUpdate();
      toast.success('Return processed successfully');
    } catch (error) {
      toast.error('Failed to process return');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setNotes('');
      setFineAmount(0);
      setShowNotesInput(false);
      setShowFineInput(false);
    }
  };

  const updateBookingStatus = async (status, adminNotes) => {
    setLoading(true);
    try {
      mockDb.updateBooking(booking.id, {
        status: status,
        admin_notes: adminNotes || null,
      });
      onUpdate();
      toast.success(`Booking ${status}`);
    } catch (error) {
      toast.error('Failed to update booking');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setNotes('');
      setShowNotesInput(false);
    }
  };

  if (booking.status === 'returned' || booking.status === 'rejected') {
    return null;
  }

  return (
    <div className="space-y-3">
      {(showNotesInput || showFineInput) && (
        <div className="space-y-2">
          {showNotesInput && (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes (optional for approval, required for rejection)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              rows={2}
            />
          )}
          {showFineInput && (
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={fineAmount}
                onChange={(e) => setFineAmount(parseFloat(e.target.value) || 0)}
                placeholder="Fine amount (if any)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                min={0}
                step={0.01}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2">
        {booking.status === 'pending' && (
          <>
            <button
              onClick={handleApprove}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              Approve
            </button>
            <button
              onClick={() => {
                if (!showNotesInput) {
                  setShowNotesInput(true);
                } else {
                  handleReject();
                }
              }}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50"
            >
              <X className="w-4 h-4" />
              Reject
            </button>
          </>
        )}

        {booking.status === 'approved' && (
          <button
            onClick={handleIssue}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Issue Equipment
          </button>
        )}

        {booking.status === 'issued' && (
          <button
            onClick={() => {
              if (!showFineInput) {
                setShowFineInput(true);
                setShowNotesInput(true);
              } else {
                handleReturn();
              }
            }}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700 transition disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4" />
            Process Return
          </button>
        )}
      </div>
    </div>
  );
}

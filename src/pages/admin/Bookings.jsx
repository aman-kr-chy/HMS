import React from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/format';
import { CheckCircle, XCircle, LogOut } from 'lucide-react';

const Bookings = () => {
  const { bookings, customers, updateBookingStatus, checkIn, checkOut, cancelBooking } = useData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage all guest reservations.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium border-b border-gray-100">Booking ID</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Guest</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Room</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Dates</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Amount</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? bookings.map((booking) => {
                const customer = customers.find(c => c.id === booking.customerId);
                return (
                  <tr key={booking.id} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="font-medium text-gray-900">{customer ? `${customer.firstName} ${customer.lastName}` : (booking.guestName || 'Unknown')}</div>
                      <div className="text-xs text-gray-400">{customer?.email || booking.guestEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.roomType}
                      <div className="text-xs text-gray-400">ID: {booking.roomId}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="font-medium">In:</span> {booking.checkInDate} <br />
                      <span className="font-medium">Out:</span> {booking.checkOutDate}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {formatCurrency(booking.totalAmount)}
                      <div className="text-xs font-normal text-gray-500">{booking.paymentStatus}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                        booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                       {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => {
                              if(window.confirm('Mark as Checked-In? Room status will change to Occupied.')) checkIn(booking.id)
                            }}
                            className="inline-flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 p-2 rounded-md transition-colors" title="Check In"
                          >
                            <CheckCircle size={16} />
                          </button>
                       )}
                       {booking.status === 'Confirmed' && (
                          <button 
                            onClick={() => {
                               if(window.confirm('Mark as Checked-Out? Room status will change to Available.')) checkOut(booking.id)
                            }}
                            className="inline-flex items-center justify-center bg-blue-50 text-blue-600 hover:bg-blue-100 p-2 rounded-md transition-colors" title="Check Out"
                          >
                            <LogOut size={16} />
                          </button>
                       )}
                       
                       {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                          <button 
                            onClick={() => {
                               if(window.confirm('Are you sure you want to cancel this booking?')) cancelBooking(booking.id)
                            }}
                            className="inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 p-2 rounded-md transition-colors" title="Cancel Booking"
                          >
                            <XCircle size={16} />
                          </button>
                       )}

                       {(booking.status === 'Cancelled' || booking.status === 'Completed') && (
                          <span className="text-gray-400 text-xs font-medium italic px-2">No actions</span>
                       )}
                    </td>
                  </tr>
                )
              }) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Bookings;

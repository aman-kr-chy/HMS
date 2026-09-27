import React from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/format';
import { BedDouble, Users, CreditCard, CalendarCheck, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, subtitle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
    <div className={`p-4 rounded-lg ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
    </div>
  </div>
);

const Dashboard = () => {
  const { stats, bookings, customers } = useData();

  // Get 5 most recent bookings
  const recentBookings = [...bookings].reverse().slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <button className="bg-[#0b1d30] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#1a314b] transition-colors">
          <TrendingUp size={16} />
          View Reports
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(stats.totalRevenue)} 
          icon={CreditCard} 
          colorClass="bg-green-100 text-green-600"
          subtitle="All time confirmed payments"
        />
        <StatCard 
          title="Available Rooms" 
          value={stats.availableRooms} 
          icon={BedDouble} 
          colorClass="bg-blue-100 text-blue-600"
          subtitle={`Out of ${stats.totalRooms} total rooms`}
        />
        <StatCard 
          title="Total Customers" 
          value={stats.totalCustomers} 
          icon={Users} 
          colorClass="bg-purple-100 text-purple-600"
          subtitle="Registered guests"
        />
        <StatCard 
          title="Today's Activity" 
          value={stats.todaysCheckins + stats.todaysCheckouts} 
          icon={CalendarCheck} 
          colorClass="bg-amber-100 text-amber-600"
          subtitle={`${stats.todaysCheckins} Check-ins / ${stats.todaysCheckouts} Check-outs`}
        />
      </div>

      {/* Recent Bookings Table */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium border-b border-gray-100">Booking ID</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Guest Name</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Room Type</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Check In / Out</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => {
                  const customer = customers.find(c => c.id === booking.customerId);
                  return (
                    <tr key={booking.id} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{booking.roomType}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {booking.checkInDate} <br />
                        <span className="text-xs text-gray-400">to {booking.checkOutDate}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                          booking.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(booking.totalAmount)}</td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No recent bookings found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

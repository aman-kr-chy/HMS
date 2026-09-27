import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, BedDouble, CalendarDays, LogOut } from 'lucide-react';
import { cn } from '../../utils/cn';

const AdminLayout = () => {
  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/rooms', icon: BedDouble, label: 'Rooms' },
    { to: '/admin/bookings', icon: CalendarDays, label: 'Bookings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0b1d30] text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-2xl font-serif font-bold text-amber-500">Admin Panel</h2>
          <p className="text-xs text-white/60 uppercase tracking-widest mt-1">Management</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-medium",
                    isActive
                      ? "bg-amber-500 text-white shadow-md"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  )
                }
              >
                <Icon size={20} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-md text-white/70 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            Back to Website
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center px-8 justify-between shrink-0">
          <div className="md:hidden">
             <h2 className="text-xl font-serif font-bold text-[#0b1d30]">Admin Panel</h2>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-gray-800">Overview</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:block">Admin User</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8 bg-gray-50/50 relative">
          <div className="max-w-7xl mx-auto">
             <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

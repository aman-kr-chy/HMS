import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { formatCurrency } from '../../utils/format';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const Rooms = () => {
  const { rooms, addRoom, updateRoom, updateRoomStatus, deleteRoom } = useData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  
  const [formData, setFormData] = useState({
    roomNumber: '',
    type: 'Standard',
    capacity: 2,
    price: 1000,
    status: 'Available'
  });

  const openAddModal = () => {
    setEditingRoom(null);
    setFormData({ roomNumber: '', type: 'Standard', capacity: 2, price: 1000, status: 'Available' });
    setIsModalOpen(true);
  };

  const openEditModal = (room) => {
    setEditingRoom(room);
    setFormData({ ...room });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'capacity' || name === 'price' ? Number(value) : value }));
  };

  const handleSaveRoom = (e) => {
    e.preventDefault();
    if (editingRoom) {
      updateRoom(editingRoom.id, formData);
    } else {
      addRoom(formData);
    }
    setIsModalOpen(false);
  };

  const handleStatusChange = (roomId, newStatus) => {
    updateRoomStatus(roomId, newStatus);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Rooms</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage hotel room inventory and status.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-[#0b1d30] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#1a314b] transition-colors"
        >
          <Plus size={16} />
          Add New Room
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-sm">
                <th className="px-6 py-4 font-medium border-b border-gray-100">Room Number</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Type</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Capacity</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Price/Night</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100">Status</th>
                <th className="px-6 py-4 font-medium border-b border-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className="hover:bg-gray-50/50 border-b border-gray-50 last:border-0 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{room.roomNumber || room.number}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{room.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{room.capacity} Persons</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatCurrency(room.price)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={room.status}
                      onChange={(e) => handleStatusChange(room.id, e.target.value)}
                      className={`text-xs font-bold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-offset-1 cursor-pointer
                        ${room.status === 'Available' ? 'bg-green-100 text-green-700 focus:ring-green-500' : 
                          room.status === 'Occupied' ? 'bg-blue-100 text-blue-700 focus:ring-blue-500' : 
                          room.status === 'Reserved' ? 'bg-amber-100 text-amber-700 focus:ring-amber-500' :
                          'bg-red-100 text-red-700 focus:ring-red-500'
                        }`}
                    >
                      <option value="Available">Available</option>
                      <option value="Occupied">Occupied</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => openEditModal(room)} className="text-gray-400 hover:text-[#0b1d30] transition-colors" title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => {
                        if(window.confirm(`Are you sure you want to delete room ${room.roomNumber || room.number}?`)) {
                           deleteRoom(room.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors" title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Room Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">{editingRoom ? 'Edit Room' : 'Add New Room'}</h3>
            </div>
            
            <form onSubmit={handleSaveRoom} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input type="text" name="roomNumber" value={formData.roomNumber} onChange={handleFormChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0b1d30]" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select name="type" value={formData.type} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0b1d30]">
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Executive">Executive</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleFormChange} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0b1d30]">
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Persons)</label>
                  <input type="number" name="capacity" min="1" max="10" value={formData.capacity} onChange={handleFormChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0b1d30]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price / Night (₹)</label>
                  <input type="number" name="price" min="0" step="100" value={formData.price} onChange={handleFormChange} required className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#0b1d30]" />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-[#0b1d30] rounded-md hover:bg-[#1a314b]">
                  {editingRoom ? 'Save Changes' : 'Create Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;

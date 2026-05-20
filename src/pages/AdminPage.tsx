import React, { useState } from 'react';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

interface AdminAppointment {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export default function AdminPage() {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([
    {
      id: '1',
      patientName: 'John Doe',
      doctor: 'Dr. Rajesh Kumar',
      date: '2026-05-25',
      time: '10:00 AM',
      status: 'pending',
    },
    {
      id: '2',
      patientName: 'Jane Smith',
      doctor: 'Dr. Priya Sharma',
      date: '2026-05-26',
      time: '2:00 PM',
      status: 'confirmed',
    },
    {
      id: '3',
      patientName: 'Robert Johnson',
      doctor: 'Dr. Amit Patel',
      date: '2026-05-27',
      time: '11:00 AM',
      status: 'pending',
    },
  ]);

  const updateStatus = (id: string, status: 'confirmed' | 'cancelled') => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status } : apt
    ));
  };

  const deleteAppointment = (id: string) => {
    setAppointments(appointments.filter(apt => apt.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-hospital-green text-white';
      case 'cancelled':
        return 'bg-hospital-red text-white';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">Total Appointments</div>
            <div className="text-3xl font-bold text-hospital-blue">{appointments.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">Pending</div>
            <div className="text-3xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'pending').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-gray-600 text-sm font-medium mb-2">Confirmed</div>
            <div className="text-3xl font-bold text-hospital-green">
              {appointments.filter(a => a.status === 'confirmed').length}
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Patient Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Doctor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Time</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt) => (
                  <tr key={apt.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.patientName}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.doctor}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.date}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{apt.time}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(apt.status)}`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm flex space-x-3">
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateStatus(apt.id, 'confirmed')}
                            className="text-hospital-green hover:text-green-700 flex items-center space-x-1"
                            title="Confirm"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button
                            onClick={() => updateStatus(apt.id, 'cancelled')}
                            className="text-hospital-red hover:text-red-700 flex items-center space-x-1"
                            title="Cancel"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => deleteAppointment(apt.id)}
                        className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No appointments found
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="font-bold text-lg mb-3">Recent Activity</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ 3 new appointments created today</li>
              <li>✓ 2 appointments confirmed</li>
              <li>✓ 1 appointment cancelled</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-6 border border-hospital-green">
            <h3 className="font-bold text-lg mb-3">System Status</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ All systems operational</li>
              <li>✓ Database backup: Today 3:00 AM</li>
              <li>✓ No errors or warnings</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

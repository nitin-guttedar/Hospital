import React from 'react';

import { Award, Phone } from 'lucide-react';
import { Doctor } from '../types';
import anandImg from '../assets/AnandDr.JPG';
import rohiniImg from '../assets/DrRohini.JPG';




export default function DoctorsPage() {
  const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Anand Gunjigavi',
      specialty: 'Pediatrics',
      qualifications: ['M.B.B.S', 'MD (Pediatrics)'],
      availableTime: 'Mon-Fri 10:00 AM - 4:00 PM',
      phone: '+91-9876-543-210',
      image: anandImg,
    },
    {
      id: '2',
      name: 'Dr. Rohini Gunjigavi',
      specialty: 'Gynaecology',
      qualifications: ['M.B.B.S', 'DGO'],
      availableTime: 'Mon-Fri 10:00 AM - 4:00 PM',
      phone: '+91-9876-543-211',
      image: rohiniImg,
    },
    {
      id: '3',
      name: 'Dr. Priya Sharma',
      specialty: 'Orthopedics',
      qualifications: ['MS Ortho', 'Sports Medicine Specialist'],
      availableTime: 'Mon-Sat 2:00 PM - 7:00 PM',
      phone: '+91-9876-543-212',
    },
    {
      id: '4',
      name: 'Dr. Amit Patel',
      specialty: 'Neurology',
      qualifications: ['MD', 'DM Neurology'],
      availableTime: 'Tue, Thu, Sat 11:00 AM - 3:00 PM',
      phone: '+91-9876-543-213',
    },
    {
      id: '5',
      name: 'Dr. Isha Singh',
      specialty: 'Pediatrics',
      qualifications: ['MD Pediatrics', 'IBCLC'],
      availableTime: 'Mon-Fri 9:00 AM - 12:00 PM',
      phone: '+91-9876-543-214',
    },
    {
      id: '6',
      name: 'Dr. Vikram Desai',
      specialty: 'General Surgery',
      qualifications: ['MS Surgery', 'Laparoscopic Surgery'],
      availableTime: 'Mon-Wed, Fri 5:00 PM - 8:00 PM',
      phone: '+91-9876-543-215',
    },
  ];




  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Our Doctors</h1>
        <p className="text-gray-600 text-center mb-12">
          Meet our team of experienced healthcare professionals
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              {/* Avatar */}
              <div className="bg-gradient-to-r from-hospital-blue to-blue-400 h-32 flex items-center justify-center overflow-hidden">
                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                ) : (
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-hospital-blue">
                    {doctor.name.split(' ')[1][0]}
                  </div>
                )}
              </div>


              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{doctor.name}</h3>
                <p className="text-hospital-blue font-semibold mb-3">{doctor.specialty}</p>

                {/* Qualifications */}
                <div className="mb-4">
                  <div className="flex items-start space-x-2 mb-2">
                    <Award size={16} className="text-hospital-green mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-700">Qualifications</p>
                      <p className="text-sm text-gray-600">{doctor.qualifications.join(', ')}</p>
                    </div>
                  </div>
                </div>

                {/* Available Time */}
                <div className="mb-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-700 mb-1">Available Hours</p>
                  <p>{doctor.availableTime}</p>
                </div>

                {/* Contact */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <Phone size={16} className="text-hospital-blue" />
                    <a href={`tel:${doctor.phone}`} className="text-hospital-blue hover:underline">
                      {doctor.phone}
                    </a>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-hospital-blue text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

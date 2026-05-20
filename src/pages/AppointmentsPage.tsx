import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Phone } from 'lucide-react';

interface AppointmentForm {
  patientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  doctor: string;
  reason: string;
}

export default function AppointmentsPage() {
  const { register, handleSubmit, reset } = useForm<AppointmentForm>();
  const [submitted, setSubmitted] = useState(false);

  const doctors = [
    'Dr. Rajesh Kumar - Cardiology',
    'Dr. Priya Sharma - Orthopedics',
    'Dr. Amit Patel - Neurology',
    'Dr. Isha Singh - Pediatrics',
    'Dr. Vikram Desai - General Surgery',
  ];

  const onSubmit = (data: AppointmentForm) => {
    console.log('Appointment booked:', data);
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Book an Appointment</h1>

        {submitted && (
          <div className="bg-hospital-green text-white p-4 rounded-lg mb-8">
            ✓ Appointment booked successfully! We'll confirm via email/phone shortly.
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Patient Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                {...register('patientName', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                {...register('phone', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              />
            </div>

            {/* Doctor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Doctor *
              </label>
              <select
                {...register('doctor', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              >
                <option value="">Choose a doctor...</option>
                {doctors.map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Preferred Date *
              </label>
              <input
                type="date"
                {...register('date', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              />
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                Preferred Time *
              </label>
              <input
                type="time"
                {...register('time', { required: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                required
              />
            </div>
          </div>

          {/* Reason */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit *
            </label>
            <textarea
              {...register('reason', { required: true })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-hospital-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Book Appointment
          </button>
        </form>

        {/* Important Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h3 className="font-bold text-lg mb-4">Important Information</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• Please arrive 10 minutes before your appointment</li>
            <li>• Bring your health insurance card and ID</li>
            <li>• For emergencies, call our 24/7 hotline</li>
            <li>• Cancellations can be made up to 24 hours before appointment</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

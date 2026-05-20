import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Message sent:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12">
          Get in touch with us for any queries or assistance
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="text-hospital-blue mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Phone</h3>
                    <p className="text-gray-600">Emergency: +91-1234-567-890</p>
                    <p className="text-gray-600">General: +91-1234-567-891</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-hospital-blue mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Email</h3>
                    <p className="text-gray-600">info@gunjigavihospital.com</p>
                    <p className="text-gray-600">support@gunjigavihospital.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="text-hospital-blue mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Address</h3>
                    <p className="text-gray-600">123 Medical Lane</p>
                    <p className="text-gray-600">City, State - 123456</p>
                    <p className="text-gray-600">Country</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="text-hospital-blue mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="font-bold text-lg">Working Hours</h3>
                    <p className="text-gray-600">Mon - Fri: 8:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sat - Sun: 9:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">24/7 Emergency Services</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

            {submitted && (
              <div className="bg-hospital-green text-white p-4 rounded-lg mb-6">
                ✓ Thank you! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hospital-blue"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-hospital-blue text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

        {/* Map Section Placeholder */}
        <div className="mt-12 bg-gray-300 rounded-lg h-96 flex items-center justify-center text-white text-xl">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2" />
            <p>Google Map will be embedded here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

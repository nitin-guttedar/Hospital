import React from 'react';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* About */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="bg-white text-blue-900 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                🏥
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold">Gunjigavi</h3>
                <p className="text-xs text-blue-200">MultiSpeciality</p>
              </div>
            </div>
            <p className="text-sm text-blue-100 leading-relaxed">
              Dedicated to providing quality healthcare with compassion, precision, and trust. Your health is our purpose.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#services" className="text-blue-100 hover:text-white transition">Services</a></li>
              <li><a href="#doctors" className="text-blue-100 hover:text-white transition">Our Doctors</a></li>
              <li><a href="#faq" className="text-blue-100 hover:text-white transition">FAQ</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Appointments</a></li>
            </ul>
          </div>

          {/* Departments */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg font-bold mb-4">Departments</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Pediatrics</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Gynaecology</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">General Medicine</a></li>
              <li><a href="#contact" className="text-blue-100 hover:text-white transition">Emergency</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg font-bold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+918763456789" className="hover:text-white transition">+91 87634 56789</a>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                <MapPin size={18} className="flex-shrink-0" />
                <span>Athani, Karnataka 591304</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2 text-blue-100">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@gunjigavi.com" className="hover:text-white transition">info@gunjigavi.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-700 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-blue-100">
          <p>&copy; {currentYear} Gunjigavi Multispeciality Hospital. All rights reserved.</p>
          <div className="flex items-center justify-center gap-2">
            <span>Made with</span>
            <Heart size={16} className="text-red-400 animate-pulse" />
            <span>for your health</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <span className="text-blue-600">•</span>
            <a href="#" className="hover:text-white transition">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

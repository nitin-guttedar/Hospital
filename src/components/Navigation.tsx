import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/applogo.jpeg';

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/services', label: 'Services' },
    { path: '/appointments', label: 'Appointments' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-base md:text-lg font-serif hover:opacity-90 transition">
            <img src={logo} alt="Gunjigavi Hospital Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover" />
            <div>
              <div className="text-sm md:text-base leading-tight">Gunjigavi</div>
              <div className="text-xs md:text-sm text-blue-200">MultiSpeciality</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 md:px-4 py-2 rounded text-xs md:text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-teal-500 text-white'
                    : 'hover:bg-white/10 text-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <a href="#contact" className="hidden lg:block bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded text-sm transition">
            Book Now
          </a>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-blue-800 border-t border-white/10 animate-fade-in">
          <div className="px-4 md:px-8 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-3 rounded text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? 'bg-teal-500 text-white'
                    : 'hover:bg-white/10 text-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#contact"
              className="block w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-3 rounded text-sm text-center transition mt-2"
              onClick={() => setIsOpen(false)}
            >
              Book Appointment
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

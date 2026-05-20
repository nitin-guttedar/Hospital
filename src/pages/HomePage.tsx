import React, { useState } from 'react';
import { ChevronDown, Phone, Clock, AlertCircle } from 'lucide-react';
import anandImg from '../assets/AnandDr.JPG';
import rohiniImg from '../assets/DrRohini.JPG';


interface FAQItem {
  id: number;
  question: string;
  answer: string;
  open: boolean;
}

export default function HomePage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: 1,
      question: 'Do you offer home sample collection?',
      answer: 'Yes, we provide home sample collection services for diagnostics. Our trained professionals visit your home at a convenient time. Call our helpline or book online to schedule.',
      open: false
    },
    {
      id: 2,
      question: 'Do you accept health insurance?',
      answer: 'We accept most major health insurance plans. Please bring your insurance card and relevant documents at the time of admission. Our billing team will guide you through the process.',
      open: false
    },
    {
      id: 3,
      question: 'What are your visiting hours?',
      answer: 'General visiting hours are 10:00 AM – 4:00 PM and 7:00 PM – 9:00 PM. Please check specific doctor availability for evening slots.',
      open: false
    },
    {
      id: 4,
      question: 'How do I book an appointment?',
      answer: 'You can book an appointment by calling our helpline, filling the contact form on this website, or walking in to our reception. For emergency cases, come directly to us.',
      open: false
    },
    {
      id: 5,
      question: 'What is your emergency response time?',
      answer: 'Our emergency services are available 24/7 with trained medical professionals ready to assist. Response time is typically within 5 minutes of arrival.',
      open: false
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    time: '',
    message: ''
  });

  const [toast, setToast] = useState(false);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Anand Gunjigavi',
      qualification: 'M.B.B.S, MD (Pediatrics)',
      department: 'Pediatrics',
      morning: '10:00 AM - 4:00 PM',
      evening: '7:00 PM - 9:00 PM',
      image: anandImg,
    },
    {
      id: 2,
      name: 'Dr. Rohini Gunjigavi',
      qualification: 'M.B.B.S, DGO',
      department: 'Gynaecology',
      morning: '10:00 AM - 4:00 PM',
      evening: '-',
      image: rohiniImg
    },
    {
      id: 3,
      name: 'Dr. Sai Shruthi S. Gunjigavi',
      qualification: 'M.B.B.S, MD (General Medicine)',
      department: 'General Medicine',
      morning: '10:00 AM - 4:00 PM',
      evening: '7:00 PM - 9:00 PM',
      avatar: '👩‍⚕️'
    }
  ];


  const services = [
    { icon: '👶', name: 'Pediatrics', desc: 'Comprehensive child care and pediatric treatments' },
    { icon: '🤱', name: 'Gynaecology', desc: 'Women\'s health, pregnancy, and obstetric care' },
    { icon: '💊', name: 'General Medicine', desc: 'General health checkups and medical treatments' },
    { icon: '🏥', name: 'Emergency Services', desc: '24/7 emergency medical assistance' },
    { icon: '💉', name: 'Vaccinations', desc: 'Child immunization and vaccination programs' },
    { icon: '🩺', name: 'Diagnostic Services', desc: 'Advanced diagnostic testing and imaging' }
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      role: 'Patient Parent',
      text: 'Dr. Anand provided exceptional pediatric care for my child. Very compassionate and thorough in his approach.',
      avatar: 'RK',
      color: '#1a8a7a'
    },
    {
      name: 'Kavya Sharma',
      role: 'Mother',
      text: 'Dr. Rohini\'s expertise in gynecology was remarkable. Excellent service and care throughout my treatment.',
      avatar: 'KS',
      color: '#c9923a'
    },
    {
      name: 'Suresh Nayak',
      role: 'Patient',
      text: 'Very professional staff and clean facilities. Dr. Sai Shruthi diagnosed my condition quickly. Highly recommend!',
      avatar: 'SN',
      color: '#0a1628'
    }
  ];

  const toggleFaq = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, open: !faq.open } : { ...faq, open: false }
    ));
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setToast(true);
    setFormData({ name: '', phone: '', email: '', department: '', date: '', time: '', message: '' });
    setTimeout(() => setToast(false), 4000);
  };

  return (
    <div className="overflow-x-hidden">
      {/* EMERGENCY BAR */}
      <div className="bg-yellow-500 text-gray-900 px-4 md:px-8 py-3 flex flex-col md:flex-row justify-between items-center gap-2 text-center md:text-left">
        <span className="font-semibold flex items-center justify-center md:justify-start gap-2 text-sm md:text-base">
          <AlertCircle size={20} /> 24/7 Emergency Services Available
        </span>
        <span className="font-semibold text-sm md:text-base">
          Emergency Helpline: <a href="tel:+918763456789" className="font-bold hover:underline">+91 87634 56789</a>
        </span>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-900 overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 grid grid-cols-8" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,1) 40px, rgba(255,255,255,1) 41px)'}}></div>
        </div>

        {/* Accents */}
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gradient-to-b from-teal-500 to-transparent opacity-20 blur-3xl"></div>
        <div className="absolute right-1/3 -bottom-20 w-72 h-72 rounded-full bg-gradient-to-b from-yellow-500 to-transparent opacity-10 blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left Content */}
          <div className="py-12 md:py-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-teal-500/20 border border-teal-400/40 text-teal-300 px-4 py-2 rounded-full text-xs md:text-sm font-semibold uppercase mb-6 w-fit">
              <span className="w-2 h-2 rounded-full bg-teal-300 animate-pulse"></span>
              Leading Healthcare Provider
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
              Advanced Care,<br/><span className="text-yellow-400">Trusted</span> Always.
            </h1>

            <p className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md mb-8">
              Gunjigavi Multispeciality Hospital brings compassionate specialists, quality diagnostics, and 24/7 emergency services together — for your family's complete wellbeing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="#contact" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded text-center transition text-sm md:text-base">
                Book Appointment →
              </a>
              <a href="#services" className="border border-white/40 hover:border-white text-white font-semibold py-3 px-6 rounded text-center transition text-sm md:text-base">
                Our Services
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8">
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                  3<span className="text-yellow-400">+</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide mt-1">Specialist Doctors</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                  3<span className="text-yellow-400">+</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide mt-1">Specialities</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                  24<span className="text-yellow-400">/7</span>
                </div>
                <div className="text-xs md:text-sm text-gray-400 uppercase tracking-wide mt-1">Emergency Care</div>
              </div>
            </div>
          </div>

          {/* Right Visual Cards */}
          <div className="hidden md:flex flex-col gap-4">
            {[
              { icon: '👨‍⚕️', title: 'Pediatrics', subtitle: 'Child care specialists', stat1: '100%', lab1: 'Patient satisfaction', stat2: '24/7', lab2: 'Availability' },
              { icon: '🤱', title: 'Gynaecology', subtitle: 'Women\'s health', stat1: '500+', lab1: 'Happy mothers', stat2: '15+', lab2: 'Yrs experience' },
              { icon: '💊', title: 'General Medicine', subtitle: 'Complete wellness', stat1: '1000+', lab1: 'Patients treated', stat2: '10+', lab2: 'Yrs expertise' }
            ].map((card, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/30 flex items-center justify-center text-lg">{card.icon}</div>
                  <div>
                    <div className="text-white font-semibold text-sm">{card.title}</div>
                    <div className="text-gray-400 text-xs">{card.subtitle}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-white font-serif text-lg">{card.stat1}</div>
                    <div className="text-gray-400">{card.lab1}</div>
                  </div>
                  <div>
                    <div className="text-white font-serif text-lg">{card.stat2}</div>
                    <div className="text-gray-400">{card.lab2}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-12 md:py-20 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">Our Specialities</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Quality Services<br/>Under One Roof</h2>
            <p className="text-gray-600 max-w-md text-sm md:text-base">From emergency medicine to specialized treatments, our experts deliver care with compassion.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, i) => (
              <a key={i} href="#contact" className="bg-white border border-gray-200 rounded-lg p-6 hover:border-teal-500 hover:shadow-lg transition hover:-translate-y-1">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="font-serif text-lg md:text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm md:text-base text-gray-600 mb-3">{service.desc}</p>
                <div className="text-teal-600 text-sm font-semibold flex items-center gap-1">Learn more →</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="bg-teal-100 rounded-lg h-96 flex items-center justify-center text-8xl opacity-30">🏥</div>
            <div className="absolute -bottom-4 -right-4 bg-gray-900 text-white rounded-lg p-4 shadow-lg">
              <div className="text-3xl font-serif font-bold text-yellow-400">15+</div>
              <div className="text-xs text-gray-400">Years of Excellence</div>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">About Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Committed to Your Complete Wellbeing</h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              Gunjigavi Multispeciality Hospital is dedicated to delivering quality healthcare. Our patient-first approach, combined with experienced specialists and modern facilities, makes us a trusted healthcare provider in Athani.
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '✅', text: 'Experienced Doctors' },
                { icon: '🏆', text: 'Quality Care' },
                { icon: '🩺', text: 'Modern Facilities' },
                { icon: '🚑', text: '24/7 Emergency' },
                { icon: '💉', text: 'Vaccinations' },
                { icon: '🏠', text: 'Friendly Atmosphere' }
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 bg-gray-100 rounded p-3">
                  <span className="text-lg">{feat.icon}</span>
                  <span className="text-sm font-semibold text-gray-900">{feat.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DOCTORS SECTION */}
      <section id="doctors" className="py-12 md:py-20 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12">
            <div>
              <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">Our Team</p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Meet Our Specialists</h2>
            </div>
            <a href="#contact" className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded text-sm transition w-full md:w-auto text-center">
              Book Appointment →
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="border border-gray-200 rounded-lg overflow-hidden hover:border-teal-500 hover:shadow-lg transition">
                <div className="h-40 bg-teal-100 flex items-center justify-center text-6xl overflow-hidden">
                  {doctor.image ? (
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    doctor.avatar
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-teal-600 text-xs uppercase font-semibold tracking-wide mb-2">{doctor.department}</p>
                  <p className="text-gray-600 text-sm mb-3">{doctor.qualification}</p>
                  
                  <div className="bg-gray-50 rounded p-3 text-xs">
                    <div className="font-semibold text-gray-900 mb-2">Visiting Hours:</div>
                    <div className="space-y-1 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-teal-600" />
                        <span>Morning: {doctor.morning}</span>
                      </div>
                      {doctor.evening !== '-' && (
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-teal-600" />
                          <span>Evening: {doctor.evening}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-12 md:py-20 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">Patient Stories</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Trusted by Our Community</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="text-yellow-400 text-lg mb-3 tracking-widest">★★★★★</div>
                <p className="text-gray-600 text-sm md:text-base italic mb-5 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{backgroundColor: testimonial.color}}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Common Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition text-left"
                >
                  <span className="font-semibold text-gray-900 text-sm md:text-base pr-4">{faq.question}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-teal-600 transition-transform flex-shrink-0 ${faq.open ? 'rotate-180' : ''}`} 
                  />
                </button>
                {faq.open && (
                  <div className="p-5 border-t border-gray-200 bg-white">
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPOINTMENT FORM SECTION */}
      <section id="contact" className="py-12 md:py-20 bg-gradient-to-br from-blue-900 to-teal-900 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <p className="text-teal-300 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">Get in Touch</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3">Book Your Appointment</h2>
            <p className="text-gray-300 text-sm md:text-base">Fill the form and our team will confirm your appointment within 2 hours.</p>
          </div>

          <form onSubmit={submitForm} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Full Name"
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:border-teal-400"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="+91 98765 43210"
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:border-teal-400"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email Address"
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:border-teal-400"
              />
              <select
                name="department"
                value={formData.department}
                onChange={handleFormChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-teal-400"
              >
                <option value="" className="bg-gray-900">Select Department</option>
                <option value="pediatrics" className="bg-gray-900">Pediatrics</option>
                <option value="gynaecology" className="bg-gray-900">Gynaecology</option>
                <option value="general-medicine" className="bg-gray-900">General Medicine</option>
                <option value="emergency" className="bg-gray-900">Emergency</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleFormChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-teal-400"
              />
              <select
                name="time"
                value={formData.time}
                onChange={handleFormChange}
                required
                className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm md:text-base focus:outline-none focus:border-teal-400"
              >
                <option value="" className="bg-gray-900">Select Time</option>
                <option value="morning-1" className="bg-gray-900">10:00 AM - 12:00 PM</option>
                <option value="morning-2" className="bg-gray-900">12:00 PM - 2:00 PM</option>
                <option value="evening-1" className="bg-gray-900">7:00 PM - 8:00 PM</option>
                <option value="evening-2" className="bg-gray-900">8:00 PM - 9:00 PM</option>
              </select>
            </div>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              placeholder="Describe your concern briefly... (optional)"
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white placeholder-gray-400 text-sm md:text-base focus:outline-none focus:border-teal-400 resize-none"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 md:py-4 rounded text-sm md:text-base transition"
            >
              Confirm Appointment →
            </button>
          </form>
        </div>
      </section>

      {/* LOCATIONS SECTION */}
      <section className="py-12 md:py-20 bg-gray-50 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-teal-600 font-semibold uppercase text-xs md:text-sm tracking-widest mb-2">Find Us</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">Our Location</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6 hover:border-teal-500 hover:shadow-lg transition">
              <div className="text-3xl mb-3">📍</div>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Gunjigavi Multispeciality Hospital</h3>
              <p className="text-gray-600 text-sm md:text-base mb-3 leading-relaxed">
                Near Shivaji Circle,<br/>Madabhavi Road,<br/>Athani, Karnataka 591304
              </p>
              <a href="tel:+918763456789" className="text-teal-600 font-semibold hover:underline flex items-center gap-2 text-sm md:text-base">
                <Phone size={16} /> +91 87634 56789
              </a>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 bg-teal-50">
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm md:text-base">
                <li><a href="#services" className="text-teal-600 hover:text-teal-700 font-semibold">Our Services</a></li>
                <li><a href="#doctors" className="text-teal-600 hover:text-teal-700 font-semibold">Meet Our Doctors</a></li>
                <li><a href="#contact" className="text-teal-600 hover:text-teal-700 font-semibold">Book Appointment</a></li>
                <li><a href="#faq" className="text-teal-600 hover:text-teal-700 font-semibold">FAQ</a></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 text-sm md:text-base z-50">
          <span>✅</span>
          <span>Appointment submitted! We'll confirm within 2 hours.</span>
        </div>
      )}
    </div>
  );
}

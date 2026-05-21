import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Phone, Mail, Clock, MapPin, Calendar, Check, ChevronRight, ChevronLeft, 
  Sun, Moon, Menu, X, Shield, Image, Heart, Info, ExternalLink, User, Trash2, 
  Compass, Activity, AlertCircle, PlusCircle, CheckCircle, Search, HelpCircle
} from 'lucide-react';
import './App.css';

// Dynamically resolve static image URLs in Vite
const docAnandImg = new URL('./assets/Images/AnandDr.JPG', import.meta.url).href;
const docRohiniImg = new URL('./assets/Images/DrRohini.JPG', import.meta.url).href;
const appLogoImg = new URL('./assets/Images/applogo.jpeg', import.meta.url).href;

// Blog Images


// Insurance Banner Images
// const govtSchemeBannerImg = new URL('./assets/InsuranceImages/GovtScheme.PNG', import.meta.url).href;
// const insuranceBannerImg = new URL('./assets/InsuranceImages/Insurance.PNG', import.meta.url).href;

// Gallery Images list - All 20 files from assets
const galleryFiles = [
  "7A9A5432.jpg", "7A9A5443.JPG", "7A9A5449.JPG", "7A9A5461.JPG", "7A9A5477.JPG",
  "7A9A5499.JPG", "7A9A5509.JPG", "7A9A5522.JPG", "7A9A5540.JPG", "7A9A5550.JPG",
  "7A9A5558.JPG", "7A9A5562.JPG", "7A9A5595.JPG", "7A9A5624.JPG", "7A9A5630.JPG",
  "7A9A5649.JPG", "7A9A5664.JPG", "7A9A5673.JPG", "7A9A5687.JPG", "7A9A5688.JPG"
];

// Manual category mapping for each image - Customize each image's category here
const imageCategoryMap = {
  "7A9A5432.jpg": "reception",
  "7A9A5443.JPG": "building",
    "7A9A5443.JPG": "reception",
  "7A9A5449.JPG": "consultation",
  "7A9A5461.JPG": "consultation",
  "7A9A5477.JPG": "reception",
  "7A9A5499.JPG": "consultation",
  "7A9A5509.JPG": "consultation",
  "7A9A5522.JPG": "maternity",
  "7A9A5540.JPG": "maternity",
  "7A9A5550.JPG": "pediatric",
  "7A9A5558.JPG": "pediatric",
  "7A9A5562.JPG": "consultation",
  "7A9A5595.JPG": "consultation",
  "7A9A5624.JPG": "consultation",
  "7A9A5630.JPG": "consultation",
  "7A9A5649.JPG": "building",
  "7A9A5664.JPG": "building",
  "7A9A5673.JPG": "consultation",
  "7A9A5687.JPG": "building",
  "7A9A5688.JPG": "building"
};

// Category display names
const categoryNames = {
  building: "Building & Entrance",
  reception: "Reception & Waiting Area",
  consultation: "Consultation Rooms",
  pediatric: "Pediatric Care Area",
  maternity: "Maternity & Women's Care"
};

// Map 20 images to clean filterable categories using the category map
const galleryImages = galleryFiles.map((filename, index) => {
  const category = imageCategoryMap[filename];
  return {
    id: index + 1,
    name: filename,
    category,
    categoryName: categoryNames[category],
    url: new URL(`./assets/GalleryImages&Videos/${filename}`, import.meta.url).href,
    title: `${categoryNames[category]} - View ${index + 1}`
  };
});

// Insurance list from Page 7 of doc.html
const insuranceCompanies = [
  "National Insurance Co. Ltd.",
  "New India Assurance Co. Ltd.",
  "United India Insurance Co. Ltd.",
  "Oriental Insurance Co. Ltd.",
  "ICICI Lombard General Insurance Co. Ltd.",
  "HDFC ERGO General Insurance Co. Ltd.",
  "Bajaj Allianz General Insurance Co. Ltd.",
  "SBI General Insurance Co. Ltd.",
  "Reliance General Insurance Co. Ltd.",
  "Tata AIG General Insurance Co. Ltd.",
  "Aditya Birla Health Insurance Co. Ltd.",
  "Star Health & Allied Insurance Co. Ltd.",
  "Care Health Insurance Ltd. (formerly Religare)",
  "Niva Bupa Health Insurance Company Ltd. (formerly Max Bupa)",
  "ManipalCigna Health Insurance Company Ltd.",
  "Go Digit General Insurance Ltd.",
  "Acko General Insurance Ltd.",
  "Kotak Mahindra General Insurance Co. Ltd.",
  "Liberty General Insurance Ltd.",
  "Cholamandalam MS General Insurance Co. Ltd.",
  "Future Generali India Insurance Co. Ltd.",
  "Universal Sompo General Insurance Co. Ltd.",
  "Navi General Insurance Ltd.",
  "Shriram General Insurance Co. Ltd."
];

// SEO Meta Data for different pages
const seoData = {
  home: {
    title: 'Gunjigavi Multispeciality Hospital Athani - Expert Medical Care',
    description: 'Gunjigavi Multispeciality Hospital Athani offers pediatric, gynecology, and general medicine services. Trusted by families in Belagavi district. Ayushman Bharat empanelled.',
    keywords: 'hospital in Athani, multispeciality hospital Athani, Gunjigavi Hospital, family hospital, Belagavi hospital'
  },
  about: {
    title: 'About Gunjigavi Multispeciality Hospital - Our Mission & Values',
    description: 'Learn about Gunjigavi Hospital\'s mission of compassionate, ethical healthcare. Three specialist doctors providing family-focused care near Shivaji Circle, Athani.',
    keywords: 'about hospital, Athani hospital, medical services, healthcare quality, specialist doctors'
  },
  doctors: {
    title: 'Specialist Doctors at Gunjigavi Hospital - Pediatrician, Gynecologist, Physician',
    description: 'Meet our experienced consultants: Dr. Anand Gunjigavi (Pediatrics), Dr. Rohini Gunjigavi (Gynecology), Dr. Sai Shruthi Gunjigavi (General Medicine).',
    keywords: 'pediatrician Athani, gynecologist Athani, general physician Athani, specialist doctors Belagavi, Dr Anand, Dr Rohini'
  },
  services: {
    title: 'Departments & Medical Services - In-House & Visiting Specialists',
    description: 'In-house departments: Pediatrics & Neonatology, Obstetrics & Gynecology, General Medicine. Visiting specialists: Dermatology, ENT, Infertility. Emergency support and pharmacy available.',
    keywords: 'pediatrics service, gynecology care, general medicine, dermatology, ENT, infertility specialist, medical departments, healthcare services Athani'
  },
  appointments: {
    title: 'Book Appointment Online - Gunjigavi Hospital Athani',
    description: 'Schedule your appointment online, via call (+91-8197270975), WhatsApp, or visit our OPD counter. Easy booking with confirmed appointment slots.',
    keywords: 'book appointment, online consultation, hospital appointment Athani, schedule doctor visit, medical booking'
  },
  insurance: {
    title: 'Insurance & Schemes - Government & Private Insurance Accepted',
    description: 'Gunjigavi Hospital accepts ABARK (PM-JAY), Yashaswini, KASS, Dharmastala Arogya Yojana, KLE, Nirani, KSRTC schemes, and all private health insurance for cashless treatment.',
    keywords: 'Ayushman Bharat, cashless insurance, health insurance, PM-JAY, Yashaswini, KASS, insurance schemes, reimbursement, health coverage Athani'
  },
  gallery: {
    title: 'Hospital Gallery - Facilities & Infrastructure at Gunjigavi',
    description: 'View our state-of-the-art hospital facilities, modern consultation rooms, pediatric care areas, and maternity wards at Gunjigavi Hospital Athani.',
    keywords: 'hospital gallery, medical facility, infrastructure, consultation rooms, pediatric care, maternity ward'
  },
  blogs: {
    title: 'Healthcare Blogs - Expert Insights on Pediatrics, Gynecology, General Medicine',
    description: 'Read expert articles on specialist care: Consultant Pediatrician, Obstetrician & Gynecologist, and Consultant Physician services at Gunjigavi Hospital.',
    keywords: 'healthcare blog, medical articles, pediatrician blog, gynecology, general medicine insights, specialist care'
  },
  contact: {
    title: 'Contact Gunjigavi Hospital - Location, Phone, Hours & Directions',
    description: 'Visit us at Deshpande Nagar, Athani (591304). Emergency: 8197270975 | OPD: 9482384887 | Email: hospitalgunjigavi@gmail.com',
    keywords: 'contact hospital, hospital location, phone number, address Athani, hospital hours, directions'
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [theme, setTheme] = useState('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString());
  
  // Gallery states
  const [galleryFilter, setGalleryFilter] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  // Appointment Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    doctor: '',
    date: '',
    timeSlot: '',
    message: ''
  });
  const [toastMessage, setToastMessage] = useState(null);
  const [savedBookings, setSavedBookings] = useState([]);

  // Sync theme attribute with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Update live clock
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Load bookings from localStorage
  useEffect(() => {
    const localData = localStorage.getItem('gunjigavi_appointments');
    if (localData) {
      setSavedBookings(JSON.parse(localData));
    }
  }, []);

  // Lightbox keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleLightboxNext();
      if (e.key === 'ArrowLeft') handleLightboxPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Smooth scroll to top of content when tab changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.doctor || !formData.date || !formData.timeSlot) {
      alert("Please fill in all required fields.");
      return;
    }
    
    // Create new booking object
    const newBooking = {
      id: Date.now(),
      ...formData,
      bookingTime: new Date().toLocaleString()
    };
    
    const updatedBookings = [...savedBookings, newBooking];
    setSavedBookings(updatedBookings);
    localStorage.setItem('gunjigavi_appointments', JSON.stringify(updatedBookings));
    
    // Show success notification
    setToastMessage(`Success! Appointment requested with ${formData.doctor}. Our team will call you back.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 5000);

    // Reset Form
    setFormData({
      name: '',
      phone: '',
      email: '',
      doctor: '',
      date: '',
      timeSlot: '',
      message: ''
    });
  };

  const handleCancelBooking = (id) => {
    const updated = savedBookings.filter(b => b.id !== id);
    setSavedBookings(updated);
    localStorage.setItem('gunjigavi_appointments', JSON.stringify(updated));
    
    setToastMessage("Appointment request cancelled.");
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Gallery Filter logic
  const filteredGallery = galleryImages.filter(img => 
    galleryFilter === 'all' || img.category === galleryFilter
  );

  const handleLightboxNext = () => {
    setLightboxIndex(prev => (prev + 1) % filteredGallery.length);
  };

  const handleLightboxPrev = () => {
    setLightboxIndex(prev => (prev - 1 + filteredGallery.length) % filteredGallery.length);
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData[activeTab]?.title || 'Gunjigavi Multispeciality Hospital Athani'}</title>
        <meta name="description" content={seoData[activeTab]?.description || 'Gunjigavi Multispeciality Hospital providing expert healthcare in Athani'} />
        <meta name="keywords" content={seoData[activeTab]?.keywords || 'hospital, healthcare, medical services'} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Gunjigavi Multispeciality Hospital" />
        <meta property="og:title" content={seoData[activeTab]?.title || 'Gunjigavi Multispeciality Hospital Athani'} />
        <meta property="og:description" content={seoData[activeTab]?.description || 'Expert healthcare services'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gunjigavi-multispeciality-hospital.vercel.app/" />
        <meta name="theme-color" content="#0d9488" />
      </Helmet>

      {/* 24/7 Red Alert Emergency Ribbon */}
      <div className="emergency-strip">
        <AlertCircle size={16} />
        <span>EMERGENCY HELPLINE (24/7): <strong>8197270975</strong></span>
        <span className="dashboard-divider">|</span>
        <span>OPD Desk: <strong>9482384887</strong></span>
        <a href="#contact" onClick={() => handleTabClick('contact')}>Get Directions</a>
      </div>

      {/* Top Operations Dashboard Area */}
      <div className="top-dashboard">
        <div className="container dashboard-container">
          <div className="dashboard-item">
            <Clock size={14} className="guidance-icon" />
            <span>Athani Local Time: <strong>{liveTime}</strong></span>
          </div>
          
          {/* Quick-Access Dashboard buttons */}
          <div className="dashboard-item" style={{ gap: '15px' }}>
            <span className="dashboard-status">
              <Activity size={12} />
              24/7 Facility Active
            </span>
            <span className="dashboard-divider">|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <User size={14} /> 3 Active Specialists
            </span>
            <span className="dashboard-divider">|</span>
            {/* Calendar Book Appointment button requested in the dashboard */}
            <button 
              className="btn-primary" 
              style={{ padding: '4px 10px', fontSize: '12px', borderRadius: '4px' }}
              onClick={() => handleTabClick('appointments')}
            >
              <Calendar size={13} />
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Header with Navigation & Theme Switcher */}
      <header className="header-wrapper">
        <div className="container nav-bar">
          <a href="#" className="logo-container" onClick={() => handleTabClick('home')}>
            <img src={appLogoImg} className="logo-img" alt="Gunjigavi Logo" />
            <div className="logo-text">
              Gunjigavi Multispeciality
              <span className="logo-sub">HOSPITAL, ATHANI</span>
            </div>
          </a>

          {/* Navigation Links */}
          <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`}>
            <li><a className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>Home</a></li>
            <li><a className={activeTab === 'about' ? 'active' : ''} onClick={() => handleTabClick('about')}>About Us</a></li>
            
            {/* Services Dropdown - Hover Based */}
            <li className="nav-dropdown">
              <a 
                className={`dropdown-toggle ${['doctors', 'services', 'insurance', 'gallery'].includes(activeTab) ? 'active' : ''}`}
              >
                Services
                <ChevronRight size={14} style={{ marginLeft: '4px' }} />
              </a>
              <ul className="dropdown-menu">
                <li><a onClick={() => handleTabClick('doctors')}>Doctors</a></li>
                <li><a onClick={() => handleTabClick('services')}>Departments & Services</a></li>
                <li><a onClick={() => handleTabClick('insurance')}>Insurance & Schemes</a></li>
                <li><a onClick={() => handleTabClick('gallery')}>Gallery</a></li>
              </ul>
            </li>
            
            <li><a className={activeTab === 'appointments' ? 'active' : ''} onClick={() => handleTabClick('appointments')}>Appointments</a></li>
            <li><a className={activeTab === 'blogs' ? 'active' : ''} onClick={() => handleTabClick('blogs')}>Blogs</a></li>
            <li><a className={activeTab === 'contact' ? 'active' : ''} onClick={() => handleTabClick('contact')}>Contact Us</a></li>
          </ul>

          {/* Header Action Elements */}
          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Dark Mode">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Toast popup */}
      {toastMessage && (
        <div className="toast">
          <CheckCircle size={20} color="var(--primary)" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Main Pages Render Area */}
      <main style={{ flexGrow: 1 }}>

        {/* 1. HOME MODULE */}
        {activeTab === 'home' && (
          <section className="hero-section animate-fade-up">
            <div className="container hero-grid">
              <div className="hero-content">
                <span className="hero-tagline">Compassion • Care • Commitment</span>
                <h1 className="hero-title">
                  Gunjigavi Multispeciality <span>Hospital, Athani</span>
                </h1>
                <p className="hero-desc">
                  Compassionate, expert care for your entire family under one roof. Providing advanced medical solutions near Shivaji Circle on Madabhavi Road, Athani.
                </p>
                <div className="hero-buttons">
                  <button className="btn-primary" onClick={() => handleTabClick('appointments')}>
                    <Calendar size={18} /> Book Appointment
                  </button>
                  <a href="tel:8197270975" className="btn-outline">
                    <Phone size={18} /> Call Now: 8197270975
                  </a>
                </div>
                <div className="hero-stats">
                  <div className="stat-item">
                    <span className="stat-number">24/7</span>
                    <span className="stat-label">Emergency Care</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">3+</span>
                    <span className="stat-label">Specialist Doctors</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">100%</span>
                    <span className="stat-label">Ethical Treatment</span>
                  </div>
                </div>
              </div>

              {/* Home Sidebar card detailing operational copydeck details */}
              <div className="hero-image-wrapper">
                <div className="hero-main-card">
                  <div className="hero-card-header">
                    <div className="hero-card-icon">
                      <Heart size={22} />
                    </div>
                    <div className="hero-card-title">
                      Trusted Hospital in Athani
                      <div style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-secondary)' }}>Athani and Belagavi District Support</div>
                    </div>
                  </div>
                  <ul className="hero-bullets">
                    <li>
                      <Check size={18} />
                      <span>Pediatrics, Obstetrics & Gynaecology, and General Medicine under one roof.</span>
                    </li>
                    <li>
                      <Check size={18} />
                      <span>Empanelled under Ayushman Bharat PM-JAY & Cashless Insurance schemes.</span>
                    </li>
                    <li>
                      <Check size={18} />
                      <span>Modern clinic located at Deshpande Nagar, Athani – Pin 591304.</span>
                    </li>
                    <li>
                      <Check size={18} />
                      <span>Professional doctors offering evidence-based, transparent healthcare.</span>
                    </li>
                  </ul>
                  
                  <div style={{ marginTop: '24px', display: 'flex', gap: '10px' }}>
                    <button className="btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => handleTabClick('about')}>
                      Learn More <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. ABOUT US MODULE */}
        {activeTab === 'about' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">About Our Hospital</h2>
              <p className="section-subtitle">Delivering ethical care with modern medical standards to Belagavi District</p>
              
              <div className="about-grid">
                <div className="about-text">
                  <span className="about-accent-title">About Gunjigavi Multispeciality Hospital</span>
                  <h3 className="about-heading">Providing high-quality, accessible family healthcare from newborns to senior citizens</h3>
                  <p className="about-desc">
                    Gunjigavi Multispeciality Hospital Athani is a modern, family-focused healthcare centre located near Shivaji Circle on Madabhavi Road, Athani, Belagavi district, Karnataka – 591304. Built on the core values of Compassion, Care and Commitment, we aim to provide high-quality, ethical and accessible healthcare.
                  </p>
                  <p className="about-desc">
                    Our hospital brings together specialist care in Pediatrics, Obstetrics & Gynaecology and General Medicine, supported by experienced nursing staff and dedicated support teams. With a strong focus on patient safety, hygiene and personalised attention, we strive to make every patient feel heard, respected and well cared for.
                  </p>
                  <p className="about-desc">
                    We are proud to be empanelled under major government schemes like Ayushman Bharat PM-JAY as well as a wide range of company and private health insurance plans, making quality healthcare more affordable and accessible for the people of Athani and surrounding areas.
                  </p>
                </div>

                <div className="about-cards-grid">
                  <div className="about-card">
                    <div className="about-card-icon"><Heart size={20} /></div>
                    <h4 className="about-card-title">Compassion</h4>
                    <p className="about-card-desc">We treat every patient like our own family member with deep respect and care.</p>
                  </div>
                  <div className="about-card">
                    <div className="about-card-icon"><Activity size={20} /></div>
                    <h4 className="about-card-title">Care</h4>
                    <p className="about-card-desc">We focus on accurate diagnoses, evidence-based treatments and clear communication.</p>
                  </div>
                  <div className="about-card about-full-card">
                    <div className="about-card-icon"><Shield size={20} /></div>
                    <h4 className="about-card-title">Commitment</h4>
                    <p className="about-card-desc">We stand by our patients throughout their health journey, from early prevention to final recovery.</p>
                  </div>
                </div>
              </div>

              {/* Vision and Mission Cards */}
              <div className="vision-mission-container">
                <div className="vm-card">
                  <div className="vm-title">
                    <Compass size={22} />
                    Our Vision
                  </div>
                  <p className="vm-text">
                    To be recognised as one of the most trusted and patient-centric multispeciality hospitals in Athani, known for ethical practice, clinical excellence and family-oriented care.
                  </p>
                </div>
                <div className="vm-card">
                  <div className="vm-title">
                    <Shield size={22} />
                    Our Mission
                  </div>
                  <p className="vm-text">
                    To deliver compassionate, evidence-based healthcare to every patient with honesty, transparency and respect, using modern medical knowledge and a human touch.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. DOCTORS MODULE */}
        {activeTab === 'doctors' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Meet Our Doctors</h2>
              <p className="section-subtitle">Our team of dedicated specialists providing expert care in Athani</p>
              
              <div className="doctors-grid">
                {/* Doctor 1 */}
                <div className="doctor-card">
                  <div className="doctor-img-container">
                    <img src={docAnandImg} className="doctor-img" alt="Dr. Anand Gunjigavi" />
                    <span className="doctor-dept-tag">Pediatrics</span>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. Anand Gunjigavi</h3>
                    <span className="doctor-qual">M.B.B.S, M.D. (Pediatrics)</span>
                    <p className="doctor-bio">
                      Specialises in newborns, infants, and pediatric care. Evaluates childhood growth, developmental milestones, vaccination guidance, and common illnesses with a gentle child-friendly touch.
                    </p>
                    <div className="doctor-hours">
                      <div className="doctor-hours-title"><Clock size={14} /> Visiting Hours:</div>
                      <div>Morning: 10:00 AM to 4:00 PM</div>
                      <div>Evening: 7:00 PM to 9:00 PM</div>
                    </div>
                    <button className="btn-primary doctor-card-btn" onClick={() => handleTabClick('appointments')}>
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* Doctor 2 */}
                <div className="doctor-card">
                  <div className="doctor-img-container">
                    <img src={docRohiniImg} className="doctor-img" alt="Dr. Rohini Gunjigavi" />
                    <span className="doctor-dept-tag">Gynaecology & Obstetrics</span>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. Rohini Gunjigavi</h3>
                    <span className="doctor-qual">M.B.B.S, D.G.O</span>
                    <p className="doctor-bio">
                      Specialises in women's health, high-risk pregnancy management, normal deliveries, gynecological conditions and checkups with deep empathy and clinical excellence.
                    </p>
                    <div className="doctor-hours">
                      <div className="doctor-hours-title"><Clock size={14} /> Visiting Hours:</div>
                      <div>Morning: 10:00 AM to 4:00 PM</div>
                      <div style={{ opacity: 0.5 }}>Evening: Available on call/emergencies</div>
                    </div>
                    <button className="btn-primary doctor-card-btn" onClick={() => handleTabClick('appointments')}>
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* Doctor 3 */}
                <div className="doctor-card">
                  <div className="doctor-img-container">
                    <div className="doctor-placeholder">
                      <User size={64} />
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Consultant Physician</span>
                    </div>
                    <span className="doctor-dept-tag">General Medicine</span>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. Sai Shruthi S. Gunjigavi</h3>
                    <span className="doctor-qual">M.B.B.S, M.D. (General Medicine)</span>
                    <p className="doctor-bio">
                      Diagnoses and manages adult chronic conditions including diabetes, hypertension, thyroid, thyroid disorders, acute infections, respiratory conditions and preventive health mapping.
                    </p>
                    <div className="doctor-hours">
                      <div className="doctor-hours-title"><Clock size={14} /> Visiting Hours:</div>
                      <div>Morning: 10:00 AM to 4:00 PM</div>
                      <div>Evening: 7:00 PM to 9:00 PM</div>
                    </div>
                    <button className="btn-primary doctor-card-btn" onClick={() => handleTabClick('appointments')}>
                      Book Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 4. DEPARTMENTS & SERVICES MODULE */}
        {activeTab === 'services' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Departments & Services</h2>
              <p className="section-subtitle">Advanced diagnostics and outpatient treatments tailored for families</p>
              
              {/* IN HOUSE DEPARTMENTS */}
              <div style={{ marginBottom: '50px' }}>
                <h3 className="services-section-heading">
                  <Heart size={24} style={{ color: 'var(--primary)' }} />
                  In-House Departments
                </h3>
                <div className="services-grid">
                  {/* Pediatrics & Neonatology */}
                  <div className="service-card">
                    <div className="service-card-icon"><Heart size={24} /></div>
                    <h3 className="service-card-title">Pediatrics & Neonatology</h3>
                    <p className="service-card-desc">Complete medical care for newborns, infants, children, and adolescents under expert pediatric guidance.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Newborn & infant checkups</li>
                      <li><Check size={14} /> Childhood fevers & infections</li>
                      <li><Check size={14} /> Nutrition & growth assessment</li>
                      <li><Check size={14} /> Vaccinations & immunizations</li>
                    </ul>
                  </div>

                  {/* Obstetrics & Gynaecology */}
                  <div className="service-card">
                    <div className="service-card-icon"><Activity size={24} /></div>
                    <h3 className="service-card-title">Obstetrics & Gynaecology</h3>
                    <p className="service-card-desc">Empathetic care mapping high-risk pregnancies, deliveries, postnatal care and female wellness disorders.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Antenatal pregnancy checkups</li>
                      <li><Check size={14} /> Normal & assisted deliveries</li>
                      <li><Check size={14} /> Postnatal & lactation support</li>
                      <li><Check size={14} /> PCOS & menstrual treatments</li>
                    </ul>
                  </div>

                  {/* General Medicine */}
                  <div className="service-card">
                    <div className="service-card-icon"><Shield size={24} /></div>
                    <h3 className="service-card-title">General Medicine</h3>
                    <p className="service-card-desc">Broad diagnosis and long-term care management for adult acute infections and chronic lifestyle conditions.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Diabetes & hypertension control</li>
                      <li><Check size={14} /> Thyroid & hormone management</li>
                      <li><Check size={14} /> Cardiac & stomach disorders</li>
                      <li><Check size={14} /> Annual full body check-ups</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* VISITING SPECIALISTS */}
              <div style={{ marginBottom: '50px' }}>
                <h3 className="services-section-heading">
                  <User size={24} style={{ color: 'var(--accent)' }} />
                  Visiting Specialists
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '25px' }}>
                  For selected departments - Expert visiting doctors available for specialized consultations
                </p>
                <div className="services-grid">
                  {/* Dermatology */}
                  <div className="service-card">
                    <div className="service-card-icon" style={{ background: 'rgba(217, 119, 6, 0.15)', color: 'var(--accent)' }}>
                      <Shield size={24} />
                    </div>
                    <h3 className="service-card-title">Dermatology</h3>
                    <p className="service-card-desc">Expert dermatological consultations for skin conditions, cosmetic concerns, and dermatological procedures.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Skin disease diagnosis & treatment</li>
                      <li><Check size={14} /> Acne & pigmentation management</li>
                      <li><Check size={14} /> Allergy testing</li>
                      <li><Check size={14} /> Dermatological procedures</li>
                    </ul>
                  </div>

                  {/* ENT */}
                  <div className="service-card">
                    <div className="service-card-icon" style={{ background: 'rgba(217, 119, 6, 0.15)', color: 'var(--accent)' }}>
                      <Info size={24} />
                    </div>
                    <h3 className="service-card-title">ENT (Otolaryngology)</h3>
                    <p className="service-card-desc">Specialized ear, nose, and throat consultations for hearing and voice disorders.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Hearing assessment & audiometry</li>
                      <li><Check size={14} /> Sinus & nasal conditions</li>
                      <li><Check size={14} /> Throat & voice disorders</li>
                      <li><Check size={14} /> Pediatric ENT consultations</li>
                    </ul>
                  </div>

                  {/* Infertility Specialist */}
                  <div className="service-card">
                    <div className="service-card-icon" style={{ background: 'rgba(217, 119, 6, 0.15)', color: 'var(--accent)' }}>
                      <Heart size={24} />
                    </div>
                    <h3 className="service-card-title">Infertility Specialist</h3>
                    <p className="service-card-desc">Comprehensive fertility consultations and reproductive health guidance for couples.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Fertility assessments & investigations</li>
                      <li><Check size={14} /> Reproductive counselling</li>
                      <li><Check size={14} /> Treatment planning & referrals</li>
                      <li><Check size={14} /> Lifestyle & diagnostic guidance</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Supporting Services */}
              <div>
                <h3 className="services-section-heading">
                  <PlusCircle size={24} style={{ color: 'var(--primary)' }} />
                  Supporting Services
                </h3>
                <div className="service-card" style={{ gridColumn: 'span 1' }}>
                  <p className="service-card-desc">To ensure a smooth healing process for patients and families, our support includes:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                    <ul className="service-list" style={{ border: 'none', paddingTop: 0 }}>
                      <li><Check size={14} /> 24/7 emergency support desk</li>
                      <li><Check size={14} /> Inpatient & Day-care facilities</li>
                    </ul>
                    <ul className="service-list" style={{ border: 'none', paddingTop: 0 }}>
                      <li><Check size={14} /> Fully stocked pharmacy support</li>
                      <li><Check size={14} /> Laboratory testing tie-ups</li>
                    </ul>
                    <ul className="service-list" style={{ border: 'none', paddingTop: 0 }}>
                      <li><Check size={14} /> Cashless Insurance help desk</li>
                      <li><Check size={14} /> Multiple scheme support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 5. APPOINTMENTS MODULE */}
        {activeTab === 'appointments' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Schedule an Appointment</h2>
              <p className="section-subtitle">Book online to confirm your consultation slot with our medical specialists</p>
              
              <div className="appointment-grid">
                {/* Appointment Info Box */}
                <div className="appointment-info-card">
                  <h3 className="appointment-info-title">Booking Options</h3>
                  <p className="appointment-info-desc">
                    Choose the booking method most convenient for you. Our reception team will coordinate with you immediately.
                  </p>
                  
                  <div className="appointment-method">
                    <a href="tel:8197270975" className="method-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="method-icon"><Phone size={16} /></div>
                      <div className="method-details">
                        <h4>Call Reception</h4>
                        <p><strong>8197270975</strong> (OPD timings)</p>
                      </div>
                    </a>
                    <a href="tel:9482384887" className="method-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="method-icon"><Phone size={16} /></div>
                      <div className="method-details">
                        <h4>OPD Counter Desk</h4>
                        <p><strong>9482384887</strong> (For walk-ins and tokens)</p>
                      </div>
                    </a>
                    <a href="https://wa.me/918197270975?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment" className="method-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="method-icon"><CheckCircle size={16} /></div>
                      <div className="method-details">
                        <h4>WhatsApp Booking</h4>
                        <p>Send details (Name, Age, Doctor) to <strong>8197270975</strong></p>
                      </div>
                    </a>
                  </div>

                  <div className="appointment-notice">
                    <strong>Note:</strong> Timings are subject to change during emergencies or doctor availability. Thank you for your cooperation!
                  </div>
                </div>

                {/* Booking Form with Calendar Icon in dashboard / buttons */}
                <div className="appointment-form-card">
                  <h3 className="appointment-info-title">Request a Slot Online</h3>
                  <form onSubmit={handleFormSubmit} className="appointment-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        placeholder="Patient's name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number <span style={{ color: 'red' }}>*</span></label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        placeholder="Mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="Email (Optional)"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="doctor">Choose Specialist <span style={{ color: 'red' }}>*</span></label>
                      <select 
                        id="doctor" 
                        name="doctor" 
                        required
                        value={formData.doctor}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select Specialist --</option>
                        <option value="Dr. Anand Gunjigavi (Pediatrics)">Dr. Anand Gunjigavi (Pediatrics)</option>
                        <option value="Dr. Rohini Gunjigavi (Gynecology)">Dr. Rohini Gunjigavi (Gynecology)</option>
                        <option value="Dr. Sai Shruthi S. Gunjigavi (General Medicine)">Dr. Sai Shruthi S. Gunjigavi (General Medicine)</option>
                      </select>
                    </div>
                    
                    {/* Datepicker with Calendar icon */}
                    <div className="form-group">
                      <label htmlFor="date">
                        <Calendar size={14} style={{ marginRight: '4px' }} />
                        Preferred Date <span style={{ color: 'red' }}>*</span>
                      </label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="timeSlot">Preferred Shift <span style={{ color: 'red' }}>*</span></label>
                      <select 
                        id="timeSlot" 
                        name="timeSlot" 
                        required
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Choose Shift --</option>
                        <option value="Morning: 10:00 AM - 1:00 PM">Morning: 10:00 AM - 1:00 PM</option>
                        <option value="Afternoon: 1:00 PM - 4:00 PM">Afternoon: 1:00 PM - 4:00 PM</option>
                        <option value="Evening: 7:00 PM - 9:00 PM">Evening: 7:00 PM - 9:00 PM (Pediatrics & Gen Med only)</option>
                      </select>
                    </div>
                    
                    <div className="form-group form-group-full">
                      <label htmlFor="message">Reason for Appointment</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows="3" 
                        placeholder="Briefly describe symptoms or request details..."
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <button type="submit" className="btn-primary form-group-full" style={{ justifyContent: 'center' }}>
                      <Calendar size={18} /> Book Scheduled Appointment
                    </button>
                  </form>
                </div>
              </div>

              {/* Local Storage persistence tracker */}
              <div className="bookings-section-container">
                <h3 className="bookings-section-title">
                  <CheckCircle size={20} color="var(--primary)" />
                  Your Booked Appointments
                </h3>
                {savedBookings.length === 0 ? (
                  <p style={{ textAlign: 'left', color: 'var(--text-secondary)', fontSize: '14.5px' }}>
                    No appointments booked from this browser yet. Use the form above to schedule one.
                  </p>
                ) : (
                  <div className="bookings-grid">
                    {savedBookings.map((b) => (
                      <div className="booking-ticket" key={b.id}>
                        <div className="booking-ticket-info">
                          <h4>{b.name}</h4>
                          <div className="booking-ticket-details">
                            <span>Doctor: <strong>{b.doctor}</strong></span>
                            <span>Date: <strong>{b.date}</strong> | Slot: <strong>{b.timeSlot}</strong></span>
                            <span>Requested on: {b.bookingTime}</span>
                          </div>
                        </div>
                        <button 
                          className="booking-cancel-btn"
                          onClick={() => handleCancelBooking(b.id)}
                        >
                          Cancel
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 6. INSURANCE & SCHEMES MODULE */}
        {activeTab === 'insurance' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Insurance & Schemes</h2>
              <p className="section-subtitle">Government welfare benefits and cashless insurance tieups</p>
              
              {/* GOVERNMENT SCHEMES */}
              <div style={{ marginBottom: '50px' }}>
                {/* <img src={govtSchemeBannerImg} alt="Government Health Schemes" className="insurance-banner" /> */}
                <h3 className="services-section-heading">
                  <Shield size={24} style={{ color: 'var(--primary)' }} />
                  Government Health Schemes
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '25px' }}>
                  For selected departments - Empanelled under multiple government schemes
                </p>
                <div className="schemes-grid">
                  {/* ABARK */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><Shield size={24} /></div>
                    <h4 className="scheme-title">ABARK (PM-JAY)</h4>
                    <p className="scheme-desc">Ayushman Bharat Arogya Karnataka - Government health insurance scheme providing cashless treatment for eligible beneficiaries.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: Government approved procedures</span>
                      <span>Eligibility: Check PM-JAY portal</span>
                    </div>
                  </div>

                  {/* Yashaswini */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><Heart size={24} /></div>
                    <h4 className="scheme-title">Yashaswini Yojana</h4>
                    <p className="scheme-desc">State-sponsored health insurance scheme for cooperative members and farmers in Karnataka with cashless hospitalization benefits.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: Cooperative members, farmers</span>
                      <span>Cashless: Yes, for network hospitals</span>
                    </div>
                  </div>

                  {/* KASS */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><CheckCircle size={24} /></div>
                    <h4 className="scheme-title">KASS</h4>
                    <p className="scheme-desc">Karnataka Arogya Sanjeevini Scheme - Exclusive health insurance scheme for government employees and their families in Karnataka.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: Govt employees & families</span>
                      <span>Benefits: Comprehensive healthcare</span>
                    </div>
                  </div>

                  {/* Dharmastala */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><Heart size={24} /></div>
                    <h4 className="scheme-title">Dharmastala Arogya Yojana</h4>
                    <p className="scheme-desc">Arogya Raksha and Sampurna Suraksha schemes providing health insurance coverage for free medical treatment.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: Arogya Raksha & Suraksha</span>
                      <span>Access: Through partner hospitals</span>
                    </div>
                  </div>

                  {/* KLE & Nirani */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><CheckCircle size={24} /></div>
                    <h4 className="scheme-title">KLE & Nirani Health Cards</h4>
                    <p className="scheme-desc">Employer health benefit schemes providing cashless and reimbursement facilities for employees and their dependents.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: Employer groups</span>
                      <span>Cashless: Yes, for network hospitals</span>
                    </div>
                  </div>

                  {/* KSRTC */}
                  <div className="scheme-card">
                    <div className="scheme-icon"><Shield size={24} /></div>
                    <h4 className="scheme-title">KSRTC Cashless Scheme</h4>
                    <p className="scheme-desc">Karnataka State Road Transport Corporation scheme providing cashless medical treatment for employees and their families.</p>
                    <div className="scheme-highlights">
                      <span>Coverage: KSRTC employees & families</span>
                      <span>Cashless: Yes, approved procedures</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PRIVATE HEALTH INSURANCE */}
              <div style={{ marginBottom: '50px' }}>
                {/* <img src={insuranceBannerImg} alt="Private Health Insurance Accepted" className="insurance-banner" /> */}
                <h3 className="services-section-heading">
                  <Heart size={24} style={{ color: 'var(--accent)' }} />
                  Private Health Insurance Accepted
                </h3>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '25px' }}>
                  For selected departments - We accept all major health insurance companies
                </p>
                <div className="insurance-card">
                  <div className="insurance-intro-flex">
                    <div className="insurance-intro-desc">
                      <h3>All Health Insurance Companies Accepted</h3>
                      <p>
                        Gunjigavi Multispeciality Hospital Athani accepts health insurance from all major insurance providers in India. Our cashless facilities enable seamless medical treatment without upfront payment, making healthcare affordable and accessible.
                      </p>
                      <p>
                        We handle all documentation and pre-authorization requirements directly with your insurance company, ensuring hassle-free admission and treatment.
                      </p>
                    </div>
                    
                    <div className="government-badge">
                      <CheckCircle size={36} style={{ marginBottom: '10px' }} />
                      <span className="govt-badge-title">Accepted</span>
                      <span className="govt-badge-desc">All Insurance Companies (Verify at Reception)</span>
                    </div>
                  </div>

                  {/* Insurance companies list */}
                  <h4 className="insurance-list-title">Indicative List of Accepted Insurers</h4>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    We work with a wide range of health insurance providers. Please bring your insurance policy details during admission and verify cashless tie-up status at our reception desk.
                  </p>
                  <div className="insurance-grid">
                    {insuranceCompanies.map((c, i) => (
                      <div className="insurance-item" key={i}>
                        <Check size={14} />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>

                  {/* Reception support helpbox */}
                  <div className="guidance-box">
                    <Info className="guidance-icon" size={24} />
                    <div className="guidance-text">
                      <h4>Insurance & Scheme Admission Guidance</h4>
                      <p>
                        Our insurance and scheme help desk at the hospital reception assists patients and families with eligibility checks, scheme verification, document submissions, pre-authorisations, and claim processing. Please bring the patient's Aadhaar card, Insurance policy/scheme card, and relevant documents during admission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 7. GALLERY MODULE */}
        {activeTab === 'gallery' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Hospital Gallery</h2>
              <p className="section-subtitle">Tour our medical facilities, reception areas, and clean diagnostics</p>
              
              {/* Category Filter Controls */}
              <div className="gallery-controls">
                <button className={`gallery-filter-btn ${galleryFilter === 'all' ? 'active' : ''}`} onClick={() => setGalleryFilter('all')}>All Photos</button>
                <button className={`gallery-filter-btn ${galleryFilter === 'building' ? 'active' : ''}`} onClick={() => setGalleryFilter('building')}>Building & Entrance</button>
                <button className={`gallery-filter-btn ${galleryFilter === 'reception' ? 'active' : ''}`} onClick={() => setGalleryFilter('reception')}>Reception Area</button>
                <button className={`gallery-filter-btn ${galleryFilter === 'consultation' ? 'active' : ''}`} onClick={() => setGalleryFilter('consultation')}>OPD & Clinics</button>
                <button className={`gallery-filter-btn ${galleryFilter === 'pediatric' ? 'active' : ''}`} onClick={() => setGalleryFilter('pediatric')}>Pediatric Care</button>
                <button className={`gallery-filter-btn ${galleryFilter === 'maternity' ? 'active' : ''}`} onClick={() => setGalleryFilter('maternity')}>Maternity & Women's Care</button>
              </div>

              {/* Photos Grid - Loading all 20 images */}
              <div className="gallery-grid">
                {filteredGallery.map((img, index) => (
                  <div 
                    className="gallery-item" 
                    key={img.id}
                    onClick={() => setLightboxIndex(index)}
                  >
                    <img src={img.url} className="gallery-img" alt={img.title} loading="lazy" />
                    <div className="gallery-overlay">
                      <div className="gallery-zoom-icon">
                        <Search size={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lightbox Implementation */}
              {lightboxIndex !== null && (
                <div className="lightbox-modal">
                  <button className="lightbox-close" onClick={() => setLightboxIndex(null)} aria-label="Close Gallery">
                    <X size={24} />
                  </button>
                  <button className="lightbox-nav-btn lightbox-prev" onClick={handleLightboxPrev} aria-label="Previous image">
                    <ChevronLeft size={24} />
                  </button>
                  <button className="lightbox-nav-btn lightbox-next" onClick={handleLightboxNext} aria-label="Next image">
                    <ChevronRight size={24} />
                  </button>
                  <div className="lightbox-content-wrapper">
                    <img 
                      src={filteredGallery[lightboxIndex].url} 
                      className="lightbox-image" 
                      alt={filteredGallery[lightboxIndex].title} 
                    />
                    <div className="lightbox-caption">
                      {filteredGallery[lightboxIndex].title}
                      <div className="lightbox-counter">
                        Image {lightboxIndex + 1} of {filteredGallery.length} ({filteredGallery[lightboxIndex].categoryName})
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. BLOGS MODULE */}
        {activeTab === 'blogs' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Expert Healthcare Insights</h2>
              <p className="section-subtitle">Learn about our specialist services and expert care</p>
              
              <div className="blogs-grid">
                {/* Blog 1: Pediatrician */}
                <div className="blog-card">
                  <div className="blog-header">
                    {/* <img src={pediatricianImg} alt="Pediatrician - Child Health Specialist" className="blog-image" /> */}
                    <div className="blog-icon"><Heart size={32} /></div>
                    <h3 className="blog-title">Consultant Pediatrician – Complete Child Health</h3>
                    <p className="blog-category">Child Health & Development</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      A Consultant Pediatrician specializes in the physical, emotional and developmental health of infants, children and adolescents. From newborn care to teenage health issues, our pediatrician is your child's primary medical partner.
                    </p>
                    
                    <div className="blog-section">
                      <h4>Our Pediatric Services Include:</h4>
                      <ul className="blog-list">
                        <li><Check size={16} /> <strong>Newborn & Infant Care</strong> – Monitoring feeding, weight gain, early development and safe parenting guidance</li>
                        <li><Check size={16} /> <strong>Childhood Illness Management</strong> – Treatment for fever, cough, infections, allergies and asthma</li>
                        <li><Check size={16} /> <strong>Growth & Development Tracking</strong> – Regular monitoring of milestones and early identification of delays</li>
                        <li><Check size={16} /> <strong>Vaccination & Immunisation</strong> – Planned vaccinations with counselling on benefits and post-vaccination care</li>
                        <li><Check size={16} /> <strong>Long-term Chronic Care</strong> – Ongoing management for asthma, allergies and nutrition guidance</li>
                      </ul>
                    </div>
                    
                    <p className="blog-highlight">
                      <strong>Why This Matters:</strong> When searching for a child specialist doctor in Athani, families want someone clinically strong, approachable and child-friendly. Our pediatric services focus on building trust with both children and parents through clear communication and gentle care.
                    </p>
                  </div>
                </div>

                {/* Blog 2: OB-GYN */}
                <div className="blog-card">
                  <div className="blog-header">
                    {/* <img src={gynecologistImg} alt="Gynecologist - Women's Health Specialist" className="blog-image" /> */}
                    <div className="blog-icon"><Activity size={32} /></div>
                    <h3 className="blog-title">Consultant Obstetrician & Gynaecologist – Women's Health</h3>
                    <p className="blog-category">Women's Health & Safe Motherhood</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      An Obstetrician & Gynaecologist (OB-GYN) specializes in pregnancy, childbirth and the female reproductive system. Obstetrics focuses on pregnancy and delivery, while gynaecology addresses women's reproductive health across all life stages.
                    </p>
                    
                    <div className="blog-section">
                      <h4>Our Obstetric & Gynaecology Services Include:</h4>
                      <ul className="blog-list">
                        <li><Check size={16} /> <strong>Pre-conception Counselling</strong> – Health check-ups and guidance for couples planning pregnancy</li>
                        <li><Check size={16} /> <strong>Antenatal Care</strong> – Regular pregnancy check-ups, monitoring of mother and baby, high-risk pregnancy management</li>
                        <li><Check size={16} /> <strong>Delivery & Childbirth</strong> – Normal delivery, assisted delivery and caesarean care with continuous monitoring</li>
                        <li><Check size={16} /> <strong>Postnatal Support</strong> – Post-delivery care, breastfeeding guidance and emotional support</li>
                        <li><Check size={16} /> <strong>Gynaecology Services</strong> – Treatment for menstrual disorders, PCOS, fibroids, infections and menopausal symptoms</li>
                      </ul>
                    </div>
                    
                    <p className="blog-highlight">
                      <strong>Why This Matters:</strong> Women seeking a lady doctor for pregnancy in Athani want someone who understands their concerns, respects their privacy and explains every step clearly. Our specialist provides calm, respectful and confidential care.
                    </p>
                  </div>
                </div>

                {/* Blog 3: General Physician */}
                <div className="blog-card">
                  <div className="blog-header">
                    {/* <img src={physicianImg} alt="Physician - General Medicine Specialist" className="blog-image" /> */}
                    <div className="blog-icon"><Shield size={32} /></div>
                    <h3 className="blog-title">Consultant Physician (General Medicine) – Adult Health</h3>
                    <p className="blog-category">Adult Medicine & Chronic Disease Management</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      A Consultant Physician in General Medicine is trained to diagnose and treat a wide range of medical problems in adults, from acute infections to complex long-term conditions, often acting as the central coordinator of care for patients with multiple health issues.
                    </p>
                    
                    <div className="blog-section">
                      <h4>Our General Medicine Services Include:</h4>
                      <ul className="blog-list">
                        <li><Check size={16} /> <strong>Acute Medical Assessment</strong> – Detailed evaluation for fever, infections, chest pain, breathlessness and unexplained symptoms</li>
                        <li><Check size={16} /> <strong>Chronic Disease Management</strong> – Diagnosis and long-term care for diabetes, hypertension, thyroid disorders and lipid problems</li>
                        <li><Check size={16} /> <strong>Lifestyle & Prevention</strong> – Counselling on diet, exercise, weight management and smoking cessation</li>
                        <li><Check size={16} /> <strong>Preventive Health Check-ups</strong> – Full body check-ups for people with family history of heart disease or chronic illness</li>
                        <li><Check size={16} /> <strong>Long-term Follow-up</strong> – Individualized care plans and coordination of investigations for multiple conditions</li>
                      </ul>
                    </div>
                    
                    <p className="blog-highlight">
                      <strong>Why This Matters:</strong> When searching for a general physician in Athani, patients want a doctor who listens carefully, investigates thoroughly and gives practical advice for daily life. Our services provide clear diagnosis and realistic treatment plans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Choose Gunjigavi for Specialist Care */}
              <div className="blog-why-choose-section">
                <h3 className="blog-section-title">Why Choose Gunjigavi for Specialist Care?</h3>
                
                <div className="why-choose-grid">
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><Check size={24} /></div>
                    <h4>Three Specialists Under One Roof</h4>
                    <p>Your entire family can receive care at one location – Pediatrician, Gynecologist and General Physician working together for coordinated care.</p>
                  </div>
                  
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><Heart size={24} /></div>
                    <h4>Family-Friendly Environment</h4>
                    <p>Child-friendly consultation style, private spaces for women's health consultations, and hospital design that makes families feel comfortable and welcome.</p>
                  </div>
                  
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><Shield size={24} /></div>
                    <h4>Ethical, Evidence-Based Practice</h4>
                    <p>Our consultants follow established medical guidelines, keep patients informed about diagnosis and treatment options, and encourage informed decision-making.</p>
                  </div>
                  
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><MapPin size={24} /></div>
                    <h4>Convenient Access & Flexible Hours</h4>
                    <p>Located near Shivaji Circle with morning and evening consulting hours suitable for working individuals and school-going children.</p>
                  </div>
                  
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><CheckCircle size={24} /></div>
                    <h4>Insurance & Scheme Support</h4>
                    <p>Empanelled under Ayushman Bharat PM-JAY and works with many leading health insurance companies for cashless or reimbursement options.</p>
                  </div>
                  
                  <div className="why-choose-card">
                    <div className="why-choose-icon"><Heart size={24} /></div>
                    <h4>Long-term Care Relationships</h4>
                    <p>We aim to be your family hospital – for emergencies, preventive health, routine check-ups and consistent long-term follow-up.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. CONTACT US MODULE */}
        {activeTab === 'contact' && (
          <section className="section animate-fade-up" id="contact">
            <div className="container">
              <h2 className="section-title">Contact Us</h2>
              <p className="section-subtitle">Reach us at Athani or schedule a consultation call</p>
              
              <div className="contact-grid">
                <div className="contact-info-panel">
                  {/* Address */}
                  <div className="contact-card-box">
                    <div className="contact-card-icon"><MapPin size={20} /></div>
                    <div className="contact-card-details">
                      <h4>Hospital Address</h4>
                      <p>Gunjigavi Hospital, P3J3+Q83, Deshpande Nagar,</p>
                      <p>Near Shivaji Circle, Madabhavi Road,</p>
                      <p>Athani, Belagavi District, Karnataka – 591304</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="contact-card-box">
                    <div className="contact-card-icon"><Phone size={20} /></div>
                    <div className="contact-card-details">
                      <h4>Contact Numbers</h4>
                      <p>Main Admission: <a href="tel:8197270975"><strong>8197270975</strong></a></p>
                      <p>OPD Counter: <a href="tel:9482384887"><strong>9482384887</strong></a></p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="contact-card-box">
                    <div className="contact-card-icon"><Mail size={20} /></div>
                    <div className="contact-card-details">
                      <h4>Email Address</h4>
                      <p><a href="mailto:hospitalgunjigavi@gmail.com">hospitalgunjigavi@gmail.com</a></p>
                    </div>
                  </div>

                  {/* Operational hours table */}
                  <div className="contact-card-box" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div className="contact-card-icon"><Clock size={20} /></div>
                      <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: '700' }}>Doctors Visiting Hours</h4>
                    </div>
                    <table className="hours-table">
                      <thead>
                        <tr>
                          <th>Doctor / Speciality</th>
                          <th>Timings</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><strong>Dr. Anand Gunjigavi</strong> (Pediatrics)</td>
                          <td>10:00 AM to 4:00 PM<br />7:00 PM to 9:00 PM</td>
                        </tr>
                        <tr>
                          <td><strong>Dr. Rohini Gunjigavi</strong> (Gynaecology)</td>
                          <td>10:00 AM to 4:00 PM</td>
                        </tr>
                        <tr>
                          <td><strong>Dr. Sai Shruthi S. Gunjigavi</strong> (General Medicine)</td>
                          <td>10:00 AM to 4:00 PM<br />7:00 PM to 9:00 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Google Maps interactive iframe */}
                <div className="map-wrapper">
                  <iframe 
                    title="Gunjigavi Hospital Location"
                    className="map-iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.061730221373!2d75.04852497592476!3d16.731889201538356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6b933890f5b13%3A0xe5a363cb1be6b579!2sGunjigavi%20Hospital!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Footer Element */}
      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <h3>Gunjigavi Hospital</h3>
            <p>
              Compassionate, expert medical care for children, women, and adults in Athani. Empanelled under Ayushman Bharat.
            </p>
            <div className="footer-social-links">
              <a href="https://www.google.com/maps/place/Gunjigavi+Hospital" target="_blank" rel="noopener noreferrer"><MapPin size={18} /></a>
              <a href="tel:8197270975"><Phone size={18} /></a>
              <a href="mailto:hospitalgunjigavi@gmail.com"><Mail size={18} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><a onClick={() => handleTabClick('home')}>Home Page</a></li>
              <li><a onClick={() => handleTabClick('about')}>About Us</a></li>
              <li><a onClick={() => handleTabClick('doctors')}>Specialist Doctors</a></li>
              <li><a onClick={() => handleTabClick('services')}>Departments</a></li>
              <li><a onClick={() => handleTabClick('blogs')}>Blogs & Health Insights</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><a onClick={() => handleTabClick('services')}>Pediatric Clinic</a></li>
              <li><a onClick={() => handleTabClick('services')}>Obstetrics Care</a></li>
              <li><a onClick={() => handleTabClick('services')}>General Medicine</a></li>
              <li><a onClick={() => handleTabClick('insurance')}>Insurance Schemes</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Info</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={18} />
                <span>Deshpande Nagar, Madabhavi Road, Near Shivaji Circle, Athani - 591304</span>
              </li>
              <li>
                <Phone size={18} />
                <span>Help: 8197270975 / 9482384887</span>
              </li>
              <li>
                <Mail size={18} />
                <span>hospitalgunjigavi@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>&copy; {new Date().getFullYear()} Gunjigavi Multispeciality Hospital, Athani. All rights reserved.</span>
          <span>Designed By DAMA DIGITAL ANALYTICS.</span>
        </div>

        {/* SEO copy paragraph footer requirement */}
        <div className="container footer-seo-paragraph">
          <strong>Find Us Online:</strong> If you are searching online for a good hospital in Athani or a trusted multispeciality hospital near Shivaji Circle, Gunjigavi Multispeciality Hospital Athani offers pediatric, gynecology and general medicine services under one roof with experienced doctors, transparent communication and support for Ayushman Bharat and leading health insurance companies. Pediatrician in Athani Dr Anand Gunjigavi, gynecologist in Athani Dr Rohini Gunjigavi, general physician in Athani Dr Sai Shruthi Gunjigavi, Ayushman Bharat hospital in Athani, cashless insurance hospital in Athani, hospital near Shivaji Circle Athani.
        </div>
      </footer>
    </>
  );
}

export default App;

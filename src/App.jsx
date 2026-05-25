import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import { 
  Phone, Mail, Clock, MapPin, Calendar, Check, ChevronRight, ChevronLeft, 
  Sun, Moon, Menu, X, Shield, Image, Heart, Info, ExternalLink, User, Trash2, 
  Compass, Activity, AlertCircle, PlusCircle, CheckCircle, Search, HelpCircle, MessageCircle
} from 'lucide-react';
import './App.css';

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_eq0nugp';
const EMAILJS_PUBLIC_KEY = 'g0CrnHUhH0pFdQefk';
const EMAILJS_TEMPLATE_ID = 'template_vq3jlmf'; // Make sure this template exists in EmailJS

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// Dynamically resolve static image URLs in Vite
const docAnandImg = new URL('./assets/Images/AnandDr.JPG', import.meta.url).href;
const docRohiniImg = new URL('./assets/Images/DrRohini.JPG', import.meta.url).href;
const appLogoImg = new URL('./assets/Images/applogo.jpeg', import.meta.url).href;

// Blog Cover Images
const pediatricsBlogImg = new URL('./assets/BlogsImages/Pediatrics.png', import.meta.url).href;
const gynaecologyBlogImg = new URL('./assets/BlogsImages/Gynaecology.png', import.meta.url).href;
const generalMedicineBlogImg = new URL('./assets/BlogsImages/GeneralMedicine.png', import.meta.url).href;

// Home hero background (translucent only on first page)
const homeHeroBgImg = new URL('./assets/GalleryImages&Videos/7A9A5687.JPG', import.meta.url).href;


// Insurance Banner Images
const govtSchemeBannerImg = new URL('./assets/InsuranceImages/GovtScheme.PNG', import.meta.url).href;
const insuranceBannerImg = new URL('./assets/InsuranceImages/Insurance.jpeg', import.meta.url).href;

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
    description: 'Schedule your appointment online, via call (+91-9482384887), WhatsApp, or visit our OPD counter. Easy booking with confirmed appointment slots.',
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
    description: 'Visit us at Deshpande Nagar, Athani (591304). Emergency: 9482384887 | OPD: 9482384887 | Email: hospitalgunjigavi@gmail.com',
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
  
  // Blog detail page state
  const [selectedBlog, setSelectedBlog] = useState(null);

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

  // Navigate to blog detail page
  const handleBlogClick = (blogId) => {
    setSelectedBlog(blogId);
    setActiveTab('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Go back from blog detail
  const handleBackFromBlog = () => {
    setActiveTab('blogs');
    setSelectedBlog(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    
    // Send email via EmailJS
    const emailParams = {
      to_email: 'hospitalgunjigavi@gmail.com',
      patient_name: formData.name,
      patient_phone: formData.phone,
      patient_email: formData.email || 'Not provided',
      doctor_name: formData.doctor,
      appointment_date: formData.date,
      appointment_time: formData.timeSlot,
      message: formData.message || 'No additional message',
      booking_time: new Date().toLocaleString()
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailParams)
      .then((response) => {
        console.log('Email sent successfully!', response);
        setToastMessage(`Success! Appointment requested with ${formData.doctor}. Confirmation email sent.`);
      })
      .catch((error) => {
        console.log('Email sending failed (but booking saved):', error);
        setToastMessage(`Success! Appointment requested. Email notification may be delayed.`);
      });

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
        <span>EMERGENCY HELPLINE (24/7): <strong>9482384887</strong></span>
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
          <>
<section
                className="hero-section hero-section--home animate-fade-up"
                style={{ '--hero-bg-url': `url(${homeHeroBgImg})` }}
              >
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
                  <a href="tel:9482384887" className="btn-outline">
                    <Phone size={18} /> Call Now: 9482384887
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

          {/* WELCOME SECTION */}
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Welcome to Gunjigavi Multispeciality Hospital</h2>
              <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                <p className="section-text" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-primary)' }}>
                  At Gunjigavi Multispeciality Hospital Athani, we believe every patient deserves the best medical care delivered with warmth, honesty and respect. Our hospital is conveniently located near Shivaji Circle, Madabhavi Road, Deshpande Nagar, Athani – 591304, making us easily accessible to patients from Athani and surrounding villages in Belagavi district.
                </p>
                <p className="section-text" style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px', color: 'var(--text-primary)' }}>
                  We are a full-service multispeciality hospital with dedicated departments for children, women and adults, along with visiting specialists in Dermatology, ENT and Infertility. Whether it is a routine check-up, a pregnancy concern, a childhood fever or a long-term health condition, our experienced team is here to guide and treat your family at every step.
                </p>
                <div style={{ padding: '20px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '15px', marginTop: '30px', borderLeft: '4px solid var(--primary)' }}>
                  <p style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)' }}>
                    Compassion · Care · Commitment
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4 HIGHLIGHTS SECTION */}
          <section className="section animate-fade-up" style={{ background: 'rgba(13, 148, 136, 0.05)' }}>
            <div className="container">
              <div className="highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '30px', marginTop: '40px' }}>
                <div className="highlight-box" style={{ padding: '30px', background: 'white', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', textAlign: 'center', transition: 'var(--transition)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>🏥</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Multispeciality Hospital</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>3 core departments + 3 visiting specialties</p>
                </div>

                <div className="highlight-box" style={{ padding: '30px', background: 'white', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', textAlign: 'center', transition: 'var(--transition)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>👨‍⚕️</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Experienced Doctors</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>MD Pediatrics · DGO · MD General Medicine</p>
                </div>

                <div className="highlight-box" style={{ padding: '30px', background: 'white', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', textAlign: 'center', transition: 'var(--transition)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>💳</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Insurance & Schemes</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Ayushman Bharat, KASS, Yashaswini & more</p>
                </div>

                <div className="highlight-box" style={{ padding: '30px', background: 'white', borderRadius: '15px', boxShadow: 'var(--shadow-sm)', textAlign: 'center', transition: 'var(--transition)', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>📍</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Central Location</h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Near Shivaji Circle, Athani – 591304</p>
                </div>
              </div>
            </div>
          </section>

          {/* CORE SPECIALITIES EXPANDED SECTION */}
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Our Specialities</h2>
              <div className="specialities-expanded" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '50px' }}>

                    {/* General Medicine Card */}
                <div style={{ background: 'rgba(59, 130, 246, 0.08)', borderRadius: '15px', padding: '30px', borderLeft: '5px solid #3B82F6' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Shield size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#3B82F6' }}>General Medicine</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6' }}>
                    <strong>Adult & Chronic Disease Care</strong><br/>
                    Diagnosis and long-term management of diabetes, hypertension, thyroid, fevers, infections, chest complaints and lifestyle diseases.
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    <strong>Consultant:</strong> Dr. Sai Shruthi S. Gunjigavi — M.B.B.S, M.D. (General Medicine)
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600' }}>
                    ⏰ Morning: 10:00 AM – 4:00 PM | Evening: 7:00 PM – 9:00 PM
                  </p>
                </div>
                
                {/* Pediatrics Card */}
                <div style={{ background: 'rgba(13, 148, 136, 0.08)', borderRadius: '15px', padding: '30px', borderLeft: '5px solid var(--primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--primary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Heart size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--primary)' }}>Pediatrics</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6' }}>
                    <strong>Child Health & Vaccinations</strong><br/>
                    Complete care for newborns, infants and children including vaccinations, growth monitoring, childhood illness management and developmental assessment.
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    <strong>Consultant:</strong> Dr. Anand Gunjigavi — M.B.B.S, M.D. (Ped & Neonatologist)
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: '600' }}>
                    ⏰ Morning: 10:00 AM – 4:00 PM | Evening: 7:00 PM – 9:00 PM
                  </p>
                </div>

                {/* Gynecology Card */}
                <div style={{ background: 'rgba(217, 119, 6, 0.08)', borderRadius: '15px', padding: '30px', borderLeft: '5px solid var(--accent)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Activity size={24} color="white" />
                    </div>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--accent)' }}>Gynecology</h3>
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '15px', lineHeight: '1.6' }}>
                    <strong>Women's Health</strong><br/>
                    Antenatal care, high-risk pregnancy, normal delivery, PCOS, fibroids, menstrual disorders and postnatal support for women at all life stages.
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-primary)', marginBottom: '10px' }}>
                    <strong>Consultant:</strong> Dr. Rohini Gunjigavi — M.B.B.S, D.G.O
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: '600' }}>
                    ⏰ Morning: 10:00 AM – 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* VISITING SPECIALISTS SECTION */}
          <section className="section animate-fade-up" style={{ background: 'rgba(13, 148, 136, 0.05)' }}>
            <div className="container">
              <h2 className="section-title">Visiting Specialist Clinics</h2>
              <p className="section-subtitle">Expert consultations on selected days</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginTop: '40px' }}>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '15px' }}>🩺</div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Dermatology</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Skin, Hair & Nail problems</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '15px' }}>👂</div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>ENT</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Ear, Nose & Throat care</p>
                </div>
                <div style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: 'var(--shadow-sm)', textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', marginBottom: '15px' }}>👶</div>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px' }}>Infertility Specialist</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Fertility evaluation & counselling</p>
                </div>
              </div>
              
              {/* <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(217, 119, 6, 0.1)', borderRadius: '10px', textAlign: 'center', borderLeft: '4px solid var(--accent)' }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: '600' }}>
                  📞 Please call or WhatsApp us to confirm visiting days and appointment availability.
                </p>
              </div> */}
            </div>
          </section>

          {/* WHY CHOOSE US SECTION */}
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">Why Families in Athani Trust Gunjigavi Hospital</h2>
              
              <div className="why-choose-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', marginTop: '40px' }}>
                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> One Stop for Whole Family
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Kids, women and adults all treated under one roof without going to different hospitals.</p>
                </div>

                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> Qualified Specialists
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>MD Pediatrics, DGO and MD General Medicine with strong clinical experience.</p>
                </div>

                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> Government Schemes
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Eligible patients can access Ayushman Bharat and other scheme benefits with our help desk support.</p>
                </div>

                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> Patient-First Approach
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Simple explanations, counselling in Kannada/English and enough time given to every patient.</p>
                </div>

                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> Clean & Hygienic
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Well-maintained facilities and infection-safe environment for your safety.</p>
                </div>

                <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                  <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Check size={20} /> Centrally Located
                  </h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>Near Shivaji Circle, easy to reach from all parts of Athani and nearby villages.</p>
                </div>
              </div>
            </div>
          </section>

          {/* APPOINTMENT CTA SECTION */}
          <section className="section animate-fade-up" style={{ background: 'rgba(13, 148, 136, 0.08)' }}>
            <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
              <h2 className="section-title">Book Your Appointment Today</h2>
              <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '30px' }}>
                Getting an appointment at Gunjigavi Multispeciality Hospital Athani is quick and simple. Choose your preferred doctor, pick a time slot and leave the rest to us.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <div style={{ padding: '15px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <Phone size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}> Call us: <a href="tel:9482384887" style={{ color: 'var(--primary)', textDecoration: 'none' }}>81972 70975</a></span>
                </div>
                <div style={{ padding: '15px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <MessageCircle size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}> WhatsApp: <a href="https://wa.me/918197270975" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'none' }}>81972 70975</a></span>
                </div>
                <div style={{ padding: '15px', background: 'white', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
                  <MapPin size={18} style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}> Walk in: Near Shivaji Circle, Athani</span>
                </div>
              </div>

              <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ width: '100%', justifyContent: 'center', padding: '15px 30px' }}>
                <Calendar size={20} /> Fill Appointment Form Online
              </button>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '15px' }}>
                *(You can also fill in the appointment form and our team will call you back to confirm your slot.)*
              </p>
            </div>
          </section>

          {/* EMERGENCY & CRITICAL CARE SECTION - HOME PAGE */}
          <section className="section animate-fade-up" style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '60px 0' }}>
            <div className="container">
              <h2 className="section-title" style={{ color: '#ef4444' }}>🚨 24×7 Emergency & Critical Care</h2>
              <p className="section-subtitle">Round-the-clock medical emergencies support with advanced life-support equipment</p>
              
              <div style={{ background: 'white', borderRadius: '15px', padding: '40px', boxShadow: 'var(--shadow-md)', borderLeft: '6px solid #ef4444' }}>
                <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '25px' }}>
                  Our General Medicine and Emergency unit at Gunjigavi Multispeciality Hospital Athani is equipped to manage a wide range of medical emergencies, from sudden heart attacks to poisoning and snake-bite cases, with round-the-clock monitoring and advanced life-support equipment. Every emergency patient is assessed immediately, stabilised and managed as per standard protocols.
                </p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                  <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} /> All Medical Emergencies
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0' }}>Heart attacks, strokes, severe breathlessness, seizures, shock and other critical conditions handled with immediate assessment and stabilisation.</p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} /> Poisoning & Snake-bite Care
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0' }}>Dedicated setup to treat poisoning cases and snake-bite patients with close monitoring, timely antidote administration and ICU-level support.</p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} /> Advanced Respiratory Support
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0' }}>Ventilators, BiPAP and HFNC (high-flow nasal cannula) machines for patients with critical breathing problems and respiratory failure.</p>
                  </div>

                  <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Check size={18} /> ICU & High-Dependency Care
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6', margin: '0' }}>Continuous vital-signs monitoring, experienced critical-care nursing staff and consultant physician available round-the-clock.</p>
                  </div>
                </div>

                <div style={{ padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', borderLeft: '4px solid #ef4444', marginTop: '20px' }}>
                  <p style={{ fontSize: '12px', color: '#7f1d1d', fontStyle: 'italic', margin: '0' }}>
                    <strong>Note:</strong> Emergency services are subject to doctor and bed availability. Very critical cases may be stabilised and referred to higher centres if specialised support is required.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PEDIATRICS & OBSTETRICS SIDE-BY-SIDE CARDS - HOME PAGE */}
          <section className="section animate-fade-up" style={{ padding: '60px 0' }}>
            <div className="container">
              <h2 className="section-title">👶 Specialized Care for Every Life Stage</h2>
              <p className="section-subtitle">From newborns to mothers — comprehensive pediatric and obstetric services</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '30px' }}>
                {/* PEDIATRICS & NICU CARD */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '40px', boxShadow: 'var(--shadow-md)', borderTop: '6px solid var(--primary)', transition: 'var(--transition)', cursor: 'pointer' }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} 
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Heart size={28} /> Pediatrics & Neonatology
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    Advanced tertiary-care NICU for premature and critically ill newborns, with expert Consultant Neonatologist and complete pediatric care support.
                  </p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--primary)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>State-of-the-art NICU</strong> with ventilators, CPAP and HFNC systems</span>
                    </li>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--primary)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>Continuous monitoring</strong> of oxygen, heart rate, breathing and temperature</span>
                    </li>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--primary)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>Family counselling</strong> and long-term growth follow-up after discharge</span>
                    </li>
                  </ul>
                  <button onClick={() => handleTabClick('services')} style={{ marginTop: '20px', width: '100%', padding: '12px 20px', background: 'white', border: '2px solid var(--primary)', color: 'var(--primary)', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition)' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--primary)'; }}>
                    Learn More <ChevronRight size={18} />
                  </button>
                </div>

                {/* OBSTETRICS & GYNECOLOGY CARD */}
                <div style={{ background: 'white', borderRadius: '15px', padding: '40px', boxShadow: 'var(--shadow-md)', borderTop: '6px solid var(--accent)', transition: 'var(--transition)', cursor: 'pointer' }} 
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'} 
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    👩‍⚕️ Obstetrics & Gynecology
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
                    Complete mother-and-baby care from pre-conception to postnatal follow-up, with expert management of high-risk pregnancies and infertility services.
                  </p>
                  <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--accent)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>High-risk pregnancy management</strong> following evidence-based protocols</span>
                    </li>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--accent)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>Infertility evaluation</strong> and IUI/IVF treatments with transparent counselling</span>
                    </li>
                    <li style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-primary)' }}>
                      <Check size={16} style={{ color: 'var(--accent)', minWidth: '16px', marginTop: '2px' }} />
                      <span><strong>Laparoscopic gynecology</strong> for fibroids, cysts, endometriosis and more</span>
                    </li>
                  </ul>
                  <button onClick={() => handleTabClick('services')} style={{ marginTop: '20px', width: '100%', padding: '12px 20px', background: 'white', border: '2px solid var(--accent)', color: 'var(--accent)', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'var(--transition)' }} 
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--accent)'; }}>
                    Learn More <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS SECTION */}
          <section className="section animate-fade-up">
            <div className="container">
              <h2 className="section-title">What Our Patients Say</h2>
              
              <div className="testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
                
                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--accent)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#FCD34D', fontSize: '18px' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '15px' }}>
                    "Dr. Anand treated my son with great care and patience. The staff is very helpful and the clinic is always clean. We always come here for our children."
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>— Patient from Athani</p>
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--accent)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#FCD34D', fontSize: '18px' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '15px' }}>
                    "Dr. Rohini is an excellent doctor. She explained everything clearly during my pregnancy and I had a safe delivery. Highly recommend Gunjigavi Hospital."
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>— Patient from Chikodi Road, Athani</p>
                </div>

                <div style={{ background: 'white', padding: '30px', borderRadius: '15px', boxShadow: 'var(--shadow-md)', borderTop: '4px solid var(--accent)' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '15px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: '#FCD34D', fontSize: '18px' }}>⭐</span>
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '15px' }}>
                    "Dr. Sai Shruthi is very thorough. She diagnosed my diabetes properly and gave me a clear plan. Very professional and caring hospital."
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary)' }}>— Patient from Belagavi district</p>
                </div>
              </div>
            </div>
          </section>

          {/* BOTTOM CTA SECTION */}
          <section className="section animate-fade-up" style={{ background: 'linear-gradient(135deg, var(--primary) 0%, rgba(13, 148, 136, 0.8) 100%)' }}>
            <div className="container" style={{ textAlign: 'center', paddingTop: '60px', paddingBottom: '60px' }}>
              <h2 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '15px' }}>Your Family Deserves the Best Care</h2>
              <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
                Visit Gunjigavi Multispeciality Hospital Athani today — Compassion, Care and Commitment in every consultation.
              </p>
              <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ background: 'white', color: 'var(--primary)', fontWeight: '700', padding: '15px 40px', fontSize: '16px' }}>
                <Calendar size={20} /> Book Appointment Now
              </button>
            </div>
          </section>
          </>
        )}

        {/* 2. ABOUT US MODULE */}
        {activeTab === 'about' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h1 className="section-title">About Our Hospital</h1>
              <p className="section-subtitle">Delivering ethical care with modern medical standards to Belagavi District</p>
              
              <div className="about-grid">
                <div className="about-text">
                  <span className="about-accent-title">About Gunjigavi Multispeciality Hospital</span>
                  <h3 className="about-heading">Providing high-quality, accessible family healthcare from newborns to senior citizens</h3>
                  <p className="about-desc">
                    Gunjigavi Multispeciality Hospital Athani is a modern, family-focused healthcare centre located near Shivaji Circle on Madabhavi Road, Athani, Belagavi district, Karnataka – 591304. Built on the core values of Compassion, Care and Commitment, we aim to provide high-quality, ethical and accessible healthcare.
                  </p>
                  <p className="about-desc">
                    Our hospital brings together specialist care in <a onClick={() => handleTabClick('services')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>Pediatrics, Obstetrics & Gynaecology and General Medicine</a>, supported by experienced nursing staff and dedicated support teams. With a strong focus on patient safety, hygiene and personalised attention, we strive to make every patient feel heard, respected and well cared for.
                  </p>
                  <p className="about-desc">
                    We are proud to be empanelled under major government schemes like <a onClick={() => handleTabClick('insurance')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>Ayushman Bharat PM-JAY as well as a wide range of company and private health insurance plans</a>, making quality healthcare more affordable and accessible for the people of Athani and surrounding areas.
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
                    To be recognised as one of the most trusted and patient-centric multispeciality hospitals in Rural Karnataka & Athani, known for ethical practice, clinical excellence and family-oriented care.
                  </p>
                </div>
                <div className="vm-card">
                  <div className="vm-title">
                    <Shield size={22} />
                    Our Mission
                  </div>
                  <p className="vm-text">
                    To deliver compassionate, evidence-based healthcare to every patient with honesty, transparency and respect, using modern medical knowledge and a human touch at an affordable price.
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
              <h1 className="section-title">Meet Our Doctors</h1>
              <p className="section-subtitle">Our team of dedicated specialists providing expert care in Athani</p>
              
              <div className="doctors-grid">

                   {/* Doctor 1 */}
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
                      Diagnoses and manages adult chronic conditions including diabetes, hypertension, thyroid, thyroid disorders, acute infections, respiratory conditions and preventive health mapping. Explore our <a onClick={() => handleTabClick('blogs')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>general health and wellness articles</a> for more information.
                    </p>
                    <div className="doctor-hours">
                      <div className="doctor-hours-title"><Clock size={14} /> Visiting Hours:</div>
                      <div>Morning: 10:00 AM to 4:00 PM</div>
                      <div>Evening: 6:00 PM to 7:30 PM</div>
                    </div>
                    <button className="btn-primary doctor-card-btn" onClick={() => handleTabClick('appointments')}>
                      Book Appointment
                    </button>
                  </div>
                </div>
                {/* Doctor 2 */}
                <div className="doctor-card">
                  <div className="doctor-img-container">
                    <img src={docAnandImg} className="doctor-img" alt="Dr. Anand Gunjigavi" />
                    <span className="doctor-dept-tag">Pediatrics</span>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. Anand Gunjigavi</h3>
                    <span className="doctor-qual">M.B.B.S, M.D. (Pediatrics)</span>
                    <p className="doctor-bio">
                      Specialises in newborns, infants, and pediatric care. Evaluates childhood growth, developmental milestones, vaccination guidance, and common illnesses with a gentle child-friendly touch. Read more about <a onClick={() => handleTabClick('blogs')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>pediatric health insights</a> on our blog.
                    </p>
                    <div className="doctor-hours">
                      <div className="doctor-hours-title"><Clock size={14} /> Visiting Hours:</div>
                      <div>Morning: 11:00 AM to 4:00 PM</div>
                      <div>Evening: 7:00 PM to 9:00 PM</div>
                    </div>
                    <button className="btn-primary doctor-card-btn" onClick={() => handleTabClick('appointments')}>
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* Doctor 3 */}
                <div className="doctor-card">
                  <div className="doctor-img-container">
                    <img src={docRohiniImg} className="doctor-img" alt="Dr. Rohini Gunjigavi" />
                    <span className="doctor-dept-tag">Gynaecology & Obstetrics</span>
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. Rohini Gunjigavi</h3>
                    <span className="doctor-qual">M.B.B.S, D.G.O</span>
                    <p className="doctor-bio">
                      Specialises in women's health, high-risk pregnancy management, normal deliveries, gynecological conditions and checkups with deep empathy and clinical excellence. Learn more about <a onClick={() => handleTabClick('blogs')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>gynecology and women's health</a> on our blog.
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
              </div>
            </div>
          </section>
        )}

        {/* 4. DEPARTMENTS & SERVICES MODULE */}
        {activeTab === 'services' && (
          <section className="section animate-fade-up">
            <div className="container">
              <h1 className="section-title">Departments & Services</h1>
              <p className="section-subtitle">Advanced diagnostics and outpatient treatments tailored for families</p>
              
              {/* IN HOUSE DEPARTMENTS */}
              <div style={{ marginBottom: '50px' }}>
                <h3 className="services-section-heading">
                  <Heart size={24} style={{ color: 'var(--primary)' }} />
                  In-House Departments
                </h3>
                <div className="services-grid">

   {/* General Medicine */}
                  <div className="service-card">
                    <div className="service-card-icon"><Shield size={24} /></div>
                    <h3 className="service-card-title">General Medicine</h3>
                    <p className="service-card-desc">All emergency management and treatments along with broad diagnosis and long-term care management for adult acute infections and chronic lifestyle conditions with our <a onClick={() => handleTabClick('doctors')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>general physician specialist</a>.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> All emergency management & treatments</li>
                      <li><Check size={14} /> Diabetes & hypertension control</li>
                      <li><Check size={14} /> Thyroid & hormone management</li>
                      <li><Check size={14} /> Cardiac & stomach disorders</li>
                    </ul>
                  </div>

                  {/* Pediatrics & Neonatology */}
                  <div className="service-card">
                    <div className="service-card-icon"><Heart size={24} /></div>
                    <h3 className="service-card-title">Pediatrics & Neonatology</h3>
                    <p className="service-card-desc">Baby and mother care at one roof. Complete medical care for newborns, infants, children, and adolescents under expert pediatric guidance from our <a onClick={() => handleTabClick('doctors')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>consultant pediatrician</a>.</p>
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
                    <p className="service-card-desc">Empathetic care for high-risk pregnancies, deliveries, postnatal care, female wellness disorders, and infertility treatments from our <a onClick={() => handleTabClick('doctors')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>experienced gynecologist</a>.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Open & laparoscopy surgery</li>
                      <li><Check size={14} /> Infertility IUI and IVF treatments</li>
                      <li><Check size={14} /> Antenatal pregnancy checkups</li>
                      <li><Check size={14} /> Normal & assisted deliveries</li>
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
                  For selected departments | selected treatment - Expert visiting doctors available for specialized consultations
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
                    <p className="service-card-desc">Specialized ear, nose, and throat consultations with speech therapy services for hearing and voice disorders.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> Speech therapy</li>
                      <li><Check size={14} /> Hearing assessment & audiometry</li>
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
                    <p className="service-card-desc">Comprehensive fertility consultations by experts from Indira IVF and in-house gynecologist with IUI and IVF treatments.</p>
                    <ul className="service-list">
                      <li><Check size={14} /> IUI treatments</li>
                      <li><Check size={14} /> IVF treatments</li>
                      <li><Check size={14} /> Fertility assessments & investigations</li>
                      <li><Check size={14} /> Reproductive counselling</li>
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
                      <li><Check size={14} /> Multiple scheme support</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* DETAILED DEPARTMENT SECTIONS */}

              {/* 1. GENERAL MEDICINE & EMERGENCY CARE - DETAILED */}
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', marginTop: '60px', padding: '40px 0', borderRadius: '15px', marginBottom: '40px' }}>
                <h2 className="section-title" style={{ color: '#ef4444' }}>🚨 General Medicine & 24×7 Emergency Care</h2>
              
                <div style={{ background: 'white', borderRadius: '15px', padding: '40px', marginBottom: '30px', boxShadow: 'var(--shadow-md)', borderLeft: '6px solid #ef4444' }}>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '30px' }}>
                    Our General Medicine and Emergency unit at Gunjigavi Multispeciality Hospital Athani is equipped to manage a wide range of medical emergencies, from sudden heart attacks to poisoning and snake-bite cases, with round-the-clock monitoring and advanced life-support equipment. Every emergency patient is assessed immediately, stabilised and managed as per standard protocols.
                  </p>

                  <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444', marginBottom: '20px' }}>Services & Capabilities:</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '30px' }}>
                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={20} /> Medical Emergencies
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '8px' }}>
                        All medical emergencies handled, including:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6', listStyle: 'none', padding: '0', margin: '0' }}>
                        <li>• Sudden heart attacks & cardiac emergencies</li>
                        <li>• Stroke & neurological crises</li>
                        <li>• Severe breathlessness & respiratory failure</li>
                        <li>• Seizures & loss of consciousness</li>
                        <li>• Shock & severe dehydration</li>
                      </ul>
                    </div>

                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={20} /> Poisoning & Toxicology
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '8px' }}>
                        Dedicated setup to treat poisoning cases and snake-bite patients with:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6', listStyle: 'none', padding: '0', margin: '0' }}>
                        <li>• Close monitoring & vital-sign tracking</li>
                        <li>• Timely antidote administration</li>
                        <li>• ICU-level intensive care support</li>
                        <li>• Specialized toxicology protocols</li>
                      </ul>
                    </div>

                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={20} /> Advanced Respiratory Support
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '8px' }}>
                        For patients with critical breathing problems:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6', listStyle: 'none', padding: '0', margin: '0' }}>
                        <li>• Mechanical ventilators for complete respiratory support</li>
                        <li>• BiPAP (Bilevel Positive Airway Pressure) systems</li>
                        <li>• HFNC (High-Flow Nasal Cannula) oxygen delivery</li>
                        <li>• 24/7 respiratory technician availability</li>
                      </ul>
                    </div>

                    <div style={{ padding: '20px', background: 'rgba(239, 68, 68, 0.08)', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                      <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={20} /> ICU & High-Dependency Care
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '8px' }}>
                        High-dependency unit with specialized equipment:
                      </p>
                      <ul style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: '1.6', listStyle: 'none', padding: '0', margin: '0' }}>
                        <li>• Continuous vital-signs monitoring systems</li>
                        <li>• Experienced critical-care nursing staff</li>
                        {/* <li>• 1:1 or 1:2 nurse-to-patient ratios</li> */}
                        <li>• Consultant Physician available round-the-clock</li>
                      </ul>
                    </div>
                  </div>

                  <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '10px', borderLeft: '4px solid #ef4444', marginTop: '20px' }}>
                    <p style={{ fontSize: '13px', color: '#7f1d1d', fontStyle: 'italic', margin: '0' }}>
                      <strong>Important Note:</strong> Emergency services are provided subject to doctor and bed availability. Very critical cases may be stabilised and referred to higher centres if specialised support is required.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. PEDIATRICS & NEONATOLOGY - DETAILED */}
              <div style={{ background: 'rgba(13, 148, 136, 0.05)', marginTop: '40px', padding: '40px 0', borderRadius: '15px', marginBottom: '40px' }}>
                <h2 className="section-title">👶 Pediatrics & Neonatology – Baby and Mother Care at One Roof</h2>
              
                <div style={{ background: 'white', borderRadius: '15px', padding: '40px', marginBottom: '30px', boxShadow: 'var(--shadow-md)', borderLeft: '6px solid var(--primary)' }}>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '30px' }}>
                    The Pediatrics and Neonatology department at Gunjigavi Multispeciality Hospital offers comprehensive baby and mother care at one roof, with support for newborns, infants and children through a dedicated tertiary-care Neonatal Intensive Care Unit (NICU). Our NICU is equipped to manage extremely premature babies and very sick neonates using modern ventilation and monitoring systems.
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px', marginBottom: '30px' }}>
                    <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Heart size={22} /> NICU Features
                      </h3>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Tertiary-care NICU</strong> designed for premature and critically ill newborns</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>State-of-the-art ventilators</strong>, CPAP and HFNC systems for advanced respiratory support</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Multiple syringe pumps</strong> and infusion devices for precise medicine & nutrition delivery</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Continuous monitoring</strong> of oxygen levels, heart rate, breathing and temperature</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Expert team</strong> – Consultant Neonatologist available for high-risk deliveries & resuscitation</span>
                        </li>
                      </ul>
                    </div>

                    <div style={{ padding: '25px', background: 'rgba(13, 148, 136, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--primary)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={22} /> Pediatric Care Services
                      </h3>
                      <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Newborn screening</strong> and early detection of complications</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Growth & development</strong> tracking with regular milestones assessment</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Immunization programs</strong> and preventive health protocols</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Family counselling</strong> and parent education for long-term outcomes</span>
                        </li>
                        <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                          <Check size={18} style={{ color: 'var(--primary)', minWidth: '18px', marginTop: '1px' }} />
                          <span><strong>Regular follow-up</strong> support for development after NICU discharge</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. OBSTETRICS, GYNECOLOGY & INFERTILITY - DETAILED */}
              <div style={{ background: 'rgba(217, 119, 6, 0.05)', marginTop: '40px', padding: '40px 0', borderRadius: '15px', marginBottom: '40px' }}>
                <h2 className="section-title">👩‍⚕️ Obstetrics, Gynaecology & Infertility – Mother & Baby Care Under One Roof</h2>
              
                <div style={{ background: 'white', borderRadius: '15px', padding: '40px', marginBottom: '30px', boxShadow: 'var(--shadow-md)', borderLeft: '6px solid var(--accent)' }}>
                  <p style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-primary)', marginBottom: '30px' }}>
                    Our Obstetrics and Gynaecology department provides complete care for women at every stage of life, with special focus on high-risk pregnancies and advanced infertility services. Mother and baby receive continuous care under one roof, from pre-conception counselling to delivery and postnatal follow-up.
                  </p>

                  {/* Sub-section: High-Risk Pregnancy */}
                  <div style={{ marginBottom: '30px', padding: '25px', background: 'rgba(217, 119, 6, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       High-Risk Pregnancy & Safe Delivery
                    </h3>
                    <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span>All high-risk deliveries managed following evidence-based protocols – pregnancies with hypertension, diabetes (with physician coordination), previous cesarean, twins or other complications</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span>Labour room and operation theatre support for normal, assisted and caesarean deliveries as indicated</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span>Close coordination with Neonatology team for safe mother-and-baby outcomes, especially in high-risk and preterm births</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sub-section: Infertility Services */}
                  <div style={{ marginBottom: '30px', padding: '25px', background: 'rgba(217, 119, 6, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       Infertility Evaluation & Treatment
                    </h3>
                    <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span><strong>Expert specialists</strong> from Indira IVF and in-house gynecologist providing comprehensive infertility services</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span><strong>IUI and IVF treatments</strong> planned using modern reproductive-medicine principles for couples trying to conceive</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span><strong>Comprehensive evaluation</strong> and counselling including hormonal tests, scans and complete fertility work-up</span>
                      </li>
                    </ul>
                  </div>

                  {/* Sub-section: Laparoscopic Surgery */}
                  <div style={{ padding: '25px', background: 'rgba(217, 119, 6, 0.08)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}>
                    <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--accent)', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                       Laparoscopic Gynecology Surgery
                    </h3>
                    <ul style={{ listStyle: 'none', padding: '0', margin: '0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span><strong>Keyhole surgeries</strong> for selected gynaecological and infertility-related conditions – smaller cuts, less pain and quicker recovery vs. traditional open surgery</span>
                      </li>
                      <li style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-primary)' }}>
                        <Check size={18} style={{ color: 'var(--accent)', minWidth: '18px', marginTop: '1px' }} />
                        <span><strong>Procedures for multiple conditions</strong> – fibroids, ovarian cysts, endometriosis, pelvic problems and other gynecology issues based on detailed evaluation</span>
                      </li>
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
              <h1 className="section-title">Schedule an Appointment</h1>
              <p className="section-subtitle">Book online to confirm your consultation slot with our medical specialists</p>
              
              <div className="appointment-grid">
                {/* Appointment Info Box */}
                <div className="appointment-info-card">
                  <h3 className="appointment-info-title">Booking Options</h3>
                  <p className="appointment-info-desc">
                    Choose the booking method most convenient for you. Our reception team will coordinate with you immediately. View our <a onClick={() => handleTabClick('doctors')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>specialist doctors</a> to select the best fit for your needs.
                  </p>
                  
                  <div className="appointment-method">
                    <a href="tel:9482384887" className="method-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                      <div className="method-icon"><Phone size={16} /></div>
                      <div className="method-details">
                        <h4>Call Reception</h4>
                        <p><strong>9482384887</strong> (OPD timings)</p>
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
                        <p>Send details (Name, Age, Doctor) to <strong>9482384887</strong></p>
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
              <h1 className="section-title">Insurance & Schemes</h1>
              <p className="section-subtitle">Government welfare benefits and cashless insurance tieups. <a onClick={() => handleTabClick('appointments')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>Book your appointment</a> using any of these schemes.</p>
              
              {/* GOVERNMENT SCHEMES */}
              <div style={{ marginBottom: '50px' }}>
                <h3 className="services-section-heading">
                  <Shield size={24} style={{ color: 'var(--primary)' }} />
                  Government Health Schemes
                </h3>
                <img src={govtSchemeBannerImg} alt="Government Health Schemes" className="insurance-banner" />
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '25px' }}>
                  For selected departments | selected treatment - Empanelled under multiple government schemes
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
                <h3 className="services-section-heading">
                  <Heart size={24} style={{ color: 'var(--accent)' }} />
                  Private Health Insurance Accepted
                </h3>
                {/* <img src={insuranceBannerImg} alt="Private Health Insurance Accepted" className="insurance-banner" /> */}
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginBottom: '25px' }}>
                  For selected departments | selected treatment - We accept all major health insurance companies
                </p>
                <div className="insurance-card">
                  <div className="insurance-intro-flex">
                    <div className="insurance-intro-desc">
                      <h3>All Health Insurance Companies Accepted</h3>
                      <p>
                        Gunjigavi Multispeciality Hospital Athani accepts health insurance from all major insurance providers in India. 
                      </p>
                      {/* <p>
                        We handle all documentation and pre-authorization requirements directly with your insurance company, ensuring hassle-free admission and treatment.
                      </p> */}
                    </div>
                    
                    <div className="government-badge">
                      <CheckCircle size={36} style={{ marginBottom: '10px' }} />
                      <span className="govt-badge-title">Accepted</span>
                      <span className="govt-badge-desc">All Insurance Companies (Verify at Reception)</span>
                    </div>
                  </div>

                  {/* Insurance companies list */}
                  {/* <h4 className="insurance-list-title">Indicative List of Accepted Insurers</h4> */}
                  {/* <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '15px' }}>
                    We work with a wide range of health insurance providers. Please bring your insurance policy details during admission and verify cashless tie-up status at our reception desk.
                  </p> */}
                  {/* <div className="insurance-grid">
                    {insuranceCompanies.map((c, i) => (
                      <div className="insurance-item" key={i}>
                        <Check size={14} />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div> */}

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
              <h1 className="section-title">Hospital Gallery</h1>
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
              <h1 className="section-title">Expert Healthcare Insights</h1>
              <p className="section-subtitle">Learn about our <a onClick={() => handleTabClick('services')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>specialist services</a> and <a onClick={() => handleTabClick('doctors')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>expert doctors</a></p>
              
              <div className="blogs-grid">
                {/* Blog 1: Pediatrician */}
                <div className="blog-card" onClick={() => handleBlogClick('pediatrics')}>
                  <img src={pediatricsBlogImg} alt="Pediatrician - Child Health Specialist" className="blog-cover-image" />
                  <div className="blog-header">
                    <h3 className="blog-title">Consultant Pediatrician – Complete Child Health</h3>
                    <p className="blog-category">Child Health & Development</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      A Consultant Pediatrician specializes in the physical, emotional and developmental health of infants, children and adolescents. From newborn care to teenage health issues, our pediatrician is your child's primary medical partner.
                    </p>
                    
                    <button className="read-more-btn">
                      Read More →
                    </button>
                  </div>
                </div>

                {/* Blog 2: OB-GYN */}
                <div className="blog-card" onClick={() => handleBlogClick('gynecology')}>
                  <img src={gynaecologyBlogImg} alt="Gynecologist - Women's Health Specialist" className="blog-cover-image" />
                  <div className="blog-header">
                    <h3 className="blog-title">Consultant Obstetrician & Gynaecologist – Women's Health</h3>
                    <p className="blog-category">Women's Health & Safe Motherhood</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      An Obstetrician & Gynaecologist (OB-GYN) specializes in pregnancy, childbirth and the female reproductive system. Obstetrics focuses on pregnancy and delivery, while gynaecology addresses women's reproductive health across all life stages.
                    </p>
                    
                    <button className="read-more-btn">
                      Read More →
                    </button>
                  </div>
                </div>

                {/* Blog 3: General Physician */}
                <div className="blog-card" onClick={() => handleBlogClick('generalmedicine')}>
                  <img src={generalMedicineBlogImg} alt="Physician - General Medicine Specialist" className="blog-cover-image" />
                  <div className="blog-header">
                    <h3 className="blog-title">Consultant Physician (General Medicine) – Adult Health</h3>
                    <p className="blog-category">Adult Medicine & Chronic Disease Management</p>
                  </div>
                  
                  <div className="blog-content">
                    <p className="blog-intro">
                      A Consultant Physician in General Medicine is trained to diagnose and treat a wide range of medical problems in adults, from acute infections to complex long-term conditions, often acting as the central coordinator of care for patients with multiple health issues.
                    </p>
                    
                    <button className="read-more-btn">
                      Read More →
                    </button>
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
              <h1 className="section-title">Contact Us</h1>
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
                      <p>Main Admission: <a href="tel:9482384887"><strong>9482384887</strong></a></p>
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

                  {/* Quick CTA Links */}
                  <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                    <p style={{ marginBottom: '15px', color: 'var(--text-primary)', fontWeight: '600' }}>Ready to book or learn more?</p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ flex: 1, minWidth: '160px' }}>
                        <Calendar size={16} /> Book Appointment
                      </button>
                      <button className="btn-outline" onClick={() => handleTabClick('services')} style={{ flex: 1, minWidth: '160px' }}>
                        View Services
                      </button>
                      <button className="btn-outline" onClick={() => handleTabClick('insurance')} style={{ flex: 1, minWidth: '160px' }}>
                        View Insurance
                      </button>
                    </div>
                  </div>
                </div>

                {/* Google Maps interactive iframe */}
                <div className="map-wrapper" style={{ position: 'relative' }}>
                  <iframe 
                    title="Gunjigavi Hospital Location"
                    className="map-iframe"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.061730221373!2d75.04852497592476!3d16.731889201538356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc6b933890f5b13%3A0xe5a363cb1be6b579!2sGunjigavi%20Hospital!5e0!3m2!1sen!2sin!4v1716200000000!5m2!1sen!2sin"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <a 
                    href="https://maps.app.goo.gl/hfGWmpGxnsXyKXVGA"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', zIndex: '1', cursor: 'pointer' }}
                    title="Click to open full location in Google Maps"
                  ></a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 8. BLOG DETAIL PAGE */}
        {activeTab === 'blog-detail' && selectedBlog && (
          <section className="section animate-fade-up">
            <div className="container">
              {/* Back Button */}
              <button className="blog-back-btn" onClick={handleBackFromBlog}>
                <ChevronLeft size={20} /> Back to Blogs
              </button>

              {selectedBlog === 'pediatrics' && (
                <div className="blog-detail-container">
                  <img src={pediatricsBlogImg} alt="Pediatrician Blog" className="blog-detail-image" />
                  <div className="blog-detail-content">
                    <h2 className="blog-detail-title">Consultant Pediatrician – Complete Child Health</h2>
                    <p className="blog-detail-category">Child Health & Development</p>
                    
                    <p className="blog-detail-intro">
                      A Consultant Pediatrician specializes in the physical, emotional and developmental health of infants, children and adolescents. From newborn care to teenage health issues, our pediatrician is your child's primary medical partner.
                    </p>
                    
                    <div className="blog-detail-section">
                      <h2>Our Pediatric Services Include:</h2>
                      <ul className="blog-detail-list">
                        <li><Check size={20} /> <strong>Newborn & Infant Care</strong> – Monitoring feeding, weight gain, early development and safe parenting guidance</li>
                        <li><Check size={20} /> <strong>Childhood Illness Management</strong> – Treatment for fever, cough, infections, allergies and asthma</li>
                        <li><Check size={20} /> <strong>Growth & Development Tracking</strong> – Regular monitoring of milestones and early identification of delays</li>
                        <li><Check size={20} /> <strong>Vaccination & Immunisation</strong> – Planned vaccinations with counselling on benefits and post-vaccination care</li>
                        <li><Check size={20} /> <strong>Long-term Chronic Care</strong> – Ongoing management for asthma, allergies and nutrition guidance</li>
                      </ul>
                    </div>
                    
                    <div className="blog-detail-highlight">
                      <strong>Why This Matters:</strong> When searching for a child specialist doctor in Athani, families want someone clinically strong, approachable and child-friendly. Our pediatric services focus on building trust with both children and parents through clear communication and gentle care.
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                      <p style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Ready to consult with our specialist?</p>
                      <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ width: '100%' }}>
                        <Calendar size={18} /> Book Your Pediatric Appointment Now
                      </button>
                      <p style={{ fontSize: '12px', marginTop: '10px', color: 'var(--text-secondary)' }}>Or view <a onClick={() => handleTabClick('services')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>complete pediatric services</a></p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBlog === 'gynecology' && (
                <div className="blog-detail-container">
                  <img src={gynaecologyBlogImg} alt="Gynecology Blog" className="blog-detail-image" />
                  <div className="blog-detail-content">
                    <h2 className="blog-detail-title">Consultant Obstetrician & Gynaecologist – Women's Health</h2>
                    <p className="blog-detail-category">Women's Health & Safe Motherhood</p>
                    
                    <p className="blog-detail-intro">
                      An Obstetrician & Gynaecologist (OB-GYN) specializes in pregnancy, childbirth and the female reproductive system. Obstetrics focuses on pregnancy and delivery, while gynaecology addresses women's reproductive health across all life stages.
                    </p>
                    
                    <div className="blog-detail-section">
                      <h2>Our Obstetric & Gynaecology Services Include:</h2>
                      <ul className="blog-detail-list">
                        <li><Check size={20} /> <strong>Pre-conception Counselling</strong> – Health check-ups and guidance for couples planning pregnancy</li>
                        <li><Check size={20} /> <strong>Antenatal Care</strong> – Regular pregnancy check-ups, monitoring of mother and baby, high-risk pregnancy management</li>
                        <li><Check size={20} /> <strong>Delivery & Childbirth</strong> – Normal delivery, assisted delivery and caesarean care with continuous monitoring</li>
                        <li><Check size={20} /> <strong>Postnatal Support</strong> – Post-delivery care, breastfeeding guidance and emotional support</li>
                        <li><Check size={20} /> <strong>Gynaecology Services</strong> – Treatment for menstrual disorders, PCOS, fibroids, infections and menopausal symptoms</li>
                      </ul>
                    </div>
                    
                    <div className="blog-detail-highlight">
                      <strong>Why This Matters:</strong> Women seeking a lady doctor for pregnancy in Athani want someone who understands their concerns, respects their privacy and explains every step clearly. Our specialist provides calm, respectful and confidential care.
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                      <p style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Ready to book a consultation?</p>
                      <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ width: '100%' }}>
                        <Calendar size={18} /> Schedule Your Gynecology Appointment
                      </button>
                      <p style={{ fontSize: '12px', marginTop: '10px', color: 'var(--text-secondary)' }}>Or explore <a onClick={() => handleTabClick('services')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>women's health services</a></p>
                    </div>
                  </div>
                </div>
              )}

              {selectedBlog === 'generalmedicine' && (
                <div className="blog-detail-container">
                  <img src={generalMedicineBlogImg} alt="General Medicine Blog" className="blog-detail-image" />
                  <div className="blog-detail-content">
                    <h2 className="blog-detail-title">Consultant Physician (General Medicine) – Adult Health</h2>
                    <p className="blog-detail-category">Adult Medicine & Chronic Disease Management</p>
                    
                    <p className="blog-detail-intro">
                      A Consultant Physician in General Medicine is trained to diagnose and treat a wide range of medical problems in adults, from acute infections to complex long-term conditions, often acting as the central coordinator of care for patients with multiple health issues.
                    </p>
                    
                    <div className="blog-detail-section">
                      <h2>Our General Medicine Services Include:</h2>
                      <ul className="blog-detail-list">
                        <li><Check size={20} /> <strong>Acute Medical Assessment</strong> – Detailed evaluation for fever, infections, chest pain, breathlessness and unexplained symptoms</li>
                        <li><Check size={20} /> <strong>Chronic Disease Management</strong> – Diagnosis and long-term care for diabetes, hypertension, thyroid disorders and lipid problems</li>
                        <li><Check size={20} /> <strong>Lifestyle & Prevention</strong> – Counselling on diet, exercise, weight management and smoking cessation</li>
                        <li><Check size={20} /> <strong>Preventive Health Check-ups</strong> – Full body check-ups for people with family history of heart disease or chronic illness</li>
                        <li><Check size={20} /> <strong>Long-term Follow-up</strong> – Individualized care plans and coordination of investigations for multiple conditions</li>
                      </ul>
                    </div>
                    
                    <div className="blog-detail-highlight">
                      <strong>Why This Matters:</strong> When searching for a general physician in Athani, patients want a doctor who listens carefully, investigates thoroughly and gives practical advice for daily life. Our services provide clear diagnosis and realistic treatment plans.
                    </div>

                    <div style={{ marginTop: '30px', padding: '20px', background: 'rgba(13, 148, 136, 0.08)', borderRadius: '10px', textAlign: 'center' }}>
                      <p style={{ marginBottom: '15px', color: 'var(--text-primary)' }}>Schedule a consultation today</p>
                      <button className="btn-primary" onClick={() => handleTabClick('appointments')} style={{ width: '100%' }}>
                        <Calendar size={18} /> Book Your General Medicine Appointment
                      </button>
                      <p style={{ fontSize: '12px', marginTop: '10px', color: 'var(--text-secondary)' }}>Or check out <a onClick={() => handleTabClick('services')} style={{color: 'var(--primary)', textDecoration: 'underline', cursor: 'pointer', fontWeight: '600'}}>general medicine services</a></p>
                    </div>
                  </div>
                </div>
              )}
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
              <a href="https://maps.app.goo.gl/hfGWmpGxnsXyKXVGA" target="_blank" rel="noopener noreferrer" title="Open Hospital Location in Google Maps"><MapPin size={18} /></a>
              <a href="tel:9482384887" title="Call Hospital"><Phone size={18} /></a>
              <a href="mailto:hospitalgunjigavi@gmail.com" title="Email Hospital"><Mail size={18} /></a>
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
              <li><a onClick={() => handleTabClick('services')}>General Medicine</a></li>
              <li><a onClick={() => handleTabClick('services')}>Pediatric Clinic</a></li>
              <li><a onClick={() => handleTabClick('services')}>Obstetrics Care</a></li>
              <li><a onClick={() => handleTabClick('insurance')}>Insurance  | Schemes</a></li>
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
                <span>Help: 9482384887 / 9482384887</span>
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
          <span>Designed By  <a href="https://www.damadigitalanalytics.com/" target="_blank" rel="noopener noreferrer" style={{color:'white'}}>DAMA Digital Analytics</a></span>
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

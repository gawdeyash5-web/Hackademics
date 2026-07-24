import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Shield, 
  Clock, 
  Compass, 
  Users, 
  ChevronRight, 
  ArrowLeft, 
  Plus, 
  Minus, 
  Info,
  Waves,
  Gauge
} from 'lucide-react';
import './App.css';

// Predefined expedition packages based on prompt specs
const expeditionsData = {
  explorer: {
    id: 'explorer',
    name: 'Explorer',
    price: 2499,
    depth: '3,000 meters',
    duration: '12 Hours',
    boardingTime: '09:30 AM',
    capacity: '6 Explorer seats',
    date: '22 JULY 2026',
    submarine: 'TRITON-3',
    seat: '12B',
    terminal: 'A',
    bookingId: 'ABYSS-260722-12B',
    desc: 'A 12-hour dive designed to witness bioluminescent wonders and explore hydrothermal vents in the Twilight Zone.'
  },
  research: {
    id: 'research',
    name: 'Research',
    price: 4999,
    depth: '6,500 meters',
    duration: '48 Hours',
    boardingTime: '09:30 AM',
    capacity: '4 Specialist seats',
    date: '22 JULY 2026',
    submarine: 'NEREID-7',
    seat: '06A',
    terminal: 'A',
    bookingId: 'ABYSS-260722-06A',
    desc: 'A 48-hour scientific mission focused on biological observation and deep-sea core sampling in the Midnight Zone.'
  },
  vip: {
    id: 'vip',
    name: 'VIP Dive',
    price: 7999,
    depth: '10,994 meters',
    duration: '7 Days',
    boardingTime: '09:30 AM',
    capacity: '2 Private seats',
    date: '22 JULY 2026',
    submarine: 'DEEPSEA-1',
    seat: '01S',
    terminal: 'A',
    bookingId: 'ABYSS-260722-01S',
    desc: 'A 7-day bespoke private expedition descending to Challenger Deep. Ultimate luxury and customized mission routing.'
  }
};

function App() {
  const [page, setPage] = useState('landing'); // 'landing' (Page 1) or 'booking' (Page 2)
  const [selectedPackage, setSelectedPackage] = useState('research');
  const [passengers, setPassengers] = useState(2);
  const [passengerName, setPassengerName] = useState('Guest');
  
  // Timer countdown: 2 minutes 47 seconds = 167 seconds
  const [secondsLeft, setSecondsLeft] = useState(167);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 167));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  // Calculations
  const currentExpedition = expeditionsData[selectedPackage];
  const pricePerPerson = currentExpedition.price;
  const subtotal = pricePerPerson * passengers;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;

  // Format currency
  const formatINR = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  // Generate particle positions for background animation
  const [bgParticles] = useState(() => 
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 6 + 3}px`,
      delay: `${Math.random() * 15}s`,
      duration: `${Math.random() * 20 + 15}s`
    }))
  );

  return (
    <>
      {/* Background Layer with Submarine & Gradients */}
      <div className="abyss-background" />

      {/* Floating particles wrapper */}
      <div className="particles-container">
        {bgParticles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      <div className="app-container">
        {/* Header & Nav */}
        <header className="app-header">
          <div className="logo-section" onClick={() => setPage('landing')}>
            <h1 className="logo-title">ABYSS</h1>
            <p className="logo-subtitle">DEEP OCEAN EXPEDITION</p>
          </div>

          {page === 'landing' ? (
            <>
              <ul className="nav-menu">
                <li><a href="#expedition" className="nav-link active">Expedition</a></li>
                <li><a href="#about" className="nav-link">About</a></li>
                <li><a href="#safety" className="nav-link">Safety</a></li>
                <li><a href="#contact" className="nav-link">Contact</a></li>
              </ul>

              <div className="header-widget">
                <div className="widget-label">BOARDING AT TERMINAL A</div>
                <div className="widget-value">{formatTime(secondsLeft)}</div>
              </div>
            </>
          ) : (
            <div className="header-widget">
              <div className="widget-label" style={{ letterSpacing: '0.2rem' }}>PAGE 02 / 02</div>
            </div>
          )}
        </header>

        {/* View Swapper */}
        {page === 'landing' ? (
          /* PAGE 1: LANDING & OVERVIEW */
          <main className="page-fade-in">
            <div className="hero-grid">
              {/* Left Column: Hero Text */}
              <div className="hero-content">
                <p className="hero-subtitle">Deep Ocean Exploration Program</p>
                <h2 className="hero-title">
                  <span>Beyond the Surface,</span>
                  <span className="glow">Discover the Unknown.</span>
                </h2>
                <div className="hero-divider" />
                <p className="hero-desc">
                  Join a specialized scientific deployment descending to the bottom of the planet. 
                  Experience zero solar penetration, bioluminescent life forms, and the majesty 
                  of the deep oceanic trenches.
                </p>
              </div>

              {/* Center Column: Expedition Overview Card */}
              <div className="glass-card overview-card">
                <h3 className="card-header-accent">EXPEDITION OVERVIEW</h3>
                <div className="overview-grid">
                  <div className="overview-item">
                    <span className="overview-label">Destination</span>
                    <span className="overview-val">Mariana Trench</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Maximum Depth</span>
                    <span className="overview-val">{currentExpedition.depth}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Duration</span>
                    <span className="overview-val">{currentExpedition.duration}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Boarding Time</span>
                    <span className="overview-val">{currentExpedition.boardingTime}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Maximum Capacity</span>
                    <span className="overview-val">{currentExpedition.capacity}</span>
                  </div>
                  <div className="overview-item">
                    <span className="overview-label">Expedition Date</span>
                    <span className="overview-val">{currentExpedition.date}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Cards: Info Blocks */}
            <div className="bottom-info-section">
              <div className="glass-card">
                <h4 className="bottom-card-title">
                  <Waves size={20} />
                  ABOUT THIS EXPEDITION
                </h4>
                <p className="bottom-card-text">
                  Our deep submergence vehicle descends through five distinct ocean layers: the Twilight, 
                  Midnight, Abyssal, and Hadal zones. As sunlight fades, you will witness spectacular 
                  bioluminescent adaptation. The mission navigates through hydrothermal venting sites, 
                  where volcanic heat supports bizarre ecosystems completely independent of the sun.
                </p>
              </div>

              <div className="glass-card">
                <h4 className="bottom-card-title">
                  <Shield size={20} />
                  SAFETY & COMFORT
                </h4>
                <p className="bottom-card-text">
                  The expedition utilizes a state-of-the-art grade-5 titanium pressure hull engineered 
                  to withstand pressures exceeding 1,000 atmospheres. Redundant, closed-loop life support 
                  systems supply pure breathable air for up to 96 hours. Led by experienced abyssal commanders 
                  and research scientists, the voyage provides ergonomic heated seating and optical viewports.
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="cta-container">
              <button className="btn-primary" onClick={() => setPage('booking')}>
                Continue to Booking
                <ChevronRight size={18} />
              </button>
            </div>
            
            <p className="page-indicator-text">01 / 02</p>
          </main>
        ) : (
          /* PAGE 2: BOOKING & CHECKOUT */
          <main className="page-fade-in">
            {/* Back Button */}
            <button className="back-btn" onClick={() => setPage('landing')}>
              <ArrowLeft size={16} />
              Back to Overview
            </button>

            <div className="booking-layout">
              {/* Premium Boarding Pass (Focal Element) */}
              <div className="boarding-pass-ticket">
                <div className="stub-cut-right" />
                <div className="boarding-pass-inner">
                  {/* Main Pass Data */}
                  <div className="ticket-main">
                    <div className="ticket-header">
                      <div className="ticket-title-group">
                        <h4 className="ticket-main-title">BOARDING PASS</h4>
                        <p className="ticket-sub-title">ABYSS DEEP-OCEAN COMMAND</p>
                      </div>
                      <div className="ticket-serial">
                        {currentExpedition.bookingId}
                      </div>
                    </div>

                    <div className="ticket-grid">
                      <div className="ticket-grid-item">
                        <span className="ticket-label">Passenger</span>
                        <span className="ticket-value">{passengerName || 'Guest'}</span>
                      </div>
                      <div className="ticket-grid-item">
                        <span className="ticket-label">Terminal</span>
                        <span className="ticket-value">{currentExpedition.terminal}</span>
                      </div>
                      <div className="ticket-grid-item">
                        <span className="ticket-label">Seat</span>
                        <span className="ticket-value">{currentExpedition.seat}</span>
                      </div>

                      <div className="ticket-grid-item">
                        <span className="ticket-label">Submarine</span>
                        <span className="ticket-value">{currentExpedition.submarine}</span>
                      </div>
                      <div className="ticket-grid-item">
                        <span className="ticket-label">Boarding Time</span>
                        <span className="ticket-value">{currentExpedition.boardingTime}</span>
                      </div>
                      <div className="ticket-grid-item">
                        <span className="ticket-label">Date</span>
                        <span className="ticket-value">{currentExpedition.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stamp and QR Code stub */}
                  <div className="ticket-right">
                    {/* Simulated Circular Ink Stamp */}
                    <div className="ticket-stamp">
                      <span className="ticket-stamp-text">ABYSS EXPEDITIONS</span>
                      <Anchor size={14} className="ticket-stamp-center" />
                      <span className="ticket-stamp-text">JULY 2026</span>
                    </div>

                    {/* QR Code representation */}
                    <div className="ticket-qrcode">
                      <svg viewBox="0 0 100 100" fill="currentColor">
                        <rect x="0" y="0" width="30" height="30" />
                        <rect x="3" y="3" width="24" height="24" fill="#e1d2b5" />
                        <rect x="8" y="8" width="14" height="14" />
                        
                        <rect x="70" y="0" width="30" height="30" />
                        <rect x="73" y="3" width="24" height="24" fill="#e1d2b5" />
                        <rect x="78" y="8" width="14" height="14" />

                        <rect x="0" y="70" width="30" height="30" />
                        <rect x="3" y="73" width="24" height="24" fill="#e1d2b5" />
                        <rect x="8" y="78" width="14" height="14" />
                        
                        <rect x="40" y="5" width="8" height="8" />
                        <rect x="52" y="10" width="12" height="6" />
                        <rect x="45" y="22" width="10" height="10" />
                        
                        <rect x="10" y="45" width="15" height="5" />
                        <rect x="25" y="38" width="6" height="12" />
                        
                        <rect x="85" y="45" width="10" height="8" />
                        <rect x="72" y="55" width="8" height="12" />
                        
                        <rect x="42" y="72" width="12" height="12" />
                        <rect x="58" y="82" width="8" height="8" />
                        <rect x="80" y="80" width="12" height="12" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Name Entry Field */}
              <div className="glass-card summary-card" style={{ padding: '1.2rem 1.8rem' }}>
                <div className="passenger-input-group">
                  <label className="passenger-input-label">PASSENGER NAME</label>
                  <input 
                    type="text" 
                    className="passenger-name-input"
                    value={passengerName}
                    onChange={(e) => setPassengerName(e.target.value)}
                    placeholder="Enter name for boarding pass..."
                    maxLength={18}
                  />
                </div>
              </div>

              {/* Expedition Selection options */}
              <div className="selection-container">
                <h3 className="selection-title">CHOOSE YOUR EXPEDITION</h3>
                <div className="option-card-row">
                  {Object.values(expeditionsData).map((pkg) => (
                    <div 
                      key={pkg.id} 
                      className={`option-card ${selectedPackage === pkg.id ? 'selected' : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <div className="option-card-left">
                        <div className="option-radio">
                          <div className="option-radio-dot" />
                        </div>
                        <div className="option-meta">
                          <span className="option-name">{pkg.name}</span>
                          <span className="option-desc">{pkg.desc}</span>
                        </div>
                      </div>
                      <div className="option-card-right">
                        <span className="option-price">{formatINR(pkg.price)}</span>
                        <span className="option-unit">/ per seat</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost Summary Card */}
              <div className="glass-card summary-card">
                <h3 className="summary-title">COST SUMMARY</h3>
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Selected Expedition</span>
                    <span className="summary-row-bold">{currentExpedition.name}</span>
                  </div>

                  <div className="summary-row">
                    <span>Number of Passengers</span>
                    <div className="passenger-widget">
                      <button 
                        className="passenger-btn" 
                        disabled={passengers <= 1}
                        onClick={() => setPassengers(passengers - 1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span className="passenger-count">{passengers}</span>
                      <button 
                        className="passenger-btn" 
                        disabled={passengers >= 6}
                        onClick={() => setPassengers(passengers + 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="summary-row">
                    <span>Price per Person</span>
                    <span className="summary-row-bold">{formatINR(pricePerPerson)}</span>
                  </div>

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{formatINR(pricePerPerson)} × {passengers}</span>
                  </div>

                  <div className="summary-row">
                    <span>GST (18%)</span>
                    <span>{formatINR(gst)}</span>
                  </div>

                  <div className="summary-divider" />

                  <div className="summary-row summary-row-total">
                    <span>Total Amount</span>
                    <span className="summary-total-price">{formatINR(totalAmount)}</span>
                  </div>
                </div>
              </div>

              {/* Final Booking confirmation CTA */}
              <div className="cta-container">
                <button 
                  className="btn-primary" 
                  onClick={() => alert(`Booking Confirmed! Code: ${currentExpedition.bookingId}. Welcome aboard the ${currentExpedition.submarine}, Passenger ${passengerName || 'Guest'}.`)}
                >
                  Confirm & Book
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <p className="page-indicator-text" style={{ marginTop: '0' }}>02 / 02</p>
          </main>
        )}
      </div>
    </>
  );
}

export default App;

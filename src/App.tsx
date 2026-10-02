import { useEffect, useState } from 'react';
import './App.css';
import JulLinkedIn from './components/JulLinkedIn';
import JulGA from './components/JulGA';
import JulAugReport from './components/JulAugReport';
import JunLinkedIn from './components/JunLinkedIn';
import JunGA from './components/JunGA';
import MarLinkedIn from './components/MarLinkedIn';
import MarGA from './components/MarGA';
import MarMOM from './components/MarMOM';
import SEOReport from './components/SEOReport';
import FebLinkedIn from './components/FebLinkedIn';
import FebGA from './components/FebGA';
import FebMOM from './components/FebMOM';
import JanLinkedIn from './components/JanLinkedIn';
import JanGA from './components/JanGA';
import DecLinkedIn from './components/DecLinkedIn';
import DecGA from './components/DecGA';

function App() {
  const [activeTab, setActiveTab] = useState('reports');
  const [julAugPeriodOpen, setJulAugPeriodOpen] = useState(true);
  const [julPeriodOpen, setJulPeriodOpen] = useState(false);
  const [julLinkedinOpen, setJulLinkedinOpen] = useState(false);
  const [julGAOpen, setJulGAOpen] = useState(false);
  const [junPeriodOpen, setJunPeriodOpen] = useState(false);
  const [junLinkedinOpen, setJunLinkedinOpen] = useState(false);
  const [junGAOpen, setJunGAOpen] = useState(false);

  const [marPeriodOpen, setMarPeriodOpen] = useState(false);
  const [marLinkedinOpen, setMarLinkedinOpen] = useState(false);
  const [marGAOpen, setMarGAOpen] = useState(false);
  const [marMOMOpen, setMarMOMOpen] = useState(false);
  const [febPeriodOpen, setFebPeriodOpen] = useState(false);
  const [febLinkedinOpen, setFebLinkedinOpen] = useState(false);
  const [febGAOpen, setFebGAOpen] = useState(false);
  const [febMOMOpen, setFebMOMOpen] = useState(false);
  const [janPeriodOpen, setJanPeriodOpen] = useState(false);
  const [janLinkedinOpen, setJanLinkedinOpen] = useState(false);
  const [janGAOpen, setJanGAOpen] = useState(false);
  const [decPeriodOpen, setDecPeriodOpen] = useState(false);
  const [decLinkedinOpen, setDecLinkedinOpen] = useState(false);
  const [decGAOpen, setDecGAOpen] = useState(false);
  const [websiteStructureOpen, setWebsiteStructureOpen] = useState(false);

  useEffect(() => {
    const statNumbers = document.querySelectorAll('[data-counter]');

    const animateCounter = (element: Element) => {
      const target = parseInt(element.getAttribute('data-counter') || '0');
      const duration = 2000;
      const increment = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          element.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString();
        }
      };

      updateCounter();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.getAttribute('data-animated') !== 'true') {
            entry.target.setAttribute('data-animated', 'true');
            animateCounter(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => observer.observe(stat));

    return () => observer.disconnect();
  }, [activeTab, julAugPeriodOpen, julPeriodOpen, julLinkedinOpen, julGAOpen, junPeriodOpen, junLinkedinOpen, junGAOpen, marPeriodOpen, marLinkedinOpen, marGAOpen, marMOMOpen, febPeriodOpen, febLinkedinOpen, febGAOpen, febMOMOpen, janPeriodOpen, janLinkedinOpen, janGAOpen, decPeriodOpen, decLinkedinOpen, decGAOpen, websiteStructureOpen]);

  return (
    <div className="dashboard">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <div className="logo-placeholder">N</div>
            <div className="company-name">
              Nadkarni Specialty Polymers & Coatings - Analytics Dashboard
            </div>
          </div>
          <div className="period-label">Latest Report: Jul 15, 2026 – Aug 14, 2026</div>
        </div>
      </header>

      <section className="hero">
        <h1>NSPC - Analytics & Strategy Dashboard</h1>
      </section>

      <div className="tabs-container">
        <div className="tabs-header">
          <button
            className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            LinkedIn & GA Reports
          </button>
          <button
            className={`tab-button ${activeTab === 'seo' ? 'active' : ''}`}
            onClick={() => setActiveTab('seo')}
          >
            SEO Topical Authority & Structure
          </button>
          <button
            className={`tab-button ${activeTab === 'website' ? 'active' : ''}`}
            onClick={() => setActiveTab('website')}
          >
            Website Structure
          </button>
          <button
            className={`tab-button ${activeTab === 'seoactivity' ? 'active' : ''}`}
            onClick={() => setActiveTab('seoactivity')}
          >
            SEO Activity Report
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'reports' && (
            <div className="container">

              {/* ── Jul 15 – Aug 14, 2026 Period (Latest) ── */}
              <div className="period-accordion">
                <button
                  className={`period-accordion-header ${julAugPeriodOpen ? 'active' : ''}`}
                  onClick={() => setJulAugPeriodOpen(!julAugPeriodOpen)}
                >
                  <span className="period-title">Jul–Aug 2026</span>
                  <span className="period-badge">Latest</span>
                  <span className="accordion-icon">{julAugPeriodOpen ? '−' : '+'}</span>
                </button>
                {julAugPeriodOpen && <JulAugReport />}
              </div>

              {/* ── Jun 15 – Jul 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${julPeriodOpen ? 'active' : ''}`}
                  onClick={() => setJulPeriodOpen(!julPeriodOpen)}
                >
                  <span className="period-title">Jun 15, 2026 – Jul 14, 2026</span>
                  <span className="accordion-icon">{julPeriodOpen ? '−' : '+'}</span>
                </button>

                {julPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${julLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setJulLinkedinOpen(!julLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{julLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {julLinkedinOpen && <JulLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${julGAOpen ? 'active' : ''}`}
                        onClick={() => setJulGAOpen(!julGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{julGAOpen ? '−' : '+'}</span>
                      </button>
                      {julGAOpen && <JulGA />}
                    </div>

                  </div>
                )}
              </div>

              {/* ── May 15 – Jun 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${junPeriodOpen ? 'active' : ''}`}
                  onClick={() => setJunPeriodOpen(!junPeriodOpen)}
                >
                  <span className="period-title">May 15, 2026 – Jun 14, 2026</span>
                  <span className="accordion-icon">{junPeriodOpen ? '−' : '+'}</span>
                </button>

                {junPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${junLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setJunLinkedinOpen(!junLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{junLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {junLinkedinOpen && <JunLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${junGAOpen ? 'active' : ''}`}
                        onClick={() => setJunGAOpen(!junGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{junGAOpen ? '−' : '+'}</span>
                      </button>
                      {junGAOpen && <JunGA />}
                    </div>

                  </div>
                )}
              </div>

              {/* ── Mar 15 – May 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${marPeriodOpen ? 'active' : ''}`}
                  onClick={() => setMarPeriodOpen(!marPeriodOpen)}
                >
                  <span className="period-title">Mar 15, 2026 – May 14, 2026</span>
                  <span className="accordion-icon">{marPeriodOpen ? '−' : '+'}</span>
                </button>

                {marPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${marLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setMarLinkedinOpen(!marLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{marLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {marLinkedinOpen && <MarLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${marGAOpen ? 'active' : ''}`}
                        onClick={() => setMarGAOpen(!marGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{marGAOpen ? '−' : '+'}</span>
                      </button>
                      {marGAOpen && <MarGA />}
                    </div>

                    {/* Minutes of the Meeting sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${marMOMOpen ? 'active' : ''}`}
                        onClick={() => setMarMOMOpen(!marMOMOpen)}
                      >
                        <span className="sub-accordion-icon mom-icon">MOM</span>
                        <span>Minutes of the Meeting</span>
                        <span className="accordion-icon">{marMOMOpen ? '−' : '+'}</span>
                      </button>
                      {marMOMOpen && <MarMOM />}
                    </div>

                  </div>
                )}
              </div>

              {/* ── Feb 15 – Mar 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${febPeriodOpen ? 'active' : ''}`}
                  onClick={() => setFebPeriodOpen(!febPeriodOpen)}
                >
                  <span className="period-title">Feb 15, 2026 – Mar 14, 2026</span>
                  <span className="accordion-icon">{febPeriodOpen ? '−' : '+'}</span>
                </button>

                {febPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${febLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setFebLinkedinOpen(!febLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{febLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {febLinkedinOpen && <FebLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${febGAOpen ? 'active' : ''}`}
                        onClick={() => setFebGAOpen(!febGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{febGAOpen ? '−' : '+'}</span>
                      </button>
                      {febGAOpen && <FebGA />}
                    </div>

                    {/* Minutes of the Meeting sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${febMOMOpen ? 'active' : ''}`}
                        onClick={() => setFebMOMOpen(!febMOMOpen)}
                      >
                        <span className="sub-accordion-icon mom-icon">MOM</span>
                        <span>Minutes of the Meeting</span>
                        <span className="accordion-icon">{febMOMOpen ? '−' : '+'}</span>
                      </button>
                      {febMOMOpen && <FebMOM />}
                    </div>

                  </div>
                )}
              </div>

              {/* ── Jan 15 – Feb 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${janPeriodOpen ? 'active' : ''}`}
                  onClick={() => setJanPeriodOpen(!janPeriodOpen)}
                >
                  <span className="period-title">Jan 15, 2026 – Feb 14, 2026</span>
                  <span className="accordion-icon">{janPeriodOpen ? '−' : '+'}</span>
                </button>

                {janPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${janLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setJanLinkedinOpen(!janLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{janLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {janLinkedinOpen && <JanLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${janGAOpen ? 'active' : ''}`}
                        onClick={() => setJanGAOpen(!janGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{janGAOpen ? '−' : '+'}</span>
                      </button>
                      {janGAOpen && <JanGA />}
                    </div>

                  </div>
                )}
              </div>

              {/* ── Dec 15, 2025 – Jan 14, 2026 Period ── */}
              <div className="period-accordion" style={{ marginTop: '1.5rem' }}>
                <button
                  className={`period-accordion-header ${decPeriodOpen ? 'active' : ''}`}
                  onClick={() => setDecPeriodOpen(!decPeriodOpen)}
                >
                  <span className="period-title">Dec 15, 2025 – Jan 14, 2026</span>
                  <span className="accordion-icon">{decPeriodOpen ? '−' : '+'}</span>
                </button>

                {decPeriodOpen && (
                  <div className="period-accordion-content">

                    {/* LinkedIn sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${decLinkedinOpen ? 'active' : ''}`}
                        onClick={() => setDecLinkedinOpen(!decLinkedinOpen)}
                      >
                        <span className="sub-accordion-icon linkedin-icon">in</span>
                        <span>LinkedIn</span>
                        <span className="accordion-icon">{decLinkedinOpen ? '−' : '+'}</span>
                      </button>
                      {decLinkedinOpen && <DecLinkedIn />}
                    </div>

                    {/* Google Analytics sub-accordion */}
                    <div className="sub-accordion">
                      <button
                        className={`sub-accordion-header ${decGAOpen ? 'active' : ''}`}
                        onClick={() => setDecGAOpen(!decGAOpen)}
                      >
                        <span className="sub-accordion-icon ga-icon">G</span>
                        <span>Google Analytics</span>
                        <span className="accordion-icon">{decGAOpen ? '−' : '+'}</span>
                      </button>
                      {decGAOpen && <DecGA />}
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {activeTab === 'seo' && (
            <div className="container">
              <section className="section">
                <h2>SEO Topical Authority & Structure – NSPC</h2>
                <p className="intro-text">
                  This section documents NSPC's complete SEO authority strategy built around epoxy chemistry, CNSL technology, bio-based coatings, curing agents, and industrial & marine applications. This is the master SEO architecture from which all blogs, product pages, landing pages, and internal links flow.
                </p>

                <div className="stats-grid" style={{ marginTop: '2rem' }}>
                  <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-label">Objective</div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Establish NSPC as THE authority on CNSL-based phenalkamine chemistry</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🧠</div>
                    <div className="stat-label">Strategy</div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Deep expertise in specific topics rather than broad superficial coverage</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🏗</div>
                    <div className="stat-label">Structure</div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Hub-and-spoke model with pillar pages and supporting content</p>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">🔗</div>
                    <div className="stat-label">Internal Linking</div>
                    <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Strategic authority flow from blogs to money pages</p>
                  </div>
                </div>
              </section>

              <div className="section-divider"></div>

              <section className="section">
                <h3>NSPC SEO Topical Authority Model</h3>
                <p>
                  NSPC's SEO strategy follows a hub-and-spoke model where core topics sit at the center, with sub-topics branching outward and supporting articles beneath each sub-topic.
                </p>

                <div className="content-box">
                  <h4>Model Structure</h4>
                  <ul>
                    <li><strong>Core Topics:</strong> Central authority hubs (CNSL Technology, Phenalkamine Chemistry, etc.)</li>
                    <li><strong>Pillar Pages:</strong> Comprehensive 2,500-4,000 word guides on each core topic</li>
                    <li><strong>Supporting Content:</strong> 1,200-2,000 word deep-dive articles supporting pillar hubs</li>
                    <li><strong>Transactional Pages:</strong> Product pages optimized for commercial keywords</li>
                    <li><strong>Informational Pages:</strong> Educational content targeting research-phase users</li>
                  </ul>
                </div>

                <div className="content-box" style={{ marginTop: '1.5rem', background: '#f8f9fa' }}>
                  <h4>Authority Flow</h4>
                  <p style={{ margin: 0 }}>
                    Educational Blogs → Category Pages → Product Pages → TDS / Inquiry CTAs
                  </p>
                </div>
              </section>

              <div className="section-divider"></div>

              <section className="section">
                <h3>All Target Keywords</h3>
                <p style={{ marginBottom: '1.5rem' }}>Complete list of keywords targeted across all content pillars and phases.</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span className="keyword-chip">Phenalkamines</span>
                  <span className="keyword-chip">Epoxy Curing Agents</span>
                  <span className="keyword-chip">Epoxy Hardeners</span>
                  <span className="keyword-chip">Phenalkamides</span>
                  <span className="keyword-chip">Air drying epoxy</span>
                  <span className="keyword-chip">Single pack epoxy</span>
                  <span className="keyword-chip">1K epoxy</span>
                  <span className="keyword-chip">Biobased epoxy</span>
                  <span className="keyword-chip">Eco-friendly epoxy</span>
                  <span className="keyword-chip">Epoxy supplier</span>
                  <span className="keyword-chip">Epoxy resins supplier India</span>
                  <span className="keyword-chip">Epoxy resins manufacturer India</span>
                  <span className="keyword-chip">Epoxy curing agent supplier India</span>
                  <span className="keyword-chip">Epoxy curing agent manufacturer India</span>
                  <span className="keyword-chip">Epoxy hardener supplier India</span>
                  <span className="keyword-chip">Epoxy hardener manufacturer India</span>
                  <span className="keyword-chip">Epoxy hardener India</span>
                  <span className="keyword-chip">CNSL Technology</span>
                  <span className="keyword-chip">CNSL epoxy hardener</span>
                  <span className="keyword-chip">CNSL curing agent</span>
                  <span className="keyword-chip">Anti-corrosive coatings</span>
                  <span className="keyword-chip">Marine coatings</span>
                  <span className="keyword-chip">Marine primer</span>
                  <span className="keyword-chip">Floor coatings</span>
                  <span className="keyword-chip">High build coatings</span>
                  <span className="keyword-chip">High solids coatings</span>
                  <span className="keyword-chip">Biobased coatings</span>
                  <span className="keyword-chip">Solvent free resins</span>
                  <span className="keyword-chip">Sustainable paints</span>
                  <span className="keyword-chip">Sustainable coatings</span>
                  <span className="keyword-chip">Epoxy Catalyst</span>
                  <span className="keyword-chip">Low temperature epoxy</span>
                </div>
              </section>

              <div className="section-divider"></div>

              <section className="section">
                <h3>Five Core Authority Pillars</h3>
                <p style={{ marginBottom: '2rem' }}>
                  NSPC's topical authority is built on five core pillars, each representing a major expertise area with comprehensive content coverage.
                </p>

                <div className="content-box">
                  <h4>Pillar 1: Epoxy Curing Agents & Hardeners</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Primary Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="keyword-chip">Phenalkamines</span>
                      <span className="keyword-chip">Phenalkamides</span>
                      <span className="keyword-chip">Epoxy curing agents</span>
                      <span className="keyword-chip">Epoxy hardeners</span>
                      <span className="keyword-chip">Epoxy catalyst</span>
                      <span className="keyword-chip">Low temperature epoxy</span>
                    </div>
                  </div>
                </div>

                <div className="content-box" style={{ marginTop: '2rem' }}>
                  <h4>Pillar 2: Single Pack & Air-Drying Epoxy Systems</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Primary Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="keyword-chip">Air drying epoxy</span>
                      <span className="keyword-chip">Single pack epoxy</span>
                      <span className="keyword-chip">1K epoxy</span>
                    </div>
                  </div>
                </div>

                <div className="content-box" style={{ marginTop: '2rem' }}>
                  <h4>Pillar 3: Bio-Based & Sustainable Epoxy Technology</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Primary Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="keyword-chip">Biobased epoxy</span>
                      <span className="keyword-chip">Eco-friendly epoxy</span>
                      <span className="keyword-chip">CNSL technology</span>
                      <span className="keyword-chip">CNSL epoxy hardener</span>
                      <span className="keyword-chip">CNSL curing agent</span>
                      <span className="keyword-chip">Biobased coatings</span>
                      <span className="keyword-chip">Sustainable paints</span>
                      <span className="keyword-chip">Solvent free resins</span>
                    </div>
                  </div>
                </div>

                <div className="content-box" style={{ marginTop: '2rem' }}>
                  <h4>Pillar 4: Industrial & Protective Coatings Applications</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Primary Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="keyword-chip">Anti-corrosive coatings</span>
                      <span className="keyword-chip">Marine coatings</span>
                      <span className="keyword-chip">Marine primer</span>
                      <span className="keyword-chip">Floor coatings</span>
                      <span className="keyword-chip">High build coatings</span>
                      <span className="keyword-chip">High solids coatings</span>
                    </div>
                  </div>
                </div>

                <div className="content-box" style={{ marginTop: '2rem' }}>
                  <h4>Pillar 5: Supplier & Manufacturer Authority (India Focus)</h4>
                  <div style={{ marginTop: '1rem' }}>
                    <h5 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Primary Keywords</h5>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                      <span className="keyword-chip">Epoxy supplier</span>
                      <span className="keyword-chip">Epoxy resins supplier India</span>
                      <span className="keyword-chip">Epoxy manufacturer India</span>
                      <span className="keyword-chip">Epoxy curing agent supplier India</span>
                      <span className="keyword-chip">Epoxy hardener India</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className="section-divider"></div>

              <section className="section">
                <h3>Content Deployment Phases</h3>
                <p style={{ marginBottom: '2rem' }}>
                  Strategic phased rollout ensures proper foundation before scaling, maximizing SEO impact at each stage.
                </p>

                <div className="content-box">
                  <h4>Phase 1: Foundation (Months 1-2)</h4>
                  <p>Establish broad expertise before tackling supporting content</p>
                </div>

                <div className="content-box" style={{ marginTop: '1.5rem' }}>
                  <h4>Phase 2: Content Depth (Months 3-5)</h4>
                  <p>Build supporting content that reinforces pillar authority</p>
                </div>

                <div className="content-box" style={{ marginTop: '1.5rem' }}>
                  <h4>Phase 3: Application Expansion (Months 6-8)</h4>
                  <p>Target application-specific commercial keywords</p>
                </div>

                <div className="content-box" style={{ marginTop: '1.5rem' }}>
                  <h4>Phase 4: Authority Leadership (Months 9-12)</h4>
                  <p>Establish NSPC as thought leader in bio-based epoxy chemistry</p>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'website' && (
            <div className="container">
              <div className="accordion-section">
                <button
                  className={`accordion-header ${websiteStructureOpen ? 'active' : ''}`}
                  onClick={() => setWebsiteStructureOpen(!websiteStructureOpen)}
                >
                  <h2>Proposed Website Structure</h2>
                  <span className="accordion-icon">{websiteStructureOpen ? '−' : '+'}</span>
                </button>

                {websiteStructureOpen && (
                  <div className="accordion-content">
                    <section className="section">
                      <h3>Website Structure Proposals</h3>
                      <p>
                        Below are two proposed website structures for NSPC, each designed to enhance user
                        experience, improve SEO performance, and drive conversions. Click on the links to
                        explore each proposal.
                      </p>

                      <div className="website-links">
                        <a
                          href="https://nspc-website-layout1.lovable.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-link-card"
                        >
                          <div className="link-icon">
                            <svg
                              className="icon-svg"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4>Proposed Website Structure 1</h4>
                            <p className="link-url">nspc-website-layout1.lovable.app</p>
                          </div>
                          <div className="link-arrow">→</div>
                        </a>

                        <a
                          href="https://nspc-website-layout2.lovable.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="website-link-card"
                        >
                          <div className="link-icon">
                            <svg
                              className="icon-svg"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                              />
                            </svg>
                          </div>
                          <div>
                            <h4>Proposed Website Structure 2</h4>
                            <p className="link-url">nspc-website-layout2.lovable.app</p>
                          </div>
                          <div className="link-arrow">→</div>
                        </a>
                      </div>

                      <div className="content-box" style={{ marginTop: '3rem' }}>
                        <h4>Key Features of Both Proposals</h4>
                        <div className="two-column">
                          <ul>
                            <li>Clean, modern design aligned with NSPC brand</li>
                            <li>Mobile-responsive for all devices</li>
                            <li>Optimized user navigation and information architecture</li>
                            <li>SEO-friendly structure with clear content hierarchy</li>
                          </ul>
                          <ul>
                            <li>Fast loading times and performance optimization</li>
                            <li>Clear call-to-actions for lead generation</li>
                            <li>Integration of technical content and product showcase</li>
                            <li>Professional presentation of NSPC's expertise</li>
                          </ul>
                        </div>
                      </div>

                      <div className="insight-box" style={{ marginTop: '2rem' }}>
                        <h4>Next Steps</h4>
                        <p>
                          Review both proposed structures and provide feedback on design preferences, content
                          organization, and any specific features or modifications needed. We can then refine
                          the chosen structure to perfectly align with NSPC's business objectives and user
                          needs.
                        </p>
                      </div>
                    </section>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'seoactivity' && (
            <div style={{ padding: 0 }}>
              <SEOReport />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

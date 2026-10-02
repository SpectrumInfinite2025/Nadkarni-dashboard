import { useEffect, useRef } from 'react';

function useGAAnimation(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;

          target.querySelectorAll<HTMLElement>('[data-ga-counter]').forEach((node, i) => {
            if (node.dataset.animated === 'true') return;
            node.dataset.animated = 'true';
            const raw = node.dataset.gaCounter || '0';
            const isFloat = raw.includes('.');
            const end = parseFloat(raw);
            const duration = 1000;
            const delay = i * 120;
            setTimeout(() => {
              const start = performance.now();
              const tick = (now: number) => {
                const t = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - t, 3);
                node.textContent = isFloat
                  ? (eased * end).toFixed(1)
                  : Math.floor(eased * end).toLocaleString();
                if (t < 1) requestAnimationFrame(tick);
                else node.textContent = isFloat ? end.toFixed(1) : end.toLocaleString();
              };
              requestAnimationFrame(tick);
            }, delay);
          });

          target.querySelectorAll<HTMLElement>('[data-progress]').forEach((bar, i) => {
            if (bar.dataset.animated === 'true') return;
            bar.dataset.animated = 'true';
            setTimeout(() => {
              bar.style.width = (bar.dataset.progress || '0') + '%';
            }, 300 + i * 80);
          });

          target.querySelectorAll<HTMLElement>('[data-bar-width]').forEach((bar, i) => {
            if (bar.dataset.animated === 'true') return;
            bar.dataset.animated = 'true';
            setTimeout(() => {
              bar.style.width = (bar.dataset.barWidth || '0') + '%';
            }, 400 + i * 80);
          });

          target.querySelectorAll<HTMLElement>('[data-slide-row]').forEach((row, i) => {
            if (row.dataset.animated === 'true') return;
            row.dataset.animated = 'true';
            row.style.opacity = '0';
            row.style.transform = 'translateY(8px)';
            setTimeout(() => {
              row.style.transition = 'opacity 350ms ease, transform 350ms ease';
              row.style.opacity = '1';
              row.style.transform = 'translateY(0)';
            }, 200 + i * 80);
          });

          observer.unobserve(target);
        });
      },
      { threshold: 0.15 }
    );

    el.querySelectorAll<HTMLElement>('[data-ga-section]').forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, [ref]);
}

const CALLOUT: Record<string, { bg: string; border: string }> = {
  red: { bg: '#FFF5F5', border: '#EA4335' },
  green: { bg: '#F0FAF4', border: '#34A853' },
  blue: { bg: '#EBF3FF', border: '#1A73E8' },
  amber: { bg: '#FFFDE7', border: '#F9AB00' },
  purple: { bg: '#F5EEFF', border: '#9C27B0' },
};

function Callout({ color, children }: { color: keyof typeof CALLOUT; children: React.ReactNode }) {
  const c = CALLOUT[color];
  return (
    <div
      style={{
        background: c.bg,
        borderLeft: `4px solid ${c.border}`,
        borderRadius: '0 8px 8px 0',
        padding: '1rem 1.25rem',
        marginTop: '1.25rem',
        fontSize: '0.9rem',
        lineHeight: 1.65,
        color: '#374151',
      }}
    >
      {children}
    </div>
  );
}

function StatBadge({ value, label, change, down }: { value: string; label: string; change: string; down?: boolean }) {
  return (
    <div className="stat-card" style={{ textAlign: 'center' }}>
      <div
        style={{ fontSize: '2rem', fontWeight: 700, color: '#202124', fontFamily: "'Inter', system-ui, sans-serif" }}
        data-ga-counter={value.replace(/[^0-9.]/g, '')}
      >
        0
      </div>
      <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>{label}</div>
      <div
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          color: down ? '#EA4335' : '#34A853',
          marginTop: '0.35rem',
        }}
      >
        {down ? '▼' : '▲'} {change}
      </div>
    </div>
  );
}

export default function FebGA() {
  const rootRef = useRef<HTMLDivElement>(null);
  useGAAnimation(rootRef);

  const sectionStyle: React.CSSProperties = {
    background: '#ffffff',
    border: '1px solid #DADCE0',
    borderRadius: '12px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.10)',
    padding: '1.5rem',
    marginBottom: '1.75rem',
  };

  const sectionHeading = (title: string, sub: string) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#202124', margin: 0 }}>{title}</h3>
      <p style={{ fontSize: '0.82rem', color: '#5F6368', margin: '0.2rem 0 0' }}>{sub}</p>
    </div>
  );

  const tableHeaderStyle: React.CSSProperties = {
    background: '#F1F3F4',
    fontSize: '0.75rem',
    fontWeight: 700,
    color: '#5F6368',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  const th = (label: string, right = false): React.CSSProperties => ({
    padding: '0.55rem 0.75rem',
    textAlign: right ? 'right' : 'left',
    whiteSpace: 'nowrap',
  });

  const td = (right = false, highlight = false): React.CSSProperties => ({
    padding: '0.55rem 0.75rem',
    textAlign: right ? 'right' : 'left',
    fontSize: '0.825rem',
    color: highlight ? '#1A73E8' : '#374151',
    fontWeight: highlight ? 700 : 400,
  });

  return (
    <div ref={rootRef}>
      <div style={{ borderTop: '2px solid #E8EAED', margin: '2.5rem 0 2rem' }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.75rem' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="12" width="4" height="9" rx="1" fill="#E37400" />
          <rect x="10" y="7" width="4" height="14" rx="1" fill="#1A73E8" />
          <rect x="17" y="3" width="4" height="18" rx="1" fill="#34A853" />
        </svg>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#202124', margin: 0 }}>
          Google Analytics — Feb 15 to Mar 14, 2026
        </h2>
      </div>

      <div className="toc-card" style={{ marginBottom: '1.75rem' }}>
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#feb-ga-s1" className="toc-link">Active Users & Traffic Overview</a>
          <a href="#feb-ga-s2" className="toc-link">Clicks & Impressions</a>
          <a href="#feb-ga-s3" className="toc-link">Search Console Performance</a>
          <a href="#feb-ga-s4" className="toc-link">Top Content by Clicks</a>
          <a href="#feb-ga-s5" className="toc-link">Audience Demographics</a>
          <a href="#feb-ga-s6" className="toc-link">Most Pages Visited</a>
          <a href="#feb-ga-s7" className="toc-link">Search Queries Driving Traffic</a>
          <a href="#feb-ga-s8" className="toc-link">Traffic Acquisition</a>
        </div>
      </div>

      {/* ── SECTION 1 — Active Users ── */}
      <section id="feb-ga-s1" style={sectionStyle} data-ga-section>
        {sectionHeading('Active Users Overview', 'Feb 15 – Mar 14, 2026')}
        <div className="stats-grid">
          <StatBadge value="558" label="Active Users" change="16.7% vs prev" down />
          <StatBadge value="507" label="New Users" change="19.5% vs prev" down />
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#202124' }}>1.5K</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>Views</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA4335', marginTop: '0.35rem' }}>▼ 19.7% vs prev</div>
          </div>
        </div>
        <div className="image-container" style={{ marginTop: '1.25rem' }}>
          <img src="/Active_Users.png" alt="Active Users — Feb 15 to Mar 14, 2026" className="dashboard-image" />
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '0.75rem', fontSize: '0.78rem', color: '#5F6368' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ display: 'inline-block', width: 20, height: 2, background: '#1A73E8', borderRadius: 1 }} />
            Custom (this period)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ display: 'inline-block', width: 20, height: 0, borderTop: '2px dashed #1A73E8' }} />
            Previous period
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ display: 'inline-block', width: 20, height: 10, background: 'rgba(0,188,212,0.25)', borderRadius: 2 }} />
            Peer median: Plastics &amp; Polymers
          </span>
        </div>
        <Callout color="red">
          <strong>Insight:</strong> Traffic declined ~17–20% across all metrics vs. the previous period. The Mar 8 spike suggests referral or social traffic from a specific event — identify that source and replicate it. To close the gap with the Plastics &amp; Polymers peer median, focus on increasing publishing frequency of SEO-optimized blog content (minimum 2 posts/month).
        </Callout>
      </section>

      {/* ── SECTION 2 — Clicks & Impressions ── */}
      <section id="feb-ga-s2" style={sectionStyle} data-ga-section>
        {sectionHeading('Clicks & Impressions', 'Google Search Console — Feb 15 – Mar 14, 2026')}
        <div className="stats-grid">
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#202124' }} data-ga-counter="285">0</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>Total Clicks</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA4335', marginTop: '0.35rem' }}>▼ 58% vs prev</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#202124' }}>47.6K</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>Impressions</div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EA4335', marginTop: '0.35rem' }}>▼ 42% vs prev</div>
          </div>
        </div>
        <div className="image-container" style={{ marginTop: '1.25rem' }}>
          <img src="/Clicks_&_Impressions.png" alt="Clicks and Impressions — Feb 15 to Mar 14" className="dashboard-image" />
        </div>
        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th('#')}>#</th>
                <th style={th('Page')}>Page Title</th>
                <th style={th('Clicks', true)}>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Manufacturer & Global Supplier of Speciality Resins | NSPC', clicks: 61, change: '▼ 67%', down: true },
                { title: 'Understanding Cathodic Disbondment in Corrosion Protection | NSPC', clicks: 31, change: '▼ 9%', down: true },
                { title: 'Paint Technology Simplified: Components, Science and Applications | NSPC Insights', clicks: 30, change: '▼ 35%', down: true },
                { title: 'Ethers vs. Esters: Bonds That Last! – Nadkarni', clicks: 16, change: '▼ 6%', down: true },
              ].map((row, i) => (
                <tr key={i} data-slide-row style={{ background: i % 2 === 0 ? '#fff' : '#F8F9FA', borderBottom: '1px solid #DADCE0' }}>
                  <td style={{ ...td(), width: 32, color: '#9AA0A6' }}>{i + 1}</td>
                  <td style={td()}>
                    <div style={{ maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.title}</div>
                  </td>
                  <td style={{ ...td(true), fontWeight: 700, color: '#1A73E8' }}>
                    {row.clicks}
                    <span style={{ marginLeft: '0.4rem', fontSize: '0.72rem', color: row.down ? '#EA4335' : '#34A853', fontWeight: 700 }}>{row.change}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Callout color="red">
          <strong>Insight:</strong> Clicks are down 58% vs. the previous period — a significant drop. The "Cathodic Disbondment" article continues to perform well relative to its impression share. Prioritize creating more problem-solution format content ("What is X? How to prevent X") to diversify the click base beyond the homepage.
        </Callout>
      </section>

      {/* ── SECTION 3 — Search Console Performance ── */}
      <section id="feb-ga-s3" style={sectionStyle} data-ga-section>
        {sectionHeading('Search Console Performance', 'Custom period — Search type: Web')}
        <div className="stats-grid">
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: '50%',
              background: '#1A73E8', color: '#fff',
              fontSize: '1.1rem', fontWeight: 800,
            }}>
              404
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.5rem' }}>Total Clicks</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: '50%',
              border: '2px solid #1A73E8', color: '#1A73E8',
              fontSize: '0.95rem', fontWeight: 800,
            }}>
              57.9K
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.5rem' }}>Total Impressions</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#202124' }}>0.7%</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>Average CTR</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#202124' }}>5.2</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.25rem' }}>Average Position</div>
          </div>
        </div>
        <div className="image-container" style={{ marginTop: '1.25rem' }}>
          <img src="/Content_performance.png" alt="Search Console Performance Chart" className="dashboard-image" />
        </div>
        <p style={{ fontSize: '0.78rem', color: '#9AA0A6', fontStyle: 'italic', marginTop: '0.5rem' }}>
          Last updated: 4–5 hours ago &nbsp;|&nbsp; Daily view
        </p>
        <Callout color="blue">
          <strong>Insight:</strong> Ranking at position ~5.2 but converting only 0.7% of impressions to clicks. Industry benchmark for position 5 is ~3–5% CTR. Immediate action: rewrite title tags for the top 10 ranking pages to include power words, numbers, and clear benefit statements. Example: <em>"Cathodic Disbondment Explained: Causes, Prevention & Solutions | NSPC"</em> vs. generic titles. This alone could triple organic click volume.
        </Callout>
      </section>

      {/* ── SECTION 4 — Top Content by Clicks ── */}
      <section id="feb-ga-s4" style={sectionStyle} data-ga-section>
        {sectionHeading('Top Content Driving Clicks', 'Google Search Console — Top performing pages by clicks')}

        <div style={{
          background: '#FFFDE7', borderLeft: '4px solid #F9AB00',
          borderRadius: '0 8px 8px 0', padding: '0.8rem 1rem',
          marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
        }}>
          <span style={{ fontSize: '1.1rem' }}>★</span>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9AA0A6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Top Page This Period</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1A73E8', marginTop: '0.2rem' }}>Manufacturer &amp; Global Supplier of Speciality Resins | NSPC</div>
            <div style={{ fontSize: '0.8rem', color: '#5F6368', marginTop: '0.15rem' }}>61 Clicks&nbsp;&nbsp;|&nbsp;&nbsp;87 Impressions</div>
          </div>
        </div>

        <div style={{ background: '#F1F3F4', display: 'grid', gridTemplateColumns: '1fr auto', padding: '0.5rem 0.75rem', borderRadius: '6px 6px 0 0', fontSize: '0.72rem', fontWeight: 700, color: '#5F6368', textTransform: 'uppercase' }}>
          <span>Page Title</span><span>Clicks</span>
        </div>

        <div className="image-container" style={{ marginTop: 0, borderTop: '1px solid #E8EAED' }}>
          <img src="/Content_Clicks_1.png" alt="Top Content Clicks Part 1" className="dashboard-image" />
        </div>

        <div style={{ borderTop: '1px solid #E8EAED', margin: '0.5rem 0' }} />

        <div className="image-container">
          <img src="/Contents_contributing_traffic.png" alt="Top Content Clicks Part 2" className="dashboard-image" />
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th('#')}>#</th>
                <th style={th('Page')}>Page Title</th>
                <th style={th('Change', true)}>Change</th>
                <th style={th('Clicks', true)}>Clicks</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Manufacturer & Global Supplier of Speciality Resins | NSPC', clicks: 61, change: '▼ 67%', down: true },
                { title: 'Understanding Cathodic Disbondment in Corrosion Protection | NSPC', clicks: 31, change: '▼ 9%', down: true },
                { title: 'Paint Technology Simplified: Components, Science and Applications | NSPC', clicks: 30, change: '▼ 35%', down: true },
                { title: 'Ethers vs. Esters: Bonds That Last! – Nadkarni', clicks: 16, change: '▼ 6%', down: true },
                { title: 'Epoxy Coating Adhesion: Science Behind Strong Bonds | NSPC', clicks: 13, change: '▲ 30%', down: false },
                { title: 'CURE-O-POXY™ | Epoxy Curing Agents Supplier | NSPC', clicks: 13, change: '▲ 63%', down: false },
                { title: 'About NSPC | Pioneers in CNSL Technology', clicks: 12, change: '—', down: false },
                { title: 'Types of Epoxy Curing Agents – Part 1 | NSPC Insights', clicks: 11, change: '▲ 22%', down: false },
                { title: 'Buy Phenalkamides | All-weather Epoxy Curing Agents | NSPC', clicks: 11, change: '▲ 10%', down: false },
                { title: 'Contact NSPC | Connect with Global Polymer Experts', clicks: 9, change: '▼ 18%', down: true },
                { title: 'Epoxy Resins in Electronics | NSPC Insights', clicks: 8, change: '▼ 33%', down: true },
                { title: 'SOLOPOXY™ | 1K Air-Drying Epoxy Ether Resin Manufacturer | NSPC', clicks: 6, change: '▼ 25%', down: true },
                { title: 'CURE-O-POXY™ 8041 | General Purpose Epoxy Hardener | NSPC', clicks: 6, change: '▲ 200%', down: false },
              ].map((row, i) => (
                <tr key={i} data-slide-row style={{ background: i % 2 === 0 ? '#fff' : '#F8F9FA', borderBottom: '1px solid #DADCE0' }}>
                  <td style={{ ...td(), width: 28, color: i === 0 ? '#1A73E8' : '#9AA0A6', fontWeight: i === 0 ? 700 : 400 }}>{i + 1}</td>
                  <td style={td()}>
                    <div style={{ maxWidth: 380, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.title}</div>
                  </td>
                  <td style={{ ...td(true), fontSize: '0.76rem', fontWeight: 700, color: row.down ? '#EA4335' : (row.change === '—' ? '#9AA0A6' : '#34A853') }}>
                    {row.change}
                  </td>
                  <td style={{ ...td(true, true) }}>{row.clicks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout color="amber">
          <strong>Insight:</strong> Your informational content (Cathodic Disbondment, Paint Technology, Epoxy Resins) is outperforming most product pages in clicks. This signals a strong "learn first, buy later" audience. Build a Content Hub linking all educational articles to relevant product pages — this internal linking strategy will lift both SEO rankings and product page conversions.
        </Callout>
      </section>

      {/* ── SECTION 5 — Demographics ── */}
      <section id="feb-ga-s5" style={sectionStyle} data-ga-section>
        {sectionHeading('Audience Demographics — Country', 'Last 28 days: Mar 3 – Mar 30, 2026 | Active filters: India, United States, China, Singapore, Canada')}

        <div className="image-container">
          <img src="/Demographics.png" alt="Audience Demographics by Country" className="dashboard-image" />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.5rem', marginTop: '1rem', padding: '0.75rem 1rem', background: '#F8F9FA', borderRadius: '8px', fontSize: '0.82rem' }}>
          {[
            { label: 'Total Active Users', value: '490' },
            { label: 'New Users', value: '456' },
            { label: 'Engaged Sessions', value: '366' },
            { label: 'Engagement Rate', value: '53.2%' },
            { label: 'Avg. Engagement Time', value: '1m 13s' },
            { label: 'Event Count', value: '4,329' },
          ].map((s) => (
            <span key={s.label} style={{ whiteSpace: 'nowrap' }}>
              <strong style={{ color: '#202124' }}>{s.value}</strong>
              <span style={{ color: '#5F6368', marginLeft: '0.3rem' }}>{s.label}</span>
            </span>
          ))}
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th('#')}>#</th>
                <th style={th('Country')}>Country</th>
                <th style={th('Users', true)}>Active Users</th>
                <th style={th('Eng Rate', true)}>Eng. Rate</th>
                <th style={th('Avg Time', true)}>Avg. Time</th>
                <th style={th('Events', true)}>Events</th>
              </tr>
            </thead>
            <tbody>
              {[
                { flag: '🇮🇳', name: 'India', users: 211, pct: '43.06%', engRate: 60.96, engTime: '1m 46s', events: 2410, highlight: true },
                { flag: '🇺🇸', name: 'United States', users: 98, pct: '20%', engRate: 36.45, engTime: '37s', events: 539, highlight: false },
                { flag: '🇬🇧', name: 'United Kingdom', users: 16, pct: '3.27%', engRate: 52.17, engTime: '40s', events: 94, highlight: false },
                { flag: '🇨🇳', name: 'China', users: 15, pct: '3.06%', engRate: 31.58, engTime: '17s', events: 83, highlight: false },
                { flag: '🇸🇬', name: 'Singapore', users: 15, pct: '3.06%', engRate: 44.00, engTime: '35s', events: 148, highlight: false },
                { flag: '🇨🇦', name: 'Canada', users: 14, pct: '2.86%', engRate: 68.18, engTime: '2m 31s', events: 138, highlight: false },
                { flag: '🇩🇪', name: 'Germany', users: 9, pct: '1.84%', engRate: 30.00, engTime: '48s', events: 77, highlight: false },
                { flag: '🇻🇳', name: 'Vietnam', users: 9, pct: '1.84%', engRate: 53.33, engTime: '1m 44s', events: 99, highlight: false },
                { flag: '🇮🇩', name: 'Indonesia', users: 8, pct: '1.63%', engRate: 50.00, engTime: '1m 45s', events: 42, highlight: false },
              ].map((row, i) => (
                <tr
                  key={i}
                  data-slide-row
                  style={{
                    background: row.highlight ? '#EBF3FF' : (i % 2 === 0 ? '#fff' : '#F8F9FA'),
                    borderBottom: '1px solid #DADCE0',
                    borderLeft: row.highlight ? '3px solid #1A73E8' : '3px solid transparent',
                  }}
                >
                  <td style={{ ...td(), color: '#9AA0A6' }}>{i + 1}</td>
                  <td style={td()}>
                    <span style={{ marginRight: '0.4rem' }}>{row.flag}</span>
                    <strong>{row.name}</strong>
                    <span style={{ marginLeft: '0.4rem', color: '#9AA0A6', fontSize: '0.75rem' }}>({row.pct})</span>
                  </td>
                  <td style={{ ...td(true), fontWeight: 600 }}>{row.users}</td>
                  <td style={{ ...td(true) }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'flex-end' }}>
                      <div style={{ width: 48, height: 5, background: '#E8EAED', borderRadius: 3, flexShrink: 0, overflow: 'hidden' }}>
                        <div
                          data-progress={row.engRate.toFixed(0)}
                          style={{ height: '100%', background: '#1A73E8', width: '0%', transition: 'width 800ms ease' }}
                        />
                      </div>
                      <span style={{ minWidth: 36, textAlign: 'right', color: '#202124', fontWeight: 600 }}>{row.engRate.toFixed(1)}%</span>
                    </div>
                  </td>
                  <td style={{ ...td(true), color: '#5F6368' }}>{row.engTime}</td>
                  <td style={{ ...td(true, true) }}>{row.events.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout color="blue">
          <strong>Insight:</strong> India dominates with 43% of active users (home market). Canada (68.18% engagement rate, 2m 31s avg time) and Vietnam/Indonesia show exceptional depth of engagement despite small visitor numbers — these are underserved high-quality markets. For UK and China (low engagement time), review landing page relevance and load speed. Consider geo-targeted content for Southeast Asia (coatings regulations, marine industry use cases).
        </Callout>
      </section>

      {/* ── SECTION 6 — Most Pages Visited ── */}
      <section id="feb-ga-s6" style={sectionStyle} data-ga-section>
        {sectionHeading('Most Pages Visited', 'Pages & Screens — Last 28 days: Mar 3 – Mar 30, 2026')}

        <div className="image-container">
          <img src="/Most_pages_visited.png" alt="Most Pages Visited" className="dashboard-image" />
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1rem' }}>
          {[
            { label: 'Total Views', value: '1,281' },
            { label: 'Active Users', value: '490' },
            { label: 'Views/User', value: '2.61' },
            { label: 'Avg. Engagement', value: '1m 13s' },
            { label: 'Events', value: '4,329' },
          ].map((s) => (
            <span key={s.label} style={{
              border: '1px solid #DADCE0', borderRadius: '20px',
              padding: '0.3rem 0.75rem', fontSize: '0.78rem',
              background: '#fff',
            }}>
              <strong style={{ color: '#1A73E8' }}>{s.value}</strong>
              <span style={{ color: '#5F6368', marginLeft: '0.3rem' }}>{s.label}</span>
            </span>
          ))}
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={{ ...th('#'), width: 40 }}>Rank</th>
                <th style={th('Page')}>Page Title</th>
                <th style={th('Views', true)}>Views</th>
                <th style={th('Users', true)}>Users</th>
                <th style={th('V/U', true)}>V/U</th>
                <th style={th('Time', true)}>Avg. Time</th>
                <th style={th('Events', true)}>Events</th>
              </tr>
            </thead>
            <tbody>
              {[
                { rank: 1, title: 'Manufacturer & Global Supplier of Speciality Resins | NSPC', views: 245, viewsPct: '19.13%', users: 158, usersPct: '32.24%', vu: 1.55, time: '32s', events: 862, topEngager: false },
                { rank: 2, title: 'Contact NSPC | Connect with Global Polymer Experts', views: 147, viewsPct: '11.48%', users: 90, usersPct: '18.37%', vu: 1.63, time: '36s', events: 448, topEngager: false },
                { rank: 3, title: 'Understanding Cathodic Disbondment in Corrosion Protection | NSPC', views: 70, viewsPct: '5.46%', users: 38, usersPct: '7.76%', vu: 1.84, time: '52s', events: 233, topEngager: false },
                { rank: 4, title: 'Paint Technology Simplified: Components, Science and Applications | NSPC', views: 60, viewsPct: '4.68%', users: 40, usersPct: '8.16%', vu: 1.50, time: '1m 04s', events: 209, topEngager: false },
                { rank: 5, title: 'CURE-O-POXY™ | Epoxy Curing Agents Supplier | NSPC', views: 45, viewsPct: '3.51%', users: 24, usersPct: '4.9%', vu: 1.88, time: '57s', events: 151, topEngager: false },
                { rank: 6, title: 'About NSPC | Pioneers in CNSL Technology', views: 44, viewsPct: '3.43%', users: 30, usersPct: '6.12%', vu: 1.47, time: '1m 21s', events: 134, topEngager: true },
                { rank: 7, title: 'Specialty Polymers & Coatings Products | Global Supplier | NSPC', views: 43, viewsPct: '3.36%', users: 33, usersPct: '6.73%', vu: 1.30, time: '1m 03s', events: 143, topEngager: false },
                { rank: 8, title: 'Ethers vs. Esters: Bonds That Last! – Nadkarni', views: 37, viewsPct: '2.89%', users: 25, usersPct: '5.1%', vu: 1.48, time: '34s', events: 132, topEngager: false },
                { rank: 9, title: 'Epoxy Coating Adhesion: Science Behind Strong Bonds | NSPC Insights', views: 33, viewsPct: '2.58%', users: 22, usersPct: '4.49%', vu: 1.50, time: '1m 03s', events: 121, topEngager: false },
              ].map((row, i) => (
                <tr
                  key={i}
                  data-slide-row
                  style={{
                    background: row.rank === 1 ? '#EBF3FF' : (i % 2 === 0 ? '#fff' : '#F8F9FA'),
                    borderBottom: '1px solid #DADCE0',
                    borderLeft: row.rank === 1 ? '3px solid #1A73E8' : '3px solid transparent',
                  }}
                >
                  <td style={{ ...td(), paddingLeft: '0.5rem' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      width: 22, height: 22, borderRadius: '50%',
                      background: row.rank === 1 ? '#1A73E8' : '#F1F3F4',
                      color: row.rank === 1 ? '#fff' : '#5F6368',
                      fontSize: '0.72rem', fontWeight: 700,
                    }}>
                      {row.rank}
                    </span>
                  </td>
                  <td style={td()}>
                    <div>
                      <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>
                        {row.topEngager && <span title="Highest avg. engagement time" style={{ marginRight: '0.3rem', fontSize: '0.75rem' }}>⭐</span>}
                        {row.title}
                      </div>
                      <div style={{ height: 3, background: '#E8EAED', borderRadius: 2, marginTop: 4, overflow: 'hidden', maxWidth: 300 }}>
                        <div
                          data-bar-width={((row.views / 1281) * 100).toFixed(1)}
                          style={{ height: '100%', background: '#1A73E8', opacity: 0.35, width: '0%', transition: 'width 600ms ease' }}
                        />
                      </div>
                    </div>
                  </td>
                  <td style={{ ...td(true), fontWeight: 600, color: '#1A73E8' }}>
                    {row.views}
                    <div style={{ fontSize: '0.7rem', color: '#9AA0A6', fontWeight: 400 }}>{row.viewsPct}</div>
                  </td>
                  <td style={{ ...td(true) }}>{row.users}</td>
                  <td style={{ ...td(true) }}>{row.vu}</td>
                  <td style={{ ...td(true), color: row.topEngager ? '#34A853' : '#5F6368', fontWeight: row.topEngager ? 700 : 400 }}>{row.time}</td>
                  <td style={{ ...td(true) }}>{row.events}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Callout color="green">
          <strong>Insight:</strong> The Contact page ranks #2 overall (147 views, 11.48%) — a strong bottom-of-funnel signal. ~1 in 9 sessions involves checking the contact page. Ensure it has a frictionless form, multiple contact options, and a clear response time promise. The About page (⭐ 1m 21s engagement) is your trust anchor — consider adding team profiles, certifications, and a company timeline to deepen credibility with international prospects.
        </Callout>
      </section>

      {/* ── SECTION 7 — Search Queries ── */}
      <section id="feb-ga-s7" style={sectionStyle} data-ga-section>
        {sectionHeading('Search Queries Driving Traffic', 'Google Search Console — Top Queries by Clicks')}

        <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid #DADCE0', marginBottom: '1.25rem', overflowX: 'auto' }}>
          {['QUERIES', 'PAGES', 'COUNTRIES', 'DEVICES', 'SEARCH APPEARANCE', 'DAYS'].map((tab) => (
            <div key={tab} style={{
              padding: '0.6rem 1rem',
              fontSize: '0.78rem',
              fontWeight: tab === 'QUERIES' ? 700 : 500,
              color: tab === 'QUERIES' ? '#1A73E8' : '#5F6368',
              borderBottom: tab === 'QUERIES' ? '2px solid #1A73E8' : '2px solid transparent',
              marginBottom: -1,
              whiteSpace: 'nowrap',
              cursor: 'default',
            }}>
              {tab}
            </div>
          ))}
        </div>

        <div className="image-container">
          <img src="/Search_Queries_Driving_Traffic.png" alt="Search Queries Driving Traffic" className="dashboard-image" />
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th('Query')}>Query</th>
                <th style={th('Type')}>Type</th>
                <th style={th('Clicks', true)}>Clicks</th>
                <th style={th('Impr', true)}>Impressions</th>
                <th style={th('CTR', true)}>Implied CTR</th>
              </tr>
            </thead>
            <tbody>
              {[
                { query: 'nadkarni specialty polymers', clicks: 65, impressions: 93, branded: true },
                { query: 'nadkarni speciality polymers and coatings private', clicks: 31, impressions: 52, branded: true },
                { query: 'nadkarni speciality polymers and coatings private limited', clicks: 11, impressions: 23, branded: true },
                { query: 'paint technology', clicks: 10, impressions: 288, branded: false },
                { query: 'cathodic disbondment', clicks: 6, impressions: 159, branded: false },
                { query: 'what is cathodic disbondment', clicks: 3, impressions: 15, branded: false },
                { query: 'epoxy flooring durability', clicks: 2, impressions: 207, branded: false },
                { query: 'nadkarni', clicks: 2, impressions: 131, branded: true },
              ].map((row, i) => {
                const ctr = ((row.clicks / row.impressions) * 100);
                const ctrColor = ctr >= 20 ? '#34A853' : ctr >= 5 ? '#F9AB00' : '#EA4335';
                return (
                  <tr key={i} data-slide-row style={{ background: i % 2 === 0 ? '#fff' : '#F8F9FA', borderBottom: '1px solid #DADCE0' }}>
                    <td style={td()}>
                      <div style={{ fontWeight: 500 }}>{row.query}</div>
                      <div style={{ height: 4, background: '#E8EAED', borderRadius: 2, marginTop: 4, overflow: 'hidden', maxWidth: 200 }}>
                        <div
                          data-bar-width={((row.clicks / 65) * 100).toFixed(1)}
                          style={{ height: '100%', background: '#1A73E8', opacity: 0.65, width: '0%', transition: 'width 700ms ease' }}
                        />
                      </div>
                    </td>
                    <td style={td()}>
                      <span style={{
                        fontSize: '0.7rem', fontWeight: 600,
                        background: row.branded ? '#EBF3FF' : '#F8F9FA',
                        color: row.branded ? '#1A73E8' : '#5F6368',
                        border: `1px solid ${row.branded ? '#1A73E8' : '#DADCE0'}`,
                        borderRadius: 12, padding: '0.1rem 0.5rem',
                        whiteSpace: 'nowrap',
                      }}>
                        {row.branded ? '🏷 Branded' : '🔍 Non-branded'}
                      </span>
                    </td>
                    <td style={{ ...td(true, true) }}>{row.clicks}</td>
                    <td style={{ ...td(true), color: '#9C27B0', fontWeight: 600 }}>{row.impressions}</td>
                    <td style={{ ...td(true), fontWeight: 700, color: ctrColor }}>{ctr.toFixed(1)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <Callout color="blue">
          <strong>Insight:</strong> 37.5% of clicks come from branded "Nadkarni" queries — healthy but not scalable for growth. The real opportunity is in non-branded queries with high impression volume: "epoxy flooring durability" (207 impressions, only 2 clicks = 1% CTR), "cathodic disbondment" (159 impressions, 6 clicks = 3.8% CTR), "paint technology" (288 impressions, 10 clicks = 3.5% CTR). Rewriting title tags and meta descriptions for these pages to target 8–12% CTR could yield 15–25 additional monthly clicks per query.
        </Callout>
      </section>

      {/* ── SECTION 8 — Traffic Acquisition ── */}
      <section id="feb-ga-s8" style={sectionStyle} data-ga-section>
        {sectionHeading('Traffic Acquisition by Channel', 'Session primary channel — Last 28 days: Mar 3 – Mar 30, 2026')}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 260px' }}>
            <svg viewBox="0 0 120 120" width="130" height="130" style={{ display: 'block' }}>
              {(() => {
                const segments = [
                  { pct: 62.35, color: '#1A73E8', label: 'Organic' },
                  { pct: 29.07, color: '#5F6368', label: 'Direct' },
                  { pct: 3.78, color: '#FBBC04', label: 'Unassigned' },
                  { pct: 2.91, color: '#34A853', label: 'Social' },
                  { pct: 1.89, color: '#9C27B0', label: 'Referral' },
                ];
                const r = 46, cx = 60, cy = 60;
                let cumulative = 0;
                return segments.map((s, i) => {
                  const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
                  cumulative += s.pct;
                  const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
                  const x1 = cx + r * Math.cos(startAngle);
                  const y1 = cy + r * Math.sin(startAngle);
                  const x2 = cx + r * Math.cos(endAngle);
                  const y2 = cy + r * Math.sin(endAngle);
                  const large = s.pct > 50 ? 1 : 0;
                  return (
                    <path
                      key={i}
                      d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`}
                      fill={s.color}
                      opacity={0.85}
                    />
                  );
                });
              })()}
              <circle cx="60" cy="60" r="28" fill="#fff" />
              <text x="60" y="57" textAnchor="middle" fontSize="10" fontWeight="700" fill="#202124">688</text>
              <text x="60" y="68" textAnchor="middle" fontSize="7" fill="#5F6368">Sessions</text>
            </svg>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem 0.8rem', marginTop: '0.6rem', fontSize: '0.75rem' }}>
              {[
                { color: '#1A73E8', label: 'Organic Search 62%' },
                { color: '#5F6368', label: 'Direct 29%' },
                { color: '#FBBC04', label: 'Unassigned 4%' },
                { color: '#34A853', label: 'Organic Social 3%' },
                { color: '#9C27B0', label: 'Referral 2%' },
              ].map((s) => (
                <span key={s.label} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#5F6368' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flex: '3 1 320px', overflowX: 'auto' }}>
            <div className="image-container" style={{ marginBottom: '1rem' }}>
              <img src="/Traffic_Acquisition.png" alt="Traffic Acquisition by Channel" className="dashboard-image" />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={tableHeaderStyle}>
                <th style={th('Channel')}>Channel</th>
                <th style={th('Sessions', true)}>Sessions</th>
                <th style={th('Engaged', true)}>Engaged</th>
                <th style={th('Eng Rate', true)}>Eng. Rate</th>
                <th style={th('Avg Time', true)}>Avg. Time</th>
                <th style={th('Ev/Sess', true)}>Ev/Sess</th>
              </tr>
            </thead>
            <tbody>
              {[
                { channel: 'Organic Search', sessions: 429, sessionsPct: '62.35%', engaged: 262, engagedPct: '71.58%', engRate: '61.07%', avgTime: '1m 13s', epSession: 7.41, color: '#1A73E8' },
                { channel: 'Direct', sessions: 200, sessionsPct: '29.07%', engaged: 77, engagedPct: '21.04%', engRate: '38.5%', avgTime: '15s', epSession: 4.37, color: '#5F6368' },
                { channel: 'Unassigned', sessions: 26, sessionsPct: '3.78%', engaged: 10, engagedPct: '2.73%', engRate: '38.46%', avgTime: '42s', epSession: 5.08, color: '#FBBC04' },
                { channel: 'Organic Social', sessions: 20, sessionsPct: '2.91%', engaged: 9, engagedPct: '2.46%', engRate: '45%', avgTime: '13s', epSession: 4.15, color: '#34A853' },
                { channel: 'Referral', sessions: 13, sessionsPct: '1.89%', engaged: 7, engagedPct: '1.91%', engRate: '53.85%', avgTime: '17s', epSession: 4.92, color: '#9C27B0' },
              ].map((row, i) => (
                <tr key={i} data-slide-row style={{
                  background: i === 0 ? '#EBF3FF' : (i % 2 === 0 ? '#fff' : '#F8F9FA'),
                  borderBottom: '1px solid #DADCE0',
                  borderLeft: `3px solid ${row.color}`,
                }}>
                  <td style={{ ...td(), fontWeight: i === 0 ? 700 : 500 }}>
                    <div>{row.channel}</div>
                    <div style={{ height: 5, background: '#E8EAED', borderRadius: 3, marginTop: 4, overflow: 'hidden', maxWidth: 140 }}>
                      <div
                        data-bar-width={((row.sessions / 429) * 100).toFixed(1)}
                        style={{ height: '100%', background: row.color, opacity: 0.75, width: '0%', transition: 'width 600ms ease', borderRadius: 3 }}
                      />
                    </div>
                  </td>
                  <td style={{ ...td(true), fontWeight: 600 }}>
                    {row.sessions}
                    <div style={{ fontSize: '0.7rem', color: '#9AA0A6', fontWeight: 400 }}>{row.sessionsPct}</div>
                  </td>
                  <td style={{ ...td(true) }}>
                    {row.engaged}
                    <div style={{ fontSize: '0.7rem', color: '#9AA0A6' }}>{row.engagedPct}</div>
                  </td>
                  <td style={{ ...td(true), fontWeight: 600, color: '#34A853' }}>{row.engRate}</td>
                  <td style={{ ...td(true), color: '#5F6368' }}>{row.avgTime}</td>
                  <td style={{ ...td(true, true) }}>{row.epSession}</td>
                </tr>
              ))}
              <tr style={{ background: '#F1F3F4', fontWeight: 700, borderTop: '2px solid #DADCE0' }}>
                <td style={{ ...td(), fontWeight: 700 }}>Total</td>
                <td style={{ ...td(true), fontWeight: 700 }}>688</td>
                <td style={{ ...td(true), fontWeight: 700 }}>366</td>
                <td style={{ ...td(true), fontWeight: 700, color: '#34A853' }}>53.2%</td>
                <td style={{ ...td(true) }}>52s</td>
                <td style={{ ...td(true), fontWeight: 700, color: '#1A73E8' }}>6.29</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout color="purple">
          <strong>Insight:</strong> Organic Social (LinkedIn) contributes only 2.91% of website sessions despite strong LinkedIn impression numbers. This disconnect means LinkedIn content is not consistently driving traffic to the website. Add clear "link in article / link in bio" CTAs on every LinkedIn post. Referral traffic (1.89%) has a strong 53.85% engagement rate — identify which referral sources these are and actively pursue more backlinks from those domains.
        </Callout>
      </section>

      {/* ── KEY TAKEAWAYS ── */}
      <section id="feb-ga-takeaways" style={{
        ...sectionStyle,
        border: '2px solid #1A73E8',
        marginBottom: '1rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="12" width="4" height="9" rx="1" fill="#E37400" />
            <rect x="10" y="7" width="4" height="14" rx="1" fill="#1A73E8" />
            <rect x="17" y="3" width="4" height="18" rx="1" fill="#34A853" />
          </svg>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#202124', margin: 0 }}>
            Google Analytics — Key Takeaways: Feb 15 – Mar 14, 2026
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { color: '#EA4335', bg: '#FFF5F5', text: 'Traffic declined: Active Users ▼16.7%, Views ▼19.7% vs. previous period — but Search Clicks total across both periods shows growing search visibility that hasn\'t yet converted to site visits. This lag is normal for new content.' },
            { color: '#34A853', bg: '#F0FAF4', text: 'SEO is working: Ranking at avg. position 5.2 for targeted queries — but CTR of 0.7% is 4–5x below benchmark. Title tag optimisation is the single highest-leverage action available.' },
            { color: '#FBBC04', bg: '#FFFDE7', text: 'Brand search dominates: 37.5% of clicks come from branded queries. Non-branded opportunities (paint technology, cathodic disbondment, epoxy flooring durability) have high impression volume but low conversion.' },
            { color: '#1A73E8', bg: '#EBF3FF', text: 'India (43%) + US (20%) = 63% of audience. Canada and Vietnam/Indonesia show exceptional engagement depth despite low volume — a strategic growth opportunity.' },
            { color: '#9C27B0', bg: '#F5EEFF', text: 'LinkedIn → Website gap: Strong LinkedIn impressions vs. only ~20 Organic Social sessions = a significant disconnect. LinkedIn content needs direct website CTAs on every post to drive traffic.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: item.bg,
              borderLeft: `4px solid ${item.color}`,
              borderRadius: '0 8px 8px 0',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              color: '#374151',
              lineHeight: 1.6,
            }}>
              <strong style={{ color: item.color }}>{i + 1}.</strong>&nbsp;{item.text}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

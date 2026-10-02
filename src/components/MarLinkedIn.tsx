import { useState, useRef, useEffect } from 'react';

/* ── lightweight lightbox ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999, cursor: 'zoom-out',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 16, right: 20, background: 'none',
          border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1,
        }}
      >×</button>
      <img
        src={src} alt={alt}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '92vw', maxHeight: '90vh', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }}
      />
    </div>
  );
}

function ZoomImg({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="image-container" style={{ marginTop: '1.25rem' }}>
      <img
        src={src} alt={alt}
        className="dashboard-image"
        onClick={() => setOpen(true)}
        style={{ cursor: 'zoom-in' }}
      />
      <p style={{ fontSize: '0.78rem', color: '#888', fontStyle: 'italic', marginTop: '0.4rem', marginBottom: 0 }}>
        {caption}
      </p>
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </div>
  );
}

/* ── sortable table ── */
type Row = Record<string, string | number>;
function SortTable({ headers, rows, highlightCol }: { headers: string[]; rows: Row[]; highlightCol?: number }) {
  const [sortCol, setSortCol] = useState<number | null>(null);
  const [asc, setAsc] = useState(true);

  const sorted = sortCol === null ? rows : [...rows].sort((a, b) => {
    const va = a[headers[sortCol]];
    const vb = b[headers[sortCol]];
    const na = typeof va === 'number' ? va : parseFloat(String(va).replace(/[^0-9.-]/g, '')) || 0;
    const nb = typeof vb === 'number' ? vb : parseFloat(String(vb).replace(/[^0-9.-]/g, '')) || 0;
    return asc ? na - nb : nb - na;
  });

  return (
    <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
        <thead>
          <tr style={{ background: '#003366' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                onClick={() => { if (sortCol === i) setAsc(!asc); else { setSortCol(i); setAsc(true); } }}
                style={{
                  padding: '0.6rem 0.8rem', color: '#fff', fontWeight: 700,
                  textAlign: i === 0 ? 'left' : 'right', cursor: 'pointer',
                  whiteSpace: 'nowrap', userSelect: 'none',
                }}
              >
                {h} {sortCol === i ? (asc ? ' ↑' : ' ↓') : ' ⇅'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#F5F5F5' }}>
              {headers.map((h, ci) => (
                <td
                  key={ci}
                  style={{
                    padding: '0.55rem 0.8rem',
                    textAlign: ci === 0 ? 'left' : 'right',
                    fontWeight: highlightCol === ci ? 700 : 400,
                    color: highlightCol === ci ? '#003366' : '#212121',
                  }}
                >
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── count-up KPI card ── */
function KpiCard({ value, label, change, changeDir, accent }:
  { value: string; label: string; change: string; changeDir: 'up' | 'down' | 'neutral'; accent?: string }) {
  const numericEnd = parseFloat(value.replace(/[^0-9.]/g, '')) || 0;
  const isFloat = value.includes('.');
  const prefix = value.match(/^[^0-9]*/)?.[0] || '';
  const suffix = value.replace(/^[^0-9]*/, '').replace(/[0-9.,]+/, '');
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const dur = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const v = ease * numericEnd;
        setDisplay(prefix + (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix);
        if (t < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, numericEnd, isFloat, prefix, suffix]);

  const changeColor = changeDir === 'up' ? '#1B5E20' : changeDir === 'down' ? '#C62828' : '#B8860B';
  const changePrefix = changeDir === 'up' ? '▲ ' : changeDir === 'down' ? '▼ ' : '→ ';

  return (
    <div className="stat-card" style={{ borderTop: accent ? `3px solid ${accent}` : undefined, textAlign: 'center' }}>
      <div ref={ref} style={{ fontSize: '1.75rem', fontWeight: 800, color: '#003366', lineHeight: 1.1 }}>
        {display}
      </div>
      <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: changeColor, marginTop: '0.3rem' }}>
        {changePrefix}{change}
      </div>
    </div>
  );
}

/* ── callout ── */
const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string }> = {
  insight: { border: '#006B6B', bg: '#E3F2FD', icon: '💡' },
  warning: { border: '#B8860B', bg: '#FFF8E1', icon: '⚠️' },
  critical: { border: '#C62828', bg: '#FFEBEE', icon: '🚨' },
  highlight: { border: '#1B5E20', bg: '#E8F5E9', icon: '⭐' },
};
function Callout({ type, title, children }: { type: keyof typeof CALLOUT_STYLES; title?: string; children: React.ReactNode }) {
  const s = CALLOUT_STYLES[type];
  return (
    <div style={{
      borderLeft: `6px solid ${s.border}`, background: s.bg,
      borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', marginTop: '1.25rem',
      fontSize: '0.875rem', color: '#212121', lineHeight: 1.65,
    }}>
      {title && <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: s.border }}>{s.icon} {title}</div>}
      {!title && <span style={{ marginRight: '0.4rem' }}>{s.icon}</span>}
      {children}
    </div>
  );
}

export default function MarLinkedIn() {
  return (
    <div className="accordion-content">

      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#mar-li-highlights" className="toc-link">Content Highlights</a>
          <a href="#mar-li-followers" className="toc-link">Follower Growth</a>
          <a href="#mar-li-demographics" className="toc-link">Follower Demographics</a>
          <a href="#mar-li-visitors" className="toc-link">Visitor Metrics</a>
          <a href="#mar-li-content" className="toc-link">Content Performance</a>
          <a href="#mar-li-competitors" className="toc-link">Competitive Benchmarking</a>
        </div>
      </div>

      {/* ── 1.1 Content Highlights ── */}
      <section id="mar-li-highlights" className="section">
        <h2>1.1 — Content Highlights</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Data for 3/15/2026 – 5/10/2026 (57 days)
        </p>

        <ZoomImg
          src="/Content_Metrics.png"
          alt="LinkedIn Content Metrics Mar 15 – May 10, 2026"
          caption="Source: Content_Metrics.png | Data for 3/15/2026 – 5/10/2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="9,259" label="Impressions" change="0.6% vs prev" changeDir="down" accent="#0a66c2" />
          <KpiCard value="211" label="Reactions" change="22.1% vs prev" changeDir="down" accent="#0a66c2" />
          <KpiCard value="7" label="Comments" change="+75% vs prev" changeDir="up" accent="#1B5E20" />
          <KpiCard value="1" label="Reposts" change="0% change" changeDir="neutral" accent="#B8860B" />
        </div>

        <Callout type="insight">
          Despite a marginal 0.6% impression dip, the period delivered <strong>9,259 total organic impressions</strong> — significantly larger in absolute terms than the previous 31-day cycle (2,799). The most important recovery is comments: <strong>7 comments represents +75% growth</strong>, reversing the 100% comment drought flagged in Jan–Feb 2026. All impressions were organic — zero sponsored spend.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.2 Follower Growth ── */}
      <section id="mar-li-followers" className="section">
        <h2>1.2 — Follower Growth</h2>

        <ZoomImg
          src="/Follower_insights.png"
          alt="Follower Insights — Last 57 days"
          caption="Source: Follower_insights.png | Last 57 days"
        />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="938" label="Total Followers" change="All time" changeDir="neutral" accent="#0a66c2" />
          <KpiCard value="57" label="New Followers (57d)" change="+5.6% growth rate" changeDir="up" accent="#1B5E20" />
        </div>

        <p style={{ marginTop: '1rem', color: '#444', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Total followers grew from 860 (end of Jan–Feb cycle) to 938 — a net addition of 78 followers. The 57 new followers in 57 days is steady organic growth at approximately <strong>1 new follower per day</strong>.
        </p>
      </section>

      <div className="section-divider" />

      {/* ── 1.3 Follower Demographics ── */}
      <section id="mar-li-demographics" className="section">
        <h2>1.3 — Follower Demographics</h2>

        <ZoomImg
          src="/Follower_Demographics.png"
          alt="Follower Demographics by Location"
          caption="Source: Follower_Demographics.png | Location filter"
        />

        <SortTable
          headers={['Location', 'Followers', '% of Total']}
          rows={[
            { Location: 'Mumbai Metropolitan Region, India', Followers: 316, '% of Total': '33.7%' },
            { Location: 'Pune / Pimpri-Chinchwad Area, India', Followers: 52, '% of Total': '5.5%' },
            { Location: 'Greater Delhi Area, India', Followers: 44, '% of Total': '4.7%' },
            { Location: 'Greater Bengaluru Area, India', Followers: 24, '% of Total': '2.6%' },
            { Location: 'Greater Ahmedabad Area, India', Followers: 23, '% of Total': '2.5%' },
            { Location: 'Greater Istanbul, Türkiye', Followers: 20, '% of Total': '2.1%' },
            { Location: 'Greater Vadodara Area, India', Followers: 19, '% of Total': '2.0%' },
            { Location: 'Greater Hyderabad Area, India', Followers: 16, '% of Total': '1.7%' },
            { Location: 'Greater Chennai Area, India', Followers: 14, '% of Total': '1.5%' },
            { Location: 'Greater Kolkata Area, India', Followers: 12, '% of Total': '1.3%' },
          ]}
          highlightCol={1}
        />

        {/* Horizontal bar chart */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Follower Locations (Top 10)
          </div>
          {[
            { label: 'Mumbai Metro, India', val: 316, max: 316, india: true },
            { label: 'Pune Area, India', val: 52, max: 316, india: true },
            { label: 'Delhi Area, India', val: 44, max: 316, india: true },
            { label: 'Bengaluru Area, India', val: 24, max: 316, india: true },
            { label: 'Ahmedabad Area, India', val: 23, max: 316, india: true },
            { label: 'Greater Istanbul, Türkiye', val: 20, max: 316, india: false },
            { label: 'Vadodara Area, India', val: 19, max: 316, india: true },
            { label: 'Hyderabad Area, India', val: 16, max: 316, india: true },
            { label: 'Chennai Area, India', val: 14, max: 316, india: true },
            { label: 'Kolkata Area, India', val: 12, max: 316, india: true },
          ].map((row) => (
            <div key={row.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
              <div style={{ minWidth: 160, fontSize: '0.78rem', color: '#444', flexShrink: 0 }}>{row.label}</div>
              <div style={{ flex: 1, height: 12, background: '#E8EAED', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${(row.val / row.max) * 100}%`, height: '100%', background: row.india ? '#003366' : '#006B6B', borderRadius: 6, transition: 'width 800ms ease' }} />
              </div>
              <div style={{ minWidth: 32, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#003366' }}>{row.val}</div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.72rem', color: '#666' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#003366', borderRadius: 2, marginRight: '0.3rem' }} />India</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#006B6B', borderRadius: 2, marginRight: '0.3rem' }} />International</span>
          </div>
        </div>

        <Callout type="insight">
          Mumbai Metro dominates at 33.7% (316 followers). <strong>Greater Istanbul (20 followers, 2.1%)</strong> aligns with Turkey's strong GSC performance. The pan-India spread across 9 cities confirms a national B2B audience is forming. International followers represent meaningful penetration — an opportunity to create content for Turkey and other international coating markets.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.4 Visitor Metrics ── */}
      <section id="mar-li-visitors" className="section">
        <h2>1.4 — Visitor Metrics</h2>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <ZoomImg
              src="/Visitor_Highlights.png"
              alt="Visitor Highlights — Mar 15 – May 2026"
              caption="Source: Visitor_Highlights.png"
            />
          </div>
          <div style={{ flex: '1 1 300px' }}>
            <ZoomImg
              src="/Visitor_Metrics copy.png"
              alt="Visitor Metrics — Mar 15 – May 2026"
              caption="Source: Visitor_Metrics.png"
            />
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="181" label="Page Views" change="10% vs prev" changeDir="down" accent="#0a66c2" />
          <KpiCard value="71" label="Unique Visitors" change="5.3% vs prev" changeDir="down" accent="#0a66c2" />
          <KpiCard value="0" label="Custom Button Clicks" change="Zero — 88 days" changeDir="down" accent="#C62828" />
        </div>

        {/* Device split */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { icon: '🖥️', label: 'Desktop', val: '51 views', pct: '28.2%', color: '#003366' },
            { icon: '📱', label: 'Mobile', val: '130 views', pct: '71.8%', color: '#0a66c2' },
          ].map((d) => (
            <div key={d.label} style={{
              flex: '1 1 180px', background: '#F5F7FF', border: `1px solid ${d.color}33`,
              borderTop: `3px solid ${d.color}`, borderRadius: 8, padding: '0.9rem 1.1rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem' }}>{d.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: d.color, marginTop: '0.25rem' }}>{d.val}</div>
              <div style={{ fontSize: '0.78rem', color: '#555' }}>{d.label} — {d.pct} of total</div>
            </div>
          ))}
        </div>

        <Callout type="critical" title="Zero CTA Clicks — Critical Action Required">
          Mobile accounts for 130 of 181 total page views (71.8%). Yet the LinkedIn Page CTA button records <strong>zero clicks for the second consecutive reporting cycle (88 combined days of zero CTA engagement)</strong>. On mobile, CTA buttons can be visually deprioritised. Urgently review and A/B test the CTA label and destination — recommend 'Download Technical Data Sheet' or 'Request a Sample' as the destination.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.5 Content Performance ── */}
      <section id="mar-li-content" className="section">
        <h2>1.5 — Content Performance</h2>

        {/* Performance badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
          {[
            { icon: '🥇', label: 'Highest Impressions', detail: 'American Coatings Show (754)' },
            { icon: '🏆', label: 'Highest CTR', detail: 'American Coatings Show (3.18%)' },
            { icon: '📹', label: 'First Video Post', detail: 'Sustainability video (306 imp, 113 views)' },
            { icon: '⚠️', label: 'Zero Clicks', detail: 'CURE-O-POXY 8062 (103 imp, 0% CTR)' },
          ].map((b) => (
            <div key={b.label} style={{
              background: '#fff', border: '1px solid #DADCE0', borderRadius: 20,
              padding: '0.35rem 0.85rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.4rem',
            }}>
              <span>{b.icon}</span>
              <strong style={{ color: '#003366' }}>{b.label}:</strong>
              <span style={{ color: '#555' }}>{b.detail}</span>
            </div>
          ))}
        </div>

        <ZoomImg src="/Content_Engagement_1 copy.png" alt="Content Engagement — Part 1" caption="Source: Content_Engagement_1.png | Mar 14 – May 11, 2026" />
        <ZoomImg src="/Content_Engagement_2 copy.png" alt="Content Engagement — Part 2" caption="Source: Content_Engagement_2.png | Apr 21 – May 1, 2026" />
        <ZoomImg src="/Content_Engagement_3 copy.png" alt="Content Engagement — Part 3" caption="Source: Content_Engagement_3.png | Apr 6 – Apr 22, 2026" />

        {/* Impressions bar chart */}
        <div style={{ marginTop: '1.5rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Impressions per Post
          </div>
          {[
            { title: 'American Coatings Show', impr: 754, clicks: 24 },
            { title: 'Sustainability Chemistry (Video)', impr: 306, clicks: 9 },
            { title: 'Maharashtra Entrepreneurial Spirit', impr: 320, clicks: 6 },
            { title: 'CURE-O-POXY 8562 (May)', impr: 305, clicks: 9 },
            { title: 'Polyamides vs Phenalkamines', impr: 214, clicks: 6 },
            { title: 'CURE-O-POXY 8562 (Apr 24)', impr: 165, clicks: 4 },
            { title: 'CURE-O-POXY 8207 Cold-Cure', impr: 184, clicks: 3 },
            { title: 'FY 2026-27 Bio-Based', impr: 134, clicks: 3 },
            { title: 'CURE-O-POXY 8062', impr: 103, clicks: 0 },
            { title: 'NEO-ALKYD 7110×60', impr: 72, clicks: 2 },
          ].map((row) => {
            const color = row.impr >= 500 ? '#1B5E20' : row.impr >= 150 ? '#B8860B' : '#AAAAAA';
            return (
              <div key={row.title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem' }}>
                <div style={{ minWidth: 220, fontSize: '0.77rem', color: '#444', flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.title}</div>
                <div style={{ flex: 1, height: 12, background: '#E8EAED', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${(row.impr / 754) * 100}%`, height: '100%', background: color, borderRadius: 6, transition: 'width 800ms ease' }} />
                </div>
                <div style={{ minWidth: 32, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#003366' }}>{row.impr}</div>
              </div>
            );
          })}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem', fontSize: '0.72rem', color: '#666' }}>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#1B5E20', borderRadius: 2, marginRight: '0.3rem' }} />500+ impressions</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#B8860B', borderRadius: 2, marginRight: '0.3rem' }} />150–499</span>
            <span><span style={{ display: 'inline-block', width: 10, height: 10, background: '#AAAAAA', borderRadius: 2, marginRight: '0.3rem' }} />Under 150</span>
          </div>
        </div>

        <SortTable
          headers={['Post Title', 'Date', 'Type', 'Impressions', 'Clicks', 'CTR']}
          rows={[
            { 'Post Title': 'American Coatings Show + Conference (Indianapolis)', Date: '5/7/2026', Type: 'Image', Impressions: 754, Clicks: 24, CTR: '3.18%' },
            { 'Post Title': 'Maharashtra entrepreneurial spirit & industrial heritage', Date: '5/1/2026', Type: 'Image', Impressions: 320, Clicks: 6, CTR: '1.88%' },
            { 'Post Title': 'Humidity-induced blushing — CURE-O-POXY™ 8562 (May)', Date: '5/5/2026', Type: 'Image', Impressions: 305, Clicks: 9, CTR: '2.95%' },
            { 'Post Title': 'Most companies talk sustainability (Video)', Date: '4/22/2026', Type: 'Video', Impressions: 306, Clicks: 9, CTR: '2.94%' },
            { 'Post Title': 'Tropical environments: polyamides vs phenalkamines', Date: '4/21/2026', Type: 'Image', Impressions: 214, Clicks: 6, CTR: '2.80%' },
            { 'Post Title': 'All-weather durability — NEO-ALKYD™ 7110×60', Date: '5/11/2026', Type: 'Image', Impressions: 72, Clicks: 2, CTR: '2.78%' },
            { 'Post Title': 'Winter maintenance — CURE-O-POXY™ 8207 cold-cure', Date: '4/29/2026', Type: 'Image', Impressions: 184, Clicks: 3, CTR: '1.63%' },
            { 'Post Title': 'FY 2026–27 bio-based innovation commitment', Date: '4/6/2026', Type: 'Image', Impressions: 134, Clicks: 3, CTR: '2.24%' },
            { 'Post Title': 'Humidity-induced blushing — CURE-O-POXY™ 8562 (Apr)', Date: '4/24/2026', Type: 'Image', Impressions: 165, Clicks: 4, CTR: '2.42%' },
            { 'Post Title': 'Extended overcoat intervals — CURE-O-POXY™ 8062', Date: '4/27/2026', Type: 'Image', Impressions: 103, Clicks: 0, CTR: '0%' },
          ]}
          highlightCol={3}
        />

        <Callout type="warning" title="Content Performance Analysis">
          <strong>HIGHEST IMPRESSIONS:</strong> American Coatings Show post (754) — NSPC's single highest impression post in any recorded period. Event/exhibition content dramatically outperforms all other formats. <strong>FIRST VIDEO:</strong> The sustainability video (306 impressions, 113 video views) validates the video format. <strong>ZERO CLICKS:</strong> CURE-O-POXY 8062 post (103 impressions, 0% CTR) — the 'Extended overcoat intervals' angle is too technical without a problem hook. <strong>PATTERN:</strong> Posts framed around a specific problem consistently achieve 2.80–3.18% CTR.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.6 Competitive Benchmarking ── */}
      <section id="mar-li-competitors" className="section">
        <h2>1.6 — Competitive Benchmarking</h2>

        <ZoomImg
          src="/Competitor_Highlights copy.png"
          alt="Competitor Highlights — Last 57 days"
          caption="Source: Competitor_Highlights.png | Last 57 days"
        />

        {/* Period-level summary */}
        <div style={{ display: 'flex', gap: '1rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
          {[
            { label: 'NSPC Comments vs competitor average', val: '▼ 79.5% below', color: '#C62828' },
            { label: 'NSPC New Followers vs competitor', val: '▼ 87.4% below', color: '#C62828' },
          ].map((item) => (
            <div key={item.label} style={{
              flex: '1 1 280px', background: '#FFEBEE', borderLeft: '4px solid #C62828',
              borderRadius: '0 8px 8px 0', padding: '0.75rem 1rem', fontSize: '0.875rem',
            }}>
              <div style={{ fontWeight: 700, color: '#C62828', marginBottom: '0.2rem' }}>{item.val}</div>
              <div style={{ color: '#555' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <SortTable
          headers={['Metric', 'Cardolite (5,660 followers)', 'NSPC (938 followers)', 'NSPC vs Competitor']}
          rows={[
            { Metric: 'New Followers', 'Cardolite (5,660 followers)': '128 (▲0.8%)', 'NSPC (938 followers)': '57 (▲5.6%)', 'NSPC vs Competitor': 'NSPC wins on % growth rate' },
            { Metric: 'Posts Published', 'Cardolite (5,660 followers)': '7 (▲40%)', 'NSPC (938 followers)': '13 (▼45.8%)', 'NSPC vs Competitor': 'NSPC posted nearly 2× more' },
            { Metric: 'Comments', 'Cardolite (5,660 followers)': '19 (▲533.3%)', 'NSPC (938 followers)': '7 (▲75%)', 'NSPC vs Competitor': 'Cardolite leads by 2.7×' },
            { Metric: 'Reactions', 'Cardolite (5,660 followers)': '391 (▲2.1%)', 'NSPC (938 followers)': '211 (▼22.1%)', 'NSPC vs Competitor': 'Cardolite leads by 1.85×' },
          ]}
        />

        <Callout type="warning" title="Quality Over Quantity">
          Cardolite published 7 posts and generated 391 reactions. NSPC published 13 posts and generated 211 reactions. This is a clear quality-over-quantity signal — Cardolite's content resonates more deeply per post. Reducing posting frequency while investing more per post is the recommended adjustment. Cardolite's +533.3% comment surge suggests a high-engagement campaign this period — worth monitoring their content calendar.
        </Callout>
      </section>

    </div>
  );
}

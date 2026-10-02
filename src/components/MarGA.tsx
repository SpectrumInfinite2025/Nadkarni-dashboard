import { useState, useRef, useEffect } from 'react';

/* ── lightbox ── */
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
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
      <img src={src} alt={alt} onClick={(e) => e.stopPropagation()} style={{ maxWidth: '92vw', maxHeight: '90vh', borderRadius: 8, boxShadow: '0 8px 40px rgba(0,0,0,0.6)' }} />
    </div>
  );
}

function ZoomImg({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="image-container" style={{ marginTop: '1.25rem' }}>
      <img src={src} alt={alt} className="dashboard-image" onClick={() => setOpen(true)} style={{ cursor: 'zoom-in' }} />
      <p style={{ fontSize: '0.78rem', color: '#888', fontStyle: 'italic', marginTop: '0.4rem', marginBottom: 0 }}>{caption}</p>
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
    const va = a[headers[sortCol]]; const vb = b[headers[sortCol]];
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
              <th key={i} onClick={() => { if (sortCol === i) setAsc(!asc); else { setSortCol(i); setAsc(true); } }} style={{ padding: '0.6rem 0.8rem', color: '#fff', fontWeight: 700, textAlign: i === 0 ? 'left' : 'right', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none' }}>
                {h} {sortCol === i ? (asc ? ' ↑' : ' ↓') : ' ⇅'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr key={ri} style={{ background: ri % 2 === 0 ? '#fff' : '#F5F5F5' }}>
              {headers.map((h, ci) => (
                <td key={ci} style={{ padding: '0.55rem 0.8rem', textAlign: ci === 0 ? 'left' : 'right', fontWeight: highlightCol === ci ? 700 : 400, color: highlightCol === ci ? '#003366' : '#212121' }}>{row[h]}</td>
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
  const suffix = value.replace(/^[^0-9]*/, '').replace(/[0-9,.]+/, '');
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const dur = 900; const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        const v = ease * numericEnd;
        setDisplay(prefix + (isFloat ? v.toFixed(1) : Math.floor(v).toLocaleString()) + suffix);
        if (t < 1) requestAnimationFrame(tick); else setDisplay(value);
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
      <div ref={ref} style={{ fontSize: '1.75rem', fontWeight: 800, color: '#003366', lineHeight: 1.1 }}>{display}</div>
      <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>{label}</div>
      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: changeColor, marginTop: '0.3rem' }}>{changePrefix}{change}</div>
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
    <div style={{ borderLeft: `6px solid ${s.border}`, background: s.bg, borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', marginTop: '1.25rem', fontSize: '0.875rem', color: '#212121', lineHeight: 1.65 }}>
      {title && <div style={{ fontWeight: 700, marginBottom: '0.4rem', color: s.border }}>{s.icon} {title}</div>}
      {!title && <span style={{ marginRight: '0.4rem' }}>{s.icon}</span>}
      {children}
    </div>
  );
}

export default function MarGA() {
  return (
    <div className="accordion-content">

      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#mar-ga-overview" className="toc-link">Search Performance Overview</a>
          <a href="#mar-ga-queries" className="toc-link">Top Queries</a>
          <a href="#mar-ga-gsc-detail" className="toc-link">GSC Query Detail</a>
          <a href="#mar-ga-emerging" className="toc-link">Emerging & Long-Tail Queries</a>
          <a href="#mar-ga-active" className="toc-link">GA4 Active Users</a>
          <a href="#mar-ga-pages" className="toc-link">Page Views & Events</a>
          <a href="#mar-ga-engagement" className="toc-link">Top Pages by Engagement</a>
          <a href="#mar-ga-clicks" className="toc-link">Content Click Performance</a>
          <a href="#mar-ga-sources" className="toc-link">Traffic Sources</a>
          <a href="#mar-ga-geo" className="toc-link">Geographic Performance</a>
          <a href="#mar-ga-stickiness" className="toc-link">User Stickiness</a>
          <a href="#mar-ga-rankings" className="toc-link">Confirmed Rankings</a>
          <a href="#mar-ga-actions" className="toc-link">Actions & Recommendations</a>
        </div>
      </div>

      {/* ── 2.1 Search Performance Overview ── */}
      <section id="mar-ga-overview" className="section">
        <h2>2.1 — GSC Search Performance Overview</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>GSC — Mar 15 – May 8, 2026</p>

        <ZoomImg src="/Performance_Snapshot.png" alt="GSC Performance Snapshot Mar 15 – May 8, 2026" caption="Source: Performance_Snapshot.png | GSC — 3/15/26 – 5/8/26" />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="561" label="Total Clicks" change="3% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="89,700" label="Total Impressions" change="10% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="0.6%" label="Average CTR" change="stable" changeDir="neutral" accent="#B8860B" />
          <KpiCard value="5.7" label="Average Position" change="improved from 6.6" changeDir="up" accent="#1B5E20" />
        </div>

        <Callout type="highlight" title="Position Improving — Best Ranking Period on Record">
          Position improving from 6.6 to 5.7 is the standout SEO win of this period — the site is ranking higher across its indexed query set than at any previously measured point. The April 20 near-zero click day (visible in the chart) must be investigated for a crawl issue or site downtime event.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.2 Top Queries ── */}
      <section id="mar-ga-queries" className="section">
        <h2>2.2 — Top Queries</h2>

        <ZoomImg src="/Queries_leading_to_our_site.png" alt="Top Queries Leading to Site" caption="Source: Queries_leading_to_our_site.png" />

        {/* Brand vs non-brand donut */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: '1.25rem' }}>
          <div style={{ flex: '0 0 auto' }}>
            <svg viewBox="0 0 120 120" width="130" height="130">
              {(() => {
                const segs = [
                  { pct: 57, color: '#003366', label: 'Brand' },
                  { pct: 43, color: '#006B6B', label: 'Non-brand' },
                ];
                const r = 46, cx = 60, cy = 60;
                let cum = 0;
                return segs.map((s, i) => {
                  const start = (cum / 100) * 2 * Math.PI - Math.PI / 2;
                  cum += s.pct;
                  const end = (cum / 100) * 2 * Math.PI - Math.PI / 2;
                  const x1 = cx + r * Math.cos(start); const y1 = cy + r * Math.sin(start);
                  const x2 = cx + r * Math.cos(end); const y2 = cy + r * Math.sin(end);
                  return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${s.pct > 50 ? 1 : 0},1 ${x2},${y2} Z`} fill={s.color} opacity={0.85} />;
                });
              })()}
              <circle cx="60" cy="60" r="28" fill="#fff" />
              <text x="60" y="56" textAnchor="middle" fontSize="9" fontWeight="700" fill="#212121">Click</text>
              <text x="60" y="67" textAnchor="middle" fontSize="9" fontWeight="700" fill="#212121">Split</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: '0.4rem', fontSize: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#555' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#003366', flexShrink: 0 }} />Brand (~57%)</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#555' }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#006B6B', flexShrink: 0 }} />Non-brand (~43%)</span>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <SortTable
              headers={['Query', 'Clicks', 'Change', 'Related Variants']}
              rows={[
                { Query: 'nadkarni specialty polymers', Clicks: 194, Change: '▲ +106%', 'Related Variants': 'nadkarni speciality polymers and coatings...' },
                { Query: 'cathodic disbondment', Clicks: 40, Change: '▼ 26%', 'Related Variants': 'what is cathodic disbondment, test' },
                { Query: 'paint technology', Clicks: 27, Change: '▼ 16%', 'Related Variants': 'painting technology, paint technologies' },
                { Query: 'ester vs ether', Clicks: 22, Change: '▲ +175%', 'Related Variants': 'ether vs ester, difference ether ester' },
                { Query: 'nadkarni', Clicks: 11, Change: '▼ 21%', 'Related Variants': 'nandkarni' },
                { Query: 'ethers and esters', Clicks: 4, Change: '→ —', 'Related Variants': 'ester and ether, ikatan eter dan ester' },
              ]}
              highlightCol={1}
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 2.3 GSC Query Detail ── */}
      <section id="mar-ga-gsc-detail" className="section">
        <h2>2.3 — GSC Query Detail</h2>

        <ZoomImg src="/Search_Queries.png" alt="GSC Search Queries Tab" caption="Source: Search_Queries.png | GSC Queries Tab" />

        <SortTable
          headers={['Query', 'Clicks', 'Impressions', 'CTR (calc)', 'Notes']}
          rows={[
            { Query: 'nadkarni specialty polymers', Clicks: 45, Impressions: 65, 'CTR (calc)': '69.2%', Notes: 'Brand — primary' },
            { Query: 'cathodic disbondment', Clicks: 17, Impressions: 258, 'CTR (calc)': '6.6%', Notes: 'Non-brand technical' },
            { Query: 'paint technology', Clicks: 13, Impressions: 489, 'CTR (calc)': '2.66%', Notes: 'Non-brand' },
            { Query: 'nadkarni speciality polymers and coatings private', Clicks: 13, Impressions: 33, 'CTR (calc)': '39.4%', Notes: 'Brand variant' },
            { Query: 'nadkarni speciality polymers and coatings private limited', Clicks: 10, Impressions: 26, 'CTR (calc)': '38.5%', Notes: 'Brand full name' },
            { Query: 'nadkarni', Clicks: 8, Impressions: 304, 'CTR (calc)': '2.63%', Notes: 'Brand short' },
            { Query: 'ester vs ether', Clicks: 7, Impressions: 9744, 'CTR (calc)': '0.07%', Notes: '🔴 URGENT — massive impression gap' },
            { Query: 'ether vs ester', Clicks: 5, Impressions: 8273, 'CTR (calc)': '0.06%', Notes: '🔴 URGENT — compounding' },
          ]}
          highlightCol={1}
        />

        <Callout type="critical" title="18,017 Impressions — 12 Clicks (0.07% CTR)">
          The 'ester vs ether' and 'ether vs ester' query cluster now generates a combined <strong>18,017 impressions per period</strong> — yet produces only 12 combined clicks (0.07% CTR). NSPC's Ethers vs Esters page already ranks at confirmed position #4. Optimising the meta title and description for this query cluster alone could realistically deliver <strong>150–300 additional clicks per month</strong>. This is the single highest-impact SEO action available.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.4 Emerging Queries ── */}
      <section id="mar-ga-emerging" className="section">
        <h2>2.4 — Emerging & Long-Tail Queries</h2>

        <ZoomImg src="/Queries_leading_to_our_site_2.png" alt="Queries Leading to Site — Page 2" caption="Source: Queries_leading_to_our_site_2.png" />
        <ZoomImg src="/Queries_leading_to_our_site_3.png" alt="Queries Leading to Site — Page 3" caption="Source: Queries_leading_to_our_site_3.png" />

        <SortTable
          headers={['Query', 'Clicks', 'Change', 'Signal']}
          rows={[
            { Query: 'disbondment', Clicks: 3, Change: 'Previously 0', Signal: '▲ New — technical authority expanding' },
            { Query: 'chemistry in paints', Clicks: 3, Change: '▼ 50%', Signal: 'Educational content — declining' },
            { Query: 'epoxy flooring durability', Clicks: 2, Change: '▲ 100%', Signal: 'Application-specific — new segment' },
            { Query: 'nspc company', Clicks: 2, Change: '▲ 100%', Signal: 'Brand discovery growing' },
            { Query: 'paint technology book pdf', Clicks: 2, Change: '▼ 50%', Signal: 'Downloadable resource opportunity' },
            { Query: 'prasad nadkarni', Clicks: 2, Change: '▲ 100%', Signal: 'Founder brand queries growing' },
            { Query: 'curing agents for epoxy resins', Clicks: 2, Change: '▼ 71%', Signal: 'Product-relevant' },
            { Query: 'epoxy resin for electronic components', Clicks: 2, Change: 'Previously 0', Signal: '▲ New vertical — electronics' },
            { Query: '2k epoxy resin', Clicks: 1, Change: 'Previously 0', Signal: '▲ New — NEOPOXY opportunity' },
            { Query: 'cashew nut shell liquid cardanol', Clicks: 1, Change: '→ stable', Signal: 'CNSL niche searchers' },
            { Query: 'desprendimiento catodico', Clicks: 1, Change: 'Previously 0', Signal: '▲ NEW — Spanish query (LATAM/Spain)' },
          ]}
          highlightCol={1}
        />

        <Callout type="insight">
          'desprendimiento catodico' (Spanish for cathodic disbondment) and an Indonesian query variant ('ikatan eter dan ester') indicate NSPC's content is being discovered by non-English international searchers. This is an organic signal that the technical content has global relevance. Adding a Spanish meta description to the Cathodic Disbondment article could improve CTR for Latin American, Spanish, and Mexican industrial audiences.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.1 GA4 Active Users ── */}
      <section id="mar-ga-active" className="section">
        <h2>3.1 — GA4 Active Users Overview</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>GA4 — Mar 15–May 12, 2026</p>

        <ZoomImg src="/Active_Users copy.png" alt="GA4 Active Users Mar 15 – May 12, 2026" caption="Source: Active_Users.png | GA4 — Mar 15–May 12, 2026" />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="1,000" label="Active Users" change="19.7% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="9,800" label="Event Count" change="11.2% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="968" label="New Users" change="18.2% vs prev" changeDir="down" accent="#003366" />
        </div>

        <Callout type="insight">
          The period-over-period declines (19.7% active users, 18.2% new users) represent normalisation after the exceptional Jan–Feb surge, not a structural decline. NSPC still tracks above peer median for much of the period. The <strong>April 2–3 spike</strong> likely reflects the FY 2026–27 content push and increased search visibility.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.2 Page Views & Events ── */}
      <section id="mar-ga-pages" className="section">
        <h2>3.2 — Page Views & Events</h2>

        <ZoomImg src="/Page_views_and_time_spent.png" alt="Page Views and Time Spent — GA4" caption="Source: Page_views_and_time_spent.png | GA4" />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="3,400" label="Total Page Views" change="period total" changeDir="neutral" accent="#003366" />
          <KpiCard value="9,800" label="Total Event Count" change="period total" changeDir="neutral" accent="#003366" />
        </div>

        <SortTable
          headers={['Event Name', 'Event Count', 'What It Means']}
          rows={[
            { 'Event Name': 'page_view', 'Event Count': 3400, 'What It Means': 'Core traffic — every page load' },
            { 'Event Name': 'user_engagement', 'Event Count': 2300, 'What It Means': 'Active on-page interactions' },
            { 'Event Name': 'session_start', 'Event Count': 1500, 'What It Means': 'Individual visit sessions' },
            { 'Event Name': 'scroll', 'Event Count': 1200, 'What It Means': 'Users reading past the fold' },
            { 'Event Name': 'first_visit', 'Event Count': 968, 'What It Means': 'Unique new visitors' },
            { 'Event Name': 'form_start', 'Event Count': 407, 'What It Means': '⭐ High-intent — contact form interactions' },
            { 'Event Name': 'click', 'Event Count': 35, 'What It Means': 'Outbound / internal link clicks' },
          ]}
          highlightCol={1}
        />

        <Callout type="highlight" title="407 Form Starts — Commercial Intent Signal">
          407 form_start events represent the most commercially significant metric in this entire dataset. Users actively beginning to fill a contact form indicates genuine purchase or inquiry intent. Implement GA4 form_submit event tracking to measure the drop-off rate between form_start and actual submission — this will reveal the conversion funnel gap.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.3 Top Pages ── */}
      <section id="mar-ga-engagement" className="section">
        <h2>3.3 — Top Pages by Engagement</h2>

        <ZoomImg src="/Page_links_&_Engagement.png" alt="Page Links and Engagement — GA4" caption="Source: Page_links_&_Engagement.png | GA4 — Pages Detail" />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '1rem 0', fontSize: '0.8rem' }}>
          {[
            { label: 'Total Views', val: '1,849' },
            { label: 'Active Users', val: '456' },
            { label: 'Views/User', val: '4.05' },
            { label: 'Avg. Engagement', val: '1m 23s' },
          ].map((m) => (
            <span key={m.label} style={{ border: '1px solid #DADCE0', borderRadius: 20, padding: '0.3rem 0.75rem', background: '#fff' }}>
              <strong style={{ color: '#003366' }}>{m.val}</strong>
              <span style={{ color: '#555', marginLeft: '0.3rem' }}>{m.label}</span>
            </span>
          ))}
        </div>

        <SortTable
          headers={['#', 'Page Title', 'Views', 'Active Users', 'Views/User', 'Avg. Eng. Time']}
          rows={[
            { '#': 1, 'Page Title': 'Manufacturer & Global Supplier | NSPC', Views: 294, 'Active Users': 170, 'Views/User': 1.73, 'Avg. Eng. Time': '33s' },
            { '#': 2, 'Page Title': 'Contact NSPC | Global Polymer Experts', Views: 179, 'Active Users': 84, 'Views/User': 2.13, 'Avg. Eng. Time': '38s' },
            { '#': 3, 'Page Title': 'Specialty Polymers & Coatings Products', Views: 77, 'Active Users': 59, 'Views/User': 1.31, 'Avg. Eng. Time': '31s' },
            { '#': 4, 'Page Title': 'Understanding Cathodic Disbondment', Views: 77, 'Active Users': 40, 'Views/User': 1.93, 'Avg. Eng. Time': '1m 52s' },
            { '#': 5, 'Page Title': 'Home | Nadkarni', Views: 75, 'Active Users': 11, 'Views/User': 6.82, 'Avg. Eng. Time': '53s' },
            { '#': 6, 'Page Title': 'Ethers vs. Esters: Bonds That Last!', Views: 59, 'Active Users': 52, 'Views/User': 1.13, 'Avg. Eng. Time': '22s' },
            { '#': 7, 'Page Title': 'Pioneering CNSL Technology | NSPC', Views: 56, 'Active Users': 44, 'Views/User': 1.27, 'Avg. Eng. Time': '51s' },
            { '#': 8, 'Page Title': 'Epoxy Solutions for Coatings & Adhesives', Views: 53, 'Active Users': 34, 'Views/User': 1.56, 'Avg. Eng. Time': '58s' },
            { '#': 9, 'Page Title': 'Contact | Nadkarni ⭐ Highest Eng. Time', Views: 49, 'Active Users': 6, 'Views/User': 8.17, 'Avg. Eng. Time': '4m 15s' },
            { '#': 10, 'Page Title': 'About NSPC | Pioneers in CNSL Technology', Views: 45, 'Active Users': 33, 'Views/User': 1.36, 'Avg. Eng. Time': '1m 11s' },
          ]}
          highlightCol={2}
        />

        <Callout type="highlight" title="Contact Page — 4m 15s Engagement">
          The 'Contact | Nadkarni' page has only 49 views but an extraordinary <strong>4m 15s average engagement time</strong> — the highest of any page on the site. Users spending over 4 minutes on a contact page are deliberating before reaching out. Ensure the contact page has clear response time commitments, multiple contact options, and proof points (product range, certifications, client sectors) to reduce hesitation.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.4 Content Clicks ── */}
      <section id="mar-ga-clicks" className="section">
        <h2>3.4 — Content Click Performance</h2>

        <ZoomImg src="/Content_Clicks.png" alt="Content Clicks — GA4 Home Content Tab" caption="Source: Content_Clicks.png | GA4 Home — Content tab" />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="1,040" label="Total Clicks" change="3% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="158,000" label="Total Impressions" change="10% vs prev" changeDir="down" accent="#003366" />
        </div>

        <SortTable
          headers={['Page', 'Clicks', 'Change', 'Signal']}
          rows={[
            { Page: 'Homepage', Clicks: 342, Change: '▲ +44%', Signal: 'Strong brand search growth' },
            { Page: 'Understanding Cathodic Disbondment', Clicks: 98, Change: '▼ 19%', Signal: 'Normalisation after peak' },
            { Page: 'SIMPLIFIED: Paint Technology 101', Clicks: 92, Change: '▼ 38%', Signal: 'Declining — refresh recommended' },
            { Page: 'Ethers vs. Esters: Bonds That Last!', Clicks: 56, Change: '▲ +65%', Signal: 'Breaking out — priority optimise' },
          ]}
          highlightCol={1}
        />
      </section>

      <div className="section-divider" />

      {/* ── 3.5 Traffic Sources ── */}
      <section id="mar-ga-sources" className="section">
        <h2>3.5 — Traffic Sources</h2>

        <ZoomImg src="/Traffic_Sources.png" alt="Traffic Sources — GA4 Channel Breakdown" caption="Source: Traffic_Sources.png | GA4 Channel Breakdown" />

        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-start', marginTop: '1.25rem' }}>
          {/* Donut */}
          <div style={{ flex: '0 0 auto' }}>
            <svg viewBox="0 0 120 120" width="130" height="130">
              {(() => {
                const segs = [
                  { pct: 59.14, color: '#003366', label: 'Organic' },
                  { pct: 33.86, color: '#5F6368', label: 'Direct' },
                  { pct: 3.66, color: '#1B5E20', label: 'Social' },
                  { pct: 2.54, color: '#006B6B', label: 'Referral' },
                  { pct: 0.64, color: '#B8860B', label: 'Unassigned' },
                ];
                const r = 46, cx = 60, cy = 60; let cum = 0;
                return segs.map((s, i) => {
                  const start = (cum / 100) * 2 * Math.PI - Math.PI / 2;
                  cum += s.pct;
                  const end = (cum / 100) * 2 * Math.PI - Math.PI / 2;
                  const x1 = cx + r * Math.cos(start); const y1 = cy + r * Math.sin(start);
                  const x2 = cx + r * Math.cos(end); const y2 = cy + r * Math.sin(end);
                  return <path key={i} d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${s.pct > 50 ? 1 : 0},1 ${x2},${y2} Z`} fill={s.color} opacity={0.85} />;
                });
              })()}
              <circle cx="60" cy="60" r="28" fill="#fff" />
              <text x="60" y="56" textAnchor="middle" fontSize="8" fontWeight="700" fill="#212121">629</text>
              <text x="60" y="67" textAnchor="middle" fontSize="7" fill="#555">Sessions</text>
            </svg>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.4rem', fontSize: '0.72rem' }}>
              {[['#003366', 'Organic 59%'], ['#5F6368', 'Direct 34%'], ['#1B5E20', 'Social 4%'], ['#006B6B', 'Referral 3%'], ['#B8860B', 'Unassigned 1%']].map(([c, l]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#555' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, flexShrink: 0 }} />{l}
                </span>
              ))}
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 280 }}>
            <SortTable
              headers={['Channel', 'Sessions', '% Total', 'Engaged', 'Eng. Rate', 'Avg. Eng. Time']}
              rows={[
                { Channel: 'Organic Search', Sessions: 372, '% Total': '59.14%', Engaged: 231, 'Eng. Rate': '62.1%', 'Avg. Eng. Time': '1m 20s' },
                { Channel: 'Direct', Sessions: 213, '% Total': '33.86%', Engaged: 113, 'Eng. Rate': '53.05%', 'Avg. Eng. Time': '30s' },
                { Channel: 'Organic Social (LinkedIn)', Sessions: 23, '% Total': '3.66%', Engaged: 9, 'Eng. Rate': '39.13%', 'Avg. Eng. Time': '40s' },
                { Channel: 'Referral', Sessions: 16, '% Total': '2.54%', Engaged: 12, 'Eng. Rate': '75%', 'Avg. Eng. Time': '41s' },
                { Channel: 'Unassigned', Sessions: 4, '% Total': '0.64%', Engaged: 1, 'Eng. Rate': '25%', 'Avg. Eng. Time': '5s' },
                { Channel: 'TOTAL', Sessions: 629, '% Total': '100%', Engaged: 367, 'Eng. Rate': '58.35%', 'Avg. Eng. Time': '1m 00s' },
              ]}
              highlightCol={1}
            />
          </div>
        </div>

        <Callout type="insight">
          Referral traffic achieves the <strong>highest engagement rate of any channel at 75%</strong> — higher even than Organic Search (62.1%). Organic Social (LinkedIn) improved meaningfully from 1s average engagement (Jan–Feb) to 40s — the LinkedIn audience is landing on more relevant content. However, 23 sessions from LinkedIn for 938 followers and 9,259 impressions remains a very low social-to-website conversion rate.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.6 Geographic ── */}
      <section id="mar-ga-geo" className="section">
        <h2>3.6 — Geographic Performance</h2>

        <ZoomImg src="/Active_users_by_Country.png" alt="Active Users by Country — GA4" caption="Source: Active_users_by_Country.png | GA4 — Mar 15–May 12, 2026" />

        <SortTable
          headers={['#', 'Country', 'Active Users', 'Change vs Prior', 'Key Observation']}
          rows={[
            { '#': 1, Country: 'India', 'Active Users': 425, 'Change vs Prior': '▼ 24.4%', 'Key Observation': 'Primary market — normalisation' },
            { '#': 2, Country: 'United States', 'Active Users': 231, 'Change vs Prior': '▼ 13.2%', 'Key Observation': 'Strong #2 — modest decline' },
            { '#': 3, Country: 'Germany', 'Active Users': 47, 'Change vs Prior': '▲ +161%', 'Key Observation': '⭐ Breakout — massive growth' },
            { '#': 4, Country: 'United Kingdom', 'Active Users': 36, 'Change vs Prior': '▲ +33.3%', 'Key Observation': 'Consistent growth' },
            { '#': 5, Country: 'Singapore', 'Active Users': 34, 'Change vs Prior': '▲ +100%', 'Key Observation': '⭐ Doubled — ASEAN emerging' },
            { '#': 6, Country: 'China', 'Active Users': 26, 'Change vs Prior': '▼ 13.3%', 'Key Observation': 'Slight decline — monitor' },
            { '#': 7, Country: 'Canada', 'Active Users': 20, 'Change vs Prior': '→ 0.0%', 'Key Observation': 'Stable' },
          ]}
          highlightCol={2}
        />

        {/* World map visual */}
        <div style={{ marginTop: '1.25rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {[
            { flag: '🇮🇳', country: 'India', users: 425, change: '▼', color: '#C62828' },
            { flag: '🇺🇸', country: 'USA', users: 231, change: '▼', color: '#C62828' },
            { flag: '🇩🇪', country: 'Germany', users: 47, change: '▲', color: '#1B5E20' },
            { flag: '🇬🇧', country: 'UK', users: 36, change: '▲', color: '#1B5E20' },
            { flag: '🇸🇬', country: 'Singapore', users: 34, change: '▲', color: '#1B5E20' },
            { flag: '🇨🇳', country: 'China', users: 26, change: '▼', color: '#C62828' },
            { flag: '🇨🇦', country: 'Canada', users: 20, change: '→', color: '#B8860B' },
          ].map((c) => (
            <div key={c.country} style={{
              background: '#fff', border: '1px solid #DADCE0', borderRadius: 8,
              padding: '0.65rem 0.9rem', textAlign: 'center', minWidth: 90,
              borderBottom: `3px solid ${c.color}`,
            }}>
              <div style={{ fontSize: '1.6rem' }}>{c.flag}</div>
              <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.15rem' }}>{c.country}</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#003366' }}>{c.users}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: c.color }}>{c.change}</div>
            </div>
          ))}
        </div>

        <Callout type="warning" title="Germany +161% and Singapore +100% — Breakout Markets">
          Germany's +161% active user growth and Singapore's +100% growth are the two most significant geographic developments this period. Germany is a major industrial coatings market with stringent sustainability regulations (EU Green Deal). Singapore represents the ASEAN gateway. Both markets are discovering NSPC organically — creating geo-targeted content for these markets could significantly accelerate conversion.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 3.7 User Stickiness ── */}
      <section id="mar-ga-stickiness" className="section">
        <h2>3.7 — User Stickiness</h2>

        <ZoomImg src="/User_Stickiness.png" alt="User Stickiness — GA4" caption="Source: User_Stickiness.png | GA4 — Mar 15–May 12, 2026" />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <div className="stat-card" style={{ textAlign: 'center', borderTop: '3px solid #E37400' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#E37400' }}>21.0%</div>
            <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>WAU / MAU</div>
            <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.2rem' }}>Weekly returning users</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a73e8' }}>0.0%</div>
            <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>DAU / WAU</div>
            <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.2rem' }}>Expected for B2B</div>
          </div>
          <div className="stat-card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#34A853' }}>0.0%</div>
            <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>DAU / MAU</div>
            <div style={{ fontSize: '0.78rem', color: '#666', marginTop: '0.2rem' }}>Expected for B2B</div>
          </div>
        </div>

        <p style={{ marginTop: '1rem', color: '#444', fontSize: '0.9rem', lineHeight: 1.7 }}>
          WAU/MAU at 21% means approximately 1 in 5 monthly visitors also returned within the same week. This is a healthy stickiness rate for B2B content sites where purchase cycles are long. The near-zero DAU metrics are expected — coating formulators do not visit a specialty chemical supplier website daily.
        </p>
      </section>

      <div className="section-divider" />

      {/* ── Rankings ── */}
      <section id="mar-ga-rankings" className="section">
        <h2>4 — Confirmed Keyword Rankings</h2>

        <div style={{ background: 'linear-gradient(135deg, #003366 0%, #006B6B 100%)', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '1.5rem', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>🏆 4 Confirmed #1 Positions</div>
          <div style={{ fontSize: '0.82rem', opacity: 0.9, marginTop: '0.3rem' }}>Air Drying 1K Epoxy · Solopoxy (×2) · Greener 2K Epoxy · Cashew Nut to Phenalkamines</div>
          <div style={{ fontSize: '0.78rem', opacity: 0.75, marginTop: '0.2rem' }}>A remarkable result for a company founded in 2021</div>
        </div>

        <SortTable
          headers={['#', 'Keyword', 'Ranking', 'Landing Page', 'Strategic Value']}
          rows={[
            { '#': 1, Keyword: 'Phenalkamines', Ranking: 'Confirmed ranking', 'Landing Page': 'Insights/product content', 'Strategic Value': '🔴 High — core product chemistry' },
            { '#': 2, Keyword: 'Air Drying 1K Epoxy Resin', Ranking: '🥇 #1', 'Landing Page': 'SOLOPOXY product page', 'Strategic Value': '🔴 High — commercial buyer intent' },
            { '#': 3, Keyword: 'Solopoxy Epoxy Resin', Ranking: '🥇 #1 and #3', 'Landing Page': 'Product page + shop listing', 'Strategic Value': '🔴 High — NSPC owns Page 1 twice' },
            { '#': 4, Keyword: 'Greener Alternative 2K Epoxy Resin', Ranking: '🥇 #1', 'Landing Page': 'Blog: NSPC Greener 2K Epoxy Resins', 'Strategic Value': '🟡 Medium — sustainability buyers' },
            { '#': 5, Keyword: 'Cashew Nut Shells to Phenalkamines', Ranking: '🥇 #1', 'Landing Page': 'CNSL insights article', 'Strategic Value': '🟡 Medium — topical CNSL authority' },
            { '#': 6, Keyword: 'Bio-Based Epoxy Resin Manufacturer India', Ranking: '#4', 'Landing Page': 'Homepage', 'Strategic Value': '🔴 High — competitive, Page 1' },
            { '#': 7, Keyword: 'Ethers vs Esters Bonds', Ranking: '#4', 'Landing Page': 'Ethers vs Esters blog', 'Strategic Value': '🔴 High — 18K+ impressions, needs CTR fix' },
          ]}
        />

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>Gap Keywords — Next Targets</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {['phenalkamine curing agent', 'CNSL epoxy resin', 'marine coating hardener', 'single pack epoxy primer', 'epoxy curing agent for concrete floors', 'bio-based coating manufacturer Germany'].map((kw) => (
              <span key={kw} className="keyword-chip">{kw}</span>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Actions ── */}
      <section id="mar-ga-actions" className="section">
        <h2>5 — Actions & Recommendations</h2>

        {/* High Priority */}
        <h3 style={{ color: '#C62828', marginBottom: '1rem' }}>🔴 High Priority</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            {
              title: 'Rewrite meta title + description for /ethers-vs-esters/',
              detail: '18,000+ combined impressions, 0.07% CTR. Even 0.5% CTR = +90 clicks/month from existing rankings. Zero content creation needed.',
              impact: '+100–300 clicks/month',
            },
            {
              title: 'Fix LinkedIn CTA button — 88 days of zero clicks',
              detail: '0 custom button clicks for two consecutive report cycles (31+57 days). Test "Download TDS" or "Request a Sample" destination and measure over 30 days.',
              impact: 'CTA engagement activation',
            },
            {
              title: 'Implement GA4 form_submit event tracking',
              detail: '407 form_start events detected but no completion tracking. Unknown conversion rate = unknown lead volume. This is a critical analytics blind spot.',
              impact: 'Lead funnel visibility',
            },
          ].map((card) => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #FFCDD2', borderLeft: '4px solid #C62828', borderRadius: '0 8px 8px 0', padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#C62828', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0, marginBottom: '0.6rem' }}>{card.detail}</p>
              <span style={{ background: '#FFEBEE', color: '#C62828', fontSize: '0.72rem', fontWeight: 700, borderRadius: 10, padding: '0.15rem 0.6rem' }}>Impact: {card.impact}</span>
            </div>
          ))}
        </div>

        {/* Medium Priority */}
        <h3 style={{ color: '#B8860B', marginBottom: '1rem' }}>🟡 Medium Priority</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {[
            { title: 'Create Germany-focused content', detail: '+161% active user growth from Germany. One article on EU Green Deal + NSPC\'s CNSL bio-based advantage could convert organic discovery into qualified leads.', impact: 'DACH market acceleration' },
            { title: 'Expand LinkedIn video content', detail: 'First video post validated format (306 imp, 113 video views). Plan a monthly video — CURE-O-POXY demo, CNSL chemistry explainer, ACS highlights reel.', impact: 'Broader content format reach' },
            { title: 'Add Spanish meta description to Cathodic Disbondment article', detail: '\'desprendimiento catodico\' Spanish query now generating clicks. LATAM, Spain, and Mexico are significant industrial coating markets.', impact: 'LATAM search visibility' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #FFE082', borderLeft: '4px solid #B8860B', borderRadius: '0 8px 8px 0', padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#B8860B', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0, marginBottom: '0.6rem' }}>{card.detail}</p>
              <span style={{ background: '#FFF8E1', color: '#B8860B', fontSize: '0.72rem', fontWeight: 700, borderRadius: 10, padding: '0.15rem 0.6rem' }}>Impact: {card.impact}</span>
            </div>
          ))}
        </div>

        {/* Lower Priority */}
        <h3 style={{ color: '#1B5E20', marginBottom: '1rem' }}>🟢 Lower Priority</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '1rem' }}>
          {[
            { title: 'Quality over quantity on LinkedIn', detail: 'Cardolite: 7 posts, 391 reactions. NSPC: 13 posts, 211 reactions. Reduce posting frequency; invest more per post in hook, visual, and CTA.', impact: 'Higher engagement rate per post' },
            { title: 'Internal linking from blogs to product pages', detail: 'Add contextual CURE-O-POXY and NEOPOXY links from high-traffic Cathodic Disbondment and Paint Technology 101 articles to drive product page discovery.', impact: 'Product page impressions and clicks' },
            { title: 'Investigate the April 20 GSC anomaly', detail: 'A near-zero-click day visible in Performance_Snapshot.png around April 20, 2026. Confirm whether this was a crawl error, site downtime, or algorithm event.', impact: 'Prevent recurrence if technical issue' },
          ].map((card) => (
            <div key={card.title} style={{ background: '#fff', border: '1px solid #C8E6C9', borderLeft: '4px solid #1B5E20', borderRadius: '0 8px 8px 0', padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0, marginBottom: '0.6rem' }}>{card.detail}</p>
              <span style={{ background: '#E8F5E9', color: '#1B5E20', fontSize: '0.72rem', fontWeight: 700, borderRadius: 10, padding: '0.15rem 0.6rem' }}>Impact: {card.impact}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

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
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out' }}
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

export default function JunGA() {
  return (
    <div className="accordion-content">

      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#jun-ga-overview" className="toc-link">Search Performance Overview</a>
          <a href="#jun-ga-activity" className="toc-link">Website User Activity</a>
          <a href="#jun-ga-pages" className="toc-link">Top Pages Driving Traffic</a>
          <a href="#jun-ga-geo" className="toc-link">Geographic Distribution</a>
          <a href="#jun-ga-engagement" className="toc-link">Page Engagement (GA4)</a>
          <a href="#jun-ga-observations" className="toc-link">Cross-Channel Observations</a>
        </div>
      </div>

      {/* ── 2.1 Search Performance Overview ── */}
      <section id="jun-ga-overview" className="section">
        <h2>2.1 — Search Performance Overview</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Google Search Console — May 15, 2026 – Jun 14, 2026 (Web search)
        </p>

        <ZoomImg
          src="/Analytics_Performance.png"
          alt="GSC Search Performance Overview May 15 – Jun 14, 2026"
          caption="Source: Analytics Performance.png | GSC — 5/15/26 – 6/14/26, Search type: Web"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="346" label="Total Clicks" change="period total" changeDir="neutral" accent="#003366" />
          <KpiCard value="38,500" label="Total Impressions" change="period total" changeDir="neutral" accent="#003366" />
          <KpiCard value="0.9%" label="Average CTR" change="stable vs prev" changeDir="neutral" accent="#B8860B" />
          <KpiCard value="8" label="Average Position" change="period average" changeDir="neutral" accent="#1B5E20" />
        </div>

        {/* Trend note */}
        <div style={{ marginTop: '1.25rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 8, padding: '1rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#003366', marginBottom: '0.4rem' }}>Trend Overview</div>
          <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.65, margin: 0 }}>
            Both clicks and impressions show a generally upward, cyclical trend across the period — with impressions consistently leading clicks. Peaks in both metrics occur in the <strong>final third of the period (early-to-mid June)</strong>, aligning with the same LinkedIn engagement surge observed in content highlights.
          </p>
        </div>

        <Callout type="insight" title="Growing Visibility — 38.5K Impressions">
          38,500 total impressions in a single 31-day period is a milestone figure for NSPC, indicating strong organic search visibility. While CTR at 0.9% remains below the 2–3% industry benchmark, the volume of impressions provides a strong foundation for CTR optimisation — particularly on high-impression, low-CTR pages like "Ethers vs. Esters".
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.2 Website User Activity ── */}
      <section id="jun-ga-activity" className="section">
        <h2>2.2 — Website User Activity Snapshot</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — May 15, 2026 – Jun 14, 2026 vs. previous period
        </p>

        <ZoomImg
          src="/User_activity_snapshot.png"
          alt="Website User Activity Snapshot — May 15 – Jun 14, 2026"
          caption="Source: User activity snapshot.png | GA4 — May 15 – Jun 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="459" label="Active Users" change="8.6% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="4,100" label="Event Count" change="24.1% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="437" label="New Users" change="8.4% vs prev" changeDir="down" accent="#003366" />
          <KpiCard value="383" label="Engaged Sessions" change="6.6% vs prev" changeDir="down" accent="#003366" />
        </div>

        <Callout type="warning" title="On-Site Engagement Dipped While Search Visibility Climbed">
          All four core engagement metrics declined slightly versus the previous period — even as Search Console clicks and impressions trended upward. This divergence suggests more visitors are arriving from search but not engaging as deeply on-site. Worth investigating: page load speed, mobile experience quality, and whether landing page content matches search intent for newly ranking queries. The <strong>event count decline of 24.1%</strong> is the most significant and warrants a GA4 event audit.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.3 Top Pages ── */}
      <section id="jun-ga-pages" className="section">
        <h2>2.3 — Top Pages Driving Search Traffic</h2>

        <ZoomImg
          src="/Top_Pages_bringing_in_traffic.png"
          alt="Top Pages Driving Traffic — May 15 – Jun 14, 2026"
          caption="Source: Top Pages bringing in traffic.png | GSC"
        />

        <SortTable
          headers={['Page URL', 'Clicks', 'Impressions', 'Est. CTR']}
          rows={[
            { 'Page URL': 'nadkarnispc.com/ (homepage)', Clicks: 114, Impressions: 1135, 'Est. CTR': '10.0%' },
            { 'Page URL': '/simplified-paint-technology-101/', Clicks: 31, Impressions: 3067, 'Est. CTR': '1.0%' },
            { 'Page URL': '/ethers-vs-esters-bonds-that-last/', Clicks: 23, Impressions: 20694, 'Est. CTR': '0.1%' },
            { 'Page URL': '/about-us/', Clicks: 21, Impressions: 375, 'Est. CTR': '5.6%' },
            { 'Page URL': '/understanding-cathodic-disbondment-.../', Clicks: 20, Impressions: 2321, 'Est. CTR': '0.9%' },
            { 'Page URL': '/part-1-exploring-epoxy-curing-agents-.../', Clicks: 15, Impressions: 2900, 'Est. CTR': '0.5%' },
            { 'Page URL': '/what-exactly-are-single-pack-epoxy-resins/', Clicks: 11, Impressions: 260, 'Est. CTR': '4.2%' },
            { 'Page URL': '/enhancing-coating-adhesion-.../', Clicks: 8, Impressions: 1913, 'Est. CTR': '0.4%' },
            { 'Page URL': '/product-category/curepoxy/phenalkamines/', Clicks: 8, Impressions: 208, 'Est. CTR': '3.8%' },
            { 'Page URL': '/product-category/curepoxy/', Clicks: 8, Impressions: 129, 'Est. CTR': '6.2%' },
          ]}
          highlightCol={1}
        />

        {/* Impressions bar chart */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Impressions per Page (Top 5)
          </div>
          {[
            { title: 'Ethers vs. Esters', clicks: 23, impr: 20694, max: 20694 },
            { title: 'Paint Technology 101', clicks: 31, impr: 3067, max: 20694 },
            { title: 'Epoxy Curing Agents Pt.1', clicks: 15, impr: 2900, max: 20694 },
            { title: 'Cathodic Disbondment', clicks: 20, impr: 2321, max: 20694 },
            { title: 'Coating Adhesion Guide', clicks: 8, impr: 1913, max: 20694 },
          ].map((row) => {
            const pct = (row.impr / row.max) * 100;
            const color = pct > 80 ? '#C62828' : pct > 30 ? '#B8860B' : '#1B5E20';
            return (
              <div key={row.title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem' }}>
                <div style={{ minWidth: 200, fontSize: '0.77rem', color: '#444', flexShrink: 0 }}>{row.title}</div>
                <div style={{ flex: 1, height: 12, background: '#E8EAED', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 6 }} />
                </div>
                <div style={{ minWidth: 52, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#003366' }}>{row.impr.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        <Callout type="critical" title="Ethers vs. Esters — 20,694 Impressions, 23 Clicks (0.1% CTR)">
          The "Ethers vs. Esters: Bonds That Last" page alone drove <strong>20,694 impressions</strong> — more than half of all period impressions — yet produced only 23 clicks (0.1% CTR). NSPC already ranks for this query; the opportunity is entirely in <strong>title and meta description optimisation</strong>. Even achieving a 1% CTR would deliver ~200 additional clicks per month with zero new content creation.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.4 Geographic Distribution ── */}
      <section id="jun-ga-geo" className="section">
        <h2>2.4 — Geographic Distribution of Search Traffic</h2>

        <ZoomImg
          src="/Countries_From_Traffic_is_coming.png"
          alt="Geographic Distribution — Countries Driving Traffic"
          caption="Source: Countries From Traffic is coming.png | GSC"
        />

        <SortTable
          headers={['Country', 'Clicks', 'Impressions', 'Est. CTR', 'Key Insight']}
          rows={[
            { Country: 'India', Clicks: 236, Impressions: 9377, 'Est. CTR': '2.5%', 'Key Insight': 'Dominant click market (68% of top-7)' },
            { Country: 'United States', Clicks: 21, Impressions: 12739, 'Est. CTR': '0.2%', 'Key Insight': 'Leads in impressions — CTR opportunity' },
            { Country: 'Turkey', Clicks: 8, Impressions: 117, 'Est. CTR': '6.8%', 'Key Insight': 'High CTR — strong intent' },
            { Country: 'United Kingdom', Clicks: 7, Impressions: 1233, 'Est. CTR': '0.6%', 'Key Insight': 'Consistent performer' },
            { Country: 'Australia', Clicks: 7, Impressions: 1126, 'Est. CTR': '0.6%', 'Key Insight': 'Consistent performer' },
            { Country: 'Canada', Clicks: 6, Impressions: 2004, 'Est. CTR': '0.3%', 'Key Insight': 'Stable' },
            { Country: 'Nigeria', Clicks: 5, Impressions: 171, 'Est. CTR': '2.9%', 'Key Insight': 'Emerging — Africa presence' },
          ]}
          highlightCol={1}
        />

        {/* Country flags visual */}
        <div style={{ marginTop: '1.25rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          {[
            { flag: '🇮🇳', country: 'India', clicks: 236, color: '#1B5E20' },
            { flag: '🇺🇸', country: 'USA', clicks: 21, color: '#003366' },
            { flag: '🇹🇷', country: 'Turkey', clicks: 8, color: '#B8860B' },
            { flag: '🇬🇧', country: 'UK', clicks: 7, color: '#006B6B' },
            { flag: '🇦🇺', country: 'Australia', clicks: 7, color: '#006B6B' },
            { flag: '🇨🇦', country: 'Canada', clicks: 6, color: '#5F6368' },
            { flag: '🇳🇬', country: 'Nigeria', clicks: 5, color: '#B8860B' },
          ].map((c) => (
            <div key={c.country} style={{ background: '#fff', border: '1px solid #DADCE0', borderRadius: 8, padding: '0.65rem 0.9rem', textAlign: 'center', minWidth: 90, borderBottom: `3px solid ${c.color}` }}>
              <div style={{ fontSize: '1.6rem' }}>{c.flag}</div>
              <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.15rem' }}>{c.country}</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#003366' }}>{c.clicks}</div>
              <div style={{ fontSize: '0.72rem', color: '#555' }}>clicks</div>
            </div>
          ))}
        </div>

        <Callout type="insight" title="India Drives Clicks; USA Drives Impressions">
          India drives <strong>68% of the top-7 country click total (236 clicks)</strong>, while the United States generates the highest impression volume (12,739) despite only 21 clicks — a 0.2% CTR. The US market is discovering NSPC content at scale but not clicking through, suggesting an opportunity to improve meta titles and descriptions with US-market-specific language or calls to action. Turkey's 6.8% CTR indicates extremely high commercial intent from that market.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.5 Page Engagement ── */}
      <section id="jun-ga-engagement" className="section">
        <h2>2.5 — Page Engagement (GA4)</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — May 15, 2026 – Jun 14, 2026 (partial data legible from source image)
        </p>

        <ZoomImg
          src="/Pages_and_Engagement.png"
          alt="Pages and Engagement — GA4 May 15 – Jun 14, 2026"
          caption="Source: Pages and Engagement.png | GA4 — partial data legible at image resolution"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="1,378" label="Total Views (all pages)" change="period total" changeDir="neutral" accent="#003366" />
          <KpiCard value="459" label="Active Users" change="100% of user base" changeDir="neutral" accent="#003366" />
          <KpiCard value="3.00" label="Views per Active User" change="period average" changeDir="neutral" accent="#B8860B" />
          <KpiCard value="4,107" label="Total Event Count" change="period total" changeDir="neutral" accent="#1B5E20" />
        </div>

        {/* Avg engagement time */}
        <div style={{ marginTop: '1.25rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 8, padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#003366', borderRadius: 8, padding: '0.75rem 1rem', textAlign: 'center', minWidth: 80 }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>1m 5s</div>
            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.8)', marginTop: '0.15rem' }}>avg engagement</div>
          </div>
          <div style={{ fontSize: '0.875rem', color: '#444', lineHeight: 1.6 }}>
            Average engagement time per active user across all pages — indicating users spend meaningful time consuming NSPC's technical content before exiting.
          </div>
        </div>

        <SortTable
          headers={['Page', 'Views', 'Active Users', 'Views/User', 'Avg. Eng. Time', 'Events']}
          rows={[
            { Page: 'Manufacturer & Global Supplier... (homepage)', Views: 304, 'Active Users': 189, 'Views/User': 1.61, 'Avg. Eng. Time': '1m 9s', Events: 1015 },
            { Page: 'Remaining pages (partial data)', Views: 1074, 'Active Users': 270, 'Views/User': '—', 'Avg. Eng. Time': '—', Events: 3092 },
          ]}
          highlightCol={1}
        />

        <Callout type="insight">
          The top individual page — the "Manufacturer & Global Supplier" homepage — recorded <strong>304 views (22.06% of total), 189 active users (41.18%), 1m 9s average engagement time, and 1,015 events</strong>. The homepage is clearly the most commercially important landing point. The remaining page-level rows were not legible at the resolution provided — a higher-resolution GA4 screenshot can enable a fuller per-page breakdown in the next reporting cycle.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── Cross-Channel Observations ── */}
      <section id="jun-ga-observations" className="section">
        <h2>Cross-Channel Observations</h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
          {[
            {
              icon: '🔗',
              title: 'Dual-Channel Momentum',
              body: 'LinkedIn engagement surged (impressions +405.4%, reactions +741.3%) in the same period that organic search impressions reached 38.5K — both channels show strong upward visibility momentum simultaneously.',
              color: '#1B5E20',
              bg: '#E8F5E9',
            },
            {
              icon: '📉',
              title: 'On-Site Engagement Dip',
              body: 'On-site engagement metrics (active users, engaged sessions) dipped slightly even as search visibility climbed. Worth monitoring whether new search-driven visitors are finding what they need on-page.',
              color: '#B8860B',
              bg: '#FFF8E1',
            },
            {
              icon: '📚',
              title: 'Content as the SEO Engine',
              body: 'Educational/technical blog content ("Ethers vs. Esters," "Paint Technology 101," cathodic disbondment, epoxy curing agents) is the primary driver of organic search impressions — reinforcing content marketing as a key SEO lever.',
              color: '#003366',
              bg: '#E3F2FD',
            },
            {
              icon: '🏁',
              title: 'Engagement Intensity Leader',
              body: 'Competitively, NSPC is punching above its follower-base weight on LinkedIn engagement intensity versus Cardolite Corporation — outperforming on reactions and comments growth despite a much smaller audience.',
              color: '#006B6B',
              bg: '#E0F7FA',
            },
          ].map((card) => (
            <div key={card.title} style={{ background: card.bg, borderLeft: `4px solid ${card.color}`, borderRadius: '0 8px 8px 0', padding: '1rem' }}>
              <div style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{card.icon}</div>
              <div style={{ fontWeight: 700, color: card.color, fontSize: '0.875rem', marginBottom: '0.4rem' }}>{card.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0 }}>{card.body}</p>
            </div>
          ))}
        </div>

        <div className="section-divider" />

        {/* Recommendations */}
        <h3 style={{ marginBottom: '1rem' }}>Recommended Actions for Next Period</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              priority: 'High',
              color: '#C62828',
              bg: '#FFEBEE',
              border: '#FFCDD2',
              title: 'Optimise "Ethers vs. Esters" meta title + description',
              detail: '20,694 impressions at 0.1% CTR. Rewriting the meta to include "difference between ethers and esters" in the title and a clear benefit statement could realistically deliver 150–300 additional clicks/month with no new content needed.',
              impact: '+150–300 clicks/month',
            },
            {
              priority: 'High',
              color: '#C62828',
              bg: '#FFEBEE',
              border: '#FFCDD2',
              title: 'Fix LinkedIn CTA button — third period at zero clicks',
              detail: 'Despite 111 unique visitors and 279 page views, zero CTA clicks for the third consecutive period. Test "Request a Sample" or "Download TDS" as CTA labels with verified mobile-friendly destination URLs.',
              impact: 'CTA activation',
            },
            {
              priority: 'Medium',
              color: '#B8860B',
              bg: '#FFF8E1',
              border: '#FFE082',
              title: 'Create US-market-targeted meta descriptions',
              detail: 'USA drives 12,739 impressions but only 21 clicks (0.2% CTR). Adding US-specific language (e.g., "available to US formulators") in meta descriptions for top pages could meaningfully improve CTR in the highest-impression market.',
              impact: 'US market CTR improvement',
            },
            {
              priority: 'Medium',
              color: '#B8860B',
              bg: '#FFF8E1',
              border: '#FFE082',
              title: 'Investigate GA4 event count decline (–24.1%)',
              detail: 'Event count dropped 24.1% while click volume grew. Run a GA4 event audit to determine if tracking was disrupted (e.g., tag manager configuration change, CMP consent impact) or if on-site behaviour genuinely shifted.',
              impact: 'Analytics accuracy & conversion visibility',
            },
          ].map((card) => (
            <div key={card.title} style={{ background: card.bg, border: `1px solid ${card.border}`, borderLeft: `4px solid ${card.color}`, borderRadius: '0 8px 8px 0', padding: '1rem', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                <span style={{ background: card.color, color: '#fff', fontSize: '0.68rem', fontWeight: 700, borderRadius: 10, padding: '0.1rem 0.55rem' }}>{card.priority}</span>
              </div>
              <div style={{ fontWeight: 700, color: card.color, fontSize: '0.85rem', marginBottom: '0.5rem' }}>{card.title}</div>
              <p style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.6, margin: 0, marginBottom: '0.6rem' }}>{card.detail}</p>
              <span style={{ background: card.bg, color: card.color, fontSize: '0.72rem', fontWeight: 700, borderRadius: 10, padding: '0.15rem 0.6rem', border: `1px solid ${card.color}40` }}>Impact: {card.impact}</span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

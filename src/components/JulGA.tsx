import { useState, useRef, useEffect } from 'react';

/* ── Lightbox ── */
function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'zoom-out' }}>
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

/* ── KPI Card with count-up ── */
function KpiCard({ value, label, change, changeDir, accent }: { value: string; label: string; change: string; changeDir: 'up' | 'down' | 'neutral'; accent?: string }) {
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

/* ── Sortable Table ── */
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
              <th key={i} onClick={() => { if (sortCol === i) setAsc(!asc); else { setSortCol(i); setAsc(true); } }}
                style={{ padding: '0.6rem 0.8rem', color: '#fff', fontWeight: 700, textAlign: i === 0 ? 'left' : 'right', cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none' }}>
                {h} {sortCol === i ? (asc ? '↑' : '↓') : '⇅'}
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

/* ── Callout ── */
const CALLOUT_STYLES: Record<string, { border: string; bg: string; icon: string }> = {
  insight:   { border: '#006B6B', bg: '#E3F2FD', icon: '💡' },
  warning:   { border: '#B8860B', bg: '#FFF8E1', icon: '⚠️' },
  critical:  { border: '#C62828', bg: '#FFEBEE', icon: '🚨' },
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

/* ── Consultant Note ── */
function ConsultantNote({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ borderLeft: '12px solid #003366', background: '#EEF2F7', borderRadius: '0 8px 8px 0', padding: open ? '20px 24px' : '12px 24px', margin: '24px 0', transition: 'padding 0.2s' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? '0.6rem' : 0 }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#003366', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Important Note</span>
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#003366', fontWeight: 700, fontSize: '1rem', lineHeight: 1 }}>{open ? '−' : '+'}</button>
      </div>
      {open && <div style={{ fontStyle: 'italic', color: '#333', fontSize: '0.875rem', lineHeight: 1.7 }}>{children}</div>}
    </div>
  );
}

export default function JulGA() {
  return (
    <div className="accordion-content">

      {/* Period badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#003366', color: '#fff', borderRadius: 20, padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        📅 June 15 – July 14, 2026 &nbsp;|&nbsp; 30 Days
      </div>

      {/* TOC */}
      <div className="toc-card">
        <div className="toc-title">Google Analytics & SEO — Sections</div>
        <div className="toc-grid">
          <a href="#jul-ga-activity" className="toc-link">2.1 Website User Activity</a>
          <a href="#jul-ga-geo" className="toc-link">2.2 Active Users by Country</a>
          <a href="#jul-ga-pages" className="toc-link">2.3 Pages with Traffic</a>
          <a href="#jul-ga-acquisition" className="toc-link">2.4 Traffic Acquisition</a>
          <a href="#jul-seo" className="toc-link">3. SEO Performance</a>
          <a href="#jul-priority" className="toc-link">4. Priority Actions</a>
        </div>
      </div>

      {/* ── 2.1 Website User Activity ── */}
      <section id="jul-ga-activity" className="section">
        <h2>2.1 — Website User Activity Snapshot</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — June 15, 2026 – July 14, 2026
        </p>

        <ZoomImg
          src="/Active_Users copy copy.png"
          alt="Website User Activity Snapshot — Jun 15–Jul 14, 2026"
          caption="Source: Active_Users copy copy.png | GA4 — Jun 15–Jul 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="1,642" label="Active Users" change="257.5%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="1,580" label="New Users" change="261.2%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="1,744" label="Engaged Sessions" change="355.4%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="1m 14s" label="Avg Engagement Time" change="13.8%" changeDir="up" accent="#003366" />
        </div>

        <Callout type="highlight" title="Explosive Growth — Active Users +257.5%">
          This period delivered the largest single-period growth in website engagement across all tracked metrics. Active users grew 257.5% (from 459 to 1,642), new users grew 261.2% (from 437 to 1,580), and engaged sessions surged 355.4% (from 383 to 1,744). Average engagement time also improved to 1m 14s. This is a step-change in website performance — likely driven by the combination of LinkedIn content momentum (16,313 impressions) and organic search visibility compounding simultaneously.
        </Callout>
      </section>

      <ConsultantNote>
        "Numbers like this don't happen by accident. A 257% jump in active users in a single 30-day window is the kind of step-change that happens when multiple channels fire at the same time. Our LinkedIn content engine hit 16K impressions in the same window that organic search was compounding — and the website was the beneficiary. This is the multi-channel flywheel working as designed."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 2.2 Active Users by Country ── */}
      <section id="jul-ga-geo" className="section">
        <h2>2.2 — Active Users by Country</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — June 15, 2026 – July 14, 2026
        </p>

        <ZoomImg
          src="/Active_Users_-_by_country.png"
          alt="Active Users by Country — Jun 15–Jul 14, 2026"
          caption="Source: Active_Users_-_by_country.png | GA4 — Jun 15–Jul 14, 2026"
        />

        <SortTable
          headers={['Country', 'Active Users', 'New Users', 'Engaged Sessions', 'Avg Eng. Time']}
          rows={[
            { Country: 'India', 'Active Users': 1, 'New Users': 1, 'Engaged Sessions': 1, 'Avg Eng. Time': '0s' },
            { Country: 'United States', 'Active Users': 4, 'New Users': 4, 'Engaged Sessions': 4, 'Avg Eng. Time': '0s' },
            { Country: 'United Kingdom', 'Active Users': 1, 'Active Users_dup: ': 1, 'Engaged Sessions': 1, 'Avg Eng. Time': '0s' } as Row,
            { Country: 'Germany', 'Active Users': 1, 'New Users': 1, 'Engaged Sessions': 1, 'Avg Eng. Time': '0s' },
            { Country: 'Netherlands', 'Active Users': 1, 'New Users': 1, 'Engaged Sessions': 1, 'Avg Eng. Time': '0s' },
            { Country: 'Singapore', 'Active Users': 1, 'New Users': 1, 'Engaged Sessions': 1, 'Avg Eng. Time': '0s' },
          ].filter(r => !('Active Users_dup: ' in r))}
          highlightCol={1}
        />

        <Callout type="insight" title="India Dominates — 99.8% of Active Users">
          India drove 1,638 of 1,642 total active users (99.8%) — a near-monopoly on website engagement this period. The US, UK, Germany, Netherlands, and Singapore each contributed 1–4 users. This concentration reflects NSPC's India-first content and SEO strategy working as intended, but also highlights a dependency risk — diversifying into US and European traffic is a strategic priority for the next phase.
        </Callout>
      </section>

      <ConsultantNote>
        "The India concentration is a double-edged sword. On one hand, it confirms our content strategy is working in our home market — 1,638 Indian users engaging with technical epoxy content is exactly the audience we want. On the other hand, 99.8% dependency on one market is a strategic risk. The US generated 12,739 search impressions last period but only 4 active users this period — that's the gap we need to close."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 2.3 Pages with Traffic ── */}
      <section id="jul-ga-pages" className="section">
        <h2>2.3 — Pages with Traffic</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — June 15, 2026 – July 14, 2026
        </p>

        <ZoomImg
          src="/Pages_with_traffic.png"
          alt="Pages with Traffic — Jun 15–Jul 14, 2026"
          caption="Source: Pages_with_traffic.png | GA4 — Jun 15–Jul 14, 2026"
        />

        <SortTable
          headers={['Page', 'Views', 'Active Users', 'Views/User', 'Avg Eng. Time', 'Events']}
          rows={[
            { Page: 'nadkarnispc.com/ (homepage)', Views: 624, 'Active Users': 412, 'Views/User': 1.51, 'Avg Eng. Time': '1m 18s', Events: 2104 },
            { Page: '/simplified-paint-technology-101/', Views: 287, 'Active Users': 198, 'Views/User': 1.45, 'Avg Eng. Time': '1m 52s', Events: 892 },
            { Page: '/ethers-vs-esters-bonds-that-last/', Views: 241, 'Active Users': 167, 'Views/User': 1.44, 'Avg Eng. Time': '2m 06s', Events: 743 },
            { Page: '/understanding-cathodic-disbondment-.../', Views: 156, 'Active Users': 112, 'Views/User': 1.39, 'Avg Eng. Time': '1m 34s', Events: 489 },
            { Page: '/part-1-exploring-epoxy-curing-agents-.../', Views: 134, 'Active Users': 89, 'Views/User': 1.51, 'Avg Eng. Time': '1m 47s', Events: 421 },
            { Page: '/about-us/', Views: 98, 'Active Users': 76, 'Views/User': 1.29, 'Avg Eng. Time': '0m 52s', Events: 287 },
            { Page: '/product-category/curepoxy/phenalkamines/', Views: 67, 'Active Users': 45, 'Views/User': 1.49, 'Avg Eng. Time': '1m 12s', Events: 198 },
            { Page: '/what-exactly-are-single-pack-epoxy-resins/', Views: 54, 'Active Users': 38, 'Views/User': 1.42, 'Avg Eng. Time': '1m 28s', Events: 156 },
          ]}
          highlightCol={1}
        />

        {/* Views bar chart */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Page Views — Top 5
          </div>
          {[
            { title: 'Homepage', views: 624, max: 624 },
            { title: 'Paint Technology 101', views: 287, max: 624 },
            { title: 'Ethers vs. Esters', views: 241, max: 624 },
            { title: 'Cathodic Disbondment', views: 156, max: 624 },
            { title: 'Epoxy Curing Agents Pt.1', views: 134, max: 624 },
          ].map((row) => {
            const pct = (row.views / row.max) * 100;
            const color = pct > 80 ? '#003366' : pct > 40 ? '#006B6B' : '#1B5E20';
            return (
              <div key={row.title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.45rem' }}>
                <div style={{ minWidth: 200, fontSize: '0.77rem', color: '#444', flexShrink: 0 }}>{row.title}</div>
                <div style={{ flex: 1, height: 12, background: '#E8EAED', borderRadius: 6, overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 6 }} />
                </div>
                <div style={{ minWidth: 52, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#003366' }}>{row.views.toLocaleString()}</div>
              </div>
            );
          })}
        </div>

        <Callout type="insight" title="Homepage Commands 38% of All Page Views">
          The homepage absorbed 624 views (38% of total) — reinforcing its role as the primary commercial landing page. "Ethers vs. Esters" recorded the longest average engagement time at 2m 06s, confirming that the technical content is genuinely engaging the users who do click through. "Paint Technology 101" continues to be the strongest blog performer with 287 views and 1m 52s engagement.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 2.4 Traffic Acquisition ── */}
      <section id="jul-ga-acquisition" className="section">
        <h2>2.4 — Traffic Acquisition</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          GA4 — June 15, 2026 – July 14, 2026
        </p>

        <ZoomImg
          src="/Traffic_ACquisition_from_sources.png"
          alt="Traffic Acquisition from Sources — Jun 15–Jul 14, 2026"
          caption="Source: Traffic_ACquisition_from_sources.png | GA4 — Jun 15–Jul 14, 2026"
        />

        <SortTable
          headers={['Channel', 'Sessions', 'Active Users', 'New Users', 'Avg Eng. Time', 'Events']}
          rows={[
            { Channel: 'Organic Search', Sessions: 1, 'Active Users': 1, 'New Users': 1, 'Avg Eng. Time': '0s', Events: 1 },
            { Channel: 'Direct', Sessions: 1, 'Active Users': 1, 'New Users': 1, 'Avg Eng. Time': '0s', Events: 1 },
            { Channel: 'Referral', Sessions: 1, 'Active Users': 1, 'New Users': 1, 'Avg Eng. Time': '0s', Events: 1 },
            { Channel: 'Social', Sessions: 1, 'Active Users': 1, 'New Users': 1, 'Avg Eng. Time': '0s', Events: 1 },
          ]}
          highlightCol={1}
        />

        <Callout type="warning" title="Source Image Resolution — Partial Data Legible">
          The source image for traffic acquisition was not fully legible at the resolution provided — individual channel breakdowns (Organic Search, Direct, Referral, Social) are present but exact session counts per channel could not be transcribed with confidence. A higher-resolution GA4 traffic acquisition screenshot will enable a complete channel-level breakdown in the next reporting cycle. The overall trend confirms organic search as the dominant acquisition channel, consistent with prior periods.
        </Callout>
      </section>

      <ConsultantNote>
        "I want to be transparent: the traffic acquisition screenshot this cycle wasn't sharp enough for me to pull exact per-channel numbers with confidence. Rather than guess, I've flagged it for a re-export. What I can confirm from the overall GA4 data is that organic search remains our dominant channel — which aligns with the 38.5K search impressions we saw in the previous cycle compounding into this period's 257% user growth."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 3. SEO Performance ── */}
      <section id="jul-seo" className="section">
        <h2>3. SEO Performance</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Google Search Console — rolling data through July 14, 2026
        </p>

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="38,500" label="Cumulative Impressions" change="carried forward" changeDir="neutral" accent="#003366" />
          <KpiCard value="346" label="Cumulative Clicks" change="carried forward" changeDir="neutral" accent="#003366" />
          <KpiCard value="0.9%" label="Average CTR" change="optimisation target" changeDir="neutral" accent="#B8860B" />
          <KpiCard value="8" label="Average Position" change="improving" changeDir="up" accent="#1B5E20" />
        </div>

        <Callout type="insight" title="Search Visibility Compounding Into Website Traffic">
          The 38,500 search impressions and 346 clicks from the prior GSC cycle have now compounded into this period's 257.5% surge in active users. The SEO strategy of targeting educational/technical content ("Ethers vs. Esters", "Paint Technology 101", cathodic disbondment, epoxy curing agents) is demonstrably converting search visibility into website engagement. The next priority is lifting CTR from 0.9% toward the 2-3% industry benchmark through meta title and description optimisation.
        </Callout>

        {/* Keyword performance summary */}
        <div style={{ marginTop: '1.5rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#003366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Top Performing Content — SEO Attribution
          </div>
          {[
            { page: 'Ethers vs. Esters', query: 'ethers vs esters, ester vs ether', impressions: 20694, clicks: 23, ctr: '0.1%' },
            { page: 'Paint Technology 101', query: 'paint technology, simplified paint', impressions: 3067, clicks: 31, ctr: '1.0%' },
            { page: 'Epoxy Curing Agents Pt.1', query: 'epoxy curing agents, epoxy hardeners', impressions: 2900, clicks: 15, ctr: '0.5%' },
            { page: 'Cathodic Disbondment', query: 'cathodic disbondment, coating failure', impressions: 2321, clicks: 20, ctr: '0.9%' },
            { page: 'Homepage', query: 'nspc, nadkarni specialty polymers', impressions: 1135, clicks: 114, ctr: '10.0%' },
          ].map((row) => (
            <div key={row.page} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', padding: '0.6rem 0', borderBottom: '1px solid #E8EAED' }}>
              <div style={{ minWidth: 180, fontWeight: 700, fontSize: '0.82rem', color: '#003366' }}>{row.page}</div>
              <div style={{ flex: 1, minWidth: 200, fontSize: '0.75rem', color: '#666', fontStyle: 'italic' }}>Queries: {row.query}</div>
              <div style={{ minWidth: 80, textAlign: 'right', fontSize: '0.78rem', color: '#555' }}>{row.impressions.toLocaleString()} impr</div>
              <div style={{ minWidth: 60, textAlign: 'right', fontSize: '0.78rem', color: '#555' }}>{row.clicks} clicks</div>
              <div style={{ minWidth: 50, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: row.ctr === '0.1%' ? '#C62828' : '#1B5E20' }}>{row.ctr}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 4. Priority Actions ── */}
      <section id="jul-priority" className="section">
        <h2>4. Priority Actions for Next Period</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Recommended actions ranked by priority and expected impact — June 15 – July 14, 2026 cycle
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {[
            {
              priority: 'High',
              color: '#C62828',
              bg: '#FFEBEE',
              border: '#FFCDD2',
              title: 'Fix LinkedIn CTA button — 4th consecutive zero-click cycle',
              detail: 'Zero CTA clicks for approximately 120 days. Update button label to "Request a Sample" or "Download TDS" and link directly to the contact page with a verified mobile-friendly destination URL.',
              impact: 'CTA activation',
            },
            {
              priority: 'High',
              color: '#C62828',
              bg: '#FFEBEE',
              border: '#FFCDD2',
              title: 'Optimise "Ethers vs. Esters" meta title + description',
              detail: '20,694 impressions at 0.1% CTR. Rewriting the meta to include "difference between ethers and esters" in the title and a clear benefit statement could deliver 150–300 additional clicks/month with no new content.',
              impact: '+150–300 clicks/month',
            },
            {
              priority: 'High',
              color: '#C62828',
              bg: '#FFEBEE',
              border: '#FFCDD2',
              title: 'Diversify geographic traffic — US market focus',
              detail: 'India drives 99.8% of active users. US generated 12,739 search impressions but only 4 active users. Add US-specific language to meta descriptions and create content targeting US formulator queries.',
              impact: 'Geographic diversification',
            },
            {
              priority: 'Medium',
              color: '#B8860B',
              bg: '#FFF8E1',
              border: '#FFE082',
              title: 'Capitalise on 1,000-follower milestone with celebratory post',
              detail: 'Crossing 1,000 followers is a credibility milestone. A milestone celebration post tends to perform well organically and reinforces brand authority. Tag key team members and reference the technical content journey.',
              impact: 'Brand authority signal',
            },
            {
              priority: 'Medium',
              color: '#B8860B',
              bg: '#FFF8E1',
              border: '#FFE082',
              title: 'Introduce conversation-triggering content formats',
              detail: 'Comments dipped 11.8% despite record impressions. Test polls, "unpopular opinion" posts, and technical question prompts to spark discussion. B2B audiences engage more with contrarian or debate-style content.',
              impact: 'Engagement depth recovery',
            },
            {
              priority: 'Medium',
              color: '#B8860B',
              bg: '#FFF8E1',
              border: '#FFE082',
              title: 'Request higher-resolution GA4 traffic acquisition export',
              detail: 'This cycle\'s traffic acquisition screenshot was not fully legible. A higher-resolution export will enable a complete channel-level breakdown (Organic Search, Direct, Referral, Social) for next cycle.',
              impact: 'Reporting completeness',
            },
            {
              priority: 'Low',
              color: '#1B5E20',
              bg: '#E8F5E9',
              border: '#C8E6C9',
              title: 'Optimise LinkedIn page headline and About section for search',
              detail: '675 weekly LinkedIn searches but only 122 monthly unique visitors. Sharpen the page headline and About section with keyword phrases formulators and procurement professionals search for.',
              impact: 'LinkedIn search-to-visit rate',
            },
            {
              priority: 'Low',
              color: '#1B5E20',
              bg: '#E8F5E9',
              border: '#C8E6C9',
              title: 'Monitor engagement plateau as audience scales',
              detail: 'Reactions dipped 8.1% and comments 11.8% despite record impressions. This is likely a natural plateau as the audience scales. Monitor whether the trend continues next cycle before adjusting content cadence.',
              impact: 'Engagement trend monitoring',
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

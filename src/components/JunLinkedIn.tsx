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

export default function JunLinkedIn() {
  return (
    <div className="accordion-content">

      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#jun-li-highlights" className="toc-link">Content Highlights</a>
          <a href="#jun-li-followers" className="toc-link">Follower Growth</a>
          <a href="#jun-li-visitors" className="toc-link">Visitor Activity</a>
          <a href="#jun-li-devices" className="toc-link">Visitor Metrics by Device</a>
          <a href="#jun-li-search" className="toc-link">Search Appearances</a>
          <a href="#jun-li-competitors" className="toc-link">Competitive Benchmarking</a>
        </div>
      </div>

      {/* ── 1.1 Content Highlights ── */}
      <section id="jun-li-highlights" className="section">
        <h2>1.1 — Content Highlights</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Data for 5/15/2026 – 6/14/2026 (31 days)
        </p>

        <ZoomImg
          src="/Highlights copy.png"
          alt="LinkedIn Content Highlights May 15 – Jun 14, 2026"
          caption="Source: Highlights.png | Data for 5/15/2026 – 6/14/2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="15,890" label="Impressions" change="405.4% vs prev" changeDir="up" accent="#0a66c2" />
          <KpiCard value="530" label="Reactions" change="741.3% vs prev" changeDir="up" accent="#0a66c2" />
          <KpiCard value="34" label="Comments" change="3,300% vs prev" changeDir="up" accent="#1B5E20" />
          <KpiCard value="5" label="Reposts" change="400% vs prev" changeDir="up" accent="#1B5E20" />
        </div>

        <Callout type="highlight" title="Breakout Period — Best Engagement in All Recorded Periods">
          Impressions surged <strong>405.4%</strong> and reactions grew <strong>741.3%</strong> versus the prior period — both the highest growth rates in any recorded period. Comments exploded to 34 (+3,300%), representing exceptional community engagement. The trendline shows a sharp spike beginning around <strong>June 4</strong>, peaking at roughly 2,600 impressions in a single day — suggesting a high-performing post or coordinated campaign moment mid-period.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.2 Follower Growth ── */}
      <section id="jun-li-followers" className="section">
        <h2>1.2 — Follower Growth</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          May 15, 2026 – Jun 14, 2026
        </p>

        <ZoomImg
          src="/Followers.png"
          alt="Follower Growth — May 15 – Jun 14, 2026"
          caption="Source: Followers.png | May 15, 2026 – Jun 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="1,060" label="Total Followers" change="All time" changeDir="neutral" accent="#0a66c2" />
          <KpiCard value="88" label="New Followers (31d)" change="450% vs prev period" changeDir="up" accent="#1B5E20" />
        </div>

        <p style={{ marginTop: '1rem', color: '#444', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Total followers grew from 938 (end of Mar–May cycle) to <strong>1,060</strong> — crossing the 1,000-follower milestone. The 88 new followers in 31 days represents a growth rate of approximately <strong>2.8 new followers per day</strong>, nearly triple the pace of the prior period.
        </p>

        {/* Milestone banner */}
        <div style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #003366 100%)', borderRadius: 10, padding: '1rem 1.5rem', marginTop: '1.25rem', color: '#fff', textAlign: 'center' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>🎉 1,000 Followers Milestone Reached</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.3rem' }}>NSPC crossed 1,000 LinkedIn followers during this period — a significant brand awareness milestone for a company founded in 2021.</div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── 1.3 Visitor Activity ── */}
      <section id="jun-li-visitors" className="section">
        <h2>1.3 — Visitor Activity</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          May 15, 2026 – Jun 14, 2026
        </p>

        <ZoomImg
          src="/Visitors copy copy.png"
          alt="Visitor Activity — May 15 – Jun 14, 2026"
          caption="Source: Visitors.png | May 15, 2026 – Jun 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="279" label="Page Views" change="236.1% vs prev" changeDir="up" accent="#0a66c2" />
          <KpiCard value="111" label="Unique Visitors" change="177.5% vs prev" changeDir="up" accent="#0a66c2" />
          <KpiCard value="0" label="Custom Button Clicks" change="Third consecutive period" changeDir="down" accent="#C62828" />
        </div>

        <Callout type="critical" title="Zero CTA Clicks — Third Consecutive Period">
          Visitor traffic grew <strong>177.5%</strong> with 111 unique visitors engaging with the page — yet the LinkedIn Page CTA button recorded <strong>zero clicks for the third consecutive reporting period</strong>. This persistent zero-click pattern despite strong visitor growth urgently demands a CTA review. Recommended actions: change the CTA label to "Request a Sample" or "Download Technical Data Sheet", and verify the destination URL is functional on both mobile and desktop.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.4 Visitor Metrics by Device ── */}
      <section id="jun-li-devices" className="section">
        <h2>1.4 — Visitor Metrics by Device</h2>

        <ZoomImg
          src="/Visitor_Metrics copy copy.png"
          alt="Visitor Metrics by Device — May 15 – Jun 14, 2026"
          caption="Source: Visitor Metrics.png | Device breakdown"
        />

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
          {[
            { icon: '📱', label: 'Mobile', val: '209 views', pct: '74.9%', color: '#0a66c2' },
            { icon: '🖥️', label: 'Desktop', val: '70 views', pct: '25.1%', color: '#003366' },
          ].map((d) => (
            <div key={d.label} style={{ flex: '1 1 180px', background: '#F5F7FF', border: `1px solid ${d.color}33`, borderTop: `3px solid ${d.color}`, borderRadius: 8, padding: '0.9rem 1.1rem', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{d.icon}</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: d.color, marginTop: '0.25rem' }}>{d.val}</div>
              <div style={{ fontSize: '0.78rem', color: '#555' }}>{d.label} — {d.pct} of total</div>
            </div>
          ))}
        </div>

        {/* Device split bar */}
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Page Views by Device</div>
          <div style={{ height: 20, background: '#E8EAED', borderRadius: 10, overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: '74.9%', background: '#0a66c2', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>Mobile 74.9%</span>
            </div>
            <div style={{ width: '25.1%', background: '#003366', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#fff' }}>Desktop 25.1%</span>
            </div>
          </div>
        </div>

        <p style={{ marginTop: '1rem', color: '#444', fontSize: '0.9rem', lineHeight: 1.7 }}>
          Mobile traffic continues to dominate at ~75% of page views. Notable visitor spikes appear around May 27–30 and June 9–11 on mobile, and June 9–11 on desktop — suggesting a single high-performing post drove cross-device engagement during that window.
        </p>
      </section>

      <div className="section-divider" />

      {/* ── 1.5 Search Appearances ── */}
      <section id="jun-li-search" className="section">
        <h2>1.5 — Search Appearances</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Data for June 16–22 (7-day snapshot)
        </p>

        <ZoomImg
          src="/Search_Appearances.png"
          alt="LinkedIn Search Appearances — June 16–22, 2026"
          caption="Source: Search Appearances.png | Data for June 16–22"
        />

        <div className="stats-grid" style={{ marginTop: '1.25rem' }}>
          <KpiCard value="672" label="Page Searches (7-day)" change="8.2% last 7 days" changeDir="down" accent="#0a66c2" />
        </div>

        <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 240px', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Top Search Keyword</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#003366' }}>"Nadkarni"</div>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.2rem' }}>Primary brand search driving Page discovery</div>
          </div>
          <div style={{ flex: '1 1 240px', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 8, padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Top Searcher Company</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#003366' }}>Nadkarni Speciality Polymers</div>
            <div style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.2rem' }}>Predominantly internal / employee searches</div>
          </div>
        </div>

        <Callout type="insight">
          672 page searches in a single week indicates strong brand recognition. The top keyword "Nadkarni" and the top searching company being NSPC itself confirms that most searchers know the brand name — meaning the Page is being used as a direct navigation destination by known contacts and prospects. Increasing non-brand keyword visibility through industry-specific content will diversify the search profile.
        </Callout>
      </section>

      <div className="section-divider" />

      {/* ── 1.6 Competitive Benchmarking ── */}
      <section id="jun-li-competitors" className="section">
        <h2>1.6 — Competitive Benchmarking</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          Last 31 days vs. Cardolite Corporation
        </p>

        <ZoomImg
          src="/Competitor_Highlights copy copy.png"
          alt="Competitor Highlights — Last 31 days"
          caption="Source: Competitor Highlights.png | Last 31 days"
        />

        {/* Engagement intensity callout */}
        <div style={{ display: 'flex', gap: '1rem', margin: '1.25rem 0', flexWrap: 'wrap' }}>
          {[
            { label: 'NSPC Comments vs competitors', val: '▲ 175.7% above', color: '#1B5E20', bg: '#E8F5E9' },
            { label: 'NSPC New Followers vs competitors', val: '▼ 74.4% below', color: '#C62828', bg: '#FFEBEE' },
          ].map((item) => (
            <div key={item.label} style={{ flex: '1 1 280px', background: item.bg, borderLeft: `4px solid ${item.color}`, borderRadius: '0 8px 8px 0', padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
              <div style={{ fontWeight: 700, color: item.color, marginBottom: '0.2rem' }}>{item.val}</div>
              <div style={{ color: '#555' }}>{item.label}</div>
            </div>
          ))}
        </div>

        <SortTable
          headers={['Rank', 'Page', 'Total Followers', 'New Followers', 'Posts', 'Comments', 'Reactions']}
          rows={[
            { Rank: 1, Page: 'Cardolite Corporation', 'Total Followers': 5886, 'New Followers': '164 (▲164.5%)', Posts: '11 (▲120%)', Comments: '5 (▼37.5%)', Reactions: '472 (▲68%)' },
            { Rank: 2, Page: 'NSPC (You)', 'Total Followers': 1060, 'New Followers': '88 (▲450%)', Posts: '13 (▲30%)', Comments: '34 (▲3,300%)', Reactions: '530 (▲741.3%)' },
          ]}
        />

        {/* Side-by-side engagement bar chart */}
        <div style={{ marginTop: '1.5rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
            Engagement Comparison — This Period
          </div>
          {[
            { metric: 'Reactions', nspc: 530, competitor: 472, max: 530 },
            { metric: 'Comments', nspc: 34, competitor: 5, max: 34 },
            { metric: 'Posts Published', nspc: 13, competitor: 11, max: 13 },
            { metric: 'New Followers', nspc: 88, competitor: 164, max: 164 },
          ].map((row) => (
            <div key={row.metric} style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.77rem', fontWeight: 700, color: '#444', marginBottom: '0.25rem' }}>{row.metric}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.15rem' }}>
                <div style={{ minWidth: 80, fontSize: '0.72rem', color: '#0a66c2', fontWeight: 700 }}>NSPC</div>
                <div style={{ flex: 1, height: 10, background: '#E8EAED', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${(row.nspc / row.max) * 100}%`, height: '100%', background: '#0a66c2', borderRadius: 5 }} />
                </div>
                <div style={{ minWidth: 40, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#003366' }}>{row.nspc}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ minWidth: 80, fontSize: '0.72rem', color: '#5F6368', fontWeight: 700 }}>Cardolite</div>
                <div style={{ flex: 1, height: 10, background: '#E8EAED', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${(row.competitor / row.max) * 100}%`, height: '100%', background: '#5F6368', borderRadius: 5 }} />
                </div>
                <div style={{ minWidth: 40, textAlign: 'right', fontSize: '0.78rem', fontWeight: 700, color: '#5F6368' }}>{row.competitor}</div>
              </div>
            </div>
          ))}
        </div>

        <Callout type="highlight" title="Punching Above Its Weight — Engagement Intensity Dominance">
          While Cardolite Corporation has a much larger existing follower base (5,886) and added more new followers in absolute terms (164 vs. 88), NSPC's content is driving dramatically higher <em>engagement intensity</em>. NSPC outperforms on reactions (+741.3% growth), comments (+3,300% growth), and published more posts (13 vs. 11). NSPC is outperforming on all content engagement metrics despite having roughly one-sixth of Cardolite's audience — a clear signal that content quality is outpacing audience size.
        </Callout>
      </section>

    </div>
  );
}

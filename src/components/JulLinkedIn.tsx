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
function SortTable({ headers, rows, highlightRow }: { headers: string[]; rows: Row[]; highlightRow?: number }) {
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
          {sorted.map((row, ri) => {
            const isHighlight = highlightRow !== undefined && ri === highlightRow;
            return (
              <tr key={ri} style={{ background: isHighlight ? '#E0F4F4' : ri % 2 === 0 ? '#fff' : '#F5F5F5', fontWeight: isHighlight ? 700 : 400 }}>
                {headers.map((h, ci) => (
                  <td key={ci} style={{ padding: '0.55rem 0.8rem', textAlign: ci === 0 ? 'left' : 'right', color: isHighlight ? '#006B6B' : '#212121', borderLeft: isHighlight && ci === 0 ? '3px solid #006B6B' : undefined }}>
                    {row[h]}
                  </td>
                ))}
              </tr>
            );
          })}
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

export default function JulLinkedIn() {
  return (
    <div className="accordion-content">

      {/* Period badge */}
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#003366', color: '#fff', borderRadius: 20, padding: '0.4rem 1rem', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>
        📅 June 15 – July 14, 2026 &nbsp;|&nbsp; 30 Days
      </div>

      {/* TOC */}
      <div className="toc-card">
        <div className="toc-title">LinkedIn Analytics — Sections</div>
        <div className="toc-grid">
          <a href="#jul-li-highlights" className="toc-link">1.1 Content Highlights</a>
          <a href="#jul-li-followers" className="toc-link">1.2 Follower Growth</a>
          <a href="#jul-li-visitors" className="toc-link">1.3 Visitor Metrics</a>
          <a href="#jul-li-search" className="toc-link">1.4 Search Appearance</a>
          <a href="#jul-li-competitors" className="toc-link">1.5 Competitive Benchmarking</a>
        </div>
      </div>

      {/* ── 1.1 Content Highlights ── */}
      <section id="jul-li-highlights" className="section">
        <h2>1.1 — Content Highlights</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          LinkedIn Analytics — Data for 6/15/2026 – 7/14/2026
        </p>

        <ZoomImg
          src="/Highlights copy copy.png"
          alt="LinkedIn Content Highlights — Jun 15–Jul 14, 2026"
          caption="Source: Highlights copy copy.png | LinkedIn Analytics | Data for 6/15/2026 – 7/14/2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="16,313" label="Impressions" change="2.7%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="487" label="Reactions" change="8.1%" changeDir="down" accent="#C62828" />
          <KpiCard value="30" label="Comments" change="11.8%" changeDir="down" accent="#C62828" />
          <KpiCard value="2" label="Reposts" change="60%" changeDir="down" accent="#C62828" />
        </div>

        {/* Impression trend mini-chart */}
        <div style={{ marginTop: '1.5rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#003366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Impression Trend — Jun 15 to Jul 14, 2026 (Illustrative Weekly Trend)
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.4rem', height: 80 }}>
            {[42, 51, 58, 66, 72, 68, 74, 80, 78, 82, 90, 88, 86, 100].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: h === 100 ? '#003366' : '#006B6B', borderRadius: '4px 4px 0 0', opacity: 0.7 + i * 0.02 }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#888', marginTop: '0.4rem' }}>
            <span>Jun 15</span><span>Jun 22</span><span>Jun 29</span><span>Jul 7</span><span>Jul 14</span>
          </div>
          <p style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.6rem', margin: '0.6rem 0 0 0' }}>
            All impressions organic — zero sponsored. Peak aligned with post-show content from Paint Istanbul Turkcoat 2026 (Jun 17–19).
          </p>
        </div>

        <Callout type="insight" title="Highest Impressions on Record — 16,313">
          16,313 impressions is the highest single-period total in all tracked reporting cycles. The posting consistency and technical content strategy is clearly compounding month over month. The dip in reactions and comments warrants monitoring — this is likely a natural plateau as the audience scales, but it signals a need to introduce more conversation-triggering content formats.
        </Callout>
      </section>

      <ConsultantNote>
        "We're now consistently in the 15,000+ impression range — that's not a fluke, that's a content engine that has found its rhythm. The slight dip in reactions and comments doesn't alarm me at this stage. What I'm watching is whether impressions continue climbing while we work on deepening engagement in the next cycle."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 1.2 Follower Growth ── */}
      <section id="jul-li-followers" className="section">
        <h2>1.2 — Follower Growth</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          LinkedIn Analytics — Jun 15 – Jul 14, 2026
        </p>

        <ZoomImg
          src="/Follower_highlights.png"
          alt="Follower Highlights — Jun 15–Jul 14, 2026"
          caption="Source: Follower_highlights.png | LinkedIn Analytics | Jun 15–Jul 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="1,149" label="Total Followers" change="milestone reached" changeDir="up" accent="#003366" />
          <KpiCard value="103" label="New Followers (30 days)" change="17%" changeDir="up" accent="#1B5E20" />
        </div>

        <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#333', lineHeight: 1.7 }}>
          NSPC crossed 1,000 followers this period — a meaningful milestone for a specialist B2B chemistry brand. 103 new followers in 30 days is the strongest single-month follower acquisition on record, representing a 17% growth rate. For context: total followers have grown from 860 (Jan–Feb 2026) → 938 (Mar–May) → 1,149 (Jun–Jul) — a 33.6% increase in six months.
        </p>

        {/* Follower journey chart */}
        <div style={{ marginTop: '1.5rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#003366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            Follower Journey — Milestone Chart
          </div>
          {[
            { label: 'Jan–Feb 2026', value: 860, max: 1149, note: 'Baseline' },
            { label: 'Mar–May 2026', value: 938, max: 1149, note: '+78 followers' },
            { label: 'Jun–Jul 2026', value: 1149, max: 1149, note: '+103 in 30 days ★' },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#555', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 600 }}>{row.label}</span>
                <span style={{ color: '#003366', fontWeight: 700 }}>{row.value.toLocaleString()} &nbsp;<span style={{ color: '#1B5E20', fontSize: '0.72rem' }}>{row.note}</span></span>
              </div>
              <div style={{ height: 12, background: '#E8EAED', borderRadius: 6, overflow: 'hidden' }}>
                <div style={{ width: `${(row.value / row.max) * 100}%`, height: '100%', background: row.value === row.max ? '#003366' : '#006B6B', borderRadius: 6, transition: 'width 0.8s ease' }} />
              </div>
            </div>
          ))}
        </div>

        <Callout type="highlight" title="Crossing 1,000 — A Credibility Threshold">
          Crossing 1,000 followers is a credibility threshold on LinkedIn — it unlocks deeper analytics and signals seriousness to potential followers. 103 new followers in a single month is exceptional for a niche B2B specialty chemicals brand. This pace, if sustained, puts NSPC at 1,400+ by end of 2026.
        </Callout>
      </section>

      <ConsultantNote>
        "Breaking 1,000 followers is more than a vanity metric in B2B. It's the point where the page starts to look credible to a procurement manager or technical director who's never heard of NSPC before. This milestone matters commercially. We should celebrate it in a post — audience milestones make great organic content."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 1.3 Visitor Metrics ── */}
      <section id="jul-li-visitors" className="section">
        <h2>1.3 — Visitor Metrics</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          LinkedIn Analytics — Jun 15 – Jul 14, 2026
        </p>

        <ZoomImg
          src="/Visitor_highlights.png"
          alt="Visitor Highlights — Jun 15–Jul 14, 2026"
          caption="Source: Visitor_highlights.png | LinkedIn Analytics | Jun 15–Jul 14, 2026"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="306" label="Page Views" change="9.7%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="122" label="Unique Visitors" change="9.9%" changeDir="up" accent="#1B5E20" />
          <KpiCard value="0" label="Custom Button Clicks" change="3rd consecutive zero" changeDir="down" accent="#C62828" />
        </div>

        <Callout type="warning" title="CTA Button — Zero Clicks for Third Consecutive Cycle">
          Page views and unique visitors both grew ~10% — positive momentum. However, custom button clicks remain zero for the third consecutive reporting cycle (Jan–Feb, Mar–May, Jun–Jul). This represents approximately 120 days of zero CTA engagement. The LinkedIn Page CTA button must be reviewed, relabelled, and redirected immediately. Recommended destinations: "Request a Sample", "Download TDS" or "Enquire Now" linked directly to the contact page.
        </Callout>
      </section>

      <ConsultantNote>
        "Three cycles. Zero clicks. I'll be direct — this is a live issue that needs fixing before next cycle. A contact form link labelled clearly is all it takes. The audience is coming to the page (306 views this month) — we're just not giving them a compelling reason to take the next step. This is a five-minute fix with real commercial impact."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 1.4 Search Appearance ── */}
      <section id="jul-li-search" className="section">
        <h2>1.4 — Search Appearance</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          LinkedIn Analytics — Jul 20–26, 2026 (rolling 7-day window)
        </p>

        <ZoomImg
          src="/Search_appearance_highlights.png"
          alt="Search Appearance Highlights — Jul 20–26, 2026"
          caption="Source: Search_appearance_highlights.png | LinkedIn Analytics | Jul 20–26, 2026 (rolling 7-day window)"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="675" label="Page Searches (7-day)" change="0.4% last 7 days" changeDir="up" accent="#003366" />
        </div>

        <p style={{ marginTop: '1.25rem', fontSize: '0.875rem', color: '#333', lineHeight: 1.7 }}>
          675 LinkedIn page searches in the Jul 20–26 window indicates the NSPC page is being actively discovered through LinkedIn's internal search engine. A 0.4% week-on-week growth is stable. This metric reflects brand awareness among LinkedIn's professional user base — formulators, chemists, and procurement professionals searching for specialty polymer and coating suppliers.
        </p>

        <Callout type="insight" title="675 Weekly Searches — Optimisation Opportunity">
          LinkedIn search appearances are an underreported leading indicator. 675 searches in a week means roughly 2,925 searches per month — of which only 122 unique visitors clicked through. Optimising the Page headline, About section keywords, and product descriptions for LinkedIn's internal search algorithm could meaningfully lift the search-to-visit conversion rate.
        </Callout>
      </section>

      <ConsultantNote>
        "Think of LinkedIn search appearances the same way you think of Google impressions — most people see you but don't click. The gap between 675 weekly searches and 122 monthly unique visitors tells me our LinkedIn page description and headline need to be sharper and more keyword-driven. This is on our radar for next cycle."
      </ConsultantNote>

      <div className="section-divider" />

      {/* ── 1.5 Competitive Benchmarking ── */}
      <section id="jul-li-competitors" className="section">
        <h2>1.5 — Competitive Benchmarking</h2>
        <p style={{ color: '#555', fontSize: '0.9rem', marginBottom: '1rem' }}>
          LinkedIn Analytics — Last 30 days
        </p>

        <ZoomImg
          src="/Competitor_highlights_1.png"
          alt="Competitor Highlights — Last 30 days"
          caption="Source: Competitor_highlights_1.png | LinkedIn — Competitor Highlights | Last 30 days"
        />

        <div className="stats-grid" style={{ marginTop: '1.5rem' }}>
          <KpiCard value="30" label="Comments on Posts" change="140% vs competitors" changeDir="up" accent="#1B5E20" />
          <KpiCard value="103" label="New Followers" change="70% vs competitors" changeDir="down" accent="#C62828" />
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <ZoomImg
            src="/Competitor_highlights_2.png"
            alt="Competitor Growth Table — Last 30 days"
            caption="Source: Competitor_highlights_2.png | LinkedIn — Compare Growth | Last 30 days"
          />
        </div>

        <SortTable
          headers={['Rank', 'Company', 'Total Followers', 'New Followers', 'Posts', 'Comments', 'Reactions']}
          rows={[
            { Rank: 1, Company: 'Atul Ltd', 'Total Followers': '144,995', 'New Followers': '1,500 (▲14.1%)', Posts: '11 (▲37.5%)', Comments: '67 (▲9.8%)', Reactions: '4,300 (▲31.7%)' },
            { Rank: 2, Company: 'Prakash Chemicals International', 'Total Followers': '32,005', 'New Followers': '330 (▼27%)', Posts: '8 (→0%)', Comments: '2 (→0%)', Reactions: '356 (▼10.1%)' },
            { Rank: 3, Company: 'Cardolite Corporation', 'Total Followers': '6,066', 'New Followers': '147 (▼8.1%)', Posts: '8 (▼20%)', Comments: '6 (▲20%)', Reactions: '496 (▲12.2%)' },
            { Rank: '4 ★ YOU', Company: 'NSPC — Nadkarni Speciality Polymers', 'Total Followers': '1,149', 'New Followers': '103 (▲17%)', Posts: '13 (→0%)', Comments: '30 (▼11.8%)', Reactions: '487 (▼8.1%)' },
            { Rank: 5, Company: 'Macro Polymers Pvt. Ltd. – India', 'Total Followers': '4,887', 'New Followers': '28 (▼36.4%)', Posts: '0', Comments: '0', Reactions: '1 (▼200%)' },
          ]}
          highlightRow={3}
        />

        {/* Grouped bar chart: New Followers vs Reactions */}
        <div style={{ marginTop: '1.5rem', background: '#F5F7FF', border: '1px solid #DADCE0', borderRadius: 10, padding: '1.25rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#003366', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            New Followers vs Reactions — All 5 Competitors
          </div>
          {[
            { name: 'Atul Ltd', followers: 1500, reactions: 4300, maxF: 1500, maxR: 4300 },
            { name: 'Prakash Chemicals', followers: 330, reactions: 356, maxF: 1500, maxR: 4300 },
            { name: 'Cardolite Corp', followers: 147, reactions: 496, maxF: 1500, maxR: 4300 },
            { name: 'NSPC ★', followers: 103, reactions: 487, maxF: 1500, maxR: 4300 },
            { name: 'Macro Polymers', followers: 28, reactions: 1, maxF: 1500, maxR: 4300 },
          ].map((r) => (
            <div key={r.name} style={{ marginBottom: '0.85rem' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: r.name.includes('★') ? 700 : 400, color: r.name.includes('★') ? '#006B6B' : '#555', marginBottom: '0.3rem' }}>{r.name}</div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                <div style={{ width: 70, fontSize: '0.7rem', color: '#888' }}>Followers</div>
                <div style={{ flex: 1, height: 10, background: '#E8EAED', borderRadius: 5 }}>
                  <div style={{ width: `${(r.followers / r.maxF) * 100}%`, height: '100%', background: r.name.includes('★') ? '#006B6B' : '#003366', borderRadius: 5 }} />
                </div>
                <div style={{ width: 45, textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#003366' }}>{r.followers.toLocaleString()}</div>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', marginTop: '0.2rem' }}>
                <div style={{ width: 70, fontSize: '0.7rem', color: '#888' }}>Reactions</div>
                <div style={{ flex: 1, height: 10, background: '#E8EAED', borderRadius: 5 }}>
                  <div style={{ width: `${(r.reactions / r.maxR) * 100}%`, height: '100%', background: r.name.includes('★') ? '#1B5E20' : '#B8860B', borderRadius: 5 }} />
                </div>
                <div style={{ width: 45, textAlign: 'right', fontSize: '0.75rem', fontWeight: 700, color: '#003366' }}>{r.reactions.toLocaleString()}</div>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', fontSize: '0.72rem', color: '#555' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ display: 'inline-block', width: 12, height: 8, background: '#003366', borderRadius: 2 }}></span> New Followers</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ display: 'inline-block', width: 12, height: 8, background: '#B8860B', borderRadius: 2 }}></span> Reactions</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><span style={{ display: 'inline-block', width: 12, height: 8, background: '#006B6B', borderRadius: 2 }}></span> NSPC</span>
          </div>
        </div>

        <Callout type="highlight" title="Comments +140% Above Competitor Average">
          NSPC's comment count of 30 is +140% above the competitor average — the strongest relative performance of any metric this period. This signals that NSPC's content is generating more discussion and debate relative to peers than at any point in tracked history. With 13 posts vs Cardolite's 8, NSPC is also the most active poster in the specialist chemicals peer group.
        </Callout>

        <Callout type="warning" title="New Follower Count — Context Matters">
          On raw new follower numbers, NSPC at 103 is 70% below the competitor average, which is pulled up significantly by Atul Ltd's 1,500 new followers. Atul operates at a fundamentally different scale (144,995 followers). Excluding Atul, NSPC's 103 new followers compares more favourably against Cardolite (147) and Prakash (330) — the more relevant benchmarks given their audience composition.
        </Callout>
      </section>

      <ConsultantNote>
        "I want to call out something important here: our comments are 140% above the competitor average. In B2B, comments are the hardest engagement metric to earn — they require genuine interest and professional opinion. The fact that we're leading on this tells me our technical content is landing with real practitioners, not just passive scrollers. That's the audience we're building for."
      </ConsultantNote>

    </div>
  );
}
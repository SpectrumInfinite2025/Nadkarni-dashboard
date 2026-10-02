import { ReactNode, useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'neutral';
type Row = Record<string, string | number>;

type KpiProps = { value: string; label: string; change: string; direction: Direction; accent: string };

const colors = {
  navy: '#003366',
  teal: '#006B6B',
  green: '#1B5E20',
  greenLt: '#E8F5E9',
  amber: '#B8860B',
  amberLt: '#FFF8E1',
  red: '#C62828',
  redLt: '#FFEBEE',
  blueLt: '#E3F2FD',
  grey: '#F5F5F5',
  text: '#212121',
  sub: '#555555',
};

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState('0');
  const numeric = Number(value.replace(/[^0-9.]/g, '')) || 0;
  const decimal = value.includes('.');
  const suffix = value.replace(/^[^0-9]*/, '').replace(/[0-9,.]+/, '');

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (time: number) => {
        const progress = Math.min((time - start) / 850, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = numeric * eased;
        setDisplay(`${decimal ? current.toFixed(1) : Math.floor(current).toLocaleString()}${suffix}`);
        if (progress < 1) requestAnimationFrame(tick);
        else setDisplay(value);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [decimal, numeric, suffix, value]);

  return <span ref={ref}>{display}</span>;
}

function KpiCard({ value, label, change, direction, accent }: KpiProps) {
  const color = direction === 'up' ? colors.green : direction === 'down' ? colors.red : colors.amber;
  const arrow = direction === 'up' ? '▲' : direction === 'down' ? '▼' : '→';
  return (
    <div className="stat-card" style={{ borderTop: `4px solid ${accent}`, textAlign: 'left' }}>
      <div style={{ fontSize: '1.85rem', fontWeight: 800, color: colors.navy, lineHeight: 1.1 }}><Counter value={value} /></div>
      <div style={{ color: colors.sub, fontSize: '0.82rem', marginTop: '0.35rem' }}>{label}</div>
      <div style={{ color, fontWeight: 700, fontSize: '0.78rem', marginTop: '0.45rem' }}>{arrow} {change}</div>
    </div>
  );
}

function Lightbox({ src, alt, close }: { src: string; alt: string; close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);
  return (
    <div role="dialog" aria-label="Expanded report image" onClick={close} style={{ position: 'fixed', inset: 0, zIndex: 10000, background: 'rgba(0,0,0,.88)', display: 'grid', placeItems: 'center', padding: '2rem', cursor: 'zoom-out' }}>
      <button aria-label="Close image" onClick={close} style={{ position: 'fixed', right: 22, top: 14, border: 0, background: 'transparent', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>×</button>
      <img src={src} alt={alt} onClick={(event) => event.stopPropagation()} style={{ maxWidth: '94vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: 8 }} />
    </div>
  );
}

function ReportImage({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const [open, setOpen] = useState(false);
  return (
    <figure style={{ margin: '1.25rem 0' }}>
      <div className="image-container" onClick={() => setOpen(true)} style={{ cursor: 'zoom-in' }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
      </div>
      <figcaption className="image-caption">Source: {caption}</figcaption>
      {open && <Lightbox src={src} alt={alt} close={() => setOpen(false)} />}
    </figure>
  );
}

function ImportantNote({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <aside style={{ borderLeft: '12px solid #003366', background: '#EEF2F7', borderRadius: '0 8px 8px 0', padding: open ? '20px 24px' : '12px 24px', margin: '24px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: open ? 8 : 0 }}>
        <strong style={{ fontSize: '0.75rem', color: colors.navy, textTransform: 'uppercase', letterSpacing: '.06em' }}>Important Note</strong>
        <button aria-label={open ? 'Collapse important note' : 'Expand important note'} onClick={() => setOpen(!open)} style={{ border: 0, background: 'transparent', color: colors.navy, fontSize: '1.15rem', cursor: 'pointer' }}>{open ? '−' : '+'}</button>
      </div>
      {open && <div style={{ fontStyle: 'italic', color: '#333', fontSize: '0.9rem', lineHeight: 1.7 }}>{children}</div>}
    </aside>
  );
}

function Callout({ tone, title, children }: { tone: 'green' | 'amber' | 'red' | 'teal'; title: string; children: ReactNode }) {
  const style = tone === 'green' ? { border: colors.green, background: colors.greenLt } : tone === 'amber' ? { border: colors.amber, background: colors.amberLt } : tone === 'red' ? { border: colors.red, background: colors.redLt } : { border: colors.teal, background: colors.blueLt };
  return <div style={{ borderLeft: `6px solid ${style.border}`, background: style.background, borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', margin: '1.25rem 0', color: colors.text, lineHeight: 1.65, fontSize: '.9rem' }}><strong style={{ display: 'block', color: style.border, marginBottom: '.35rem' }}>{title}</strong>{children}</div>;
}

function SortableTable({ headers, rows, highlight }: { headers: string[]; rows: Row[]; highlight?: (row: Row) => boolean }) {
  const [sort, setSort] = useState<{ column: string; asc: boolean } | null>(null);
  const sortedRows = sort ? [...rows].sort((a, b) => {
    const left = a[sort.column]; const right = b[sort.column];
    const leftNumber = typeof left === 'number' ? left : Number(String(left).replace(/[^0-9.-]/g, ''));
    const rightNumber = typeof right === 'number' ? right : Number(String(right).replace(/[^0-9.-]/g, ''));
    const result = Number.isNaN(leftNumber) || Number.isNaN(rightNumber) ? String(left).localeCompare(String(right)) : leftNumber - rightNumber;
    return sort.asc ? result : -result;
  }) : rows;
  const toggle = (column: string) => setSort((current) => current?.column === column ? { column, asc: !current.asc } : { column, asc: true });
  return (
    <div style={{ overflowX: 'auto', margin: '1rem 0' }}>
      <table style={{ width: '100%', minWidth: 650, borderCollapse: 'collapse', fontSize: '.82rem' }}>
        <thead><tr style={{ background: colors.navy, color: '#fff' }}>{headers.map((header) => <th key={header} onClick={() => toggle(header)} style={{ padding: '.7rem .75rem', textAlign: header === headers[0] ? 'left' : 'right', cursor: 'pointer', whiteSpace: 'nowrap' }}>{header} {sort?.column === header ? (sort.asc ? '↑' : '↓') : '↕'}</th>)}</tr></thead>
        <tbody>{sortedRows.map((row, index) => <tr key={index} style={{ background: highlight?.(row) ? '#E0F4F4' : index % 2 ? colors.grey : '#fff' }}>{headers.map((header, column) => <td key={header} style={{ padding: '.65rem .75rem', textAlign: column === 0 ? 'left' : 'right', fontWeight: highlight?.(row) ? 700 : 400, color: highlight?.(row) ? colors.teal : colors.text }}>{row[header]}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function LineChart({ kind }: { kind: 'linkedin' | 'ga' | 'gsc' | 'cwv' }) {
  const points = kind === 'linkedin' ? '8,116 18,105 28,111 38,93 48,99 58,72 68,81 78,50 88,64 98,28' : kind === 'ga' ? '8,80 18,72 28,79 38,65 48,69 58,53 68,61 78,48 88,55 98,42' : kind === 'gsc' ? '8,70 18,42 28,64 38,30 48,58 58,35 68,68 78,40 88,55 98,28' : '8,96 18,96 28,96 38,96 48,78 58,58 68,73 78,43 88,35 98,22';
  return <div style={{ background: '#F8FAFC', border: '1px solid #D7E1EA', borderRadius: 10, padding: '1rem', margin: '1.25rem 0' }}><div style={{ fontSize: '.78rem', color: colors.navy, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.5rem' }}>{kind === 'linkedin' ? 'Impressions trend — 31 days' : kind === 'ga' ? 'Active users and peer median' : kind === 'gsc' ? 'Clicks and impressions — daily trend' : 'Mobile Core Web Vitals trend'}</div><svg viewBox="0 0 106 110" role="img" aria-label="Report trend chart" style={{ width: '100%', height: 190 }}><path d="M8 96H100 M8 72H100 M8 48H100 M8 24H100" stroke="#D7E1EA" strokeWidth=".7" /><polyline points={points} fill="none" stroke={kind === 'cwv' ? colors.green : colors.teal} strokeWidth="2.5" vectorEffect="non-scaling-stroke" /><polyline points={kind === 'ga' ? '8,88 18,85 28,89 38,84 48,87 58,82 68,85 78,80 88,84 98,78' : ''} fill="none" stroke={colors.navy} strokeDasharray="3 2" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /><circle cx="98" cy={kind === 'linkedin' ? 28 : kind === 'ga' ? 42 : kind === 'gsc' ? 28 : 22} r="2.8" fill={kind === 'cwv' ? colors.green : colors.navy} /></svg><div style={{ display: 'flex', justifyContent: 'space-between', color: '#777', fontSize: '.72rem' }}><span>Jul 15</span><span>Jul 24</span><span>Aug 5</span><span>Aug 14</span></div></div>;
}

function DonutChart() {
  return <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', margin: '1.25rem 0' }}><div style={{ width: 150, height: 150, borderRadius: '50%', background: 'conic-gradient(#003366 0 61.05%, #006B6B 61.05% 91.82%, #5C8FD6 91.82% 97.93%, #B8860B 97.93% 99.4%, #C5CDD5 99.4% 100%)', display: 'grid', placeItems: 'center' }}><div style={{ width: 80, height: 80, borderRadius: '50%', background: '#fff', display: 'grid', placeItems: 'center', color: colors.navy, fontWeight: 800, fontSize: '.8rem' }}>819<br />sessions</div></div><div style={{ display: 'grid', gap: '.35rem', fontSize: '.82rem' }}>{[['#003366', 'Organic Search — 61.05%'], ['#006B6B', 'Direct — 30.77%'], ['#5C8FD6', 'Organic Social — 6.11%'], ['#B8860B', 'AI Assistant — 1.47%'], ['#C5CDD5', 'Other — 0.86%']].map(([color, label]) => <span key={label}><i style={{ display: 'inline-block', width: 10, height: 10, background: color, borderRadius: 2, marginRight: 8 }} />{label}</span>)}</div></div>;
}

function SectionTitle({ number, title, id }: { number: string; title: string; id: string }) { return <div id={id} style={{ scrollMarginTop: 150 }}><h2>{number} — {title}</h2></div>; }

const competitorRows: Row[] = [
  { Rank: 1, Company: 'Atul Ltd', 'Total Followers': 146369, 'New Followers': '2,100 ▲35.1%', Posts: '17 ▲54.5%', Comments: '59 ▼11.9%', Reactions: '6,500 ▲51.3%' },
  { Rank: 2, Company: 'Prakash Chemicals International', 'Total Followers': 32242, 'New Followers': '391 ▲13.7%', Posts: '13 ▲62.5%', Comments: '14 ▲600%', Reactions: '1,000 ▲180.9%' },
  { Rank: 3, Company: 'Cardolite Corporation', 'Total Followers': 6174, 'New Followers': '180 ▲17.6%', Posts: '7 ▼12.5%', Comments: '8 ▲33.3%', Reactions: '371 ▼26.4%' },
  { Rank: 4, Company: 'NSPC (You)', 'Total Followers': 1281, 'New Followers': '145 ▲33%', Posts: '12 ▼7.7%', Comments: '22 ▼26.7%', Reactions: '438 ▼13.9%' },
  { Rank: 5, Company: 'Macro Polymers Pvt. Ltd. – India', 'Total Followers': 4920, 'New Followers': '47 ▲62.1%', Posts: 0, Comments: 0, Reactions: '3 ▲200%' },
];

function Hero() {
  const cards: KpiProps[] = [
    { value: '24,705', label: 'LinkedIn Impressions', change: '+51.2% vs Jun–Jul', direction: 'up', accent: colors.navy },
    { value: '438', label: 'Reactions', change: '10.1%', direction: 'down', accent: colors.navy },
    { value: '22', label: 'Comments', change: '26.7%', direction: 'down', accent: colors.navy },
    { value: '1,281', label: 'Total Followers', change: '+132 vs prior', direction: 'up', accent: colors.navy },
    { value: '576', label: 'Active Users', change: '+26.0%', direction: 'up', accent: colors.teal },
    { value: '819', label: 'Total Sessions', change: 'period total', direction: 'neutral', accent: colors.teal },
    { value: '562', label: 'New Users', change: '+34.8%', direction: 'up', accent: colors.teal },
    { value: '338', label: 'GSC Total Clicks', change: 'period total', direction: 'neutral', accent: colors.teal },
  ];
  return <>
    <section style={{ background: 'linear-gradient(135deg, #003366, #006B6B)', color: '#fff', borderRadius: 14, padding: '2.5rem 2rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '.76rem', letterSpacing: '.12em', opacity: .86 }}>NADKARNI SPECIALITY POLYMERS &amp; COATINGS PVT. LTD.</div>
      <div style={{ fontSize: '.88rem', marginTop: '.4rem', opacity: .9 }}>nadkarnispc.com</div>
      <h1 style={{ color: '#fff', margin: '1.3rem 0 .45rem', fontSize: 'clamp(2rem, 5vw, 3.1rem)' }}>Digital Performance Report</h1>
      <div style={{ fontSize: '1.2rem' }}>July 15 – August 14, 2026</div>
      <div style={{ marginTop: '1rem', opacity: .88, fontSize: '.9rem' }}>LinkedIn Analytics · Google Analytics 4 · Technical SEO</div>
      <div style={{ marginTop: '1.5rem', fontSize: '.82rem', opacity: .8 }}>Prepared for NSPC | Confidential</div>
    </section>
    <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' }}>{cards.map((card) => <KpiCard key={card.label} {...card} />)}</div>
    <Callout tone="teal" title="Key Insight">July–August is the strongest reporting period across tracked metrics. LinkedIn impressions reached 24,705, web traffic rebounded with active users up 26%, mobile Core Web Vitals reached 56 good URLs with zero poor URLs, and Organic Search accounts for 61.05% of sessions.</Callout>
  </>;
}

export default function JulAugReport() {
  return <div className="accordion-content" style={{ padding: '1.5rem' }}>
    <div style={{ position: 'sticky', top: 80, zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '.6rem', background: colors.navy, color: '#fff', borderRadius: 8, padding: '.65rem 1rem', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,.14)' }}><strong>July 15 – August 14, 2026 | 31 Days</strong><span style={{ fontSize: '.78rem', opacity: .88 }}>Latest report</span></div>
    <nav aria-label="Jul–Aug report sections" style={{ position: 'sticky', top: 135, zIndex: 19, display: 'flex', gap: '.4rem', overflowX: 'auto', padding: '.5rem', margin: '0 -0.5rem 1.5rem', background: '#fff', borderBottom: '1px solid #D7E1EA' }}>{[['overview', 'Overview'], ['linkedin', 'LinkedIn'], ['analytics', 'Google Analytics'], ['techseo', 'Technical SEO'], ['comparison', 'vs. Last Period'], ['actions', 'Priority Actions']].map(([id, label]) => <a key={id} href={`#${id}`} style={{ whiteSpace: 'nowrap', padding: '.45rem .75rem', borderRadius: 999, background: '#EEF2F7', color: colors.navy, textDecoration: 'none', fontSize: '.78rem', fontWeight: 700 }}>{label}</a>)}</nav>
    <div id="overview" style={{ scrollMarginTop: 170 }}><Hero /></div>

    <section className="section" id="linkedin" style={{ scrollMarginTop: 170 }}>
      <SectionTitle number="1" title="LinkedIn Analytics" id="linkedin-title" />
      <section className="subsection"><h3>1.1 — Content Highlights</h3><ReportImage src="/Impressions_-_Thru_the_roof.png" alt="LinkedIn impressions highlights" caption="Impressions_-_Thru_the_roof.png | LinkedIn Analytics | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="24,705" label="Impressions" change="+44.9% vs prior" direction="up" accent={colors.green} /><KpiCard value="438" label="Reactions" change="13.9%" direction="down" accent={colors.red} /><KpiCard value="22" label="Comments" change="26.7%" direction="down" accent={colors.red} /><KpiCard value="1" label="Reposts" change="50%" direction="down" accent={colors.red} /></div><LineChart kind="linkedin" /><p>24,705 impressions is NSPC’s all-time record across every tracked reporting period. The growth is organic, with zero sponsored spend. Engagement softened slightly as reach expanded, so the next content sprint should create more conversation-led formats.</p><Callout tone="green" title="All-time organic record">The peak around August 5–8 aligns with post-show content momentum from Paint Istanbul Turkcoat 2026.</Callout><ImportantNote>24,705 impressions is a major milestone. The account has moved from 2,799 monthly impressions to nearly nine times that level through consistent, technically credible content.</ImportantNote></section>
      <section className="subsection"><h3>1.2 — Follower Growth</h3><ReportImage src="/Followers_Growth_-_Fantastic_1281_Followers.png" alt="LinkedIn follower growth highlights" caption="Followers_Growth_-_Fantastic_1281_Followers.png | LinkedIn Analytics | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="1,281" label="Total Followers" change="+132 vs prior" direction="up" accent={colors.navy} /><KpiCard value="145" label="New Followers" change="+33%" direction="up" accent={colors.green} /></div><div className="content-box"><strong>Follower journey</strong>{[['Jan–Feb 2026', 860], ['Mar–May 2026', 938], ['Jun–Jul 2026', 1149], ['Jul–Aug 2026', 1281]].map(([period, total]) => <div key={period as string} style={{ marginTop: '.75rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.8rem' }}><span>{period}</span><b>{Number(total).toLocaleString()}</b></div><div style={{ height: 12, background: '#DDE5EA', borderRadius: 8, overflow: 'hidden' }}><div style={{ width: `${Number(total) / 1281 * 100}%`, height: '100%', background: period === 'Jul–Aug 2026' ? colors.navy : colors.teal }} /></div></div>)}</div><Callout tone="green" title="Highest single-period follower acquisition">145 new followers in 31 days is the highest acquisition in NSPC’s LinkedIn history. The audience has grown 49% since January.</Callout><ImportantNote>New followers are the result of showing up consistently with content that coating formulators find useful. The audience is voting with its follow, without ad spend.</ImportantNote></section>
      <section className="subsection"><h3>1.3 — Visitor Metrics</h3><ReportImage src="/Visitor_Highlights copy.png" alt="LinkedIn visitor highlights" caption="Visitor_Highlights copy.png | LinkedIn Analytics | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="269" label="Page Views" change="12.7% vs prior" direction="down" accent={colors.red} /><KpiCard value="104" label="Unique Visitors" change="16.1% vs prior" direction="down" accent={colors.red} /><KpiCard value="0" label="Custom Button Clicks" change="fourth consecutive zero" direction="down" accent={colors.red} /></div><p>Page views and unique visitors dipped slightly despite record impressions. This is normal when more people consume content natively in-feed rather than navigating to the page.</p><ImportantNote>Four cycles of zero CTA clicks is now a chronic conversion issue. Profile traffic is arriving, but the next step is not compelling or visible enough.</ImportantNote></section>
      <section className="subsection"><h3>1.4 — Competitive Benchmarking</h3><ReportImage src="/Competitor_Highlights copy 2.png" alt="LinkedIn competitor highlights" caption="Competitor_Highlights copy 2.png | LinkedIn Competitor Highlights | Last 31 days" /><ReportImage src="/Competitor_Highights_Page_2.png" alt="LinkedIn competitor growth table" caption="Competitor_Highights_Page_2.png | LinkedIn Compare Growth | Last 31 days" /><div className="stats-grid"><KpiCard value="22" label="Comments on posts" change="+59% vs competitors" direction="up" accent={colors.green} /><KpiCard value="145" label="New followers" change="69% below competitors" direction="down" accent={colors.amber} /></div><SortableTable headers={['Rank', 'Company', 'Total Followers', 'New Followers', 'Posts', 'Comments', 'Reactions']} rows={competitorRows} highlight={(row) => row.Company === 'NSPC (You)'} /><Callout tone="green" title="NSPC leads on meaningful engagement">NSPC comments are 59% above the competitor average for the second consecutive cycle. Prakash Chemicals’ spike to 14 comments and 1,000 reactions is the key competitor movement to monitor.</Callout><ImportantNote>Comments are the engagement metric that matters most in B2B. NSPC is starting conversations that peers are not, even with a lower posting volume.</ImportantNote></section>
    </section>

    <section className="section" id="analytics" style={{ scrollMarginTop: 170 }}><SectionTitle number="2" title="Google Analytics" id="analytics-title" />
      <section className="subsection"><h3>2.1 — GA4 Active Users Overview</h3><ReportImage src="/26%_increase_in_active_user_traffic.png" alt="GA4 active users overview" caption="26%_increase_in_active_user_traffic.png | GA4 | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="576" label="Active Users" change="+26.0%" direction="up" accent={colors.green} /><KpiCard value="4,800" label="Event Count" change="+0.9%" direction="up" accent={colors.teal} /><KpiCard value="562" label="New Users" change="+34.8%" direction="up" accent={colors.green} /></div><LineChart kind="ga" /><p>576 active users marks a significant rebound from the prior cycle’s 437. New users at 562 confirms that organic search improvements and content compounding are bringing in fresh visitors.</p><Callout tone="green" title="Back above the peer median">NSPC outperforms the Plastics &amp; Polymers peer median for much of the period, confirming that the previous dip was temporary.</Callout><ImportantNote>The content and SEO work is compounding. Each useful article, improved title tag, and stronger product page adds to the month-by-month flywheel.</ImportantNote></section>
      <section className="subsection"><h3>2.2 — Geographic Performance</h3><ReportImage src="/Active_users_by_country.png" alt="GA4 active users by country" caption="Active_users_by_country.png | GA4 Active Users by Country | Jul 15–Aug 14, 2026" /><SortableTable headers={['#', 'Country', 'Active Users', 'Change', 'Notable Signal']} rows={[{ '#': 1, Country: 'India', 'Active Users': 358, Change: '▲ +30.2%', 'Notable Signal': 'Primary market — sustained growth' }, { '#': 2, Country: 'United States', 'Active Users': 67, Change: '▲ +26.4%', 'Notable Signal': 'Recovering — important rebound' }, { '#': 3, Country: 'Singapore', 'Active Users': 27, Change: '▲ +125%+', 'Notable Signal': 'Breakout — ASEAN accelerating' }, { '#': 4, Country: 'United Kingdom', 'Active Users': 10, Change: '▲ +25.0%', 'Notable Signal': 'Consistent European growth' }, { '#': 5, Country: 'Australia', 'Active Users': 7, Change: '▲ +75.0%', 'Notable Signal': 'New entrant' }, { '#': 6, Country: 'Germany', 'Active Users': 7, Change: '▲ +16.7%', 'Notable Signal': 'Stable industrial market' }, { '#': 7, Country: 'Türkiye', 'Active Users': 7, Change: '▼ 22.2%', 'Notable Signal': 'Post-show normalisation' }]} highlight={(row) => row.Country === 'Singapore'} /><Callout tone="green" title="Singapore is the breakout market">Singapore active users surged more than 125%, while Australia appeared with 75% growth. This signals meaningful APAC traction without paid advertising.</Callout><Callout tone="teal" title="United States rebound">The US recovered 26.4% and is again the second-largest market by traffic.</Callout><ImportantNote>Singapore is a deliberate strategic market. A dedicated article about tropical climate coating challenges could turn this discovery traffic into commercial interest.</ImportantNote></section>
      <section className="subsection"><h3>2.3 — Traffic Acquisition by Channel</h3><ReportImage src="/Traffic_Acquisition_-_Organic_Traffic_Dominating.png" alt="GA4 traffic acquisition by channel" caption="Traffic_Acquisition_-_Organic_Traffic_Dominating.png | GA4 Session Channel Group | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="819" label="Total Sessions" change="period total" direction="neutral" accent={colors.navy} /><KpiCard value="456" label="Engaged Sessions" change="55.68% rate" direction="up" accent={colors.green} /><KpiCard value="58s" label="Average Engagement Time" change="per session" direction="neutral" accent={colors.teal} /></div><DonutChart /><SortableTable headers={['#', 'Channel', 'Sessions', '%', 'Engaged Sessions', 'Eng. Rate', 'Avg. Eng. Time']} rows={[{ '#': 1, Channel: 'Organic Search', Sessions: 500, '%': '61.05%', 'Engaged Sessions': 311, 'Eng. Rate': '62.2%', 'Avg. Eng. Time': '1m 15s' }, { '#': 2, Channel: 'Direct', Sessions: 252, '%': '30.77%', 'Engaged Sessions': 122, 'Eng. Rate': '48.41%', 'Avg. Eng. Time': '28s' }, { '#': 3, Channel: 'Organic Social', Sessions: 50, '%': '6.11%', 'Engaged Sessions': 17, 'Eng. Rate': '34%', 'Avg. Eng. Time': '42s' }, { '#': 4, Channel: 'AI Assistant', Sessions: 12, '%': '1.47%', 'Engaged Sessions': 5, 'Eng. Rate': '41.67%', 'Avg. Eng. Time': '52s' }, { '#': 5, Channel: 'Referral', Sessions: 4, '%': '0.49%', 'Engaged Sessions': 2, 'Eng. Rate': '50%', 'Avg. Eng. Time': '14s' }, { '#': 6, Channel: 'Unassigned', Sessions: 3, '%': '0.37%', 'Engaged Sessions': 0, 'Eng. Rate': '0%', 'Avg. Eng. Time': '3m 41s' }]} highlight={(row) => row.Channel === 'Organic Social'} /><Callout tone="green" title="Organic Social grew from 10 to 50 sessions">LinkedIn’s record impression month is now contributing meaningfully to website traffic. Social visitors also improved from 12 seconds to 42 seconds of engagement.</Callout><Callout tone="green" title="Organic Search reached 61.05%">500 organic sessions at a 62.2% engagement rate and 1m 15s average engagement time confirms search remains the highest-quality audience.</Callout><ImportantNote>Organic Social went from 10 to 50 sessions. This is the flywheel starting to turn: content builds LinkedIn reach, reach drives website visits, and visits build SEO authority.</ImportantNote></section>
      <section className="subsection"><h3>2.4 — GSC Search Performance</h3><ReportImage src="/Maginal_increase_in_traffic.png" alt="GA4 content performance" caption="Maginal_increase_in_traffic.png | GA4 Home Content Performance | Last 28 days" /><ReportImage src="/Overall_Performance.png" alt="Google Search Console overall performance" caption="Overall_Performance.png | Google Search Console | Jul 15–Aug 14, 2026" /><div className="stats-grid"><KpiCard value="338" label="Total Clicks" change="GSC full period" direction="neutral" accent={colors.navy} /><KpiCard value="31,500" label="Total Impressions" change="GSC full period" direction="neutral" accent={colors.teal} /><KpiCard value="1.1%" label="Average CTR" change="period average" direction="neutral" accent={colors.amber} /><KpiCard value="8.5" label="Average Position" change="expanded query set" direction="neutral" accent={colors.amber} /></div><SortableTable headers={['Page', 'Clicks', 'Change']} rows={[{ Page: 'Manufacturer & Global Supplier of Speciality Resins | NSPC', Clicks: 88, Change: '▼ 4%' }, { Page: 'SIMPLIFIED: Paint Technology 101 | Components & Science', Clicks: 33, Change: '▲ +27%' }, { Page: 'Understanding Cathodic Disbondment in Corrosion Protection | NSPC', Clicks: 23, Change: '▲ +28%' }, { Page: 'Specialty Polymers & Coatings Products | Global Supplier | NSPC', Clicks: 21, Change: '▲ +24%' }]} highlight={(row) => Number(row.Clicks) === 33 || Number(row.Clicks) === 23} /><LineChart kind="gsc" /><Callout tone="teal" title="Three of four top content pages are trending upward">Paint Technology 101, Cathodic Disbondment, and Products are all growing. The homepage’s 4% decline is expected as educational content captures more non-brand search traffic.</Callout><ImportantNote>An average position of 8.5 reflects a broader query footprint, not necessarily a ranking regression. More pages are appearing for more educational searches, expanding total reach.</ImportantNote></section>
      <section className="subsection"><h3>2.5 — Top Queries</h3><ReportImage src="/keywords_leading_searches_to_website.png" alt="Search queries leading to the website" caption="keywords_leading_searches_to_website.png | GA4 Home Queries Leading to Site" /><ReportImage src="/Insights_with_marginal_increase_in_Traffic.png" alt="Content traffic insights" caption="Insights_with_marginal_increase_in_Traffic.png | GA4 Home Insights on Content Traffic" /><SortableTable headers={['Query', 'Clicks', 'Change', 'Related Variants']} rows={[{ Query: 'nadkarni specialty polymers', Clicks: 28, Change: '▼ 33%', 'Related Variants': 'nadkarni speciality polymers and coatings private' }, { Query: 'paint technology', Clicks: 11, Change: '▲ +83%', 'Related Variants': 'painting technology' }, { Query: 'cathodic disbondment', Clicks: 8, Change: '▲ +60%', 'Related Variants': 'cathodic disbondment test, cathodic delamination' }, { Query: 'enlace ester y eter', Clicks: 6, Change: '▲ +500%', 'Related Variants': 'enlaces ester y eter, ester ether' }, { Query: 'nadkarni', Clicks: 5, Change: '▲ +25%', 'Related Variants': '—' }, { Query: 'nspc company', Clicks: 2, Change: '▼ 33%', 'Related Variants': '—' }]} highlight={(row) => row.Query === 'paint technology' || row.Query === 'enlace ester y eter'} /><Callout tone="green" title="Spanish-language query growth">“enlace ester y eter” now generates 6 clicks at +500%. Spanish meta descriptions for the Ethers vs Esters and Cathodic Disbondment articles could amplify this organic reach.</Callout><ImportantNote>Spanish queries are becoming a pattern. A focused meta description update is a small change with potential reach across Latin America and Spain.</ImportantNote></section>
    </section>

    <section className="section" id="techseo" style={{ scrollMarginTop: 170 }}><SectionTitle number="3" title="Technical SEO" id="techseo-title" /><section className="subsection"><h3>3.1 — Core Web Vitals — Mobile</h3><ReportImage src="/Tech_SEO_-_Core_Web_Vitals_Improvements.png" alt="Technical SEO Core Web Vitals improvements" caption="Tech_SEO_-_Core_Web_Vitals_Improvements.png | Google Search Console Experience | Jul–Aug 2026" /><ReportImage src="/Mobile_view_health.png" alt="Mobile Core Web Vitals health" caption="Mobile_view_health.png | GSC Core Web Vitals Mobile | Jul–Aug 2026" /><ReportImage src="/Bad_URLs_on_Mobile_view_fixed.png" alt="Mobile Core Web Vitals detail" caption="Bad_URLs_on_Mobile_view_fixed.png | GSC Mobile CWV Detail View | Jul–Aug 2026" /><div className="stats-grid"><KpiCard value="56" label="Good mobile URLs" change="clean sweep" direction="up" accent={colors.green} /><KpiCard value="0" label="Poor URLs" change="no issues" direction="neutral" accent={colors.green} /><KpiCard value="0" label="Needs Improvement" change="no issues" direction="neutral" accent={colors.green} /><KpiCard value="56" label="HTTPS URLs" change="all secure" direction="up" accent={colors.teal} /></div><LineChart kind="cwv" /><Callout tone="green" title="Major technical milestone">All 56 tracked mobile URLs pass Core Web Vitals. Zero poor, zero needing improvement, and zero non-HTTPS URLs.</Callout><div className="content-box"><strong>Technical work completed</strong><ul><li>Page speed optimisation</li><li>Image compression and lazy loading</li><li>Render-blocking resource elimination</li><li>Layout shift fixes for above-the-fold content</li><li>HTTPS migration verification across all 56 URLs</li></ul></div><ImportantNote>The site moved from zero good mobile URLs in May to all 56 passing by August. This is a meaningful technical and commercial win for visitors arriving through search, LinkedIn, or AI tools.</ImportantNote></section><section className="subsection"><h3>3.2 — On-Page SEO — Work in Progress</h3><p>The on-page recommendations below reflect completed, in-progress, and queued retainer work.</p><SortableTable headers={['Task', 'Pages Affected', 'Status', 'Sprint']} rows={[{ Task: 'H1 tag implementation', 'Pages Affected': '45 product pages', Status: 'In Progress', Sprint: 'Sep 2026' }, { Task: 'Word count enrichment', 'Pages Affected': '54 product pages', Status: 'In Progress', Sprint: 'Sep–Oct 2026' }, { Task: 'Multiple meta description fix', 'Pages Affected': '74 pages', Status: 'In Progress', Sprint: 'Oct 2026' }, { Task: 'Title tag optimisation', 'Pages Affected': '9+3 pages', Status: 'Completed', Sprint: 'Mar 2026' }, { Task: 'Missing meta descriptions', 'Pages Affected': '9 pages', Status: 'Completed', Sprint: 'Mar 2026' }, { Task: 'Core Web Vitals — Mobile', 'Pages Affected': '56 URLs', Status: 'Completed', Sprint: 'Jul 2026' }, { Task: 'Spanish meta descriptions', 'Pages Affected': '2 priority pages', Status: 'Recommended', Sprint: 'Sep 2026' }, { Task: 'Internal linking — blog to products', 'Pages Affected': 'Top 3 blog pages', Status: 'In Progress', Sprint: 'Sep 2026' }]} /><ImportantNote>The technical foundation is now cleaner than it has ever been. The next frontier is content depth: taking product pages beyond 300 words so Google can understand their specific commercial use cases.</ImportantNote></section></section>

    <section className="section" id="comparison" style={{ scrollMarginTop: 170 }}><SectionTitle number="4" title="vs. Last Period — Jun–Jul 2026" id="comparison-title" /><p>This comparison highlights what improved, what declined, and what to watch next.</p><SortableTable headers={['Metric', 'Jun–Jul 2026', 'Jul–Aug 2026', 'Change']} rows={[{ Metric: 'LinkedIn Impressions', 'Jun–Jul 2026': 16313, 'Jul–Aug 2026': 24705, Change: '▲ +51.5%' }, { Metric: 'New Followers', 'Jun–Jul 2026': 103, 'Jul–Aug 2026': 145, Change: '▲ +40.8%' }, { Metric: 'Comments', 'Jun–Jul 2026': 30, 'Jul–Aug 2026': 22, Change: '▼ 26.7%' }, { Metric: 'Active Users', 'Jun–Jul 2026': 437, 'Jul–Aug 2026': 576, Change: '▲ +31.8%' }, { Metric: 'New Users', 'Jun–Jul 2026': 394, 'Jul–Aug 2026': 562, Change: '▲ +42.6%' }, { Metric: 'Sessions', 'Jun–Jul 2026': 712, 'Jul–Aug 2026': 819, Change: '▲ +15.0%' }, { Metric: 'Organic Social Sessions', 'Jun–Jul 2026': 10, 'Jul–Aug 2026': 50, Change: '▲ +400%' }, { Metric: 'Singapore Active Users', 'Jun–Jul 2026': 11, 'Jul–Aug 2026': 27, Change: '▲ +145%' }, { Metric: 'Mobile CWV Good URLs', 'Jun–Jul 2026': 'Not measured', 'Jul–Aug 2026': 56, Change: 'NEW MILESTONE' }]} /><div className="two-column"><Callout tone="green" title="What improved">Impressions, follower growth, active users, new users, sessions, Organic Social, Singapore traffic, and mobile Core Web Vitals all moved in the right direction.</Callout><Callout tone="amber" title="Needs attention">Comments declined, CTA clicks remain at zero, and average position needs monitoring as the query footprint expands.</Callout></div><ImportantNote>The machine is working: content drives awareness, awareness drives sessions, and a faster website improves the experience. The next priorities are the CTA button and comment strategy.</ImportantNote></section>

    <section className="section" id="actions" style={{ scrollMarginTop: 170 }}><SectionTitle number="5" title="Priority Actions" id="actions-title" /><div className="approach-grid">{[['HIGH PRIORITY', colors.red, 'LinkedIn CTA Button', 'Relabel to Request a Sample or Download TDS, point to the contact page, and test for two weeks.'], ['HIGH PRIORITY', colors.red, 'Spanish Meta Descriptions', 'Add Spanish descriptions to Ethers vs Esters and Cathodic Disbondment articles.'], ['HIGH PRIORITY', colors.red, 'H1 Tags — Product Pages', 'Batch implementation across 45 product pages, starting with the highest-traffic CURE-O-POXY pages.'], ['MEDIUM PRIORITY', colors.amber, 'Tropical Climate Content for APAC', 'Publish an article about tropical and humid environment coating challenges.'], ['MEDIUM PRIORITY', colors.amber, 'Blog to Product Internal Links', 'Add contextual links from Paint Technology 101 and Cathodic Disbondment to product pages.'], ['MEDIUM PRIORITY', colors.amber, 'Comment Strategy Refresh', 'Use direct questions, polls, and “unpopular opinion” framing to recover comment engagement.'], ['LOWER PRIORITY', colors.green, 'Word Count Enrichment', 'Add 100–150 words of application context to 54 product pages.'], ['LOWER PRIORITY', colors.green, 'Multiple Meta Description Fix', 'Audit the WordPress plugin conflict affecting 74 pages.'], ['LOWER PRIORITY', colors.green, 'Desktop Core Web Vitals', 'Monitor desktop performance alongside the clean mobile result.']].map(([priority, color, title, body]) => <article key={title as string} className="approach-card" style={{ borderLeftColor: color as string }}><div style={{ fontSize: '.72rem', color: color as string, fontWeight: 800, letterSpacing: '.06em' }}>{priority}</div><h3 style={{ fontSize: '1.05rem', color: colors.navy, margin: '.55rem 0' }}>{title}</h3><p style={{ margin: 0, color: colors.sub, fontSize: '.88rem' }}>{body}</p></article>)}</div><ImportantNote>The immediate commercial priorities are simple: activate the LinkedIn CTA, strengthen Spanish search visibility, and finish the product-page heading work.</ImportantNote></section>
  </div>;
}

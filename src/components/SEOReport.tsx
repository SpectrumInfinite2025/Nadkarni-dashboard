import { useState, useEffect, useRef } from 'react';

// ── Status pill ──────────────────────────────────────────────────────────────
type PillVariant = 'done' | 'inprogress' | 'high' | 'medium' | 'low' | 'mixed' | 'reviewed' | 'h1missing';

const PILL_STYLES: Record<PillVariant, { bg: string; color: string; label: string }> = {
  done:      { bg: '#1B5E20', color: '#fff',     label: 'Done ✔' },
  inprogress:{ bg: '#FFF8E1', color: '#B8860B',  label: 'In Progress' },
  high:      { bg: '#FFEBEE', color: '#C62828',  label: 'High Priority' },
  medium:    { bg: '#FFF8E1', color: '#B8860B',  label: 'Medium Priority' },
  low:       { bg: '#E8F5E9', color: '#1B5E20',  label: 'Low Priority' },
  mixed:     { bg: '#E3F2FD', color: '#006B6B',  label: 'Mixed' },
  reviewed:  { bg: '#E3F2FD', color: '#006B6B',  label: 'Reviewed' },
  h1missing: { bg: '#FFEBEE', color: '#C62828',  label: 'H1 Missing' },
};

function Pill({ v, custom }: { v: PillVariant; custom?: string }) {
  const s = PILL_STYLES[v];
  return (
    <span style={{
      background: s.bg, color: s.color, fontWeight: 600, fontSize: '0.75rem',
      padding: '3px 10px', borderRadius: '999px', whiteSpace: 'nowrap', display: 'inline-block',
    }}>{custom ?? s.label}</span>
  );
}

// ── Searchable table ─────────────────────────────────────────────────────────
function SearchTable({ columns, rows, renderRow }: {
  columns: string[];
  rows: string[][];
  renderRow: (row: string[], i: number) => React.ReactNode;
}) {
  const [q, setQ] = useState('');
  const filtered = rows.filter(r => r.some(c => c.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <input
        value={q} onChange={e => setQ(e.target.value)}
        placeholder="Filter by keyword..."
        style={{
          width: '100%', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', border: '1px solid #CCCCCC',
          borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
        }}
      />
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ background: '#003366', color: '#fff' }}>
              {columns.map((c, i) => (
                <th key={i} style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700, whiteSpace: 'nowrap' }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => renderRow(row, i))}
            {filtered.length === 0 && (
              <tr><td colSpan={columns.length} style={{ padding: '1rem', textAlign: 'center', color: '#888' }}>No results</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: '0.8rem', color: '#888', marginTop: '0.4rem' }}>
        Showing {filtered.length} of {rows.length} rows
      </div>
    </div>
  );
}

// ── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar({ resolved, total, label }: { resolved: number; total: number; label?: string }) {
  const pct = Math.round((resolved / total) * 100);
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      {label && <div style={{ fontSize: '0.85rem', color: '#555', marginBottom: '0.3rem' }}>{label}</div>}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, background: '#e0e0e0', borderRadius: '999px', height: '12px', overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, background: '#1B5E20', height: '100%', borderRadius: '999px', transition: 'width 1s ease' }} />
        </div>
        <span style={{ fontWeight: 700, color: '#1B5E20', minWidth: '42px', fontSize: '0.875rem' }}>{pct}%</span>
        <span style={{ color: '#555', fontSize: '0.85rem' }}>{resolved}/{total}</span>
      </div>
    </div>
  );
}

// ── Callout box ──────────────────────────────────────────────────────────────
function Callout({ type, title, children }: { type: 'green' | 'amber' | 'red' | 'teal'; title?: string; children: React.ReactNode }) {
  const styles = {
    green: { border: '#1B5E20', bg: '#E8F5E9', color: '#1B5E20' },
    amber: { border: '#B8860B', bg: '#FFF8E1', color: '#B8860B' },
    red:   { border: '#C62828', bg: '#FFEBEE', color: '#C62828' },
    teal:  { border: '#006B6B', bg: '#E0F2F1', color: '#006B6B' },
  };
  const s = styles[type];
  return (
    <div style={{
      borderLeft: `6px solid ${s.border}`, background: s.bg,
      borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', margin: '1rem 0',
    }}>
      {title && <div style={{ fontWeight: 700, color: s.color, marginBottom: '0.4rem' }}>{title}</div>}
      <div style={{ color: '#333', lineHeight: 1.6, fontSize: '0.9rem' }}>{children}</div>
    </div>
  );
}

// ── Tech issue card ──────────────────────────────────────────────────────────
function TechCard({ title, status, children, note }: {
  title: string; status: 'done' | 'inprogress'; children: React.ReactNode; note?: React.ReactNode;
}) {
  const isDone = status === 'done';
  return (
    <div style={{
      borderLeft: `5px solid ${isDone ? '#1B5E20' : '#B8860B'}`,
      background: isDone ? '#f9fdf9' : '#fffdf0',
      borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', marginBottom: '1rem',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.6rem' }}>
        <span style={{ fontWeight: 700, color: '#006B6B', fontSize: '0.95rem' }}>{title}</span>
        <Pill v={isDone ? 'done' : 'inprogress'} custom={isDone ? 'RESOLVED ✔' : 'IN PROGRESS'} />
      </div>
      <p style={{ margin: 0, color: '#444', lineHeight: 1.6, fontSize: '0.875rem' }}>{children}</p>
      {note && <div style={{ marginTop: '0.75rem' }}>{note}</div>}
    </div>
  );
}

// ── Count-up hero card ────────────────────────────────────────────────────────
function HeroCard({ value, label, bg }: { value: number; label: string; bg: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const duration = 1500;
        const steps = 60;
        const inc = value / steps;
        let cur = 0;
        const tick = () => {
          cur += inc;
          if (cur < value) { setCount(Math.floor(cur)); requestAnimationFrame(tick); }
          else setCount(value);
        };
        tick();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref} style={{
      background: bg, borderRadius: '12px', padding: '1.5rem 1rem', textAlign: 'center',
      minWidth: '140px', flex: '1 1 140px',
    }}>
      <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{count.toLocaleString()}</div>
      <div style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.8rem', marginTop: '0.5rem', lineHeight: 1.3 }}>{label}</div>
    </div>
  );
}

// ── On-page sub-nav ───────────────────────────────────────────────────────────
const ONPAGE_TABS = [
  { id: 'wc',    label: 'Word Count' },
  { id: 'h1',    label: 'H1 Tags' },
  { id: 'nometa',label: 'Meta Descriptions' },
  { id: 'dupmeta',label: 'Duplicate Meta' },
  { id: 'multimeta',label: 'Multiple Meta' },
  { id: 'titlelong',label: 'Title Too Long' },
  { id: 'titleshort',label: 'Title Too Short' },
  { id: 'urls',  label: 'URLs' },
];

// ── Data ─────────────────────────────────────────────────────────────────────
const LOW_WC_ROWS: string[][] = [
  ['https://www.nadkarnispc.com/compare/', '129'],
  ['https://www.nadkarnispc.com/contact/', '195'],
  ['https://www.nadkarnispc.com/product-category/curepoxy/aliphatic-amine/', '180'],
  ['https://www.nadkarnispc.com/product-category/curepoxy/cycloaliphatic-amines/', '180'],
  ['https://www.nadkarnispc.com/product-category/curepoxy/phenalkamides/', '177'],
  ['https://www.nadkarnispc.com/product-category/curepoxy/polyamides/', '177'],
  ['https://www.nadkarnispc.com/product-category/neo-alkyd/', '185'],
  ['https://www.nadkarnispc.com/product-category/neopoxy/', '185'],
  ['https://www.nadkarnispc.com/product-category/solopoxy/', '196'],
  ['https://www.nadkarnispc.com/product-category/trigger/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-5115/', '163'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-5115x70/', '163'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-5125/', '165'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-5140/', '165'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6050/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6060/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6129/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6221/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6231/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-6237/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8022/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8040/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8041-lv/', '168'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8041-lvfd/', '168'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8041/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8041x90/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8062/', '174'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8065/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8115/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8124/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8125/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8140/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8203/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8205/', '176'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8207/', '176'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8268/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8450/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8451/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8454/', '175'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8558-lite/', '166'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8558/', '165'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8562-lite/', '167'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8562/', '166'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8566-lite/', '166'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8566/', '165'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8570-lite/', '166'],
  ['https://www.nadkarnispc.com/product/cure-o-poxy-8570/', '165'],
  ['https://www.nadkarnispc.com/product/neo-alkyd-7105x60/', '163'],
  ['https://www.nadkarnispc.com/product/neo-alkyd-7110x60/', '163'],
  ['https://www.nadkarnispc.com/product/neopoxy-1100x75/', '165'],
  ['https://www.nadkarnispc.com/product/neopoxy-500-75/', '165'],
  ['https://www.nadkarnispc.com/product/solopoxy-4800/', '167'],
  ['https://www.nadkarnispc.com/product/solopoxy-4848/', '164'],
  ['https://www.nadkarnispc.com/product/trigger-t-30/', '161'],
];

const H1_ROWS: string[] = [
  'https://www.nadkarnispc.com/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5115/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5115x70/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5125/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5140/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6050/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6060/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6129/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6221/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6231/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6237/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8022/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8040/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8041-lv/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8041-lvfd/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8041/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8041x90/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8062/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8065/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8115/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8124/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8125/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8140/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8203/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8205/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8207/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8268/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8450/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8451/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8454/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8558-lite/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8558/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8562-lite/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8562/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8566-lite/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8566/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8570-lite/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8570/',
  'https://www.nadkarnispc.com/product/neo-alkyd-7105x60/',
  'https://www.nadkarnispc.com/product/neo-alkyd-7110x60/',
  'https://www.nadkarnispc.com/product/neopoxy-1100x75/',
  'https://www.nadkarnispc.com/product/neopoxy-500-75/',
  'https://www.nadkarnispc.com/product/solopoxy-4800/',
  'https://www.nadkarnispc.com/product/solopoxy-4848/',
  'https://www.nadkarnispc.com/product/trigger-t-30/',
];

const MULTI_META_ROWS: string[] = [
  'https://www.nadkarnispc.com/',
  'https://www.nadkarnispc.com/about-us/',
  'https://www.nadkarnispc.com/beyond-the-surface-the-true-cost-of-coatings-and-tomorrows-sustainability/',
  'https://www.nadkarnispc.com/chemistry-in-a-nutshell-cashew-nut-shells-to-phenalkamines/',
  'https://www.nadkarnispc.com/composite-confections-epoxy-resins-as-the-cake-batter-of-engineering/',
  'https://www.nadkarnispc.com/contact/',
  'https://www.nadkarnispc.com/enhancing-coating-adhesion-a-comprehensive-guide-to-epoxy-resins-and-their-applications-across-various-substrates/',
  'https://www.nadkarnispc.com/epoxy-resins-in-electronics/',
  'https://www.nadkarnispc.com/epoxy-resins-in-energy-infrastructur/',
  'https://www.nadkarnispc.com/epoxy-resins-in-flooring-a-seamless-fusion-of-durability-and-aesthetics/',
  'https://www.nadkarnispc.com/insights/',
  'https://www.nadkarnispc.com/international-exhibition-conference-paintindia-2024/',
  'https://www.nadkarnispc.com/markets/',
  'https://www.nadkarnispc.com/mastering-the-molecular-bake-a-guide-to-modern-analytical-methods-for-polymer-characterization/',
  'https://www.nadkarnispc.com/next-level-epoxy-nspcs-greener-alternative-for-2k-epoxy-resins/',
  'https://www.nadkarnispc.com/part-1-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/',
  'https://www.nadkarnispc.com/part-2-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/',
  'https://www.nadkarnispc.com/phenalkamides-the-all-weather-curing-agent/',
  'https://www.nadkarnispc.com/product-category/curepoxy/',
  'https://www.nadkarnispc.com/product-category/curepoxy/aliphatic-amine/',
  'https://www.nadkarnispc.com/product-category/curepoxy/cycloaliphatic-amines/',
  'https://www.nadkarnispc.com/product-category/curepoxy/phenalkamides/',
  'https://www.nadkarnispc.com/product-category/curepoxy/phenalkamines/',
  'https://www.nadkarnispc.com/product-category/curepoxy/polyamides/',
  'https://www.nadkarnispc.com/product-category/neo-alkyd/',
  'https://www.nadkarnispc.com/product-category/neopoxy/',
  'https://www.nadkarnispc.com/product-category/solopoxy/',
  'https://www.nadkarnispc.com/product-category/trigger/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5115/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5115x70/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5125/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-5140/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6060/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6129/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6221/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6231/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-6237/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8022/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8040/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8041/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8062/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8065/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8115/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8124/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8125/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8140/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8203/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8205/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8207/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8268/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8450/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8451/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8454/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8558/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8562/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8566/',
  'https://www.nadkarnispc.com/product/cure-o-poxy-8570/',
  'https://www.nadkarnispc.com/product/neo-alkyd-7105x60/',
  'https://www.nadkarnispc.com/product/neo-alkyd-7110x60/',
  'https://www.nadkarnispc.com/product/neopoxy-1100x75/',
  'https://www.nadkarnispc.com/product/neopoxy-500-75/',
  'https://www.nadkarnispc.com/product/solopoxy-4800/',
  'https://www.nadkarnispc.com/product/solopoxy-4848/',
  'https://www.nadkarnispc.com/product/trigger-t-30/',
  'https://www.nadkarnispc.com/products/',
  'https://www.nadkarnispc.com/simplified-functional-groups-functionality-molecular-weight-equivalent-weight/',
  'https://www.nadkarnispc.com/simplified-paint-technology-101/',
  'https://www.nadkarnispc.com/technology/',
  'https://www.nadkarnispc.com/the-invisible-guardians-exploring-the-versatility-of-industrial-coatings/',
  'https://www.nadkarnispc.com/the-role-of-construction-chemicals-in-modern-infrastructure/',
  'https://www.nadkarnispc.com/understanding-cathodic-disbondment-a-comprehensive-exploration/',
  'https://www.nadkarnispc.com/understanding-the-challenges-of-the-marine-environment-a-comprehensive-guide/',
  'https://www.nadkarnispc.com/what-exactly-are-single-pack-epoxy-resins/',
  'https://www.nadkarnispc.com/what-is-the-status-quo-of-bio-based-epoxy-resins/',
];

const HIGH_PRIORITY_URLS = [
  'https://www.nadkarnispc.com/',
  'https://www.nadkarnispc.com/about-us/',
  'https://www.nadkarnispc.com/contact/',
  'https://www.nadkarnispc.com/products/',
  'https://www.nadkarnispc.com/technology/',
  'https://www.nadkarnispc.com/markets/',
  'https://www.nadkarnispc.com/simplified-paint-technology-101/',
  'https://www.nadkarnispc.com/understanding-cathodic-disbondment-a-comprehensive-exploration/',
];

function urlSlug(url: string) {
  return url.replace('https://www.nadkarnispc.com', '') || '/';
}

// ── SCOREBOARD ────────────────────────────────────────────────────────────────
const SCOREBOARD = [
  { cat: 'No Meta Description',          total: 9,   resolved: 9,   pct: 100, status: 'done' as const },
  { cat: 'Duplicate Meta Descriptions',  total: 2,   resolved: 2,   pct: 100, status: 'done' as const },
  { cat: 'Title Tag Too Long',           total: 9,   resolved: 9,   pct: 100, status: 'done' as const },
  { cat: 'Title Tag Too Short',          total: 3,   resolved: 3,   pct: 100, status: 'done' as const },
  { cat: 'Technical SEO Issues',         total: 6,   resolved: 3,   pct: 50,  status: 'inprogress' as const },
  { cat: 'Low Word Count',               total: 54,  resolved: 0,   pct: 0,   status: 'inprogress' as const },
  { cat: 'Missing H1 Tags',              total: 45,  resolved: 0,   pct: 0,   status: 'inprogress' as const },
  { cat: 'Multiple Meta Descriptions',   total: 74,  resolved: 0,   pct: 0,   status: 'inprogress' as const },
  { cat: 'Poorly Formatted URLs',        total: 5,   resolved: 0,   pct: 0,   status: 'inprogress' as const },
  { cat: 'URLs Too Long',                total: 2,   resolved: 0,   pct: 0,   status: 'inprogress' as const },
  { cat: 'Image SEO',                    total: 2,   resolved: 0,   pct: 0,   status: 'reviewed' as const },
];

// ── Main component ────────────────────────────────────────────────────────────
export default function SEOReport() {
  const [activeSection, setActiveSection] = useState('overview');
  const [onpageTab, setOnpageTab] = useState('wc');

  const sectionStyle = (id: string): React.CSSProperties => ({
    padding: '0.45rem 1rem',
    borderRadius: '999px',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: activeSection === id ? '#003366' : '#f0f0f0',
    color: activeSection === id ? '#fff' : '#444',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
  });

  const onpageTabStyle = (id: string): React.CSSProperties => ({
    padding: '0.4rem 0.9rem',
    borderRadius: '999px',
    fontSize: '0.78rem',
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    background: onpageTab === id ? '#006B6B' : '#e8f5f5',
    color: onpageTab === id ? '#fff' : '#006B6B',
    transition: 'background 0.2s',
    whiteSpace: 'nowrap',
  });

  const rowStyle = (i: number): React.CSSProperties => ({
    background: i % 2 === 0 ? '#fff' : '#F5F5F5',
    borderBottom: '1px solid #e0e0e0',
  });

  const tdStyle: React.CSSProperties = { padding: '0.55rem 1rem', color: '#333', fontSize: '0.85rem' };
  const linkStyle: React.CSSProperties = { color: '#006B6B', textDecoration: 'none', fontSize: '0.82rem', fontFamily: 'monospace' };

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: '#212121', lineHeight: 1.6 }}>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #003366 0%, #006B6B 100%)',
        padding: '3rem 2rem 2.5rem',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '0.85rem', letterSpacing: '0.05em', opacity: 0.85, marginBottom: '0.25rem', textTransform: 'uppercase' }}>
          Nadkarni Speciality Polymers &amp; Coatings Pvt. Ltd.
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '1.5rem' }}>nadkarnispc.com</div>
        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, margin: '0 0 0.5rem', color: '#fff' }}>
          SEO Audit &amp; Optimisation Report
        </h1>
        <p style={{ fontSize: '0.9rem', opacity: 0.85, margin: '0 0 0.5rem' }}>
          Technical SEO &middot; On-Page Optimisation &middot; URL Structure &middot; Image SEO
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.7, margin: 0 }}>
          Report Period: March – April 2026 &nbsp;|&nbsp; April 2026 &nbsp;|&nbsp; Prepared by: Yogesh Shinde — Digital Marketing Consultant
        </p>
        <p style={{ fontSize: '0.75rem', opacity: 0.6, margin: '0.25rem 0 0', fontStyle: 'italic' }}>
          Confidential — Prepared for Nadkarni SPC internal review
        </p>

        {/* Stat cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <HeroCard value={211} label="Total Issues Identified" bg="#003366" />
          <HeroCard value={8}   label="On-Page Issue Categories" bg="#006B6B" />
          <HeroCard value={6}   label="Technical Issues" bg="#006B6B" />
          <HeroCard value={28}  label="Resolved / Completed" bg="#1B5E20" />
        </div>
      </div>

      {/* Sub-nav */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50, background: '#fff',
        borderBottom: '2px solid #e0e0e0', padding: '0.6rem 1.5rem',
        display: 'flex', gap: '0.5rem', overflowX: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'technical', label: 'Technical SEO' },
          { id: 'onpage', label: 'On-Page SEO' },
          { id: 'imageseo', label: 'Image SEO' },
          { id: 'plan', label: 'Priority Plan' },
        ].map(s => (
          <button key={s.id} style={sectionStyle(s.id)} onClick={() => setActiveSection(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
        {activeSection === 'overview' && (
          <section id="overview">
            <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              Executive Summary
            </h2>
            <p style={{ color: '#006B6B', fontSize: '0.9rem', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              Overview of SEO work completed on nadkarnispc.com — March to April 2026
            </p>
            <p style={{ lineHeight: 1.7, marginBottom: '1.5rem' }}>
              This report documents all technical and on-page SEO improvements carried out on <strong>nadkarnispc.com</strong> over the past month. The audit covered the full website — product pages, category pages, blog posts, and core pages — and identified <strong>211 distinct issues</strong> across 8 on-page categories, technical infrastructure, and image SEO. A significant portion of these have been resolved; the remainder are flagged as work-in-progress for the next sprint.
            </p>

            {/* Summary table */}
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#003366', color: '#fff' }}>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Category</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Issues Found</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { cat: 'Low Word Count (On-Page)', n: 54, v: 'inprogress' as PillVariant },
                    { cat: 'Missing H1 Tag (On-Page)', n: 45, v: 'inprogress' as PillVariant },
                    { cat: 'No Meta Description (On-Page)', n: 9, v: 'done' as PillVariant },
                    { cat: 'Duplicate Meta Descriptions (On-Page)', n: 2, v: 'done' as PillVariant },
                    { cat: 'Multiple Meta Descriptions — Same Page (On-Page)', n: 74, v: 'inprogress' as PillVariant },
                    { cat: 'Title Tag Too Long (On-Page)', n: 9, v: 'done' as PillVariant },
                    { cat: 'Title Tag Too Short (On-Page)', n: 3, v: 'done' as PillVariant },
                    { cat: 'Poorly Formatted URLs (On-Page)', n: 5, v: 'inprogress' as PillVariant },
                    { cat: 'URLs Too Long (On-Page)', n: 2, v: 'inprogress' as PillVariant },
                    { cat: 'Technical SEO Issues', n: 6, v: 'mixed' as PillVariant },
                    { cat: 'Image SEO Issues', n: 2, v: 'reviewed' as PillVariant },
                  ].map((row, i) => (
                    <tr key={i} style={rowStyle(i)}>
                      <td style={tdStyle}>{row.cat}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600 }}>{row.n}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        <Pill v={row.v} custom={
                          row.v === 'done' ? 'Resolved ✔' :
                          row.v === 'mixed' ? 'Mixed (3 Done, 3 In Progress)' :
                          row.v === 'reviewed' ? 'Reviewed' : 'In Progress'
                        } />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Progress bars */}
            <ProgressBar resolved={28} total={211} label="Total Issues Resolved" />
            <ProgressBar resolved={183} total={211} label="Issues In Progress (next sprint)" />

            <Callout type="amber" title="Key Note">
              Pages with low word count, missing H1 tags, and multiple meta descriptions represent the largest opportunity areas. These directly affect crawlability, keyword relevance, and Google's ability to index pages with proper context. Priority resolution is recommended in the next sprint.
            </Callout>
          </section>
        )}

        {/* ── TECHNICAL SEO ────────────────────────────────────────────────── */}
        {activeSection === 'technical' && (
          <section id="technical">
            <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              Technical SEO Issues
            </h2>
            <p style={{ color: '#006B6B', fontSize: '0.9rem', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              Infrastructure-level fixes that affect crawlability, indexability, and signals
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <div style={{ background: '#003366', color: '#fff', borderRadius: '10px', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
                6 Issues Found
              </div>
              <div style={{ background: '#1B5E20', color: '#fff', borderRadius: '10px', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
                3 Resolved
              </div>
              <div style={{ background: '#B8860B', color: '#fff', borderRadius: '10px', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
                3 In Progress
              </div>
            </div>

            <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
              <strong>6 technical issues</strong> were identified during the audit. 3 have been fully resolved; 3 remain in progress. These issues affect how Google crawls, indexes, and understands the site.
            </p>

            <TechCard title="Website Speed" status="done">
              Page load time was 11.3 seconds — well above the 3-second threshold Google uses as a benchmark for mobile UX. Speed optimisation has been completed. Faster load times directly reduce bounce rate and improve Core Web Vitals scores.
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ background: '#FFEBEE', color: '#C62828', padding: '4px 12px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
                  Before: 11.3 seconds
                </span>
                <span style={{ background: '#E8F5E9', color: '#1B5E20', padding: '4px 12px', borderRadius: '6px', fontWeight: 600, fontSize: '0.85rem' }}>
                  After: Optimised
                </span>
              </div>
            </TechCard>

            <TechCard title="Social Signals (Open Graph / Twitter Cards)" status="inprogress">
              Social media meta tags (Open Graph, Twitter Cards) were missing site-wide. These signals affect how content appears when shared on LinkedIn, WhatsApp, and other platforms. Implementation is pending.
            </TechCard>

            <TechCard title="Local Schema Markup" status="done">
              LocalBusiness schema was absent, limiting NSPC's visibility in local/regional Google search. Schema has now been implemented with correct business details.
            </TechCard>

            <TechCard title="URL Structure" status="inprogress">
              Several URLs contained non-SEO-friendly patterns. A URL restructuring plan is underway. See the URL Audit section (On-Page SEO) for the full detail.
            </TechCard>

            <TechCard
              title="llms.txt (AI Crawler Visibility)"
              status="done"
              note={
                <Callout type="teal" title="Forward-Looking SEO Action">
                  llms.txt is the emerging standard for AI search visibility, equivalent to robots.txt for traditional crawlers. This ensures NSPC surfaces in AI-generated answers from ChatGPT, Perplexity, and Claude.
                </Callout>
              }
            >
              A llms.txt file was missing, leaving the site invisible to AI-powered crawlers (ChatGPT, Perplexity, Claude). This file has been implemented — a forward-thinking move that ensures NSPC surfaces in AI-generated answers.
            </TechCard>

            <TechCard title="Address / Contact Visibility" status="inprogress">
              The business address was not prominently or consistently displayed, affecting local signals and trust signals. Structural fix is in progress.
            </TechCard>

            <div style={{ marginTop: '1.5rem' }}>
              <ProgressBar resolved={3} total={6} label="Technical Issues Resolved" />
            </div>
          </section>
        )}

        {/* ── ON-PAGE SEO ───────────────────────────────────────────────────── */}
        {activeSection === 'onpage' && (
          <section id="onpage">
            <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.5rem', marginBottom: '1rem' }}>
              On-Page SEO Issues
            </h2>

            {/* Sub-tabs */}
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {ONPAGE_TABS.map(t => (
                <button key={t.id} style={onpageTabStyle(t.id)} onClick={() => setOnpageTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* 2.1 Word Count */}
            {onpageTab === 'wc' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Low Word Count</h3>
                  <Pill v="inprogress" custom="54 Pages — In Progress" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  <strong>54 pages</strong> were identified with low word counts (under 300 words). Google uses content depth as a relevance signal. Pages with thin content are unlikely to rank for competitive keywords and may be treated as low-quality by search algorithms. Product and category pages especially need enriched descriptions, application context, and technical specifications.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Word Count Range</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>No. of Pages</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>SEO Risk</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { range: '< 150 words', n: 1, risk: 'High', v: 'high' as PillVariant },
                        { range: '150–175 words', n: 43, risk: 'High', v: 'high' as PillVariant },
                        { range: '176–200 words', n: 10, risk: 'Medium', v: 'medium' as PillVariant },
                        { range: '> 200 words', n: 0, risk: '—', v: 'low' as PillVariant },
                      ].map((row, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={tdStyle}>{row.range}</td>
                          <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600 }}>{row.n}</td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}>{row.risk !== '—' ? <Pill v={row.v} custom={row.risk} /> : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h4 style={{ color: '#003366', marginBottom: '0.75rem' }}>All Affected Pages</h4>
                <SearchTable
                  columns={['Page URL', 'Word Count', 'Status']}
                  rows={LOW_WC_ROWS}
                  renderRow={(row, i) => (
                    <tr key={i} style={rowStyle(i)}>
                      <td style={tdStyle}>
                        <a href={row[0]} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          {urlSlug(row[0])}
                        </a>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600, color: parseInt(row[1]) < 150 ? '#C62828' : '#B8860B' }}>
                        {row[1]}
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}><Pill v="inprogress" /></td>
                    </tr>
                  )}
                />
              </div>
            )}

            {/* 2.2 H1 Tags */}
            {onpageTab === 'h1' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Missing H1 Tags</h3>
                  <Pill v="inprogress" custom="45 Pages — In Progress" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
                  <strong>45 pages</strong> were found with no H1 tag. The H1 is the single most important on-page heading signal — it tells Google what a page is about and anchors the content hierarchy. Missing H1 tags are a significant on-page SEO gap, particularly for product pages which are key commercial landing pages for NSPC.
                </p>
                <Callout type="red" title="Critical: Homepage Missing H1">
                  The homepage (nadkarnispc.com/) is among the 45 pages missing an H1 tag. This is the highest-priority fix in the entire audit — the homepage H1 is the primary signal Google uses to understand what the site is about.
                </Callout>

                <SearchTable
                  columns={['Page URL', 'Status']}
                  rows={H1_ROWS.map(u => [u])}
                  renderRow={(row, i) => (
                    <tr key={i} style={rowStyle(i)}>
                      <td style={tdStyle}>
                        <a href={row[0]} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                          {urlSlug(row[0])}
                        </a>
                      </td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}><Pill v="h1missing" /></td>
                    </tr>
                  )}
                />
              </div>
            )}

            {/* 2.3 No Meta Description */}
            {onpageTab === 'nometa' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>No Meta Description</h3>
                  <Pill v="done" custom="9 Pages — All Resolved" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
                  <strong>9 pages</strong> were identified with missing meta descriptions. <strong>All have been fixed.</strong> Meta descriptions do not directly influence rankings but significantly impact click-through rates (CTR) in search results. Well-crafted descriptions help NSPC present its products and expertise compellingly to chemists and formulators searching for solutions.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'https://www.nadkarnispc.com/compare/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-6050/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8041-lv/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8041-lvfd/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8041x90/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8558-lite/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8562-lite/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8566-lite/',
                        'https://www.nadkarnispc.com/product/cure-o-poxy-8570-lite/',
                      ].map((url, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={tdStyle}>
                            <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{urlSlug(url)}</a>
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}><Pill v="done" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Callout type="green" title="Achievement: 100% Resolution">
                  All 9 missing meta descriptions have been written and implemented. 9/9 complete — 100% resolution rate for this category.
                </Callout>
              </div>
            )}

            {/* 2.4 Duplicate Meta */}
            {onpageTab === 'dupmeta' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Duplicate Meta Descriptions</h3>
                  <Pill v="done" custom="2 Pages — All Resolved" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
                  <strong>2 pages</strong> were found sharing identical meta descriptions. Duplicate meta descriptions confuse search engines and reduce the distinctiveness of each page in SERPs. Both pages have been fixed with unique, keyword-relevant descriptions.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        'https://www.nadkarnispc.com/product-category/curepoxy/phenalkamides/',
                        'https://www.nadkarnispc.com/product-category/curepoxy/phenalkamines/',
                      ].map((url, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={tdStyle}>
                            <a href={url} target="_blank" rel="noopener noreferrer" style={linkStyle}>{urlSlug(url)}</a>
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}><Pill v="done" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2.5 Multiple Meta */}
            {onpageTab === 'multimeta' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Multiple Meta Descriptions on Same Page</h3>
                  <Pill v="inprogress" custom="74 Pages — In Progress" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1rem' }}>
                  <strong>74 pages</strong> were found with more than one meta description tag in the HTML. When multiple meta descriptions exist, Google ignores both and generates its own snippet — removing your control over how the page appears in search. This is typically caused by plugin conflicts or theme-level overrides in WordPress and needs to be resolved at the code level.
                </p>
                <Callout type="amber" title="Technical Note: Highest-Leverage Fix">
                  This is likely a WordPress plugin conflict between Yoast SEO or RankMath and the theme's built-in meta tag output. Audit the active plugins and theme header.php — only one source should be generating the meta description tag. This single fix resolves 74 pages in one action — it is the highest-leverage fix in the entire audit.
                </Callout>

                <SearchTable
                  columns={['Page URL', 'Status']}
                  rows={MULTI_META_ROWS.map(u => [u])}
                  renderRow={(row, i) => {
                    const isHigh = HIGH_PRIORITY_URLS.includes(row[0]);
                    return (
                      <tr key={i} style={{ ...rowStyle(i), background: isHigh ? '#FFF8E1' : (i % 2 === 0 ? '#fff' : '#F5F5F5') }}>
                        <td style={tdStyle}>
                          <a href={row[0]} target="_blank" rel="noopener noreferrer" style={linkStyle}>{urlSlug(row[0])}</a>
                          {isHigh && <span style={{ marginLeft: '0.5rem', fontSize: '0.72rem', background: '#FFEBEE', color: '#C62828', padding: '1px 6px', borderRadius: '4px', fontWeight: 600 }}>HIGH PRIORITY</span>}
                        </td>
                        <td style={{ ...tdStyle, textAlign: 'center' }}><Pill v="inprogress" /></td>
                      </tr>
                    );
                  }}
                />
              </div>
            )}

            {/* 2.6 Title Too Long */}
            {onpageTab === 'titlelong' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Title Tag Too Long</h3>
                  <Pill v="done" custom="9 Pages — All Resolved" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  <strong>9 pages</strong> had title tags exceeding 60 characters (Google's recommended limit). Titles that are too long get truncated in search results, cutting off key information. All have been shortened while retaining primary keywords and the NSPC brand suffix.
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL (slug)</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Previous Title</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Updated Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { slug: '/enhancing-coating-adhesion-.../', prev: 'Epoxy Coating Adhesion: Science Behind Strong Bonds | NSPC Insights', next: 'Epoxy Coating Adhesion Science | NSPC Insights' },
                        { slug: '/epoxy-resins-in-flooring-.../', prev: 'Epoxy Flooring: Durability, Aesthetics & Sustainability | NSPC Insights', next: 'Epoxy Resins in Flooring | NSPC Insights' },
                        { slug: '/international-exhibition-conference-paintindia-2024/', prev: "PaintIndia 2024: Prasad Nadkarni's Coatings Journey | NSPC Insights", next: "PaintIndia 2024: Prasad Nadkarni's 40-Year Journey with NSPC" },
                        { slug: '/phenalkamides-the-all-weather-curing-agent/', prev: 'Fast-Curing Phenalkamides for All-Weather Coatings | NSPC Insights', next: 'Phenalkamides Fast-Curing All-Weather Coatings | NSPC' },
                        { slug: '/product/solopoxy-4848/', prev: 'SOLOPOXY 4848 Universal Primer | 1K Epoxy Resin Manufacturer | NSPC', next: 'SOLOPOXY 4848x65 1K Epoxy Primer | NSPC Manufacturer' },
                        { slug: '/simplified-paint-technology-101/', prev: 'Paint Technology Simplified: Components, Science and Applications | NSPC Insights', next: 'SIMPLIFIED: Paint Technology 101 | Components & Science' },
                        { slug: '/the-invisible-guardians-.../', prev: "Industrial Coatings' Versatility & Epoxy Solutions | NSPC Insights", next: 'The Invisible Guardians: Industrial Coatings & Epoxy' },
                        { slug: '/the-role-of-construction-chemicals-.../', prev: 'Construction Chemicals for Sustainable Infrastructure in India | NSPC Insights', next: 'The Role of Construction Chemicals in Infrastructure' },
                        { slug: '/what-exactly-are-single-pack-epoxy-resins/', prev: 'What Are Single Pack Epoxy Resins? Uses & Benefits | NSPC Insights', next: 'What exactly are Single Pack Epoxy Resins? Uses' },
                      ].map((row, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.8rem', color: '#006B6B' }}>{row.slug}</td>
                          <td style={{ ...tdStyle, background: '#fff5f5', color: '#C62828', textDecoration: 'line-through', fontSize: '0.8rem' }}>{row.prev}</td>
                          <td style={{ ...tdStyle, background: '#f0faf0', color: '#1B5E20', fontWeight: 600, fontSize: '0.8rem' }}>{row.next}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Callout type="green" title="Achievement: 100% Resolution">
                  All 9 over-length title tags have been rewritten and updated. 9/9 complete — 100% resolution rate.
                </Callout>
              </div>
            )}

            {/* 2.7 Title Too Short */}
            {onpageTab === 'titleshort' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Title Tag Too Short</h3>
                  <Pill v="done" custom="3 Pages — All Resolved" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  <strong>3 pages</strong> had single-word or very short title tags. Google uses title tags as a primary relevance signal. Short, generic titles fail to communicate topic relevance and miss keyword opportunities. All have been updated with descriptive, keyword-rich titles.
                </p>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Previous Title</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Updated Title</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { url: '/compare/', prev: 'Compare', next: 'Compare Products | Epoxy Resins & Coating Solutions' },
                        { url: '/disclaimer/', prev: 'Disclaimer', next: 'Disclaimer | Terms, Liability & Website Use Policy' },
                        { url: '/glossary-terms/', prev: 'Glossary Terms', next: 'Glossary Terms | Coatings, Epoxy & Polymer Definitions' },
                      ].map((row, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={{ ...tdStyle, fontFamily: 'monospace', color: '#006B6B' }}>{row.url}</td>
                          <td style={{ ...tdStyle, background: '#fff5f5', color: '#C62828', textDecoration: 'line-through' }}>{row.prev}</td>
                          <td style={{ ...tdStyle, background: '#f0faf0', color: '#1B5E20', fontWeight: 600 }}>{row.next}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2.8 URLs */}
            {onpageTab === 'urls' && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                  <h3 style={{ color: '#003366', margin: 0, fontSize: '1.2rem' }}>Poorly Formatted URLs + URLs Too Long</h3>
                  <Pill v="inprogress" custom="5 + 2 Pages — In Progress" />
                </div>
                <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
                  <strong>5 URLs</strong> were audited for SEO formatting best practices across three criteria: Character count (under 115 chars), Dynamic parameters (no session IDs or query strings), and Keyword inclusion (target keyword present in slug).
                </p>

                <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Char Length</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Dynamic Check</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Keywords in Slug</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { url: 'https://www.nadkarnispc.com/markets/', char: true, dyn: true, kw: false },
                        { url: 'https://www.nadkarnispc.com/part-1-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/', char: false, dyn: true, kw: true },
                        { url: 'https://www.nadkarnispc.com/part-2-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/', char: false, dyn: true, kw: true },
                        { url: 'https://www.nadkarnispc.com/product-category/curepoxy/', char: true, dyn: true, kw: false },
                        { url: 'https://www.nadkarnispc.com/product-category/curepoxy/phenalkamines/', char: true, dyn: true, kw: true },
                      ].map((row, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={tdStyle}>
                            <a href={row.url} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle, wordBreak: 'break-all' }}>
                              {urlSlug(row.url)}
                            </a>
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}>
                            {row.char ? <span style={{ color: '#1B5E20', fontWeight: 700 }}>✔ OK</span> : <span style={{ color: '#C62828', fontWeight: 700 }}>✗ Too Long</span>}
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}>
                            {row.dyn ? <span style={{ color: '#1B5E20', fontWeight: 700 }}>✔ OK</span> : <span style={{ color: '#C62828', fontWeight: 700 }}>✗</span>}
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}>
                            {row.kw ? <span style={{ color: '#1B5E20', fontWeight: 700 }}>✔ OK</span> : <span style={{ color: '#B8860B', fontWeight: 700 }}>⚠ Missing</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Callout type="amber" title="Note">
                  URLs flagged with ⚠ on Keywords check indicate the primary target keyword is absent from the URL slug. This limits keyword relevance for Google and should be addressed during the next round of URL restructuring.
                </Callout>

                <h4 style={{ color: '#003366', margin: '1.5rem 0 0.75rem' }}>URLs Too Long (2 pages)</h4>
                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#003366', color: '#fff' }}>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Page URL</th>
                        <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        '/part-1-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/',
                        '/part-2-exploring-the-different-types-of-epoxy-curing-agents-advantages-disadvantages-and-applications-in-speciality-polymer-coatings/',
                      ].map((slug, i) => (
                        <tr key={i} style={rowStyle(i)}>
                          <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.78rem', wordBreak: 'break-all', color: '#006B6B' }}>{slug}</td>
                          <td style={{ ...tdStyle, color: '#B8860B', fontWeight: 600 }}>Shorten slug + set up 301 redirect</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Callout type="teal">
                  While Google can index long URLs, they display poorly in SERPs, are hard to share, and dilute keyword signals. Shortening is recommended when these pages are next updated. Always set up 301 redirects from old to new URLs to preserve link equity.
                </Callout>
              </div>
            )}
          </section>
        )}

        {/* ── IMAGE SEO ─────────────────────────────────────────────────────── */}
        {activeSection === 'imageseo' && (
          <section id="imageseo">
            <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              Image SEO Issues
            </h2>
            <p style={{ color: '#006B6B', fontSize: '0.9rem', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              Alt text audit and image classification review
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#003366', color: '#fff', borderRadius: '10px', padding: '0.75rem 1.25rem', fontWeight: 700 }}>
                2 Items Reviewed
              </div>
            </div>

            <p style={{ lineHeight: 1.7, marginBottom: '1.25rem' }}>
              <strong>2 image files</strong> were reviewed. The flagged images are icon/vector files (SVG format) that require correct classification and alt text treatment. Decorative icons should carry empty <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: '3px' }}>alt=""</code> attributes (not keyword-stuffed text), while informational images should have descriptive, context-relevant alt text.
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#003366', color: '#fff' }}>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Image / File URL</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Classification / Note</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ background: '#fff' }}>
                    <td style={{ ...tdStyle, fontFamily: 'monospace', fontSize: '0.8rem', color: '#006B6B' }}>
                      www.nadkarnispc.com/wp-content/themes/npsc/assets/img/icons/arrow.svg
                    </td>
                    <td style={tdStyle}>
                      <em>This is Icon Image</em> — use <code style={{ background: '#f0f0f0', padding: '1px 5px', borderRadius: '3px' }}>alt=""</code>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout type="teal" title="Recommendations">
              All product and blog images should have descriptive alt text including the product name or topic keyword. Icon SVGs should use alt="" to avoid noise in screen readers and search indexing. Image file names should also be descriptive — e.g., cure-o-poxy-8562-phenalkamine.jpg rather than IMG_0012.jpg
            </Callout>

            <h3 style={{ color: '#003366', marginTop: '2rem', marginBottom: '1rem' }}>Best Practice Summary</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              {[
                { header: 'Do This', bg: '#E8F5E9', border: '#1B5E20', color: '#1B5E20', items: [
                  'alt="CURE-O-POXY 8562 phenalkamine curing agent"',
                  'alt="" for decorative icons',
                  'Filename: cure-o-poxy-8562.jpg',
                ]},
                { header: 'Not This', bg: '#FFEBEE', border: '#C62828', color: '#C62828', items: [
                  'alt="image1"',
                  'alt="arrow" for icons',
                  'Filename: IMG_0012.jpg',
                ]},
                { header: 'Why It Matters', bg: '#E3F2FD', border: '#006B6B', color: '#006B6B', items: [
                  'Keywords in alt text improve image search ranking',
                  'Empty alt avoids screen reader noise',
                  'Descriptive filenames are an SEO signal',
                ]},
              ].map((col, i) => (
                <div key={i} style={{ background: col.bg, borderTop: `4px solid ${col.border}`, borderRadius: '8px', padding: '1rem' }}>
                  <div style={{ fontWeight: 700, color: col.color, marginBottom: '0.75rem', fontSize: '0.9rem' }}>{col.header}</div>
                  {col.items.map((item, j) => (
                    <div key={j} style={{ fontSize: '0.82rem', color: '#333', lineHeight: 1.5, marginBottom: '0.5rem', fontFamily: i < 2 ? 'monospace' : 'inherit' }}>
                      {item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── PRIORITY PLAN ─────────────────────────────────────────────────── */}
        {activeSection === 'plan' && (
          <section id="plan">
            <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>
              Next Steps &amp; Priority Plan
            </h2>
            <p style={{ color: '#006B6B', fontSize: '0.9rem', marginBottom: '1.5rem', fontStyle: 'italic' }}>
              Recommended actions for the upcoming sprint
            </p>

            {/* High priority */}
            <h3 style={{ color: '#C62828', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#FFEBEE', color: '#C62828', padding: '3px 10px', borderRadius: '999px', fontSize: '0.8rem' }}>HIGH PRIORITY</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'H1 Tag Implementation', desc: 'Add H1 tags to all 45 flagged pages. Product pages are the top priority. The homepage H1 is the single most critical missing element in the entire audit.' },
                { title: 'Multiple Meta Description Fix', desc: 'Resolve the meta description conflict across 74 pages. Likely a WordPress plugin conflict — audit Yoast / RankMath settings. One fix resolves 74 pages simultaneously — highest leverage action available.' },
                { title: 'Word Count Enrichment', desc: 'Begin content enrichment for product pages. Start with highest-traffic products. Even 50–100 additional words per page can improve crawl quality. Target: all pages above 300 words by end of next sprint.' },
              ].map((card, i) => (
                <div key={i} style={{ borderLeft: '5px solid #C62828', background: '#FFEBEE', borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#C62828', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{card.title}</div>
                  <p style={{ margin: 0, color: '#444', fontSize: '0.875rem', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Medium priority */}
            <h3 style={{ color: '#B8860B', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#FFF8E1', color: '#B8860B', padding: '3px 10px', borderRadius: '999px', fontSize: '0.8rem' }}>MEDIUM PRIORITY</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { title: 'URL Restructuring', desc: 'Address keyword gaps in poorly-formatted URLs and shorten verbose blog slugs. Ensure 301 redirects are set for all changed URLs to preserve existing link equity.' },
                { title: 'Social Signals (Open Graph Tags)', desc: 'Implement Open Graph and Twitter Card meta tags site-wide for consistent social sharing previews on LinkedIn, WhatsApp, and other platforms.' },
                { title: 'Address Visibility', desc: 'Ensure business address is consistently displayed in the footer and contact page — supports local schema and trust signals.' },
              ].map((card, i) => (
                <div key={i} style={{ borderLeft: '5px solid #B8860B', background: '#FFF8E1', borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem' }}>
                  <div style={{ fontWeight: 700, color: '#B8860B', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{card.title}</div>
                  <p style={{ margin: 0, color: '#444', fontSize: '0.875rem', lineHeight: 1.6 }}>{card.desc}</p>
                </div>
              ))}
            </div>

            {/* Low priority */}
            <h3 style={{ color: '#1B5E20', fontWeight: 700, fontSize: '1rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ background: '#E8F5E9', color: '#1B5E20', padding: '3px 10px', borderRadius: '999px', fontSize: '0.8rem' }}>LOW PRIORITY</span>
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ borderLeft: '5px solid #1B5E20', background: '#E8F5E9', borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, color: '#1B5E20', marginBottom: '0.5rem', fontSize: '0.95rem' }}>Image Alt Text Audit</div>
                <p style={{ margin: 0, color: '#444', fontSize: '0.875rem', lineHeight: 1.6 }}>
                  Systematically review all product and blog images for descriptive alt text. Use product codes and chemistry terms as keyword anchors. Target: all product images updated within 60 days.
                </p>
              </div>
            </div>

            {/* Scoreboard */}
            <h3 style={{ color: '#003366', fontWeight: 800, marginBottom: '1rem', fontSize: '1.1rem' }}>
              Audit Resolution Scoreboard
            </h3>
            <div style={{ overflowX: 'auto', marginBottom: '2rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ background: '#003366', color: '#fff' }}>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Category</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Total</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Resolved</th>
                    <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {SCOREBOARD.map((row, i) => (
                    <tr key={i} style={rowStyle(i)}>
                      <td style={tdStyle}>{row.cat}</td>
                      <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600 }}>{row.total}</td>
                      <td style={{ ...tdStyle, textAlign: 'center' }}>
                        {row.status === 'done' ? (
                          <span style={{ color: '#1B5E20', fontWeight: 700 }}>{row.resolved} ✔ 100%</span>
                        ) : row.status === 'reviewed' ? (
                          <span style={{ color: '#006B6B', fontWeight: 600 }}>Reviewed</span>
                        ) : row.pct > 0 ? (
                          <span style={{ color: '#B8860B', fontWeight: 600 }}>{row.resolved} ({row.pct}%)</span>
                        ) : (
                          <span style={{ color: '#B8860B', fontWeight: 600 }}>0 — In Progress</span>
                        )}
                      </td>
                      <td style={{ ...tdStyle, minWidth: '160px' }}>
                        {row.status === 'reviewed' ? (
                          <div style={{ color: '#006B6B', fontSize: '0.8rem' }}>Reviewed</div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ flex: 1, background: '#e0e0e0', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                              <div style={{
                                width: `${row.pct}%`, height: '100%', borderRadius: '999px',
                                background: row.pct === 100 ? '#1B5E20' : row.pct > 0 ? '#B8860B' : '#e0e0e0',
                              }} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: row.pct === 100 ? '#1B5E20' : '#888', fontWeight: 600, minWidth: '32px' }}>
                              {row.pct}%
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ background: '#003366', color: '#fff', fontWeight: 700 }}>
                    <td style={{ padding: '0.65rem 1rem' }}>TOTAL</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>211</td>
                    <td style={{ padding: '0.65rem 1rem', textAlign: 'center' }}>28 ✔ (13.3%)</td>
                    <td style={{ padding: '0.65rem 1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ flex: 1, background: 'rgba(255,255,255,0.3)', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: '13.3%', height: '100%', borderRadius: '999px', background: '#4caf50' }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', minWidth: '40px' }}>13.3%</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <div style={{
        background: '#f5f5f5', borderTop: '2px solid #e0e0e0',
        padding: '2rem 1.5rem', textAlign: 'center',
      }}>
        <p style={{ color: '#555', fontSize: '0.875rem', lineHeight: 1.8, fontStyle: 'italic', maxWidth: '700px', margin: '0 auto 1.25rem' }}>
          This report was prepared by your Digital Marketing Consultant as part of the ongoing SEO retainer for Nadkarni Speciality Polymers &amp; Coatings Pvt. Ltd.<br />
          All findings are based on a direct crawl audit of nadkarnispc.com.<br /><br />
          <strong>Prepared by:</strong> Yogesh Shinde — Digital Marketing Consultant<br />
          <strong>Client:</strong> Nadkarni Speciality Polymers &amp; Coatings Pvt. Ltd.<br />
          <strong>Report Period:</strong> March – April 2026<br />
          <strong>Classification:</strong> Confidential — Internal Review Only<br /><br />
          Questions or clarifications — please reach out directly.
        </p>
        <a
          href="/NSPC_SEO_Report.pdf"
          download
          style={{
            display: 'inline-block', background: '#003366', color: '#fff',
            padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 700,
            textDecoration: 'none', fontSize: '0.95rem', letterSpacing: '0.02em',
          }}
        >
          Download Full SEO Report PDF
        </a>
      </div>
    </div>
  );
}

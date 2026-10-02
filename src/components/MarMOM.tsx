import { useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
type SectionId =
  | 'business'
  | 'analytics'
  | 'linkedin'
  | 'turkey'
  | 'content'
  | 'competitor'
  | 'paid'
  | 'seo'
  | 'traffic'
  | 'technical'
  | 'instagram'
  | 'actions';

interface NavItem { id: SectionId; label: string; icon: string }

const NAV_ITEMS: NavItem[] = [
  { id: 'business',   label: 'Business Update',    icon: '🌎' },
  { id: 'analytics',  label: 'Analytics Review',   icon: '📊' },
  { id: 'linkedin',   label: 'LinkedIn',            icon: '💼' },
  { id: 'turkey',     label: 'Turkey / Istanbul',   icon: '🇹🇷' },
  { id: 'content',    label: 'Content Strategy',    icon: '✏️' },
  { id: 'competitor', label: 'Competitors',         icon: '🔍' },
  { id: 'paid',       label: 'Paid Social',         icon: '💰' },
  { id: 'seo',        label: 'SEO Performance',     icon: '📈' },
  { id: 'traffic',    label: 'Website Traffic',     icon: '🌐' },
  { id: 'technical',  label: 'Technical & Dashboard', icon: '⚙️' },
  { id: 'instagram',  label: 'Instagram Launch',    icon: '📸' },
  { id: 'actions',    label: 'Action Items',        icon: '✅' },
];

// ── Small helpers ─────────────────────────────────────────────────────────────
function Tag({ label, color }: { label: string; color: 'green' | 'amber' | 'blue' | 'red' | 'teal' | 'navy' }) {
  const map = {
    green: { bg: '#E8F5E9', text: '#1B5E20' },
    amber: { bg: '#FFF8E1', text: '#B8860B' },
    blue:  { bg: '#E3F2FD', text: '#0277BD' },
    red:   { bg: '#FFEBEE', text: '#C62828' },
    teal:  { bg: '#E0F2F1', text: '#006B6B' },
    navy:  { bg: '#E8EAF6', text: '#003366' },
  };
  const s = map[color];
  return (
    <span style={{
      background: s.bg, color: s.text, fontSize: '0.72rem', fontWeight: 700,
      padding: '2px 8px', borderRadius: '999px', display: 'inline-block',
    }}>{label}</span>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: '#FFF8E1', color: '#B8860B', fontWeight: 700, borderRadius: '3px', padding: '0 3px' }}>
      {children}
    </span>
  );
}

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h2 style={{ color: '#003366', fontWeight: 800, fontSize: '1.35rem', margin: 0 }}>{children}</h2>
      {sub && <p style={{ color: '#006B6B', fontSize: '0.875rem', margin: '0.25rem 0 0', fontStyle: 'italic' }}>{sub}</p>}
    </div>
  );
}

function InsightBox({ title, children, type = 'teal' }: { title?: string; children: React.ReactNode; type?: 'teal' | 'green' | 'amber' | 'red' }) {
  const colors = {
    teal:  { border: '#006B6B', bg: '#E0F2F1', title: '#006B6B' },
    green: { border: '#1B5E20', bg: '#E8F5E9', title: '#1B5E20' },
    amber: { border: '#B8860B', bg: '#FFF8E1', title: '#B8860B' },
    red:   { border: '#C62828', bg: '#FFEBEE', title: '#C62828' },
  };
  const c = colors[type];
  return (
    <div style={{ borderLeft: `5px solid ${c.border}`, background: c.bg, borderRadius: '0 8px 8px 0', padding: '1rem 1.25rem', margin: '1rem 0' }}>
      {title && <div style={{ fontWeight: 700, color: c.title, marginBottom: '0.4rem', fontSize: '0.9rem' }}>{title}</div>}
      <div style={{ color: '#333', lineHeight: 1.65, fontSize: '0.875rem' }}>{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ margin: '0.5rem 0', paddingLeft: '1.25rem' }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: '#444', lineHeight: 1.65, fontSize: '0.875rem', marginBottom: '0.35rem' }}>{item}</li>
      ))}
    </ul>
  );
}

// ── Collapsible card ──────────────────────────────────────────────────────────
function CollapsibleCard({ title, badge, defaultOpen = false, children }: {
  title: string; badge?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ border: '1px solid #e0e0e0', borderRadius: '10px', marginBottom: '0.75rem', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: open ? '#f0f7ff' : '#fafafa',
          border: 'none', cursor: 'pointer', padding: '0.9rem 1.25rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          transition: 'background 0.2s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, color: '#003366', fontSize: '0.9rem' }}>{title}</span>
          {badge}
        </div>
        <span style={{ color: '#006B6B', fontWeight: 700, fontSize: '1.1rem', marginLeft: '0.5rem' }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #e8f0fb' }}>
          {children}
        </div>
      )}
    </div>
  );
}

// ── Action item card ──────────────────────────────────────────────────────────
function ActionCard({ category, color, items }: {
  category: string; color: 'green' | 'amber' | 'blue' | 'teal' | 'navy'; items: string[];
}) {
  const colors = {
    green: { border: '#1B5E20', header: '#1B5E20', bg: '#E8F5E9' },
    amber: { border: '#B8860B', header: '#B8860B', bg: '#FFF8E1' },
    blue:  { border: '#0277BD', header: '#0277BD', bg: '#E3F2FD' },
    teal:  { border: '#006B6B', header: '#006B6B', bg: '#E0F2F1' },
    navy:  { border: '#003366', header: '#003366', bg: '#E8EAF6' },
  };
  const c = colors[color];
  return (
    <div style={{ borderTop: `4px solid ${c.border}`, background: c.bg, borderRadius: '0 0 10px 10px', padding: '1rem 1.25rem' }}>
      <div style={{ fontWeight: 700, color: c.header, fontSize: '0.85rem', marginBottom: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {category}
      </div>
      <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
        {items.map((item, i) => (
          <li key={i} style={{ color: '#333', lineHeight: 1.6, fontSize: '0.875rem', marginBottom: '0.4rem' }}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ── KPI strip ─────────────────────────────────────────────────────────────────
function KpiStrip({ items }: { items: { label: string; value: string; sub?: string; color: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0' }}>
      {items.map((k, i) => (
        <div key={i} style={{
          background: '#fff', border: `2px solid ${k.color}`, borderRadius: '10px',
          padding: '0.7rem 1rem', minWidth: '120px', flex: '1 1 120px', textAlign: 'center',
        }}>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: k.color }}>{k.value}</div>
          <div style={{ fontSize: '0.72rem', color: '#555', marginTop: '0.2rem', lineHeight: 1.3 }}>{k.label}</div>
          {k.sub && <div style={{ fontSize: '0.68rem', color: k.color, fontWeight: 600, marginTop: '0.15rem' }}>{k.sub}</div>}
        </div>
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function MarMOM() {
  const [active, setActive] = useState<SectionId>('business');

  const navBtn = (id: SectionId, label: string, icon: string) => (
    <button
      key={id}
      onClick={() => setActive(id)}
      style={{
        padding: '0.4rem 0.85rem', borderRadius: '999px', border: 'none', cursor: 'pointer',
        fontSize: '0.78rem', fontWeight: 600, whiteSpace: 'nowrap',
        background: active === id ? '#003366' : '#f0f0f0',
        color: active === id ? '#fff' : '#444',
        transition: 'background 0.2s',
        display: 'flex', alignItems: 'center', gap: '0.3rem',
      }}
    >
      <span>{icon}</span><span>{label}</span>
    </button>
  );

  return (
    <div className="accordion-content" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #003366 0%, #1a5276 100%)',
        borderRadius: '12px', padding: '1.5rem 1.75rem', marginBottom: '1.5rem', color: '#fff',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.75, marginBottom: '0.3rem' }}>
              Minutes of the Meeting
            </div>
            <h2 style={{ color: '#fff', fontWeight: 800, fontSize: '1.2rem', margin: '0 0 0.4rem' }}>
              Analytics &amp; Content Strategy Review
            </h2>
            <p style={{ margin: 0, opacity: 0.85, fontSize: '0.85rem', lineHeight: 1.5 }}>
              LinkedIn growth · SEO performance · Instagram launch planning
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>May 14, 2026</div>
            <div style={{ opacity: 0.65, fontSize: '0.72rem', fontFamily: 'monospace', marginTop: '0.25rem' }}>
              ID: 3d421495-1358-4da3-8887-b054cf3545a8
            </div>
          </div>
        </div>

        {/* Quick-stat band */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.25rem' }}>
          {[
            { n: '15', label: 'Agenda items' },
            { n: '938', label: 'LinkedIn followers' },
            { n: '561', label: 'Google clicks' },
            { n: '57', label: 'New followers' },
            { n: '#4', label: 'Phenalkamine rank' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.5rem 1rem', minWidth: '80px' }}>
              <div style={{ fontSize: '1.3rem', fontWeight: 800 }}>{s.n}</div>
              <div style={{ fontSize: '0.68rem', opacity: 0.8, marginTop: '0.1rem' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Section navigation */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
        marginBottom: '1.5rem', padding: '0.75rem', background: '#f8f9fa',
        borderRadius: '10px', border: '1px solid #e8e8e8',
      }}>
        {NAV_ITEMS.map(n => navBtn(n.id, n.label, n.icon))}
      </div>

      {/* ── BUSINESS UPDATE ─────────────────────────────────────────────────── */}
      {active === 'business' && (
        <div>
          <SectionHeading sub="American Coatings Show · Canada Trip">1. Opening Business Update</SectionHeading>

          <CollapsibleCard title="American Coatings Show" badge={<Tag label="Better than expected" color="green" />} defaultOpen>
            <InsightBox type="green" title="Revised Go-to-Market Approach">
              Instead of relying on distributors to create demand, the team now generates direct customer interest first — then connects those interested customers to distributors. This makes the opportunity easier for distributors to accept as ready business.
            </InsightBox>
            <BulletList items={[
              <>Response was described as <Highlight>better than expected</Highlight></>,
              <>The earlier US distributor relationship was <Highlight>not sufficiently involved</Highlight>, limiting US traction</>,
              <>New approach: create direct customer interest first, then channel through distributors</>,
              <><Highlight>3–4 potential distributors</Highlight> have been contacted; one described as promising</>,
              <>Direct customer interest has already been generated</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="Canada Trip" badge={<Tag label="Customer visits" color="blue" />} defaultOpen>
            <BulletList items={[
              <>This is <Highlight>not a trade show</Highlight> — it is a distributor-accompanied customer visit trip</>,
              <>Visits may contribute to future traffic and market development in Canada</>,
              <>Canada is already appearing in website analytics as a growing geography</>,
            ]} />
          </CollapsibleCard>
        </div>
      )}

      {/* ── ANALYTICS REVIEW ────────────────────────────────────────────────── */}
      {active === 'analytics' && (
        <div>
          <SectionHeading sub="Mar 15 – May 14, 2026 · GA data through May 12">2. Analytics Review</SectionHeading>
          <InsightBox type="teal" title="Reporting Window">
            The review covered <Highlight>March 15 to May 14, 2026</Highlight>. Some Google Analytics data was current only through <strong>May 12</strong> at the time the report was compiled.
          </InsightBox>
          <InsightBox type="amber" title="Trade Show Traffic Lag">
            Recent trade show traffic will <Highlight>not yet fully appear</Highlight> in standard analytics — attendees are still returning and evaluating contacts. Real-time activity is visible in GA, but standard reporting requires more time to update.
          </InsightBox>
        </div>
      )}

      {/* ── LINKEDIN ────────────────────────────────────────────────────────── */}
      {active === 'linkedin' && (
        <div>
          <SectionHeading sub="Mar 15 – May 14, 2026">3. LinkedIn Performance Review</SectionHeading>

          <KpiStrip items={[
            { label: 'Total Followers', value: '938', color: '#0a66c2' },
            { label: 'New Followers', value: '57', sub: '~1 per day', color: '#006B6B' },
            { label: 'Follower Growth', value: '+5.6%', sub: 'vs prior period', color: '#1B5E20' },
            { label: 'Top Post Impressions', value: '768', sub: 'ACS post', color: '#003366' },
          ]} />

          <CollapsibleCard title="Overall Growth" badge={<Tag label="Organic only" color="green" />} defaultOpen>
            <BulletList items={[
              <>Impressions for this review cycle are <Highlight>significantly higher</Highlight> than prior comparisons</>,
              <><Highlight>57 new followers</Highlight> — roughly 1 per day throughout the period</>,
              <>Follower growth of <Highlight>+5.6%</Highlight> versus the previous period</>,
              <>938 total followers — <Highlight>fully organic growth</Highlight>, no paid promotion</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="Audience Geography" badge={<Tag label="Turkey highlight" color="amber" />} defaultOpen>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {['Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Ahmedabad', 'Hyderabad', 'Chennai', 'Kolkata'].map(city => (
                <span key={city} style={{ background: '#E3F2FD', color: '#0277BD', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>{city}</span>
              ))}
              <span style={{ background: '#FFF8E1', color: '#B8860B', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700 }}>Istanbul — 20 followers</span>
            </div>
            <InsightBox type="amber" title="Istanbul / Turkey Signal">
              Turkish contacts are actively <Highlight>reposting and commenting</Highlight> on company content — a growing engagement signal ahead of the Istanbul event.
            </InsightBox>
          </CollapsibleCard>

          <CollapsibleCard title="Post Performance" badge={<Tag label="ACS post = top performer" color="navy" />} defaultOpen>
            <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#003366', color: '#fff' }}>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'left', fontWeight: 700 }}>Post</th>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700 }}>Impressions</th>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700 }}>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { post: 'American Coatings Show', impressions: '768', note: 'Top performer this period', highlight: true },
                    { post: 'Sustainable chemistry / video content', impressions: '—', note: 'Strong performance', highlight: false },
                    { post: 'Personal trade show post (tagged company)', impressions: '—', note: 'Strong engagement — personal tone', highlight: false },
                    { post: 'Grandfather / felicitation post', impressions: '—', note: 'High engagement — personal story', highlight: false },
                  ].map((row, i) => (
                    <tr key={i} style={{ background: row.highlight ? '#E3F2FD' : i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #e8e8e8' }}>
                      <td style={{ padding: '0.55rem 0.9rem', color: '#333', fontWeight: row.highlight ? 700 : 400 }}>{row.post}</td>
                      <td style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700, color: '#003366' }}>{row.impressions}</td>
                      <td style={{ padding: '0.55rem 0.9rem', color: '#555', fontSize: '0.8rem' }}>{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InsightBox type="teal" title="Caption Writing Learnings">
              The ACS personal post was cited as a <Highlight>strong example of effective caption writing</Highlight> because it referenced people, companies, event names, and tagged relevant entities. More specific names and references improve organic discoverability and impressions.
            </InsightBox>
          </CollapsibleCard>

          <CollapsibleCard title="Personal Post vs Company Post Discussion">
            <BulletList items={[
              <>A tagged personal post appears on the company feed</>,
              <>But its analytics remain tied to the <Highlight>personal account</Highlight></>,
              <>Creating a separate company version could become repetitive/redundant</>,
              <>Recommendation: continue the current approach; focus on tagging effectively</>,
            ]} />
          </CollapsibleCard>
        </div>
      )}

      {/* ── TURKEY ──────────────────────────────────────────────────────────── */}
      {active === 'turkey' && (
        <div>
          <SectionHeading sub="Pre-event strategy for Istanbul">4. Turkey / Istanbul Opportunity</SectionHeading>
          <InsightBox type="amber" title="Growing Engagement from Turkey">
            Istanbul has <Highlight>20 followers</Highlight> who are actively reposting and commenting. This organic amplification creates a strong base for pre-event visibility ahead of the Istanbul show.
          </InsightBox>
          <h4 style={{ color: '#003366', marginBottom: '0.6rem', fontSize: '0.95rem' }}>Proposed Pre-Event Activity</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            {[
              { icon: '🌐', title: 'Website Banner', desc: 'Event landing/banner placement on the website before the show' },
              { icon: '📅', title: 'Countdown Posts', desc: '3 days to go → 2 days to go → 1 day to go LinkedIn posts' },
              { icon: '👥', title: 'Team Attendance', desc: 'Promote team attendance in advance to build anticipation' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{card.icon}</div>
                <div style={{ fontWeight: 700, color: '#003366', fontSize: '0.875rem', marginBottom: '0.3rem' }}>{card.title}</div>
                <div style={{ fontSize: '0.8rem', color: '#555', lineHeight: 1.5 }}>{card.desc}</div>
              </div>
            ))}
          </div>
          <InsightBox type="green" title="Rationale">
            Existing Turkish resharing activity may <Highlight>amplify pre-show awareness and visibility</Highlight> significantly. Acting before the event maximises this organic amplification effect.
          </InsightBox>
        </div>
      )}

      {/* ── CONTENT STRATEGY ────────────────────────────────────────────────── */}
      {active === 'content' && (
        <div>
          <SectionHeading sub="FAQ-driven, real-world, conversational content">5. Content Strategy Direction</SectionHeading>

          <CollapsibleCard title="Real Customer Questions as Content" badge={<Tag label="High opportunity" color="green" />} defaultOpen>
            <InsightBox type="green" title="Sri Lanka Customer Example">
              A Sri Lankan customer inquiry about the advantages of a specific alkyd product vs commodity alternatives was identified as a strong content opportunity. The customer's question and the response email are ready source material.
            </InsightBox>
            <h4 style={{ color: '#003366', margin: '0.75rem 0 0.5rem', fontSize: '0.9rem' }}>Content formats to create from real enquiries:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {['Conversational LinkedIn posts', 'FAQ-style content', 'Application-oriented posts', 'Email-to-content conversions'].map((f, i) => (
                <span key={i} style={{ background: '#E8F5E9', color: '#1B5E20', padding: '4px 12px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: 600 }}>{f}</span>
              ))}
            </div>
          </CollapsibleCard>

          <CollapsibleCard title="Shift in Creative Approach" badge={<Tag label="Strategic pivot" color="teal" />} defaultOpen>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ background: '#FFEBEE', border: '1px solid #ffcdd2', borderRadius: '8px', padding: '0.9rem' }}>
                <div style={{ fontWeight: 700, color: '#C62828', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Moving away from</div>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem', color: '#555' }}>
                  <li>Only standard branded creatives</li>
                  <li>Generic product announcements</li>
                  <li>Template-driven posts</li>
                </ul>
              </div>
              <div style={{ background: '#E8F5E9', border: '1px solid #c8e6c9', borderRadius: '8px', padding: '0.9rem' }}>
                <div style={{ fontWeight: 700, color: '#1B5E20', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Moving toward</div>
                <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.8rem', color: '#555' }}>
                  <li>Real-life scenarios</li>
                  <li>Product application stories</li>
                  <li>Conversational education content</li>
                </ul>
              </div>
            </div>
          </CollapsibleCard>
        </div>
      )}

      {/* ── COMPETITORS ─────────────────────────────────────────────────────── */}
      {active === 'competitor' && (
        <div>
          <SectionHeading sub="Cardolite monitoring and relative positioning">6. Competitor & Market Observations</SectionHeading>

          <CollapsibleCard title="Cardolite Activity Signals" badge={<Tag label="Monitoring detected" color="amber" />} defaultOpen>
            <InsightBox type="amber" title="Competitor Attention Observed">
              Signals suggest <Highlight>Cardolite is actively monitoring</Highlight> NSPC's LinkedIn activity.
            </InsightBox>
            <BulletList items={[
              <>LinkedIn notifications about competitor activity</>,
              <>The <Highlight>VP liked</Highlight> the American Coatings Show personal post</>,
              <>A <Highlight>connection request from the VP's son</Highlight> was noted</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="Relative Performance" defaultOpen>
            <div style={{ overflowX: 'auto', marginBottom: '0.75rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: '#003366', color: '#fff' }}>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'left', fontWeight: 700 }}>Metric</th>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700 }}>NSPC</th>
                    <th style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700 }}>Cardolite</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { metric: 'LinkedIn Followers', nspc: '938', cardolite: 'Larger base', highlight: false },
                    { metric: 'Follower Growth Rate', nspc: '+5.6% (stronger)', cardolite: 'Lower this period', highlight: true },
                    { metric: 'Market Position (current review)', nspc: '#2', cardolite: '#1', highlight: false },
                  ].map((row, i) => (
                    <tr key={i} style={{ background: row.highlight ? '#E8F5E9' : i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #e8e8e8' }}>
                      <td style={{ padding: '0.55rem 0.9rem', color: '#333' }}>{row.metric}</td>
                      <td style={{ padding: '0.55rem 0.9rem', textAlign: 'center', fontWeight: 700, color: row.highlight ? '#1B5E20' : '#003366' }}>{row.nspc}</td>
                      <td style={{ padding: '0.55rem 0.9rem', textAlign: 'center', color: '#666' }}>{row.cardolite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <InsightBox type="teal">
              Competitor's stronger engagement is attributed mainly to a larger follower base, older company age, and broader historical presence — not better content velocity.
            </InsightBox>
          </CollapsibleCard>
        </div>
      )}

      {/* ── PAID SOCIAL ─────────────────────────────────────────────────────── */}
      {active === 'paid' && (
        <div>
          <SectionHeading sub="LinkedIn ads roadmap and timing">7. Paid Social Discussion</SectionHeading>
          <InsightBox type="amber" title="Agreement: Not Yet — Timing Matters">
            LinkedIn ads will eventually be needed, but launching before operations/production are ready to support new demand would be premature.
          </InsightBox>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', margin: '1rem 0' }}>
            {[
              { date: 'June 4', label: 'Grandfather birthday video', color: '#006B6B', icon: '🎬' },
              { date: 'July–Aug', label: 'Consider LinkedIn ads', color: '#003366', icon: '💰' },
            ].map((step, i) => (
              <div key={i} style={{ flex: '1 1 200px', background: '#f8f9fa', border: `2px solid ${step.color}`, borderRadius: '10px', padding: '1rem', textAlign: 'center' }}>
                <div style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{step.icon}</div>
                <div style={{ fontWeight: 800, color: step.color, fontSize: '1.1rem' }}>{step.date}</div>
                <div style={{ fontSize: '0.8rem', color: '#555', marginTop: '0.25rem' }}>{step.label}</div>
              </div>
            ))}
          </div>

          <h4 style={{ color: '#003366', margin: '1rem 0 0.5rem', fontSize: '0.9rem' }}>Rationale for waiting:</h4>
          <BulletList items={[
            <>Ads should follow a <Highlight>fuller brand story rollout</Highlight> rather than pulling in new audiences too early</>,
            <>Publishing the grandfather birthday video on June 4 first builds emotional brand depth</>,
            <>LinkedIn ads are <Highlight>expensive and require iteration</Highlight> over time — budget should be deployed when story assets are strong</>,
            <>Operations/production readiness must align with demand generation</>,
          ]} />
        </div>
      )}

      {/* ── SEO ─────────────────────────────────────────────────────────────── */}
      {active === 'seo' && (
        <div>
          <SectionHeading sub="Search performance breakthrough and content needs">8. Search / SEO Performance Review</SectionHeading>

          <KpiStrip items={[
            { label: 'Google Search Clicks', value: '561', color: '#e8710a' },
            { label: 'Phenalkamine Rank', value: '#4', sub: 'Best period on record', color: '#1B5E20' },
            { label: 'Impressions', value: '↑↑', sub: 'Growing substantially', color: '#006B6B' },
          ]} />

          <InsightBox type="green" title="Best Ranking Period on Record">
            The reviewed period is described as the <Highlight>best ranking period on record</Highlight>. The major breakthrough is ranking for <Highlight>"phenalkamine"</Highlight> — currently around #4.
          </InsightBox>

          <CollapsibleCard title="Nature of the Ranking Gains" defaultOpen>
            <h4 style={{ color: '#003366', margin: '0 0 0.5rem', fontSize: '0.9rem' }}>Attributed to:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {['Image SEO', 'Title shifts', 'Technical SEO work', 'Meta description corrections'].map((item, i) => (
                <span key={i} style={{ background: '#E8F5E9', color: '#1B5E20', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>{item}</span>
              ))}
            </div>
            <InsightBox type="red" title="Warning: Gains Are Fragile">
              These ranking improvements <Highlight>may be temporary</Highlight> and could be reversed if competitors identify and counter the approach. Pillar and supporting content must be built quickly to consolidate the position.
            </InsightBox>
          </CollapsibleCard>

          <CollapsibleCard title="Pillar Content Requirement" badge={<Tag label="Urgent" color="red" />} defaultOpen>
            <InsightBox type="amber">
              If a keyword starts performing, <Highlight>related supporting content must be built immediately</Highlight> to reinforce authority and maintain ranking. The logic: more content around a topic signals topical authority to Google.
            </InsightBox>
            <BulletList items={[
              <>More pillar content needed around "phenalkamine" and connected terms</>,
              <>Supporting content around adjacent search themes and chemistry topics</>,
              <>FAQ-style content for "people also ask" SERP visibility</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="AI Search & FAQ Behavior">
            <BulletList items={[
              <>AI-driven search may summarize answers directly — <Highlight>without sending users to websites</Highlight></>,
              <>FAQ-style content helps with "people also ask" style SERP results</>,
              <>An example was reviewed where AI search surfaced <Highlight>Cardolite-branded phrasing</Highlight> around phenalkamines — described as potentially misleading</>,
              <>This reinforces the need for NSPC to publish authoritative, clearly attributed content</>,
            ]} />
          </CollapsibleCard>
        </div>
      )}

      {/* ── TRAFFIC ─────────────────────────────────────────────────────────── */}
      {active === 'traffic' && (
        <div>
          <SectionHeading sub="Website traffic sources and content engagement">9. Website Traffic Observations</SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', margin: '1rem 0' }}>
            {[
              { source: 'Organic Search', desc: 'Primary source — no ads running', color: '#1B5E20', bg: '#E8F5E9' },
              { source: 'Direct Traffic', desc: 'Brand-aware users typing company name', color: '#003366', bg: '#E8EAF6' },
              { source: 'Organic Social', desc: 'LinkedIn-driven traffic', color: '#0a66c2', bg: '#E3F2FD' },
              { source: 'Referral', desc: 'Third-party sites & AI-driven pathways', color: '#006B6B', bg: '#E0F2F1' },
            ].map((s, i) => (
              <div key={i} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: '10px', padding: '0.9rem' }}>
                <div style={{ fontWeight: 700, color: s.color, fontSize: '0.85rem', marginBottom: '0.3rem' }}>{s.source}</div>
                <div style={{ fontSize: '0.78rem', color: '#555', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            ))}
          </div>

          <h4 style={{ color: '#003366', margin: '1.25rem 0 0.5rem', fontSize: '0.95rem' }}>Top Geographies</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {[
              { country: 'India', rank: '#1', color: '#1B5E20' },
              { country: 'United States', rank: '#2', color: '#003366' },
              { country: 'Canada', rank: 'Growing', color: '#006B6B' },
            ].map((g, i) => (
              <div key={i} style={{ background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '8px', padding: '0.6rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontWeight: 800, color: g.color, fontSize: '0.95rem' }}>{g.rank}</span>
                <span style={{ color: '#333', fontSize: '0.85rem' }}>{g.country}</span>
              </div>
            ))}
          </div>

          <CollapsibleCard title="Content Engagement Highlight" badge={<Tag label="Cathodic disbondment blog" color="green" />} defaultOpen>
            <BulletList items={[
              <>The blog on <Highlight>understanding cathodic disbondment</Highlight> is still performing well</>,
              <>Average time on page: <Highlight>~1 min 52 sec</Highlight> — users are actually reading the content</>,
              <>Older strong-performing content can lose visibility if not supported by new related content</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="User Stickiness — New Metric Added" badge={<Tag label="First time tracked" color="teal" />}>
            <InsightBox type="teal">
              A user stickiness chart was added for the first time this period to measure whether visitors remain on the site. The interpretation shared was that the website is carrying <Highlight>meaningful engagement weight</Highlight>. Some exact metric definitions are still to be confirmed.
            </InsightBox>
          </CollapsibleCard>
        </div>
      )}

      {/* ── TECHNICAL ───────────────────────────────────────────────────────── */}
      {active === 'technical' && (
        <div>
          <SectionHeading sub="Technical SEO work, dashboard, and scope discussion">10 & 11. Technical SEO & Reporting Dashboard</SectionHeading>

          <CollapsibleCard title="Technical SEO Work Underway" badge={<Tag label="Started proactively" color="amber" />} defaultOpen>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
              {[
                'Website speed optimisation',
                'Local schema markup corrections',
                'Indexing fixes',
                'Title length adjustments',
                'Meta description corrections',
                'URL / slug cleanup',
              ].map((item, i) => (
                <span key={i} style={{ background: '#E0F2F1', color: '#006B6B', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 600 }}>{item}</span>
              ))}
            </div>
            <InsightBox type="amber" title="Scope Discussion">
              This technical SEO work was started <Highlight>even though it was described as outside the original scope</Highlight> of work. Others on the call understood technical SEO/audit work to be covered — plan to clarify internally with Sasha.
            </InsightBox>
          </CollapsibleCard>

          <CollapsibleCard title="Reporting Dashboard" badge={<Tag label="New" color="green" />} defaultOpen>
            <BulletList items={[
              <>A more comprehensive SEO activity dashboard was introduced for all stakeholders</>,
              <>Tracks: ongoing SEO tasks, status of fixes, month-to-month reports, archived reporting tabs</>,
              <>Intent: create a <Highlight>single connected marketing reporting ecosystem</Highlight></>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="SEO Philosophy Discussed">
            <BulletList items={[
              <>SEO is an <Highlight>ongoing process</Highlight> — not one-time work</>,
              <>Pages remain "in progress" until they meet specific traffic or performance criteria</>,
              <>Any future website revamp will affect SEO, traffic, and indexing — careful planning can reduce impact and speed recovery</>,
            ]} />
          </CollapsibleCard>
        </div>
      )}

      {/* ── INSTAGRAM ───────────────────────────────────────────────────────── */}
      {active === 'instagram' && (
        <div>
          <SectionHeading sub="Launch support and asset organisation">12. Instagram Launch Support</SectionHeading>

          <InsightBox type="teal" title="Request">
            Final LinkedIn posts/assets already published need to be collected and repurposed for the planned Instagram account launch.
          </InsightBox>

          <CollapsibleCard title="Challenge: Assets Are Fragmented" defaultOpen>
            <BulletList items={[
              <>Post assets are currently split across different people and workflows</>,
              <>No single consolidated repository exists yet</>,
            ]} />
          </CollapsibleCard>

          <CollapsibleCard title="Agreed Solution" badge={<Tag label="Starting next day" color="green" />} defaultOpen>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '0.5rem' }}>
              {[
                { step: '1', label: 'Create shared folder', color: '#006B6B' },
                { step: '2', label: 'Consolidate older posts first', color: '#003366' },
                { step: '3', label: 'Add newer material over time', color: '#1B5E20' },
              ].map((s, i) => (
                <div key={i} style={{ flex: '1 1 150px', background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '0.9rem', textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: s.color, color: '#fff', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>{s.step}</div>
                  <div style={{ fontSize: '0.82rem', color: '#333', fontWeight: 600 }}>{s.label}</div>
                </div>
              ))}
            </div>
            <InsightBox type="green" title="Lighter Delivery Requested">
              Provide a starter set of foundational content first — enough to launch the Instagram account — without waiting for the full archive to be ready. Folder population begins the next day.
            </InsightBox>
          </CollapsibleCard>
        </div>
      )}

      {/* ── ACTION ITEMS ────────────────────────────────────────────────────── */}
      {active === 'actions' && (
        <div>
          <SectionHeading sub="Agreed next steps from May 14, 2026 meeting">14 & 15. Action Items &amp; Key Takeaways</SectionHeading>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <ActionCard
              category="Content & Social"
              color="blue"
              items={[
                'Create pre-Istanbul countdown posts (3 / 2 / 1 day to go) and website promotion',
                'Use Turkey engagement momentum to support upcoming event visibility',
                'Convert real customer questions/emails into FAQ-style and conversational content',
                'Share the Sri Lankan customer communication for content development',
                'Prepare grandfather birthday video rollout for June 4 before launching paid campaigns',
              ]}
            />
            <ActionCard
              category="SEO"
              color="green"
              items={[
                'Continue building pillar/supporting content around phenalkamine and related keywords',
                'Continue technical SEO work and reporting through the dashboard',
                'Clarify internally whether technical SEO is inside or outside the formal project scope',
              ]}
            />
            <ActionCard
              category="Paid Strategy"
              color="amber"
              items={[
                'Revisit LinkedIn ads in July–August after brand/story content is more complete',
                'Do not launch paid campaigns before the grandfather birthday video is published',
              ]}
            />
            <ActionCard
              category="Asset Organisation"
              color="teal"
              items={[
                'Create and populate a shared folder of LinkedIn creative assets for Instagram reuse',
                'Start with a smaller starter set of assets if the full archive is not immediately ready',
                'Begin folder population starting May 15',
              ]}
            />
            <ActionCard
              category="Follow-up"
              color="navy"
              items={[
                'Return to pending blog discussion/approval in a later follow-up call',
              ]}
            />
          </div>

          <h3 style={{ color: '#003366', fontWeight: 800, fontSize: '1rem', marginBottom: '0.75rem' }}>Key Takeaways</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {[
              { icon: '📈', text: 'LinkedIn performance is improving meaningfully, especially through personal/story-led posts and Turkey engagement.' },
              { icon: '🔍', text: 'SEO has reached an important short-term breakthrough on the phenalkamine keyword, but gains are fragile and need content support immediately.' },
              { icon: '✏️', text: 'The team is shifting toward practical, real-world, FAQ-driven content instead of relying only on standard branded creatives.' },
              { icon: '💰', text: 'Paid growth is on the roadmap, but the team wants better timing and stronger story assets before committing spend.' },
            ].map((kt, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '10px', padding: '0.9rem 1.1rem' }}>
                <span style={{ fontSize: '1.2rem', marginTop: '0.05rem' }}>{kt.icon}</span>
                <p style={{ margin: 0, color: '#333', lineHeight: 1.65, fontSize: '0.875rem' }}>{kt.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

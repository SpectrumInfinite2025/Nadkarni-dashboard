import { useState } from 'react';

const SECTION_COLORS: Record<string, { border: string; bg: string; badge: string; badgeFg: string }> = {
  marketing:  { border: '#0a66c2', bg: '#f0f7ff',   badge: '#0a66c2', badgeFg: '#fff' },
  seo:        { border: '#e8710a', bg: '#fff7f0',   badge: '#e8710a', badgeFg: '#fff' },
  business:   { border: '#2e7d32', bg: '#f0faf0',   badge: '#2e7d32', badgeFg: '#fff' },
  content:    { border: '#7b3fa0', bg: '#faf0ff',   badge: '#7b3fa0', badgeFg: '#fff' },
  topical:    { border: '#b45309', bg: '#fffbeb',   badge: '#b45309', badgeFg: '#fff' },
  events:     { border: '#0891b2', bg: '#f0fbff',   badge: '#0891b2', badgeFg: '#fff' },
};

function MiniSection({
  id,
  label,
  colorKey,
  children,
}: {
  id: string;
  label: string;
  colorKey: keyof typeof SECTION_COLORS;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const c = SECTION_COLORS[colorKey];

  return (
    <div
      style={{
        borderLeft: `3px solid ${c.border}`,
        borderRadius: '0 8px 8px 0',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)')}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.85rem 1.1rem',
          background: open ? c.bg : '#fff',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background 0.2s ease',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            background: c.badge,
            color: c.badgeFg,
            borderRadius: '4px',
            padding: '0.15rem 0.55rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          {label}
        </span>
        <span style={{ flex: 1, fontSize: '0.92rem', fontWeight: 600, color: '#1e293b' }}>
          {id}
        </span>
        <span
          style={{
            fontSize: '1rem',
            color: c.border,
            fontWeight: 700,
            transition: 'transform 0.25s ease',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '2000px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease',
        }}
      >
        <div
          style={{
            padding: '0.9rem 1.25rem 1.1rem',
            background: c.bg,
            borderTop: `1px solid ${c.border}22`,
            opacity: open ? 1 : 0,
            transform: open ? 'translateY(0)' : 'translateY(-6px)',
            transition: 'opacity 0.3s ease 0.05s, transform 0.3s ease 0.05s',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.65, marginBottom: '0.35rem' }}>
      {children}
    </li>
  );
}

function SubBullet({ children }: { children: React.ReactNode }) {
  return (
    <li style={{ fontSize: '0.845rem', color: '#4b5563', lineHeight: 1.6, marginBottom: '0.25rem', marginLeft: '1.2rem' }}>
      {children}
    </li>
  );
}

function DecisionChip({ text }: { text: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: '0.72rem',
        fontWeight: 600,
        background: '#fff3e0',
        color: '#e65100',
        border: '1px solid #ffb74d',
        borderRadius: '12px',
        padding: '0.15rem 0.6rem',
        marginTop: '0.4rem',
        marginRight: '0.4rem',
      }}
    >
      Decision: {text}
    </span>
  );
}

function ActionItem({ owner, items, color }: { owner: string; items: string[]; color: string }) {
  return (
    <div
      style={{
        flex: '1 1 280px',
        background: '#fff',
        border: `1px solid ${color}33`,
        borderTop: `3px solid ${color}`,
        borderRadius: '8px',
        padding: '1rem 1.1rem',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: color,
          marginBottom: '0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: color,
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.7rem',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {owner[0]}
        </span>
        {owner}
      </div>
      <ul style={{ paddingLeft: '1rem', listStyle: 'none', margin: 0 }}>
        {items.map((item, i) => (
          <li
            key={i}
            style={{
              fontSize: '0.845rem',
              color: '#374151',
              lineHeight: 1.6,
              marginBottom: '0.55rem',
              paddingLeft: '0.85rem',
              position: 'relative',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '0.5em',
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: color,
                flexShrink: 0,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function FebMOM() {
  return (
    <div className="accordion-content" style={{ padding: '1.25rem 1.5rem' }}>

      {/* ── Header Summary Band ── */}
      <div
        style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e8f4fd 100%)',
          border: '1px solid #c8dff5',
          borderRadius: '10px',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ flex: '1 1 200px' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0a4d96', marginBottom: '0.15rem' }}>
            Shikin Call – April 01st
          </div>
          <div style={{ fontSize: '0.8rem', color: '#5f7a99', fontWeight: 500 }}>
            Wed, 01 Apr 2026
          </div>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            color: '#4b6c8c',
            fontStyle: 'italic',
            borderLeft: '2px solid #b0cce8',
            paddingLeft: '1rem',
          }}
        >
          Meeting notes, decisions, opportunities, and action items
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['Marketing', 'SEO', 'Strategy', 'Action Items'].map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                background: '#dbeafe',
                color: '#1e40af',
                borderRadius: '10px',
                padding: '0.15rem 0.55rem',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Themed Sections ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>

        {/* Marketing Performance */}
        <MiniSection id="Marketing Performance (Feb 15 – Mar 14)" colorKey="marketing" label="Marketing">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>LinkedIn performing strongly across all metrics: new followers, page views, unique visitors, total reactions all up year-on-year.</Bullet>
            <Bullet>
              <strong style={{ color: '#0a66c2' }}>Top performing content:</strong>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>Paint India recap post: 89 impressions, 58.3% engagement rate.</SubBullet>
                <SubBullet>UDCT post: significant reach boost from tagging UDCT directly.</SubBullet>
              </ul>
            </Bullet>
            <Bullet>Competitor ranking: moved from #6–7 to <strong style={{ color: '#0a66c2' }}>#2 (behind Cardolite)</strong> — a notable improvement.</Bullet>
            <Bullet>Cross-posting to 4 LinkedIn groups since December (Paint &amp; Coating, Coatings World, Indian Paint &amp; Coating Association, Indian Paint Industry) — driving incremental website traffic.</Bullet>
          </ul>
        </MiniSection>

        {/* SEO Concerns */}
        <MiniSection id="SEO — Concerns" colorKey="seo" label="SEO">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>All SEO metrics down this period: active users, new users, views, clicks.</Bullet>
            <Bullet><strong style={{ color: '#e8710a' }}>Root cause:</strong> no new content being fed to the site.</Bullet>
            <Bullet>What's holding: existing blogs and branded keywords still driving traffic; average position 5.2 for targeted queries but CTR remains low.</Bullet>
            <Bullet>
              <strong style={{ color: '#e8710a' }}>Geographic traffic highlights:</strong>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>Countries: India, US, UK, China, Singapore, Canada, Germany, Vietnam, Indonesia.</SubBullet>
                <SubBullet>Canada is new since December; Indonesia is new this period.</SubBullet>
                <SubBullet>Vietnam and Canada showing high average time on page — likely new prospects investigating the brand.</SubBullet>
                <SubBullet>China traffic likely supplier outreach (amines/chemicals).</SubBullet>
              </ul>
            </Bullet>
            <Bullet>Existing blogs need revamping every 3–6 months; meta title/description changes alone are insufficient.</Bullet>
          </ul>
        </MiniSection>

        {/* Business Context */}
        <MiniSection id="Business Context — Capacity Constraints" colorKey="business" label="Business">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>Post-Paint India momentum strong: orders surged, planned 200 MT/month output.</Bullet>
            <Bullet>
              <strong style={{ color: '#2e7d32' }}>Achieved only 150 MT</strong> due to raw material and fuel shortages (Trump tariffs impact).
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>LPG unavailable; diesel boiler modification attempted and failed (leakage/blowup).</SubBullet>
              </ul>
            </Bullet>
            <Bullet>Raw material prices doubled; passing increases to customers — market is slowly accepting.</Bullet>
            <Bullet>Current factory is a "cloud kitchen" arrangement (renting third-party facility for 4 years).</Bullet>
            <Bullet><strong style={{ color: '#2e7d32' }}>Own factory nearing completion</strong> — target: mid-June. Will reduce costs, increase capacity, and improve competitiveness.</Bullet>
          </ul>
          <DecisionChip text="Hold off on paid ads until factory is operational and supply constraints ease. Running ads now risks attracting orders that can't be fulfilled." />
        </MiniSection>

        {/* Content & Brand Strategy */}
        <MiniSection id="Content & Brand Strategy" colorKey="content" label="Content">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>
              <strong style={{ color: '#7b3fa0' }}>Grandfather's 100th birthday — June 4.</strong>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>Idea: documentary-style video featuring industry figures sharing personal stories.</SubBullet>
                <SubBullet>Potential contributors: ex-MD of Asian Paints, Cardolite VP, others influenced by grandfather.</SubBullet>
                <SubBullet>Approach: Shikin introduces with personal story (made first paint at age 9 in grandfather's lab, dedicated PhD thesis to him).</SubBullet>
                <SubBullet>Could be broken into 2-min segments for LinkedIn; full version on website.</SubBullet>
              </ul>
            </Bullet>
            <Bullet>Shikin to discuss concept with father before proceeding.</Bullet>
            <Bullet>Complication: Shikin in US for most of May — sister to be looped in to help coordinate.</Bullet>
            <Bullet>
              <strong style={{ color: '#7b3fa0' }}>Wikipedia page for grandfather — deferred.</strong>
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>Sufficient third-party references now exist (book citation, UDCT felicitation, company website).</SubBullet>
                <SubBullet>Risk: ongoing legal dispute with former partner may surface on Wikipedia.</SubBullet>
              </ul>
            </Bullet>
            <Bullet>
              <strong style={{ color: '#7b3fa0' }}>Book citation opportunity:</strong> <em>Ties of Asian Paints</em> by Anupam Gupta (published 2024) quotes grandfather via company website (reference #7, Chapter 4).
              <ul style={{ listStyle: 'none', padding: 0, marginTop: '0.3rem' }}>
                <SubBullet>Action: reach out to author via LinkedIn, ask for a few words + link back to website.</SubBullet>
                <SubBullet>Angle: grandfather's 100th birthday as the occasion.</SubBullet>
              </ul>
            </Bullet>
            <Bullet>Grandfather's name appears with multiple spellings digitally (e.g., "Jay" vs "Jai") — need all variants for citation search.</Bullet>
          </ul>
          <DecisionChip text="Gather citations for off-page SEO use now; revisit Wikipedia page later." />
        </MiniSection>

        {/* Topical Authority */}
        <MiniSection id="Topical Authority & SEO Content Plan" colorKey="topical" label="SEO Plan">
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <Bullet>
              <strong style={{ color: '#b45309' }}>Primary keyword:</strong> phenalcomine (search volume: 25–100/month).
            </Bullet>
            <Bullet>
              <strong style={{ color: '#b45309' }}>Secondary keywords:</strong> phenalcomine epoxy curing agent, CNSL epoxy hardener, cashew nutshell liquid curing agent, bio-based epoxy hardener.
            </Bullet>
            <Bullet>Plan: expand existing phenalcomine blog into a 3,000–4,000-word comprehensive guide. No competitor has done this — first-mover advantage.</Bullet>
            <Bullet>Sub-articles targeting secondary keywords (~500–700 words each) to point back to parent guide.</Bullet>
            <Bullet>Avoid keyword cannibalization — vary titles and search terms across articles.</Bullet>
            <Bullet>Snippet/insights page to be created separately (Sandeep to build) for shorter content pieces.</Bullet>
          </ul>
        </MiniSection>

        {/* Upcoming Events */}
        <MiniSection id="Upcoming Events & Opportunities" colorKey="events" label="Events">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {[
              { month: 'May', color: '#0891b2', event: 'American Coatings Show (US) + Canada visit with distributor Safiq Alcane (French company).' },
              { month: 'Jun 4', color: '#7b3fa0', event: "Grandfather's 100th birthday content push." },
              { month: 'Mid-Jun', color: '#2e7d32', event: 'Own factory launch — reduces costs, increases capacity, improves competitiveness.' },
              { month: 'June', color: '#e8710a', event: "Paint Istanbul — co-exhibiting within Nordman's booth (German distributor in Turkey). 4 people travelling from Natpeni Specialty." },
            ].map((row) => (
              <div
                key={row.month}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'flex-start',
                  padding: '0.55rem 0.75rem',
                  background: '#fff',
                  borderRadius: '6px',
                  border: `1px solid ${row.color}33`,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    minWidth: 48,
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: row.color,
                    background: `${row.color}18`,
                    borderRadius: '4px',
                    padding: '0.15rem 0.4rem',
                    textAlign: 'center',
                  }}
                >
                  {row.month}
                </span>
                <span style={{ fontSize: '0.865rem', color: '#374151', lineHeight: 1.55 }}>{row.event}</span>
              </div>
            ))}
            <div
              style={{
                fontSize: '0.8rem',
                color: '#6b7280',
                fontStyle: 'italic',
                marginTop: '0.3rem',
              }}
            >
              Note: Create dedicated, evergreen event pages on the website (not just live during events).
            </div>
          </div>
        </MiniSection>

      </div>

      {/* ── Action Items ── */}
      <div style={{ marginTop: '1.5rem' }}>
        <div
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
            color: '#6b7280',
            marginBottom: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: 28,
              height: 2,
              background: '#d1d5db',
              borderRadius: 1,
            }}
          />
          Action Items
          <span
            style={{
              display: 'inline-block',
              width: 28,
              height: 2,
              background: '#d1d5db',
              borderRadius: 1,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <ActionItem
            owner="Yogesh"
            color="#0a66c2"
            items={[
              'Send Shikin a summary/recording of today\'s call within 10 minutes.',
              'Run deep citation search for grandfather across all name spellings; share findings with Shikin.',
              'Re-send the epoxy art content creator video previously shared.',
              'Search for Indian DIY/epoxy art content creators for potential cyclo aliphatic product seeding.',
              'Find Anupam Gupta on LinkedIn; draft outreach re: backlink + birthday occasion.',
              'Prepare article structure for phenalcomine comprehensive guide; share draft with Shikin for technical review.',
              'Follow up on Paint Istanbul pamphlet (pending Shikin\'s review from last cycle).',
              'Prepare 2 content topic pivots from the topical authority SEO document (tier 1/tier 3 supporting pillar content) for tomorrow\'s call.',
            ]}
          />
          <ActionItem
            owner="Shikin"
            color="#2e7d32"
            items={[
              'Identify 2 sub-topics/search terms around phenalcomine for pillar content.',
              'Talk to father about grandfather documentary concept.',
              'Share all spelling variants of grandfather\'s name for citation search.',
              'Share Google Books link + page number for the Anupam Gupta citation.',
              'Confirm tomorrow\'s call at 4:30 PM (earlier slot due to Yogesh\'s daughter\'s commitment at 6:30 PM).',
              'Loop sister into tomorrow\'s call — she is joining the business (starting on marketing side).',
            ]}
          />
        </div>
      </div>

    </div>
  );
}

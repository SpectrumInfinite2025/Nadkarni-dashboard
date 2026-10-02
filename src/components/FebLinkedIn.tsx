export default function FebLinkedIn() {
  return (
    <div className="accordion-content">
      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#feb-li-overview" className="toc-link">Visitor Metrics & Overview</a>
          <a href="#feb-li-engagement" className="toc-link">Content Engagement</a>
          <a href="#feb-li-search" className="toc-link">Search Appearances</a>
          <a href="#feb-li-competitors" className="toc-link">Competitor Analysis</a>
        </div>
      </div>

      <section id="feb-li-overview" className="section">
        <h2>Visitor Metrics & Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="34">0</div>
            <div className="stat-label">New Followers</div>
            <div className="stat-change up">+70% growth rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="100">0</div>
            <div className="stat-label">Page Views</div>
            <div className="stat-change up">+9.9% vs previous</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="44">0</div>
            <div className="stat-label">Unique Visitors</div>
            <div className="stat-change up">+46.7% vs previous</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="204">0</div>
            <div className="stat-label">Total Reactions</div>
            <div className="stat-change up">+209.1% growth</div>
          </div>
        </div>

        <div className="image-container" style={{ marginTop: '1.5rem' }}>
          <img
            src="/Visitor_Metrics.png"
            alt="Visitor Highlights Feb 15 - Mar 14, 2026"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Visitor Highlights</h4>
          <p>
            Page views grew by <strong>9.9%</strong> to 100 views, while unique visitors surged <strong>46.7%</strong> to 44, signalling a meaningful increase in new audience reach. The follower growth rate of +70% is a strong indicator of expanding brand awareness within the NSPC professional niche.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="feb-li-engagement" className="section">
        <h2>Content Engagement</h2>
        <p style={{ marginBottom: '1.25rem', color: '#555', fontSize: '0.95rem' }}>
          13 posts published this period (+18.2% increase). Below is the engagement breakdown across all posts.
        </p>

        <div className="image-container">
          <img
            src="/Content_Enagagement_3 copy.png"
            alt="Content Engagement Feb 17–24, 2026"
            className="dashboard-image"
          />
        </div>

        <div className="image-container" style={{ marginTop: '1.25rem' }}>
          <img
            src="/Content_Enagagement_4.png"
            alt="Content Engagement Feb 14–16, 2026"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box" style={{ marginTop: '1.5rem' }}>
          <h4>Standout Posts</h4>
          <p>
            The <strong>Paint India 2026 recap</strong> post (Feb 21) drove the highest engagement with 789 impressions and an exceptional <strong>58.3% engagement rate</strong> and 460 reactions — by far the top performer this period. The <strong>CNSL chemistry post</strong> (Feb 17) reached 946 impressions, demonstrating the consistent draw of technical content.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #1a8cff 100%)', color: 'white' }}>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Post (Date)</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Impressions</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Reactions</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Eng. Rate</th>
              </tr>
            </thead>
            <tbody>
              {[
                { post: 'CNSL technology — Breaking coating chemistry conventions (Feb 17)', impressions: 946, reactions: 33, rate: '3.49%' },
                { post: 'Paint India 2026 — engaging and insightful time (Feb 21)', impressions: 789, reactions: 460, rate: '58.3%' },
                { post: 'Myth: Solvent-free = difficult application (Feb 24)', impressions: 333, reactions: 8, rate: '2.4%' },
                { post: '1 Day to Go! — Nadkarni showcase countdown (Feb 18)', impressions: 254, reactions: 1, rate: '0.39%' },
                { post: 'Paint India Expo invite — Hall 04 Booth M23 (Feb 16)', impressions: 212, reactions: 2, rate: '0.94%' },
                { post: 'Meet our team at Hall 04 | NESCO Mumbai (Feb 14)', impressions: 132, reactions: 2, rate: '1.52%' },
              ].map((row, i) => (
                <tr
                  key={i}
                  style={{
                    background: i % 2 === 0 ? '#ffffff' : '#f4f8fd',
                    borderBottom: '1px solid #e8f0fb',
                  }}
                >
                  <td style={{ padding: '0.6rem 1rem', color: '#374151' }}>{row.post}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center', fontWeight: 600, color: '#0a66c2' }}>{row.impressions}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center', fontWeight: 600, color: '#1e3a5f' }}>{row.reactions}</td>
                  <td style={{ padding: '0.6rem 1rem', textAlign: 'center', fontWeight: 700, color: parseFloat(row.rate) >= 10 ? '#10b981' : '#374151' }}>{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="feb-li-search" className="section">
        <h2>Search Appearances</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="747">0</div>
            <div className="stat-label">Page Searches</div>
            <div className="stat-change up">+5.7% last 7 days</div>
          </div>
          <div className="stat-card">
            <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: '1.5rem', fontWeight: 700, color: '#0a66c2', marginBottom: '0.5rem' }}>
              "Nadkarni"
            </div>
            <div className="stat-label">Top Search Keyword</div>
            <div className="stat-change up">Brand awareness growing</div>
          </div>
        </div>

        <div className="image-container" style={{ marginTop: '1.5rem' }}>
          <img
            src="/Search_Appearance_on_LinkedIn.png"
            alt="Search Appearance Highlights on LinkedIn"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Search Presence Growing</h4>
          <p>
            747 page searches and a 5.7% week-on-week increase reflects improved LinkedIn discoverability. The brand name "Nadkarni" ranking as the top keyword confirms that <strong>brand recall is strengthening</strong> — professionals are actively searching for the company by name.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="feb-li-competitors" className="section">
        <h2>Competitor Analysis</h2>
        <div className="image-container">
          <img
            src="/Competitor_Insights.png"
            alt="Competitor Highlights and Growth Comparison"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box" style={{ marginTop: '1.5rem' }}>
          <h4>Competitor Context</h4>
          <p>
            While Cardolite Corporation leads on absolute follower numbers (5,580 followers vs 913), NSPC's <strong>reaction growth of +209.1%</strong> significantly outpaces Cardolite's +142%, indicating that NSPC's content is resonating more deeply with its audience on a per-post basis. The 13 posts vs Cardolite's 3 posts demonstrates <strong>far higher content velocity</strong> this period.
          </p>
        </div>

        <div style={{ overflowX: 'auto', marginTop: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #0a66c2 0%, #1a8cff 100%)', color: 'white' }}>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'left', fontWeight: 700 }}>Company</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Followers</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>New Followers</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Posts</th>
                <th style={{ padding: '0.65rem 1rem', textAlign: 'center', fontWeight: 700 }}>Reactions</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: '#ffffff', borderBottom: '1px solid #e8f0fb' }}>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 600, color: '#374151' }}>Cardolite Corporation</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#374151' }}>5,580</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>95 (+196.9%)</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#374151' }}>3 (+50%)</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#374151' }}>271 (+142%)</td>
              </tr>
              <tr style={{ background: '#f0f7ff', borderBottom: '1px solid #e8f0fb' }}>
                <td style={{ padding: '0.65rem 1rem', fontWeight: 700, color: '#0a4d96' }}>
                  NSPC (You)
                </td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#374151' }}>913</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#10b981', fontWeight: 600 }}>34 (+70%)</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>13 (+18.2%)</td>
                <td style={{ padding: '0.65rem 1rem', textAlign: 'center', color: '#10b981', fontWeight: 700 }}>204 (+209.1%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card success">
            <h4>Strength</h4>
            <p>Reaction growth rate (+209.1%) and content volume (13 posts) significantly outperform competitor. Paint India 2026 coverage generated exceptional engagement.</p>
          </div>
          <div className="stat-card improve">
            <h4>Opportunity</h4>
            <p>NSPC's follower base is still building. Consistent high-quality content and engagement with industry discussions will accelerate follower growth over time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

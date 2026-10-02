export default function DecLinkedIn() {
  return (
    <div className="accordion-content">
      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#dec-li-overview" className="toc-link">Overview Highlights</a>
          <a href="#dec-li-visitor" className="toc-link">Visitor Analytics</a>
          <a href="#dec-li-content" className="toc-link">Content Performance</a>
          <a href="#dec-li-engagement" className="toc-link">Engagement Trends</a>
          <a href="#dec-li-followers" className="toc-link">Follower Metrics</a>
          <a href="#dec-li-competitor" className="toc-link">Competitor Snapshot</a>
        </div>
      </div>

      <section id="dec-li-overview" className="section">
        <h2>Overview Highlights</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="1439">0</div>
            <div className="stat-label">Total Impressions</div>
            <div className="stat-change positive">+12% from previous period</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="132">0</div>
            <div className="stat-label">Profile Visits</div>
            <div className="stat-change positive">+8% increase</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="25">0</div>
            <div className="stat-label">New Followers</div>
            <div className="stat-change positive">Growing steadily</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="94">0</div>
            <div className="stat-label">Total Engagements</div>
            <div className="stat-change positive">Strong engagement</div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/highlights.png"
            alt="LinkedIn Overview Highlights"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Key Takeaway</h4>
          <p>
            LinkedIn performance shows consistent growth with impressions increasing by 12%. The engagement rate remains strong, indicating content resonates well with the target audience.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="dec-li-visitor" className="section">
        <h2>Visitor Analytics</h2>
        <div className="two-column">
          <div className="column-card">
            <h4>Visitor Highlights</h4>
            <div className="image-container">
              <img
                src="/visitor_highlights.png"
                alt="Visitor Highlights"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Follower Highlights</h4>
            <div className="image-container">
              <img
                src="/follower_highlights.png"
                alt="Follower Highlights"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/visitor_analytics_-_dec_15th_jan_14.png"
            alt="Visitor Analytics Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="dec-li-content" className="section">
        <h2>Content Performance</h2>
        <div className="image-container">
          <img
            src="/content_analytics_-_dec_15th_jan_14.png"
            alt="Content Analytics Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/content_metrics_-_dec_15th_jan_14.png"
            alt="Content Metrics Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>Top Performing Content</h4>
            <div className="image-container">
              <img
                src="/content_engagement_screenshot_1.png"
                alt="Content Engagement 1"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Engagement Highlights</h4>
            <div className="image-container">
              <img
                src="/content_engagement_screenshot_2.png"
                alt="Content Engagement 2"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="dec-li-engagement" className="section">
        <h2>Engagement Trends</h2>
        <div className="image-container">
          <img
            src="/content_grading_dec_15_to_jan_14.png"
            alt="Content Grading Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card success">
            <h4>Top Performing Posts</h4>
            <p>Content focusing on CNSL technology and sustainable coatings</p>
          </div>
          <div className="stat-card improve">
            <h4>Opportunity Areas</h4>
            <p>Increase video content and interactive posts</p>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="dec-li-followers" className="section">
        <h2>Follower Metrics</h2>
        <div className="image-container">
          <img
            src="/follower_growth_-_dec_15th_to_jan_14.png"
            alt="Follower Growth Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="stat-card" style={{ marginTop: '2rem' }}>
          <div className="stat-number" data-counter="25">0</div>
          <div className="stat-label">New Followers Acquired</div>
          <div className="stat-change positive">Steady growth trajectory</div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="dec-li-competitor" className="section">
        <h2>Competitor Snapshot</h2>
        <div className="image-container">
          <img
            src="/competitors_vs_nadkarni_dec_15th_jan_14.png"
            alt="Competitors vs NSPC Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Competitive Position</h4>
          <p>
            NSPC maintains strong positioning against key competitors with consistent engagement and growing follower base.
          </p>
        </div>

        <div className="two-column" style={{ marginTop: '2rem' }}>
          <div className="column-card success">
            <h4>What's Working</h4>
            <ul>
              <li>Technical content on CNSL technology resonates strongly</li>
              <li>Consistent posting schedule maintains engagement</li>
              <li>Profile visits increasing steadily</li>
              <li>Follower growth remains positive</li>
            </ul>
          </div>
          <div className="column-card improve">
            <h4>Opportunities</h4>
            <ul>
              <li>Increase video and visual content</li>
              <li>Engage more with industry discussions</li>
              <li>Showcase customer success stories</li>
              <li>Leverage employee advocacy</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

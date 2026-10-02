export default function JanLinkedIn() {
  return (
    <div className="accordion-content">
      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#jan-li-overview" className="toc-link">Overview & Follower Growth</a>
          <a href="#jan-li-impressions" className="toc-link">Content Impressions</a>
          <a href="#jan-li-engagement" className="toc-link">Content Engagement</a>
          <a href="#jan-li-posts" className="toc-link">Top Performing Posts</a>
        </div>
      </div>

      <section id="jan-li-overview" className="section">
        <h2>Overview & Follower Growth</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="25">0</div>
            <div className="stat-label">New Followers</div>
            <div className="stat-change positive">Growing steadily</div>
          </div>
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
            <div className="stat-number" data-counter="94">0</div>
            <div className="stat-label">Total Engagements</div>
            <div className="stat-change positive">Strong engagement</div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/Follower_Growth.png"
            alt="Follower Growth Jan 15 - Feb 14"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/Followers added - 25 New Followers.png"
            alt="25 New Followers Added"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Follower Trend</h4>
          <p>
            25 new followers were added in this period, maintaining steady growth. Consistent posting of technical content on CNSL chemistry and bio-based coatings continues to attract an engaged, niche professional audience.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-li-impressions" className="section">
        <h2>Content Impressions</h2>
        <div className="image-container">
          <img
            src="/LinkedIn - Content Impressions.png"
            alt="LinkedIn Content Impressions Jan 15 - Feb 14"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Impression Insights</h4>
          <p>
            Content impressions remain strong, with technical posts consistently outperforming general updates. The audience is highly relevant — professionals in the coatings, polymers, and industrial chemistry space.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-li-engagement" className="section">
        <h2>Content Engagement</h2>
        <div className="two-column">
          <div className="column-card">
            <h4>Engagement Breakdown 1</h4>
            <div className="image-container">
              <img
                src="/Content_Engagement_1.png"
                alt="Content Engagement Screenshot 1"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Engagement Breakdown 2</h4>
            <div className="image-container">
              <img
                src="/Content_Engagement_2.png"
                alt="Content Engagement Screenshot 2"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-li-posts" className="section">
        <h2>Top Performing Posts</h2>
        <div className="two-column">
          <div className="column-card">
            <h4>Post with Most Engagement – 1</h4>
            <div className="image-container">
              <img
                src="/Post That Bought Most Engagement 1.png"
                alt="Post That Brought Most Engagement 1"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Post with Most Engagement – 2</h4>
            <div className="image-container">
              <img
                src="/Post That Bought Most Engagement 2.png"
                alt="Post That Brought Most Engagement 2"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>

        <div className="stats-grid" style={{ marginTop: '2rem' }}>
          <div className="stat-card success">
            <h4>What's Working</h4>
            <p>Technical content on CNSL technology and sustainable coatings resonates strongly with the target audience</p>
          </div>
          <div className="stat-card improve">
            <h4>Opportunities</h4>
            <p>Increase video content frequency and engage more with industry discussions to boost reach</p>
          </div>
        </div>
      </section>
    </div>
  );
}

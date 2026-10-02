export default function DecGA() {
  return (
    <div className="accordion-content">
      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#ga-dec-overview" className="toc-link">Overview</a>
          <a href="#ga-dec-user-acquisition" className="toc-link">User Acquisition</a>
          <a href="#ga-dec-traffic-sources" className="toc-link">Traffic Sources</a>
          <a href="#ga-dec-search-performance" className="toc-link">Search Performance</a>
          <a href="#ga-dec-content-analysis" className="toc-link">Content Analysis</a>
          <a href="#ga-dec-geographic" className="toc-link">Geographic Distribution</a>
        </div>
      </div>

      <section id="ga-dec-overview" className="section">
        <h2>Website Traffic Overview</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="699">0</div>
            <div className="stat-label">New Users</div>
            <div className="stat-change positive">Strong acquisition</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="1245">0</div>
            <div className="stat-label">Total Sessions</div>
            <div className="stat-change positive">Increased activity</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">2:45</div>
            <div className="stat-label">Avg. Session Duration</div>
            <div className="stat-change positive">Good engagement</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">45%</div>
            <div className="stat-label">Bounce Rate</div>
            <div className="stat-change neutral">Industry average</div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/overall_insights_for_3_months.png"
            alt="Overall Insights for 3 Months"
            className="dashboard-image"
          />
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="ga-dec-user-acquisition" className="section">
        <h2>User Acquisition</h2>
        <div className="image-container">
          <img
            src="/new_user_acquisition.png"
            alt="New User Acquisition"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/acquisition_snapshot.png"
            alt="Acquisition Snapshot"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>How Users Were Acquired</h4>
            <div className="image-container">
              <img
                src="/how_users_were_acquired.png"
                alt="How Users Were Acquired"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Active vs New Users</h4>
            <div className="image-container">
              <img
                src="/active_vs_new_users_acquired_.png"
                alt="Active vs New Users"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="ga-dec-traffic-sources" className="section">
        <h2>Traffic Sources</h2>
        <div className="image-container">
          <img
            src="/search_methods_.png"
            alt="Search Methods"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>Traffic by Source</h4>
            <div className="image-container">
              <img
                src="/Sources bringing in Traffic.png"
                alt="Traffic Sources"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Visitor Metrics</h4>
            <div className="image-container">
              <img
                src="/visitor_metrics.png"
                alt="Visitor Metrics"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="ga-dec-search-performance" className="section">
        <h2>Search Performance</h2>
        <div className="image-container">
          <img
            src="/search_performance_-_nov_14th_-_dec_15.png"
            alt="Search Performance Nov 14 - Dec 15"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/top_queries_bringing_in_the_footfalls_to_the_website.png"
            alt="Top Queries"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>Search Queries Leading to Site</h4>
            <div className="image-container">
              <img
                src="/queries_leading_to_the_site.png"
                alt="Search Queries"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Keywords Drawing Traffic</h4>
            <div className="image-container">
              <img
                src="/Keywords drawing in traffic.png"
                alt="Keywords Drawing Traffic"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="ga-dec-content-analysis" className="section">
        <h2>Content Analysis</h2>
        <div className="image-container">
          <img
            src="/Content That continues Traffic to the website.png"
            alt="Content Driving Traffic"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>Pages with Maximum Traffic</h4>
            <div className="image-container">
              <img
                src="/Pages that bought in maximum traffic.png"
                alt="Top Pages"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Traffic by Pages</h4>
            <div className="image-container">
              <img
                src="/traffic_by_pages.png"
                alt="Traffic by Pages"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="ga-dec-geographic" className="section">
        <h2>Geographic Distribution</h2>
        <div className="image-container">
          <img
            src="/users_by_country_-_dec_15_-_jan_14.png"
            alt="Users by Country Dec 15 - Jan 14"
            className="dashboard-image"
          />
        </div>

        <div className="two-column">
          <div className="column-card">
            <h4>Active Users by Country</h4>
            <div className="image-container">
              <img
                src="/Active users by country.png"
                alt="Active Users by Country"
                className="dashboard-image"
              />
            </div>
          </div>
          <div className="column-card">
            <h4>Traffic from Countries</h4>
            <div className="image-container">
              <img
                src="/traffic_from_countries_snapshot.png"
                alt="Traffic from Countries"
                className="dashboard-image"
              />
            </div>
          </div>
        </div>

        <div className="insight-box" style={{ marginTop: '2rem' }}>
          <h4>Geographic Insights</h4>
          <p>
            45% of traffic comes from India, aligning with Google's local relevance priority.
            Strong presence in key international markets demonstrates global reach.
          </p>
        </div>
      </section>
    </div>
  );
}

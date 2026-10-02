import { useState } from 'react';

export default function JanGA() {
  const [seoOpen, setSeoOpen] = useState(false);
  const [whatsWorkingOpen, setWhatsWorkingOpen] = useState(false);
  const [opportunitiesOpen, setOpportunitiesOpen] = useState(false);
  const [technicalOpen, setTechnicalOpen] = useState(false);

  return (
    <div className="accordion-content">
      <div className="toc-card">
        <div className="toc-title">Table of Contents</div>
        <div className="toc-grid">
          <a href="#jan-ga-search" className="toc-link">Search Console Performance</a>
          <a href="#jan-ga-queries" className="toc-link">Top Search Queries</a>
          <a href="#jan-ga-gsc-countries" className="toc-link">Search by Country (GSC)</a>
          <a href="#jan-ga-visitors" className="toc-link">Visitors & Active Users</a>
          <a href="#jan-ga-engagement" className="toc-link">Engagement & Session Data</a>
          <a href="#jan-ga-channels" className="toc-link">Traffic Acquisition Methods</a>
          <a href="#jan-ga-ga-countries" className="toc-link">Traffic by Country (GA4)</a>
        </div>
      </div>

      <section id="jan-ga-search" className="section">
        <h2>Search Console Performance</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="395">0</div>
            <div className="stat-label">Total Clicks</div>
            <div className="stat-change positive">+30% vs prev period (304)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">65.9K</div>
            <div className="stat-label">Total Impressions</div>
            <div className="stat-change positive">+42% vs prev period (46.4K)</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">0.6%</div>
            <div className="stat-label">Average CTR</div>
            <div className="stat-change neutral">Prev: 0.7%</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">6.6</div>
            <div className="stat-label">Average Position</div>
            <div className="stat-change positive">Improved from 6.7</div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/Traffic_comparison_between_the_previous_month.png"
            alt="Traffic Comparison Between Months"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/Performance_on_Search_results.png"
            alt="Performance on Search Results Jan 15 - Feb 14"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/Website Clicks and Impressions Growth.png"
            alt="Website Clicks and Impressions Growth"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Key Takeaway</h4>
          <p>
            Significant growth month-over-month: clicks increased 30% (304 → 395) and impressions jumped 42% (46.4K → 65.9K). Average position improved from 6.7 to 6.6, indicating content is climbing the rankings.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-queries" className="section">
        <h2>Top Search Queries</h2>
        <div className="image-container">
          <img
            src="/Top_10_queries_that_bought_traffic.png"
            alt="Top Queries That Brought Traffic"
            className="dashboard-image"
          />
        </div>

        <div className="query-table">
          <div className="query-table-header">
            <span>Query</span>
            <span>Clicks</span>
            <span>Impressions</span>
          </div>
          <div className="query-row">
            <span>nadkarni specialty polymers</span>
            <span className="clicks-val">52</span>
            <span className="impressions-val">79</span>
          </div>
          <div className="query-row">
            <span>nadkarni speciality polymers and coatings private</span>
            <span className="clicks-val">16</span>
            <span className="impressions-val">29</span>
          </div>
          <div className="query-row highlight">
            <span>paint technology</span>
            <span className="clicks-val">14</span>
            <span className="impressions-val">244</span>
          </div>
          <div className="query-row highlight">
            <span>cathodic disbondment</span>
            <span className="clicks-val">10</span>
            <span className="impressions-val">241</span>
          </div>
          <div className="query-row">
            <span>nadkarni speciality polymers and coatings private limited</span>
            <span className="clicks-val">3</span>
            <span className="impressions-val">15</span>
          </div>
          <div className="query-row">
            <span>nadkarni</span>
            <span className="clicks-val">2</span>
            <span className="impressions-val">144</span>
          </div>
          <div className="query-row">
            <span>cathodic disbondment test</span>
            <span className="clicks-val">2</span>
            <span className="impressions-val">129</span>
          </div>
          <div className="query-row">
            <span>nspc</span>
            <span className="clicks-val">2</span>
            <span className="impressions-val">112</span>
          </div>
        </div>

        <div className="insight-box" style={{ marginTop: '1.5rem' }}>
          <h4>Opportunity Signal</h4>
          <p>
            "Paint technology" (244 impressions, 14 clicks) and "cathodic disbondment" (241 impressions, 10 clicks) show high impression-to-click ratios — strong ranking visibility with untapped click-through potential. Optimising meta titles and descriptions for these queries could significantly boost traffic.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-gsc-countries" className="section">
        <h2>Search by Country – Google Search Console</h2>
        <div className="image-container">
          <img
            src="/Traffic_from_Countries.png"
            alt="Traffic from Countries - Search Console"
            className="dashboard-image"
          />
        </div>

        <div className="query-table" style={{ marginTop: '1.5rem' }}>
          <div className="query-table-header">
            <span>Country</span>
            <span>Clicks</span>
            <span>Impressions</span>
          </div>
          <div className="query-row">
            <span>India</span>
            <span className="clicks-val">250</span>
            <span className="impressions-val">17,495</span>
          </div>
          <div className="query-row highlight">
            <span>United States</span>
            <span className="clicks-val">35</span>
            <span className="impressions-val">21,787</span>
          </div>
          <div className="query-row">
            <span>United Kingdom</span>
            <span className="clicks-val">8</span>
            <span className="impressions-val">4,237</span>
          </div>
          <div className="query-row">
            <span>Canada</span>
            <span className="clicks-val">7</span>
            <span className="impressions-val">2,951</span>
          </div>
          <div className="query-row">
            <span>France</span>
            <span className="clicks-val">7</span>
            <span className="impressions-val">504</span>
          </div>
          <div className="query-row">
            <span>Brazil</span>
            <span className="clicks-val">6</span>
            <span className="impressions-val">422</span>
          </div>
          <div className="query-row">
            <span>Philippines</span>
            <span className="clicks-val">5</span>
            <span className="impressions-val">1,457</span>
          </div>
          <div className="query-row">
            <span>Turkey</span>
            <span className="clicks-val">5</span>
            <span className="impressions-val">292</span>
          </div>
        </div>

        <div className="insight-box" style={{ marginTop: '1.5rem' }}>
          <h4>Geographic Search Insight</h4>
          <p>
            India leads clicks with 250, while the US has the highest impressions (21,787) with comparatively fewer clicks — a strong signal that US-targeted content could be better optimised for CTR. Philippines with 1,457 impressions and 5 clicks is another emerging opportunity.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-visitors" className="section">
        <h2>Visitors & Active Users</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" data-counter="678">0</div>
            <div className="stat-label">Total Active Users</div>
            <div className="stat-change positive">Strong global reach</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="638">0</div>
            <div className="stat-label">New Users</div>
            <div className="stat-change positive">94% new user rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" data-counter="960">0</div>
            <div className="stat-label">Total Sessions</div>
            <div className="stat-change positive">Increased activity</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">59.38%</div>
            <div className="stat-label">Engagement Rate</div>
            <div className="stat-change positive">Above industry avg</div>
          </div>
        </div>

        <div className="image-container">
          <img
            src="/Visitors.png"
            alt="Visitors Data Jan 15 - Feb 14"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/Active_Users_Increased.png"
            alt="Active Users Increased"
            className="dashboard-image"
          />
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-engagement" className="section">
        <h2>Engagement & Session Data</h2>
        <div className="image-container">
          <img
            src="/Average_Session_Duration.png"
            alt="Average Session Duration"
            className="dashboard-image"
          />
        </div>

        <div className="image-container">
          <img
            src="/Engagement Time On Website.png"
            alt="Engagement Time On Website"
            className="dashboard-image"
          />
        </div>

        <div className="insight-box">
          <h4>Engagement Quality</h4>
          <p>
            Average engagement time of 1m 15s and an engagement rate of 59.38% indicate visitors are meaningfully consuming content — well above typical B2B industry benchmarks.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-channels" className="section">
        <h2>Traffic Acquisition Methods</h2>
        <div className="image-container">
          <img
            src="/Traffic_Acquisition_Methods.png"
            alt="Traffic Acquisition Methods"
            className="dashboard-image"
          />
        </div>

        <div className="channel-table" style={{ marginTop: '1.5rem' }}>
          <div className="channel-table-header">
            <span>Channel</span>
            <span>Sessions</span>
            <span>Engaged Sessions</span>
            <span>Engagement Rate</span>
            <span>Avg Engagement Time</span>
          </div>
          <div className="channel-row top">
            <span>Organic Search</span>
            <span>556 (57.92%)</span>
            <span>337 (59.12%)</span>
            <span>60.61%</span>
            <span>1m 13s</span>
          </div>
          <div className="channel-row">
            <span>Direct</span>
            <span>345 (35.94%)</span>
            <span>209 (36.67%)</span>
            <span>60.58%</span>
            <span>26s</span>
          </div>
          <div className="channel-row">
            <span>Organic Social</span>
            <span>30 (3.13%)</span>
            <span>12 (2.11%)</span>
            <span>40%</span>
            <span>1s</span>
          </div>
          <div className="channel-row">
            <span>Referral</span>
            <span>17 (1.77%)</span>
            <span>9 (1.58%)</span>
            <span>52.94%</span>
            <span>29s</span>
          </div>
          <div className="channel-row">
            <span>Unassigned</span>
            <span>10 (1.04%)</span>
            <span>3 (0.53%)</span>
            <span>30%</span>
            <span>34s</span>
          </div>
        </div>

        <div className="insight-box" style={{ marginTop: '1.5rem' }}>
          <h4>Channel Insights</h4>
          <p>
            Organic Search dominates at 57.92% of sessions, validating the SEO strategy. Direct traffic at 35.94% indicates strong brand recall. Organic Social at only 3.13% highlights an opportunity — LinkedIn and other channels can drive significantly more traffic with consistent content.
          </p>
        </div>
      </section>

      <div className="section-divider"></div>

      <section id="jan-ga-ga-countries" className="section">
        <h2>Traffic by Country – Google Analytics 4</h2>
        <div className="image-container">
          <img
            src="/Traffic_Acquisition_By_Country.png"
            alt="Traffic Acquisition By Country - GA4"
            className="dashboard-image"
          />
        </div>

        <div className="country-table" style={{ marginTop: '1.5rem' }}>
          <div className="country-table-header">
            <span>Country</span>
            <span>Active Users</span>
            <span>New Users</span>
            <span>Engagement Rate</span>
            <span>Avg Engagement Time</span>
          </div>
          <div className="country-row">
            <span>India</span>
            <span>264 (38.94%)</span>
            <span>231 (36.21%)</span>
            <span>62.91%</span>
            <span>2m 01s</span>
          </div>
          <div className="country-row">
            <span>United States</span>
            <span>199 (29.35%)</span>
            <span>198 (31.03%)</span>
            <span>68.22%</span>
            <span>14s</span>
          </div>
          <div className="country-row">
            <span>United Kingdom</span>
            <span>15 (2.21%)</span>
            <span>15 (2.35%)</span>
            <span>68.42%</span>
            <span>1m 18s</span>
          </div>
          <div className="country-row">
            <span>China</span>
            <span>13 (1.92%)</span>
            <span>13 (2.04%)</span>
            <span>13.33%</span>
            <span>0s</span>
          </div>
          <div className="country-row">
            <span>Russia</span>
            <span>13 (1.92%)</span>
            <span>11 (1.72%)</span>
            <span>72.22%</span>
            <span>42s</span>
          </div>
          <div className="country-row">
            <span>Brazil</span>
            <span>9 (1.33%)</span>
            <span>9 (1.41%)</span>
            <span>45.45%</span>
            <span>1m 10s</span>
          </div>
          <div className="country-row">
            <span>Canada</span>
            <span>8 (1.18%)</span>
            <span>7 (1.1%)</span>
            <span>46.15%</span>
            <span>51s</span>
          </div>
          <div className="country-row">
            <span>Germany</span>
            <span>8 (1.18%)</span>
            <span>8 (1.25%)</span>
            <span>40%</span>
            <span>15s</span>
          </div>
          <div className="country-row">
            <span>France</span>
            <span>7 (1.03%)</span>
            <span>7 (1.1%)</span>
            <span>69.23%</span>
            <span>5m 50s</span>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      <div className="subsub-accordion-wrapper">
        <button
          className={`subsub-accordion-trigger ${seoOpen ? 'active' : ''}`}
          onClick={() => setSeoOpen(!seoOpen)}
        >
          <span className="subsub-accordion-icon">SEO</span>
          <span className="subsub-accordion-label">Key SEO Findings & Recommendations</span>
          <span className="subsub-accordion-chevron">{seoOpen ? '−' : '+'}</span>
        </button>

        {seoOpen && (
          <div className="subsub-accordion-body">

            <div className="seo-subsection">
              <button
                className={`seo-toggle ${whatsWorkingOpen ? 'active' : ''}`}
                onClick={() => setWhatsWorkingOpen(!whatsWorkingOpen)}
              >
                <span>What's Working</span>
                <span>{whatsWorkingOpen ? '−' : '+'}</span>
              </button>
              {whatsWorkingOpen && (
                <div className="seo-toggle-content">
                  <ul className="seo-list">
                    <li>Organic search drives <strong>57.92% of all website sessions</strong> — the SEO strategy is working and compounding month-over-month</li>
                    <li>Technical blog content (<em>cathodic disbondment</em>, <em>paint technology</em>) is generating significant search impressions globally, validating the topical authority approach</li>
                    <li>LinkedIn follower growth remains steady (+25 followers) with consistent technical content on CNSL chemistry and bio-based coatings attracting a niche professional audience</li>
                    <li>LinkedIn CTR is improving on technical posts, particularly those linking back to website content</li>
                    <li>Session quality is high — <strong>59.38% engagement rate</strong> and average engagement time of <strong>1m 15s</strong> indicate visitors are consuming content meaningfully</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="seo-subsection">
              <button
                className={`seo-toggle ${opportunitiesOpen ? 'active' : ''}`}
                onClick={() => setOpportunitiesOpen(!opportunitiesOpen)}
              >
                <span>Opportunities & Recommended Actions</span>
                <span>{opportunitiesOpen ? '−' : '+'}</span>
              </button>
              {opportunitiesOpen && (
                <div className="seo-toggle-content">
                  <h4 className="seo-section-heading">SEO Priority Actions</h4>
                  <ol className="seo-ordered-list">
                    <li><strong>URGENT — Meta title & description optimisation</strong> for "paint technology" and "cathodic disbondment" queries. These pages rank well but CTR is underperforming. A/B test title formats that include benefit-driven language.</li>
                    <li><strong>US Market CTR optimisation</strong> — 21,787 impressions but only 35 clicks signals a relevance mismatch. Consider US-specific landing pages or localised meta content that speaks to American industry terminology.</li>
                    <li><strong>FAQ schema markup</strong> on technical how-to articles to capture rich snippets in SERP and drive higher click-through from informational queries.</li>
                    <li><strong>Internal linking</strong> between related technical articles to distribute page authority and increase time-on-site from organic visitors.</li>
                    <li><strong>Philippines market opportunity</strong> — 1,457 impressions with only 5 clicks. This emerging market shows demand; create targeted content or landing pages for Southeast Asian industrial buyers.</li>
                  </ol>

                  <h4 className="seo-section-heading" style={{ marginTop: '1.75rem' }}>Recommended Content Focus</h4>
                  <div className="seo-content-table">
                    <div className="seo-table-header">
                      <span>Priority</span>
                      <span>Action</span>
                      <span>Platform</span>
                      <span>Expected Impact</span>
                    </div>
                    <div className="seo-table-row high">
                      <span className="priority-badge high">High</span>
                      <span>Optimise meta titles for "paint technology" queries</span>
                      <span>Website</span>
                      <span>+40–60% CTR improvement</span>
                    </div>
                    <div className="seo-table-row high">
                      <span className="priority-badge high">High</span>
                      <span>Create US-targeted technical landing pages</span>
                      <span>Website</span>
                      <span>Capture large US impression pool</span>
                    </div>
                    <div className="seo-table-row high">
                      <span className="priority-badge high">High</span>
                      <span>Add FAQ schema markup to technical articles</span>
                      <span>Website</span>
                      <span>Rich snippets in SERP</span>
                    </div>
                    <div className="seo-table-row medium">
                      <span className="priority-badge medium">Medium</span>
                      <span>Publish Philippines-focused industry content</span>
                      <span>Website / LinkedIn</span>
                      <span>New market penetration</span>
                    </div>
                    <div className="seo-table-row medium">
                      <span className="priority-badge medium">Medium</span>
                      <span>Develop "How-to" and "What is" query content</span>
                      <span>Website</span>
                      <span>Capture informational search traffic</span>
                    </div>
                    <div className="seo-table-row medium">
                      <span className="priority-badge medium">Medium</span>
                      <span>Increase video content on CNSL technology</span>
                      <span>LinkedIn</span>
                      <span>Higher engagement rates</span>
                    </div>
                    <div className="seo-table-row low">
                      <span className="priority-badge low">Low</span>
                      <span>Launch employee advocacy programme</span>
                      <span>LinkedIn</span>
                      <span>Organic reach amplification</span>
                    </div>
                    <div className="seo-table-row low">
                      <span className="priority-badge low">Low</span>
                      <span>Publish customer success stories</span>
                      <span>LinkedIn / Website</span>
                      <span>Trust and conversion signals</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="seo-subsection">
              <button
                className={`seo-toggle ${technicalOpen ? 'active' : ''}`}
                onClick={() => setTechnicalOpen(!technicalOpen)}
              >
                <span>Technical SEO Findings</span>
                <span>{technicalOpen ? '−' : '+'}</span>
              </button>
              {technicalOpen && (
                <div className="seo-toggle-content">
                  <div className="seo-findings-grid">
                    <div className="seo-finding-card critical">
                      <div className="seo-finding-badge">Critical Issues</div>
                      <ul className="seo-list">
                        <li>Missing or weak meta descriptions on key technical pages — these pages are visible in SERPs but failing to convert impressions to clicks</li>
                        <li>Internal linking structure needs improvement — technical articles are siloed with limited cross-linking, reducing crawl depth and page authority distribution</li>
                        <li>Page load speed on mobile devices requires optimisation — large images on technical content pages are slowing Time to Interactive</li>
                      </ul>
                    </div>
                    <div className="seo-finding-card moderate">
                      <div className="seo-finding-badge">Moderate Issues</div>
                      <ul className="seo-list">
                        <li>Image alt text optimisation needed — many product and technical diagrams lack descriptive alt attributes, limiting image search visibility</li>
                        <li>Schema markup absent on most pages — structured data (Article, Product, FAQ) would improve SERP appearance and click-through rates</li>
                        <li>URL structure could be more SEO-friendly — some pages use dynamic or non-descriptive URLs that limit keyword signalling</li>
                      </ul>
                    </div>
                    <div className="seo-finding-card positive">
                      <div className="seo-finding-badge">Positive Signals</div>
                      <ul className="seo-list">
                        <li>Core Web Vitals performing well — LCP, FID, and CLS scores are within acceptable ranges for desktop users</li>
                        <li>HTTPS implementation is secure and correctly configured across all pages</li>
                        <li>Sitemap and robots.txt are properly set up, ensuring full crawlability by Google and Bing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>

    </div>
  );
}

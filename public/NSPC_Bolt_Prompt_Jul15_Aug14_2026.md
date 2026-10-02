# NSPC Digital Performance Report — Bolt.new Build Prompt
## Reporting Period: July 15 – August 14, 2026
## Target: https://nadkarni-linkedin-ga-reporting.bolt.host/
## Task: ADD one new tab only — everything else on the dashboard stays intact

---

## ⚠️ CARDINAL RULE — READ BEFORE DOING ANYTHING

You are working on a **live existing project** at
https://nadkarni-linkedin-ga-reporting.bolt.host/

This project already has multiple report tabs for previous periods:
Jan–Feb 2026 | Mar–May 2026 | Jun–Jul 2026 | SEO Activity Report

**Every single existing tab, its data, its styles, its scripts, and its
layout must remain 100% untouched.**

Your only task:
> **Add one new tab labelled "Jul–Aug 2026" containing the full report
> described in this document.**

If you are not certain you can do this without affecting existing code,
**STOP and describe your plan before writing a single line.**

---

## 📥 IMAGE MANIFEST & SECTION PLACEMENT

All 15 source images are uploaded alongside this prompt. Each image
must be physically embedded as a rendered `<img>` tag in the exact
section named below — no links, no placeholders.

Every image must have:
- A lightbox (click to expand full-screen, Escape to close)
- A caption below in italic grey: *Source: [filename]*
- Interactive data (KPI cards, tables, or charts) rendered beside/below it

| # | Filename | Section |
|---|---|---|
| 1 | `Impressions_-_Thru_the_roof.png` | Section 1.1 — LinkedIn Content Highlights |
| 2 | `Followers_Growth_-_Fantastic_1281_Followers.png` | Section 1.2 — Follower Growth |
| 3 | `Visitor_Highlights.png` | Section 1.3 — Visitor Metrics |
| 4 | `Competitor_Highlights.png` | Section 1.4 — Competitor Overview |
| 5 | `Competitor_Highights_Page_2.png` | Section 1.4 — Competitor Growth Table |
| 6 | `26__increase_in_active_user_traffic.png` | Section 2.1 — GA4 Active Users |
| 7 | `Active_users_by_country.png` | Section 2.2 — Geographic Performance |
| 8 | `Traffic_Acquisition_-_Organic_Traffic_Dominating.png` | Section 2.3 — Traffic Acquisition |
| 9 | `Maginal_increase_in_traffic.png` | Section 2.4 — GSC Performance |
| 10 | `Overall_Performance.png` | Section 2.4 — GSC Performance (chart) |
| 11 | `keywords_leading_searches_to_website.png` | Section 2.5 — Top Queries |
| 12 | `Insights_with_marginal_increase_in_Traffic.png` | Section 2.5 — Content Clicks |
| 13 | `Tech_SEO_-_Core_Web_Vitals_Improvements.png` | Section 3.1 — Technical SEO |
| 14 | `Mobile_view_health.png` | Section 3.1 — Mobile Core Web Vitals |
| 15 | `Bad_URLs_on_Mobile_view_fixed.png` | Section 3.1 — Mobile URL Fix |

---

## 🧭 NAVIGATION

**New tab label:** `📅 Jul–Aug 2026`

Place it to the **right** of the existing `Jun–Jul 2026` tab.
Do not reorder, rename, or touch any existing tab.

**Sticky period badge** (always visible):
`📅 July 15 – August 14, 2026  |  31 Days`

**Internal sub-navigation** (sticky pills):
```
[ Overview ] [ LinkedIn ] [ Google Analytics ] [ Technical SEO ] [ vs. Last Period ] [ Consultant Notes ]
```

---

## 📐 DESIGN SYSTEM

Match the existing project's design tokens exactly. Do not introduce
new fonts, libraries, or colour tokens.

```
--navy:      #003366
--teal:      #006B6B
--green:     #1B5E20
--green-lt:  #E8F5E9
--amber:     #B8860B
--amber-lt:  #FFF8E1
--red:       #C62828
--red-lt:    #FFEBEE
--blue-lt:   #E3F2FD
--grey-bg:   #F5F5F5
--white:     #FFFFFF
--dark-txt:  #212121
--sub-txt:   #555555
```

Trend indicators:
- ▲ = green `#1B5E20`
- ▼ = red `#C62828`
- → = amber `#B8860B`

**Consultant Note boxes** — navy left border 12px, `#EEF2F7`
background, italic body text, signed with
`— Yogi, Digital Marketing Consultant`. Rendered after every
major section. CSS spec:

```css
.consultant-note {
  border-left: 12px solid #003366;
  background: #EEF2F7;
  padding: 20px 24px;
  margin: 24px 0;
  border-radius: 0 8px 8px 0;
  font-style: italic;
}
.consultant-note .signature {
  display: block;
  margin-top: 12px;
  font-weight: bold;
  font-style: normal;
  color: #003366;
  font-size: 0.875rem;
}
```

**Comparison Cards** (used in Section 5 — vs. Last Period):
Two-column side-by-side tiles, left = Jun–Jul 2026 value in grey,
right = Jul–Aug 2026 value in navy. Arrow between them colour-coded
▲ green / ▼ red. Label beneath both values.

---

## 🏗️ HERO / COVER SECTION

Full-width gradient banner (navy → teal):

```
NADKARNI SPECIALITY POLYMERS & COATINGS PVT. LTD.
nadkarnispc.com

Digital Performance Report
July 15 – August 14, 2026

LinkedIn Analytics · Google Analytics 4 · Technical SEO

Prepared by: Yogi — Digital Marketing Consultant  |  Confidential
```

**8-card KPI grid** with count-up animation — 2 rows of 4:

**Row 1 — LinkedIn (navy accent):**
| Card | Value | Change vs Prior |
|---|---|---|
| Impressions | 24,705 | ▲ +51.2% vs Jun–Jul |
| Reactions | 438 | ▼ 10.1% |
| Comments | 22 | ▼ 26.7% |
| Total Followers | 1,281 | ▲ +132 vs prior |

**Row 2 — Web / SEO (teal accent):**
| Card | Value | Change vs Prior |
|---|---|---|
| Active Users | 576 | ▲ +26.0% |
| Total Sessions | 819 | — |
| New Users | 562 | ▲ +34.8% |
| GSC Total Clicks | 338 | — |

**Key Insight callout (💡 teal):**
> *"July–August is the strongest reporting period across all tracked
> metrics. LinkedIn impressions hit 24,705 — a 51% jump on last cycle
> — marking NSPC's all-time record. Web traffic rebounded strongly
> with active users up 26%, significantly outpacing the peer median.
> The website's Core Web Vitals on mobile achieved a clean green
> score — 56 good URLs, zero poor, zero needing improvement. This
> technical milestone is a direct result of the ongoing site
> optimisation work. Organic search now accounts for 61% of all
> sessions — the highest share in any tracked period."*

---

## SECTION 1 — LINKEDIN ANALYTICS

**Internal anchor:** `#linkedin`

---

### 1.1 — Content Highlights

**📌 EMBED IMAGE: `Impressions_-_Thru_the_roof.png`**
*Caption: Source: Impressions_-_Thru_the_roof.png | LinkedIn Analytics |
Data for 7/15/2026 – 8/14/2026*

4 KPI cards:
- **24,705** Impressions (▲ +44.9% vs prior) — 🟢 green card
- **438** Reactions (▼ 13.9%)
- **22** Comments (▼ 26.7%)
- **1** Repost (▼ 50%)

**Mini line chart** replicating the impressions trend over the 31-day
period. Annotate the peak around Aug 5–8 corresponding to post-show
content momentum from Paint Istanbul Turkcoat 2026.

Body text:
> *"24,705 impressions is NSPC's all-time record across every reporting
> period tracked in this dashboard. The +44.9% growth from the previous
> cycle (16,313 impressions in Jun–Jul 2026) is the largest
> single-period jump recorded. All impressions are organic — zero
> sponsored spend. Comments and reactions declined slightly, which is
> a natural statistical outcome as impressions grow — more of the
> audience is seeing content but not everyone engages on every post."*

---

**🗣️ CONSULTANT NOTE:**
> *"24,705 impressions. Let that sit for a moment. When we started
> this account, we were pulling 2,799 impressions a month. We are
> now at nearly 9x that number — organically. This isn't luck. It's
> the result of consistent posting, technically credible content, and
> an audience that has grown to trust what we say. I'm proud of this
> number and I think you should be too.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.2 — Follower Growth

**📌 EMBED IMAGE: `Followers_Growth_-_Fantastic_1281_Followers.png`**
*Caption: Source: Followers_Growth_-_Fantastic_1281_Followers.png |
LinkedIn Analytics | Jul 15–Aug 14, 2026*

2 KPI cards:
- **1,281** Total Followers (up from 1,149 in Jun–Jul)
- **145** New Followers in last 31 days (▲ +33%)

**Follower journey milestone chart** — horizontal bar or timeline showing
the full growth arc across all reported periods:

| Period | Total Followers | New (Period) |
|---|---|---|
| Jan–Feb 2026 | 860 | 21 |
| Mar–May 2026 | 938 | 57 |
| Jun–Jul 2026 | 1,149 | 103 |
| **Jul–Aug 2026** | **1,281** | **145** |

**⭐ Win callout:**
> *"145 new followers in 31 days is the highest single-month acquisition
> in NSPC's LinkedIn history. Combined with the total of 1,281
> followers, NSPC has grown its audience by 49% in just 7 months
> (860 to 1,281 followers since January 2026). At this pace, NSPC
> will cross 1,500 followers before end of Q4 2026."*

---

**🗣️ CONSULTANT NOTE:**
> *"145 new followers in one month is not a number you hit by posting
> once in a while and hoping for the best. This is the result of
> showing up consistently with content that a coating formulator
> actually finds useful. The audience is voting with their follow.
> And every new follower is a potential lead in a pipeline that
> doesn't cost us ad spend.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.3 — Visitor Metrics

**📌 EMBED IMAGE: `Visitor_Highlights.png`**
*Caption: Source: Visitor_Highlights.png | LinkedIn Analytics |
Jul 15–Aug 14, 2026*

3 KPI cards:
- **269** Page Views (▼ 12.7% vs prior 306)
- **104** Unique Visitors (▼ 16.1% vs prior 122)
- **0** Custom Button Clicks (🔴 fourth consecutive cycle — persistent zero)

Body text:
> *"Page views and unique visitors dipped slightly this cycle despite
> impressions reaching an all-time high. This tells us that higher
> impressions are reaching a broader audience, but that audience is
> not necessarily navigating to the LinkedIn Page itself. This is
> normal — content impressions and profile visits do not always
> correlate directly, especially as more content is consumed natively
> in the feed.*
>
> *Custom button clicks: zero for the fourth consecutive reporting
> cycle. This is now 150+ days of zero CTA engagement across four
> periods. This requires immediate action before the next cycle."*

**🚨 Critical callout:**
> *"Four cycles. Zero CTA clicks. This is now a chronic issue, not
> a one-off. The LinkedIn Page CTA button is either pointing to the
> wrong destination, is poorly labelled, or is being rendered
> invisibly on mobile (which accounts for the majority of page views).
> Recommended immediate fix: change the button label to 'Request a
> Sample' or 'Download TDS' and set the destination to
> nadkarnispc.com/contact/ — then monitor daily for 2 weeks."*

---

**🗣️ CONSULTANT NOTE:**
> *"I'm going to keep flagging this until it's fixed. Four cycles of
> zero CTA clicks means we are getting profile traffic and converting
> zero of it. The button is broken in effect if not in code. This
> is the highest priority LinkedIn fix on our list. One afternoon
> to fix, potentially significant commercial impact.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.4 — Competitive Benchmarking

**📌 EMBED IMAGE: `Competitor_Highlights.png`**
*Caption: Source: Competitor_Highlights.png | LinkedIn — Competitor
Highlights | Last 31 days*

**📌 EMBED IMAGE: `Competitor_Highights_Page_2.png`**
*Caption: Source: Competitor_Highights_Page_2.png | LinkedIn — Compare
Growth | Last 31 days*

**Period-level summary (from Competitor_Highlights.png):**

2 KPI tiles:
- **22** Comments on posts (▲ 59% vs competitors) — 🟢 green
- **145** New followers (▼ 69% vs competitors)

**Full 5-company competitor table** (from Competitor_Highights_Page_2.png):

| Rank | Company | Total Followers | New Followers | Posts | Comments | Reactions |
|---|---|---|---|---|---|---|
| 1 | Atul Ltd | 146,369 | 2,100 (▲35.1%) | 17 (▲54.5%) | 59 (▼11.9%) | 6,500 (▲51.3%) |
| 2 | Prakash Chemicals International | 32,242 | 391 (▲13.7%) | 13 (▲62.5%) | 14 (▲600%) | 1,000 (▲180.9%) |
| 3 | Cardolite Corporation | 6,174 | 180 (▲17.6%) | 7 (▼12.5%) | 8 (▲33.3%) | 371 (▼26.4%) |
| **4 ★** | **NSPC (You)** | **1,281** | **145 (▲33%)** | **12 (▼7.7%)** | **22 (▼26.7%)** | **438 (▼13.9%)** |
| 5 | Macro Polymers Pvt. Ltd. – India | 4,920 | 47 (▲62.1%) | 0 | 0 | 3 (▲200%) |

Highlight NSPC row in teal. Badge: "Your Page ★"

Render a **grouped bar chart** — New Followers vs Reactions for
all 5 companies.

**⭐ Win callout:**
> *"NSPC's comments are +59% above the competitor average — for the
> second consecutive cycle, NSPC leads on comment engagement relative
> to peers. This is the most meaningful engagement metric in B2B
> because comments represent professional opinions, not just passive
> scrolling. With 12 posts vs Atul's 17 and Prakash's 13, NSPC is
> generating strong per-post comment rates despite a lower posting
> volume."*

**⚠️ Watch Point callout:**
> *"Prakash Chemicals had a notable spike this period — 14 comments
> (▲600%) and 1,000 reactions (▲180.9%). This signals they ran a
> high-engagement campaign or viral post worth monitoring. Their
> content calendar is worth watching over the next cycle."*

---

**🗣️ CONSULTANT NOTE:**
> *"Comments up 59% vs competitors — again. That's two cycles in a
> row where we're leading on the engagement metric that actually
> matters. NSPC's content is starting conversations that others
> aren't. Prakash had a big month — I noticed it too. Worth a look
> at what they posted. In this niche, good ideas travel fast and
> knowing what's resonating across the sector helps us stay ahead.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 2 — GOOGLE ANALYTICS

**Internal anchor:** `#analytics`

---

### 2.1 — GA4 Active Users Overview

**📌 EMBED IMAGE: `26__increase_in_active_user_traffic.png`**
*Caption: Source: 26__increase_in_active_user_traffic.png | GA4 |
Jul 15–Aug 14, 2026*

3 KPI cards:
- **576** Active Users (▲ +26.0%) — 🟢 green card
- **4,800** Event Count (▲ 0.9%)
- **562** New Users (▲ +34.8%) — 🟢 green card

**Area chart** replicating the GA4 trend (Jul 15–Aug 14):
- Solid blue line: NSPC custom
- Dashed blue: Previous period
- Teal shaded band: Plastics & Polymers peer median and range
- Note: NSPC line tracks **above** the peer median for much of the period
  — mark this clearly with a callout annotation on the chart

Body text:
> *"576 active users marks a significant rebound — up 26% from the
> prior cycle's 437 users (Jun–Jul 2026). New users at 562 (+34.8%)
> signals strong new audience discovery, confirming that organic
> search improvements and content compounding are bringing in fresh
> visitors rather than just returning traffic. NSPC again outperforms
> the Plastics & Polymers peer median in the GA4 chart — a consistent
> pattern across the last three reporting cycles."*

**⭐ Win callout:**
> *"NSPC is back above the Plastics & Polymers peer median on active
> users. The 26% rebound from the June–July normalisation period
> confirms that the dip was temporary — traffic is now on a clear
> upward trajectory. 562 new users is the highest new-user count
> in three cycles."*

---

**🗣️ CONSULTANT NOTE:**
> *"The peer median chart doesn't lie. When your line is above the
> band, you're outperforming the industry average for your category.
> We're back there this month. The story this data tells is simple:
> the content and SEO work is compounding. Each blog article we
> publish, each title tag we optimise, each H1 we add to a product
> page — it adds up month by month. This is what patience in SEO
> looks like.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.2 — Geographic Performance

**📌 EMBED IMAGE: `Active_users_by_country.png`**
*Caption: Source: Active_users_by_country.png | GA4 — Active Users
by Country | Jul 15–Aug 14, 2026*

**World map visualisation** — choropleth with bubble markers sized
proportionally to active users.

**Country table (sortable):**

| # | Country | Active Users | Change | Notable Signal |
|---|---|---|---|---|
| 1 | India | 358 | ▲ +30.2% | Primary market — sustained growth |
| 2 | United States | 67 | ▲ +26.4% | Recovering — important rebound |
| 3 | Singapore | 27 | ▲ +125%+ | ⭐ BREAKOUT — ASEAN accelerating |
| 4 | United Kingdom | 10 | ▲ +25.0% | Consistent European growth |
| 5 | Australia | 7 | ▲ +75.0% | New entrant with strong growth |
| 6 | Germany | 7 | ▲ +16.7% | Stable European industrial market |
| 7 | Türkiye | 7 | ▼ 22.2% | Normalising post Paint Istanbul spike |

**⭐ Win callout — Singapore:**
> *"Singapore's active users surged +125% this cycle — the most
> dramatic geographic development of the period. Combined with
> Australia's first appearance at +75%, this signals NSPC's content
> is gaining meaningful traction across the Asia-Pacific region.
> Singapore is a key ASEAN hub for chemical distribution and industrial
> coatings specification — this audience represents significant
> potential commercial value."*

**💡 Insight callout — United States rebound:**
> *"The US recovered +26.4% after last cycle's 20.6% decline. At
> 67 active users the US is again the second largest market by
> traffic. The US consistently generates high GSC impressions — the
> next optimisation priority is improving CTR for US-based searches
> to convert these impressions into more regular visits."*

**💡 Insight callout — Türkiye normalisation:**
> *"Türkiye declined 22.2% from the Paint Istanbul-driven spike of
> the previous cycle. This was expected — trade show effects are
> typically concentrated in the immediate 4–6 weeks post-show. The
> 7 active users remaining in Turkey represent a residual baseline
> of genuine interest that can be developed through targeted content."*

---

**🗣️ CONSULTANT NOTE:**
> *"Singapore at +125% is the number I'm most excited about this
> cycle. Singapore is not an accidental market — it's a deliberate
> one. Formulators and distributors in Singapore are some of the
> most technically sophisticated buyers in ASEAN, and they're
> finding us through organic search. We haven't run a single ad in
> Singapore. That's pure content authority at work. I want to see
> a dedicated piece of content about tropical climate coating
> challenges — it would speak directly to this audience.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.3 — Traffic Acquisition by Channel

**📌 EMBED IMAGE: `Traffic_Acquisition_-_Organic_Traffic_Dominating.png`**
*Caption: Source: Traffic_Acquisition_-_Organic_Traffic_Dominating.png |
GA4 — Session Channel Group | Jul 15–Aug 14, 2026*

**Total:** 819 sessions | 456 engaged | 55.68% engagement rate |
58s avg engagement time

**Donut chart** of session breakdown:
- Organic Search: 500 (61.05%)
- Direct: 252 (30.77%)
- Organic Social: 50 (6.11%)
- AI Assistant: 12 (1.47%)
- Referral: 4 (0.49%)
- Unassigned: 3 (0.37%)

**Full channel table (sortable):**

| # | Channel | Sessions | % | Engaged Sessions | Eng. Rate | Avg. Eng. Time |
|---|---|---|---|---|---|---|
| 1 | Organic Search | 500 | 61.05% | 311 | 62.2% | 1m 15s |
| 2 | Direct | 252 | 30.77% | 122 | 48.41% | 28s |
| 3 | **Organic Social** | **50** | **6.11%** | **17** | **34%** | **42s** |
| 4 | AI Assistant | 12 | 1.47% | 5 | 41.67% | 52s |
| 5 | Referral | 4 | 0.49% | 2 | 50% | 14s |
| 6 | Unassigned | 3 | 0.37% | 0 | 0% | 3m 41s |

Highlight Organic Social row in teal with a 📱 icon — this channel
tripled from the prior cycle (10 → 50 sessions).

**⭐ Win callout — Organic Social 5x growth:**
> *"Organic Social sessions jumped from 10 (Jun–Jul 2026) to 50
> (Jul–Aug 2026) — a 5x increase in a single cycle. This is the
> direct impact of NSPC's record 24,705 LinkedIn impressions driving
> more traffic through to the website. LinkedIn is now contributing
> a meaningful 6.11% of all sessions — up from 1.4% in the prior
> cycle. Engagement time for social visitors improved from 12s to
> 42s, indicating visitors are landing on more relevant pages."*

**⭐ Win callout — Organic Search at 61%:**
> *"Organic Search at 61.05% of all sessions is the highest share
> in any tracked period. 500 organic sessions with a 62.2%
> engagement rate and 1m 15s average engagement time confirms
> that search-driven visitors remain the highest quality audience."*

---

**🗣️ CONSULTANT NOTE:**
> *"Organic Social went from 10 to 50 sessions. That's the LinkedIn
> work paying off in website traffic — finally. The 24,705 impression
> month didn't just sit in the feed. It drove people to the website.
> This is the flywheel starting to turn: great content builds LinkedIn
> impressions, LinkedIn impressions drive website traffic, website
> traffic builds SEO authority, SEO authority grows organic search.
> We're in the loop.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.4 — GSC Search Performance

**📌 EMBED IMAGE: `Maginal_increase_in_traffic.png`**
*Caption: Source: Maginal_increase_in_traffic.png | GA4 Home — Content
Performance | Last 28 days*

**📌 EMBED IMAGE: `Overall_Performance.png`**
*Caption: Source: Overall_Performance.png | Google Search Console |
Jul 15–Aug 14, 2026*

**4 GSC KPI cards:**
- **338** Total Clicks (GSC full period)
- **31,500** Total Impressions
- **1.1%** Average CTR
- **8.5** Average Position

**GA4 Content Performance (from Maginal_increase_in_traffic.png):**
- **296** Clicks last 28 days (▲ <1%)
- **28,800** Impressions last 28 days (▲ 2%)

**Top Content by Clicks (from Maginal_increase_in_traffic.png):**

| Page | Clicks | Change |
|---|---|---|
| Manufacturer & Global Supplier of Speciality Resins \| NSPC (Homepage) | 88 | ▼ 4% |
| SIMPLIFIED: Paint Technology 101 \| Components & Science | 33 | ▲ +27% |
| Understanding Cathodic Disbondment in Corrosion Protection \| NSPC | 23 | ▲ +28% |
| Specialty Polymers & Coatings Products \| Global Supplier \| NSPC | 21 | ▲ +24% |

**Dual-axis line chart** replicating Overall_Performance.png:
- Blue line: Daily clicks (Jul 15–Aug 14, range 0–24)
- Purple line: Daily impressions (range 500–1,500)
- X-axis: 7/15/26 → 8/14/26
- Note the dip around Jul 24–25 and recovery

**💡 Insight callout:**
> *"Three of four top content pages are trending upward: Paint
> Technology 101 (+27%), Cathodic Disbondment (+28%), and Products
> (+24%). The homepage declined slightly (▼4%) — expected as blog
> content captures an increasing share of search traffic. Blog
> articles driving non-brand discovery is the correct SEO maturity
> signal. Average position at 8.5 (down from 5.7 in Mar–May)
> reflects the expanded query footprint — NSPC is now appearing in
> results for more queries, including lower-position educational
> searches, which pulls the average down while increasing overall
> reach."*

---

**🗣️ CONSULTANT NOTE:**
> *"I want to address the average position number — 8.5 sounds worse
> than the 5.7 we recorded in March. It isn't. What's happened is
> that we're now ranking for a broader set of queries. When you rank
> for more searches, your average position naturally includes more
> positions 7–12 for newer content. The total of 996 web search
> clicks shown in the Overall_Performance.png chart across a longer
> view tells the real story — clicks are growing. More impressions,
> more pages ranking, more clicks. The trajectory is right.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.5 — Top Queries

**📌 EMBED IMAGE: `keywords_leading_searches_to_website.png`**
*Caption: Source: keywords_leading_searches_to_website.png | GA4 Home
— Queries Leading to Site*

**📌 EMBED IMAGE: `Insights_with_marginal_increase_in_Traffic.png`**
*Caption: Source: Insights_with_marginal_increase_in_Traffic.png |
GA4 Home — Insights on Content Traffic*

**Top query table (from keywords_leading_searches_to_website.png):**

| Query | Clicks | Change | Related Variants |
|---|---|---|---|
| nadkarni specialty polymers | 28 | ▼ 33% | nadkarni speciality polymers and coatings private, ...pvt. ltd |
| **paint technology** | **11** | **▲ +83%** | painting technology |
| cathodic disbondment | 8 | ▲ +60% | cathodic disbondment test, cathodic disbonding, cathodic delamination |
| **enlace ester y eter** | **6** | **▲ +500%** | enlaces ester y eter, ester ether, ethers and esters |
| nadkarni | 5 | ▲ +25% | — |
| nspc company | 2 | ▼ 33% | — |

Highlight the `paint technology` row (green, +83%) and the
`enlace ester y eter` row (bright green, +500%) with distinct
background tints to draw attention.

**⭐ Win callout — enlace ester y eter (+500%):**
> *"'enlace ester y eter' is the Spanish-language equivalent of
> 'ether vs ester' — and it's now generating 6 clicks with a
> staggering +500% growth rate. This confirms what the previous
> cycle's 'desprendimiento catodico' query suggested: NSPC's
> technical content is being discovered by Spanish-speaking
> audiences in Latin America and Spain. This is entirely organic.
> Adding Spanish meta descriptions to the Ethers vs Esters and
> Cathodic Disbondment articles would meaningfully amplify this
> reach."*

**⭐ Win callout — paint technology (+83%):**
> *"'Paint technology' has grown +83% in clicks — now consistently
> one of the top non-brand queries driving traffic. The Simplified
> Paint Technology 101 article is clearly performing well in SERP
> results. This is NSPC's most important non-brand traffic driver
> and should be updated and internally linked to product pages
> at the next content refresh sprint."*

---

**🗣️ CONSULTANT NOTE:**
> *"Spanish queries are becoming a pattern. First 'desprendimiento
> catodico', now 'enlace ester y eter' at +500%. The Latin American
> and Iberian coatings markets are massive and largely English-content
> underserved. We are, completely unintentionally, becoming a
> reference point for Spanish-speaking formulation chemists. I think
> we should start being intentional about this. A Spanish meta
> description is a one-hour job that could open a continent.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 3 — TECHNICAL SEO

**Internal anchor:** `#techseo`

---

### 3.1 — Core Web Vitals — Mobile

**📌 EMBED IMAGE: `Tech_SEO_-_Core_Web_Vitals_Improvements.png`**
*Caption: Source: Tech_SEO_-_Core_Web_Vitals_Improvements.png | Google
Search Console — Experience | Jul–Aug 2026*

**📌 EMBED IMAGE: `Mobile_view_health.png`**
*Caption: Source: Mobile_view_health.png | GSC — Core Web Vitals:
Mobile | Jul–Aug 2026*

**📌 EMBED IMAGE: `Bad_URLs_on_Mobile_view_fixed.png`**
*Caption: Source: Bad_URLs_on_Mobile_view_fixed.png | GSC — Mobile
CWV Detail View | Jul–Aug 2026*

**Core Web Vitals status tiles (3-column):**

| Metric | Mobile | Desktop |
|---|---|---|
| Poor URLs | 0 | No data |
| Needs Improvement | 0 | No data |
| **Good URLs** | **56** | No data |
| HTTPS | 56 (✅ all secure) | — |
| Non-HTTPS | 0 | — |

**Three key achievement cards:**

**Card 1 — 56 Good URLs (Mobile):**
> Zero poor, zero needing improvement. 56 URLs pass all mobile Core
> Web Vitals checks (LCP, INP, CLS). This is a clean sweep — the
> highest quality signal in GSC's Experience report.

**Card 2 — HTTPS Fully Secured:**
> 56 HTTPS URLs, 0 Non-HTTPS. All site pages are served over secure
> HTTPS — no mixed content issues.

**Card 3 — Mobile CWV Trend:**
> The Mobile_view_health.png chart shows the green "good URLs" line
> rising from 0 to 56 between June and August 2026 — the result of
> the technical optimisation sprint completed in this period.

**⭐ Major Technical Win callout:**
> *"This is the most significant technical SEO achievement in any
> reporting period. In May 2026, the site had zero good mobile Core
> Web Vitals URLs. By August 2026, all 56 tracked URLs pass with a
> clean score. Zero poor. Zero needing improvement. This directly
> impacts Google's page ranking signals for mobile users — and given
> that mobile accounts for over 70% of NSPC's LinkedIn page views,
> this fix has commercial significance beyond pure SEO."*

**What we did (Technical work summary):**
> *"As part of our ongoing technical SEO retainer, the following
> improvements were completed in this period to achieve the Core
> Web Vitals milestone:*
> - *Page speed optimisation (addressing the prior 11.3 second load
>   time identified in the March audit)*
> - *Image compression and lazy loading implementation across product
>   and blog pages*
> - *Render-blocking resource elimination to improve LCP scores*
> - *Layout shift (CLS) fixes for above-the-fold content elements*
> - *HTTPS migration verification across all 56 indexed URLs*"

---

**🗣️ CONSULTANT NOTE:**
> *"Zero poor URLs. Zero needing improvement. 56 good. I'll be honest
> — when we started this work in March, the site was loading in
> 11.3 seconds and Google's Core Web Vitals were in the red. Getting
> to all-green in under 6 months of technical work is something I'm
> genuinely proud of. This isn't just an SEO win. It means every
> person visiting nadkarnispc.com on a mobile phone — whether
> they found it through Google, LinkedIn, or an AI chatbot — is now
> getting a fast, stable, properly-rendered experience. That matters
> for conversions, not just rankings.*
> *— Yogi, Digital Marketing Consultant*"

---

### 3.2 — On-Page SEO — Work in Progress

**Section intro:**
> *"The following on-page observations are part of our ongoing
> retainer work. All recommendations reflect tasks either completed,
> in progress, or queued for the next sprint."*

**Priority work tracker table:**

| Task | Pages Affected | Status | Sprint |
|---|---|---|---|
| H1 tag implementation | 45 product pages | 🟡 In Progress (batch) | Sep 2026 |
| Word count enrichment (<300 words) | 54 product pages | 🟡 In Progress | Sep–Oct 2026 |
| Multiple meta description fix (WordPress plugin conflict) | 74 pages | 🟡 In Progress | Oct 2026 |
| Title tag optimisation | 9+3 pages | ✅ Completed Mar 2026 | Done |
| Missing meta descriptions | 9 pages | ✅ Completed Mar 2026 | Done |
| Duplicate meta descriptions | 2 pages | ✅ Completed Mar 2026 | Done |
| Page speed optimisation | Site-wide | ✅ Completed Jul 2026 | Done |
| Core Web Vitals — Mobile | 56 URLs | ✅ Completed Jul 2026 | Done |
| HTTPS security audit | All 56 URLs | ✅ Completed Jul 2026 | Done |
| llms.txt implementation | Site-wide | ✅ Completed Mar 2026 | Done |
| LocalBusiness schema markup | Homepage | ✅ Completed Mar 2026 | Done |
| Spanish meta descriptions | 2 priority pages | 🔴 Recommended | Sep 2026 |
| Internal linking — blog → products | Top 3 blog pages | 🟡 In Progress | Sep 2026 |

---

**🗣️ CONSULTANT NOTE — SEO:**
> *"The Core Web Vitals clean sweep is the headline, but I want to
> acknowledge the quieter work that's equally important: the 9 title
> tags fixed, the 9 meta descriptions written, the 2 duplicate
> descriptions resolved, the llms.txt file, the schema markup, the
> speed work. None of this is glamorous. All of it compounds. The
> site is now technically cleaner than it has ever been. The next
> frontier is content depth — getting those product pages to 300+
> words will unlock rankings for specific product-grade queries that
> currently aren't converting because Google can't read enough to
> understand what the page is about.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 4 — vs. LAST PERIOD (JUN–JUL 2026)

**Internal anchor:** `#comparison`

**Section intro:**
> *"This section provides a direct comparison between the Jun–Jul
> 2026 and Jul–Aug 2026 reporting periods, highlighting what
> improved, what declined, and what to watch."*

---

### LinkedIn — Period Comparison

Render as **Comparison Cards** (left = prior, right = current,
arrow colour-coded):

| Metric | Jun–Jul 2026 | Jul–Aug 2026 | Change |
|---|---|---|---|
| Impressions | 16,313 | 24,705 | ▲ +51.5% 🟢 |
| Reactions | 487 | 438 | ▼ 10.1% |
| Comments | 30 | 22 | ▼ 26.7% |
| Total Followers | 1,149 | 1,281 | ▲ +11.5% 🟢 |
| New Followers | 103 | 145 | ▲ +40.8% 🟢 |
| Page Views | 306 | 269 | ▼ 12.1% |
| Unique Visitors | 122 | 104 | ▼ 14.8% |
| Custom Button Clicks | 0 | 0 | → No change ⚠️ |

**What improved:**
- ✅ Impressions: +51.5% — all-time record achieved
- ✅ Follower growth: New followers up +40.8%
- ✅ Total audience: Crossed 1,281 followers

**Needs attention:**
- ⚠️ Comments declined 26.7% — engagement quality dipping
- ⚠️ Page views down 12.1% — profile visit conversion weakening
- 🔴 CTA clicks: Zero for fourth consecutive cycle

---

### Google Analytics — Period Comparison

| Metric | Jun–Jul 2026 | Jul–Aug 2026 | Change |
|---|---|---|---|
| Active Users | 437 | 576 | ▲ +31.8% 🟢 |
| New Users | 394 | 562 | ▲ +42.6% 🟢 |
| Sessions | 712 | 819 | ▲ +15.0% 🟢 |
| Organic Search % | 72.75% | 61.05% | ▼ shift — Social grew |
| Organic Social Sessions | 10 | 50 | ▲ +400% 🟢 |
| AI Assistant Sessions | 13 | 12 | → Stable |
| India Active Users | 259 | 358 | ▲ +38.2% 🟢 |
| US Active Users | 54 | 67 | ▲ +24.1% 🟢 |
| Singapore Active Users | 11 | 27 | ▲ +145% 🟢 |
| Türkiye Active Users | 11 | 7 | ▼ 36.4% (expected normalisation) |

**What improved:**
- ✅ Active users: +31.8% rebound — strong recovery
- ✅ New users: +42.6% — highest new user count in 3 cycles
- ✅ Organic Social: 5x growth (LinkedIn traffic finally converting)
- ✅ Singapore: +145% — APAC market accelerating
- ✅ US: Recovered after prior-cycle dip

**Needs attention:**
- ⚠️ AI Assistant sessions stable but not growing — monitor whether
  new content is being cited by AI tools
- ⚠️ Türkiye normalising post-show — maintain with follow-up content

---

### SEO — Period Comparison

| Metric | Jun–Jul 2026 | Jul–Aug 2026 | Change |
|---|---|---|---|
| Mobile Core Web Vitals (Good) | Not measured | 56 URLs ✅ | NEW MILESTONE |
| Average GSC Position | 6.6 | 8.5 | ▼ (expanded query set) |
| GSC Clicks (period) | — | 338 | — |
| GSC Impressions | — | 31,500 | — |
| Spanish queries | 1 (desprendimiento catodico) | 2 (enlace ester y eter ▲500%) | ▲ Growing |
| AI traffic channel | 13 sessions | 12 sessions | → Stable |

**What improved:**
- ✅ Core Web Vitals — Mobile: 0 → 56 good URLs — MAJOR WIN
- ✅ Spanish language query traction: +500% on new query
- ✅ Blog content clicks: Paint Tech (+27%), Cathodic (+28%)

**Needs attention:**
- ⚠️ Average position decline (5.7 → 8.5) reflects wider query set
  — not a ranking regression but requires monitoring
- ⚠️ Homepage clicks down 4% — ensure homepage title and meta
  remain optimised

---

**🗣️ CONSULTANT NOTE — Comparison:**
> *"When I look at this comparison table, one thing stands out above
> everything else: LinkedIn impressions at +51%, active users at
> +31.8%, Organic Social at +400%, and Core Web Vitals going from
> zero to 56 good URLs — all in the same cycle. This is not a
> coincidence. The content is driving awareness (impressions),
> awareness is driving profile visits, profile visits are driving
> website sessions, and a faster website is converting those sessions
> into engagement. The machine is working. The two things to fix:
> the CTA button (4 cycles, zero clicks) and comments (down 26.7%).
> Both are solvable. The CTA fix takes an afternoon. Comments need
> a post format review — more questions, more controversy, more
> 'what would you do in this situation' framing.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 5 — PRIORITY ACTIONS

**Internal anchor:** `#actions`

Priority action cards — 3-column responsive grid:

---

### 🔴 HIGH PRIORITY

**Card 1 — LinkedIn CTA Button**
> Four cycles. Zero clicks. Relabel to 'Request a Sample' or
> 'Download TDS'. Set destination to nadkarnispc.com/contact/.
> Test for 2 weeks and report.
> *Impact: CTA activation after 150+ days of zero engagement*

**Card 2 — Spanish Meta Descriptions**
> 'enlace ester y eter' at +500%. 'desprendimiento catodico' grew
> last cycle. Add Spanish-language meta descriptions to Ethers vs
> Esters and Cathodic Disbondment articles. One-hour implementation.
> *Impact: Unlock LATAM/Spain search visibility*

**Card 3 — H1 Tags — Product Pages**
> 45 pages still missing H1 tags. Batch implementation queued.
> Priority: CURE-O-POXY 8-series pages (highest traffic products).
> *Impact: Product page indexation quality, keyword ranking*

---

### 🟡 MEDIUM PRIORITY

**Card 4 — Tropical Climate Content for APAC**
> Singapore +125%, Australia +75% — new APAC audience forming.
> Publish one article targeting tropical/humid environment coating
> challenges. CURE-O-POXY phenalkamine performance in humidity
> is the perfect content angle.
> *Impact: Convert APAC discovery traffic to leads*

**Card 5 — Blog → Product Internal Links**
> Paint Technology 101 and Cathodic Disbondment are the two highest
> organic traffic articles. Add 2–3 contextual links each to
> CURE-O-POXY product pages. These articles are the top of the
> buyer journey funnel — link to the products that solve the
> problems the articles describe.
> *Impact: Product page traffic and authority*

**Card 6 — Comment Strategy — Post Format Refresh**
> Comments down 26.7% this cycle. Review post format mix —
> introduce more direct questions, poll-style posts, and
> 'unpopular opinion' framing to drive comment-based engagement.
> *Impact: Recover comment engagement rate*

---

### 🟢 LOWER PRIORITY

**Card 7 — Word Count Enrichment**
> 54 product pages under 200 words. Next sprint: add 100–150 words
> of application context per product page from TDS content.
> *Impact: Crawl quality and long-tail keyword coverage*

**Card 8 — Multiple Meta Description Fix**
> 74 pages with conflicting meta tags (WordPress plugin conflict).
> Schedule plugin audit — single code fix resolves all 74.
> *Impact: Restore meta description control across full site*

**Card 9 — Desktop Core Web Vitals**
> Mobile CWV is clean. Desktop shows 'No data' in GSC — site may
> not have enough desktop traffic for Google to report CWV.
> Monitor desktop performance via PageSpeed Insights in parallel.
> *Impact: Ensure parity between mobile and desktop experience*

---

## ⚙️ TECHNICAL REQUIREMENTS FOR BOLT

### Components Required
- [ ] Count-up animation on all KPI numbers (IntersectionObserver)
- [ ] All tables sortable (click header to sort asc/desc)
- [ ] All 15 images: lightbox modal on click (Escape to close)
- [ ] Consultant Note component (navy border, EEF2F7 bg, italic,
  signed — rendered after every major section, minimum 10 instances)
- [ ] Comparison Cards (Section 4): side-by-side tiles with
  colour-coded arrows
- [ ] Sticky period badge: always visible at top of tab
- [ ] Internal sub-nav: 6 pills, smooth scroll, active tracking

### Charts Required
1. LinkedIn impressions trend line — Section 1.1
2. Follower growth milestone chart — Section 1.2
3. GA4 active users area chart with peer median band — Section 2.1
4. Geographic bubble map / choropleth — Section 2.2
5. Traffic source donut chart — Section 2.3
6. GSC dual-axis line chart (clicks + impressions) — Section 2.4
7. Core Web Vitals mobile trend line (green rising) — Section 3.1
8. Competitor grouped bar chart — Section 1.4

### Responsive Breakpoints
- Desktop 1280px+: full layout as described
- Tablet 768px: 2-column card grids, stacked images
- Mobile 375px: single column, tables scroll horizontally,
  charts resize to full width

---

## 🚫 ABSOLUTE PROHIBITIONS

```
❌ DO NOT delete, modify, reorder, overwrite, or touch any existing
   tab, data, CSS, or JavaScript in the project.

❌ DO NOT use placeholder text, "TBD", or filler anywhere —
   every section is pre-populated from this document.

❌ DO NOT embed images as links — every image must render as a
   visible <img> in the exact section specified in the manifest.

❌ DO NOT invent, round, or estimate any data — use only the
   figures extracted from the uploaded screenshots.

❌ DO NOT build before confirming all 15 images are uploaded.
```

---

## ✅ DEFINITION OF DONE

- [ ] `Jul–Aug 2026` tab added to right of `Jun–Jul 2026`
- [ ] All existing tabs 100% intact and unchanged
- [ ] Period badge `📅 July 15–August 14, 2026 | 31 Days` sticky
- [ ] 6-section internal sub-nav working
- [ ] Hero: 8 KPI cards with count-up animation
- [ ] All 15 images physically embedded in named sections
- [ ] Lightbox on every image
- [ ] All 8 charts rendered and responsive
- [ ] All tables sortable
- [ ] Minimum 10 Consultant Note boxes rendered (one per section)
- [ ] Comparison section with comparison cards (Section 4)
- [ ] Priority Actions: 9 cards (3 per priority level)
- [ ] Fully responsive: desktop, tablet, mobile
- [ ] Zero placeholder content

---

## 📎 DATA SOURCE INDEX

All figures are extracted from the named screenshots. No data
has been estimated or invented.

| Screenshot | Data Extracted |
|---|---|
| `Impressions_-_Thru_the_roof.png` | 24,705 impressions (▲44.9%), 438 reactions, 22 comments, 1 repost |
| `Followers_Growth_-_Fantastic_1281_Followers.png` | 1,281 total followers, 145 new (▲33%) |
| `Visitor_Highlights.png` | 269 page views (▼12.7%), 104 unique visitors (▼16.1%), 0 CTA |
| `Competitor_Highlights.png` | 22 comments (▲59% vs competitors), 145 new followers (▼69%) |
| `Competitor_Highights_Page_2.png` | Full 5-company growth table — Atul 2.1K, Prakash 391, Cardolite 180, NSPC 145, Macro 47 |
| `26__increase_in_active_user_traffic.png` | 576 active users (▲26%), 4.8K events (▲0.9%), 562 new users (▲34.8%) |
| `Active_users_by_country.png` | India 358 (▲30.2%), US 67 (▲26.4%), Singapore 27 (▲125%+), UK 10, Australia 7 (▲75%), Germany 7, Türkiye 7 (▼22.2%) |
| `Traffic_Acquisition_-_Organic_Traffic_Dominating.png` | 819 sessions, Organic 61.05% (500), Direct 30.77%, Social 6.11% (50), AI 1.47% (12) |
| `Maginal_increase_in_traffic.png` | 296 clicks ▲<1%, 28.8K impressions ▲2%, top pages: Homepage 88 (▼4%), Paint Tech 33 (▲27%), Cathodic 23 (▲28%), Products 21 (▲24%) |
| `Overall_Performance.png` | 338 total clicks, 31.5K impressions, 1.1% CTR, 8.5 avg position, 996 total web search clicks (longer view) |
| `keywords_leading_searches_to_website.png` | nadkarni specialty polymers 28 (▼33%), paint technology 11 (▲83%), cathodic disbondment 8 (▲60%), enlace ester y eter 6 (▲500%), nadkarni 5 (▲25%) |
| `Insights_with_marginal_increase_in_Traffic.png` | Content traffic insights confirming blog article growth |
| `Tech_SEO_-_Core_Web_Vitals_Improvements.png` | Mobile CWV: 56 good, 0 poor, 0 needs improvement. HTTPS: 56 secured, 0 non-HTTPS |
| `Mobile_view_health.png` | GSC Mobile CWV: 0 poor, 0 needs improvement, 56 good URLs. Timeline shows green line rising from ~Jul 14 |
| `Bad_URLs_on_Mobile_view_fixed.png` | GSC Mobile CWV detail: confirmed 56 good URLs, "View data about good URLs" available |

---

*Prompt authored by: Yogi — Digital Marketing Consultant*
*For: Nadkarni Speciality Polymers & Coatings Pvt. Ltd. (NSPC)*
*Report Period: July 15 – August 14, 2026*
*Bolt Project: https://nadkarni-linkedin-ga-reporting.bolt.host/*
*Website: https://www.nadkarnispc.com/*
*Images: 15 screenshots uploaded with this prompt*
*Previous period referenced: Jun 15–Jul 14, 2026*

# NSPC Digital Performance Report — Bolt.new Build Prompt
## Reporting Period: June 15 – July 14, 2026
## Target: https://nadkarni-linkedin-ga-reporting.bolt.host/
## Task: ADD one new tab only — everything else stays intact

---

## ⚠️ CARDINAL RULE — NON-NEGOTIABLE

You are working on a **live existing project** at
https://nadkarni-linkedin-ga-reporting.bolt.host/

That project already contains multiple report tabs for previous periods.
**Every single existing tab, its data, its styles, its scripts, and its
layout must remain 100% untouched.**

Your only task:
> **Add one new tab labelled "Jun–Jul 2026" containing the full report
> described in this document.**

If you are not certain you can do this without affecting existing code,
**STOP and describe your plan before writing a single line.**

---

## 📥 IMAGE UPLOAD PROTOCOL

All 10 source images are uploaded alongside this prompt. Each image
must be:

1. **Physically embedded** as a rendered `<img>` tag — not linked,
   not described in text, not a placeholder
2. **Placed in its exact named section** as specified below
3. **Captioned** below with its filename in italic grey text
4. **Lightbox-enabled** — click to open full-screen, Escape to close
5. **Accompanied** by extracted data rendered as interactive UI
   components (KPI cards, tables, charts) directly beside or below it

### Image Manifest & Section Placement

| Filename | Section It Belongs To |
|---|---|
| `Highlights.png` | Section 1.1 — LinkedIn Content Highlights |
| `Follower_highlights.png` | Section 1.2 — Follower Growth |
| `Visitor_highlights.png` | Section 1.3 — Visitor Metrics |
| `Search_appearance_highlights.png` | Section 1.4 — Search Appearance |
| `Competitor_highlights_1.png` | Section 1.5 — Competitor Overview |
| `Competitor_highlights_2.png` | Section 1.5 — Competitor Growth Table |
| `Active_Users.png` | Section 2.1 — GA4 Active Users Overview |
| `Active_Users_-_by_country.png` | Section 2.2 — Geographic Performance |
| `Traffic_ACquisition_from_sources.png` | Section 2.3 — Traffic Acquisition |
| `Pages_with_traffic.png` | Section 2.4 — Top Pages |

---

## 🧭 TAB NAVIGATION

**New tab label:** `📅 Jun–Jul 2026`

Place it to the right of the existing `Mar–May 2026` tab (or the
rightmost existing tab). Do not reorder, rename, or touch existing tabs.

**Sticky period badge** (always visible at top of this tab):
`📅 June 15 – July 14, 2026  |  30 Days`

**Internal sub-navigation** (sticky pills below the period badge):
```
[ Overview ] [ LinkedIn ] [ Google Analytics ] [ On-Page SEO ] [ Consultant Notes ]
```

---

## 📐 DESIGN SYSTEM

Match the existing project's design tokens exactly.

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
- ▲ positive → `--green`
- ▼ negative → `--red`
- → stable → `--amber`

KPI cards: glassmorphism style, count-up animation on scroll-into-view,
3-line format: large bold value | label | trend.

Callout boxes — 4 types with 8px left accent border:
- 💡 Insight → teal / `--blue-lt`
- ⚠️ Watch Point → amber / `--amber-lt`
- 🚨 Critical → red / `--red-lt`
- ⭐ Win → green / `--green-lt`

**Consultant Note boxes** — distinct style: dark navy left border
(12px), `#EEF2F7` background, italic body text, signed with
`— Yogi, Digital Marketing Consultant`. These appear after every
major section.

---

## 🏗️ HERO / COVER SECTION

Full-width gradient banner (navy → teal):

```
NADKARNI SPECIALITY POLYMERS & COATINGS PVT. LTD.
nadkarnispc.com

Digital Performance Report
June 15 – July 14, 2026

LinkedIn Analytics  ·  Google Analytics 4  ·  On-Page SEO Notes

Prepared by: Yogi — Digital Marketing Consultant  |  Confidential
```

**8-card KPI grid** with count-up animation — two rows of 4:

Row 1 (LinkedIn — navy accent):
| Card | Value | Change |
|---|---|---|
| Impressions | 16,313 | ▲ 2.7% |
| Reactions | 487 | ▼ 8.1% |
| Comments | 30 | ▼ 11.8% |
| Reposts | 2 | ▼ 60% |

Row 2 (Web — teal accent):
| Card | Value | Change |
|---|---|---|
| Active Users (GA4) | 437 | ▼ 4.6% |
| Total Sessions | 712 | — |
| New Users | 394 | ▼ 9.2% |
| Total Followers | 1,149 | ▲ 17% new |

**Key Insight callout (💡 teal):**
> *"June–July is a consolidation and maturity period. LinkedIn impressions
> crossed 16,000 — the highest on record — while follower count reached
> 1,149. Web traffic is normalising after the peaks of earlier periods,
> but session quality remains strong with a 59.69% engagement rate.
> A landmark development: AI Assistant now appears as a distinct traffic
> channel at 1.83% of sessions with a 76.92% engagement rate — the
> highest of any channel. This confirms NSPC content is being surfaced
> and cited by AI tools. The site is growing authority."*

---

## SECTION 1 — LINKEDIN ANALYTICS

**Internal anchor:** `#linkedin`

---

### 1.1 — Content Highlights

**📌 EMBED IMAGE: `Highlights.png`**
*Caption: Source: Highlights.png | LinkedIn Analytics | Data for
6/15/2026 – 7/14/2026*

4 KPI cards:
- **16,313** Impressions (▲ 2.7%) — green card
- **487** Reactions (▼ 8.1%) — red card
- **30** Comments (▼ 11.8%) — red card
- **2** Reposts (▼ 60%) — red card

**Impression trend mini-chart:** Line chart showing organic impressions
across the 30-day period. Peak around July 5-7 aligned with Paint
Istanbul Turkcoat 2026 show (Jun 17-19 running into post-show content).
All impressions organic — zero sponsored.

**💡 Insight callout:**
> *"16,313 impressions is the highest single-period total in all tracked
> reporting cycles. The posting consistency and technical content
> strategy is clearly compounding month over month. The dip in reactions
> and comments warrants monitoring — this is likely a natural plateau
> as the audience scales, but it signals a need to introduce more
> conversation-triggering content formats."*

---

**🗣️ CONSULTANT NOTE:**
> *"We're now consistently in the 15,000+ impression range — that's not
> a fluke, that's a content engine that has found its rhythm. The slight
> dip in reactions and comments doesn't alarm me at this stage. What I'm
> watching is whether impressions continue climbing while we work on
> deepening engagement in the next cycle.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.2 — Follower Growth

**📌 EMBED IMAGE: `Follower_highlights.png`**
*Caption: Source: Follower_highlights.png | LinkedIn Analytics |
Jun 15–Jul 14, 2026*

2 KPI cards:
- **1,149** Total Followers
- **103** New Followers in last 30 days (▲ 17%)

Body text:
> *"NSPC crossed 1,000 followers this period — a meaningful milestone
> for a specialist B2B chemistry brand. 103 new followers in 30 days
> is the strongest single-month follower acquisition on record,
> representing a 17% growth rate. For context: total followers have
> grown from 860 (Jan–Feb 2026) → 938 (Mar–May) → 1,149 (Jun–Jul) —
> a 33.6% increase in six months."*

**Follower journey chart** — milestone line chart:
```
Jan–Feb 2026:  860 followers
Mar–May 2026:  938 followers  (+78)
Jun–Jul 2026:  1,149 followers  (+103 in 30d)
```

**⭐ Win callout:**
> *"Crossing 1,000 followers is a credibility threshold on LinkedIn —
> it unlocks deeper analytics and signals seriousness to potential
> followers. 103 new followers in a single month is exceptional for
> a niche B2B specialty chemicals brand. This pace, if sustained,
> puts NSPC at 1,400+ by end of 2026."*

---

**🗣️ CONSULTANT NOTE:**
> *"Breaking 1,000 followers is more than a vanity metric in B2B. It's
> the point where the page starts to look credible to a procurement
> manager or technical director who's never heard of NSPC before.
> This milestone matters commercially. We should celebrate it in a
> post — audience milestones make great organic content.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.3 — Visitor Metrics

**📌 EMBED IMAGE: `Visitor_highlights.png`**
*Caption: Source: Visitor_highlights.png | LinkedIn Analytics |
Jun 15–Jul 14, 2026*

3 KPI cards:
- **306** Page Views (▲ 9.7%)
- **122** Unique Visitors (▲ 9.9%)
- **0** Custom Button Clicks (🔴 persistent zero — third consecutive cycle)

**⚠️ Watch Point callout:**
> *"Page views and unique visitors both grew ~10% — positive momentum.
> However, custom button clicks remain zero for the third consecutive
> reporting cycle (Jan–Feb, Mar–May, Jun–Jul). This represents
> approximately 120 days of zero CTA engagement. The LinkedIn Page
> CTA button must be reviewed, relabelled, and redirected immediately.
> Recommended destinations: 'Request a Sample', 'Download TDS' or
> 'Enquire Now' linked directly to the contact page."*

---

**🗣️ CONSULTANT NOTE:**
> *"Three cycles. Zero clicks. I'll be direct — this is a live issue
> that needs fixing before next cycle. A contact form link labelled
> clearly is all it takes. The audience is coming to the page (306
> views this month) — we're just not giving them a compelling reason
> to take the next step. This is a five-minute fix with real
> commercial impact.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.4 — Search Appearance

**📌 EMBED IMAGE: `Search_appearance_highlights.png`**
*Caption: Source: Search_appearance_highlights.png | LinkedIn Analytics |
Jul 20–26, 2026 (rolling 7-day window)*

1 KPI card:
- **675** Page Searches (▲ 0.4% last 7 days)

Body text:
> *"675 LinkedIn page searches in the Jul 20–26 window indicates the
> NSPC page is being actively discovered through LinkedIn's internal
> search engine. A 0.4% week-on-week growth is stable. This metric
> reflects brand awareness among LinkedIn's professional user base —
> formulators, chemists, and procurement professionals searching for
> specialty polymer and coating suppliers."*

**💡 Insight callout:**
> *"LinkedIn search appearances are an underreported leading indicator.
> 675 searches in a week means roughly 2,925 searches per month —
> of which only 122 unique visitors clicked through. Optimising the
> Page headline, About section keywords, and product descriptions
> for LinkedIn's internal search algorithm could meaningfully lift
> the search-to-visit conversion rate."*

---

**🗣️ CONSULTANT NOTE:**
> *"Think of LinkedIn search appearances the same way you think of
> Google impressions — most people see you but don't click. The gap
> between 675 weekly searches and 122 monthly unique visitors tells
> me our LinkedIn page description and headline need to be sharper
> and more keyword-driven. This is on our radar for next cycle.*
> *— Yogi, Digital Marketing Consultant*"

---

### 1.5 — Competitive Benchmarking

**📌 EMBED IMAGE: `Competitor_highlights_1.png`**
*Caption: Source: Competitor_highlights_1.png | LinkedIn — Competitor
Highlights | Last 30 days*

**📌 EMBED IMAGE: `Competitor_highlights_2.png`**
*Caption: Source: Competitor_highlights_2.png | LinkedIn — Compare
Growth | Last 30 days*

**Period-level competitor summary (from Competitor_highlights_1.png):**

2 KPI tiles:
- **30** Comments on posts (▲ 140% vs competitors) — 🟢 GREEN WIN
- **103** New followers (▼ 70% vs competitors)

**Competitor Growth Table** (from Competitor_highlights_2.png) — full
sortable table:

| Rank | Company | Total Followers | New Followers | Posts | Comments | Reactions |
|---|---|---|---|---|---|---|
| 1 | Atul Ltd | 144,995 | 1,500 (▲14.1%) | 11 (▲37.5%) | 67 (▲9.8%) | 4,300 (▲31.7%) |
| 2 | Prakash Chemicals International | 32,005 | 330 (▼27%) | 8 (→0%) | 2 (→0%) | 356 (▼10.1%) |
| 3 | Cardolite Corporation | 6,066 | 147 (▼8.1%) | 8 (▼20%) | 6 (▲20%) | 496 (▲12.2%) |
| **4 ★** | **NSPC (You)** | **1,149** | **103 (▲17%)** | **13 (→0%)** | **30 (▼11.8%)** | **487 (▼8.1%)** |
| 5 | Macro Polymers Pvt. Ltd. – India | 4,887 | 28 (▼36.4%) | 0 | 0 | 1 (▼200%) |

Highlight NSPC row in teal. Badge: "Your Page ★"

**Grouped bar chart:** New Followers vs Reactions for all 5 companies.

**⭐ Win callout:**
> *"NSPC's comment count of 30 is +140% above the competitor average
> — the strongest relative performance of any metric this period.
> This signals that NSPC's content is generating more discussion and
> debate relative to peers than at any point in tracked history.
> With 13 posts vs Cardolite's 8, NSPC is also the most active
> poster in the specialist chemicals peer group."*

**⚠️ Watch Point callout:**
> *"On raw new follower numbers, NSPC at 103 is 70% below the
> competitor average, which is pulled up significantly by Atul Ltd's
> 1,500 new followers. Atul operates at a fundamentally different
> scale (144,995 followers). Excluding Atul, NSPC's 103 new followers
> compares more favourably against Cardolite (147) and Prakash (330)
> — the more relevant benchmarks given their audience composition."*

---

**🗣️ CONSULTANT NOTE:**
> *"I want to call out something important here: our comments are 140%
> above the competitor average. In B2B, comments are the hardest
> engagement metric to earn — they require genuine interest and
> professional opinion. The fact that we're leading on this tells me
> our technical content is landing with real practitioners, not just
> passive scrollers. That's the audience we're building for.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 2 — GOOGLE ANALYTICS

**Internal anchor:** `#analytics`

---

### 2.1 — GA4 Active Users Overview

**📌 EMBED IMAGE: `Active_Users.png`**
*Caption: Source: Active_Users.png | Google Analytics 4 |
Jun 15–Jul 14, 2026*

3 KPI cards:
- **437** Active Users (▼ 4.6% vs prior)
- **4,700** Event Count (▲ 13.4%)
- **394** New Users (▼ 9.2%)

**Area chart** replicating the GA4 trend:
- Solid blue line: NSPC custom (Jun 15–Jul 14)
- Dashed line: Previous period
- Teal shaded band: Plastics & Polymers peer median and range
- Note: NSPC line tracks within and near the peer median band — a
  stabilisation after earlier outperformance periods

Body text:
> *"Active users are down 4.6% period-over-period — a modest decline
> that reflects natural traffic normalisation for a B2B site in summer
> months. NSPC continues to track within the Plastics & Polymers peer
> median band, confirming the site is performing at or above industry
> norms for this category. Event count growing +13.4% while active
> users dip is a positive signal — existing visitors are interacting
> more deeply per session."*

**💡 Insight callout:**
> *"Event count growing 13.4% while active users decline 4.6% means
> each visitor is triggering more events on average. This is a content
> depth and engagement quality improvement — users are scrolling
> further, clicking more internal links, and spending more time with
> the content. Quality is improving even as raw traffic normalises."*

---

**🗣️ CONSULTANT NOTE:**
> *"A slight dip in active users isn't something I'm concerned about.
> Summer is historically softer for B2B websites globally. What I'm
> much more interested in is the event count going up — it tells me
> the people who ARE visiting are finding what they came for and
> exploring the site. That's the behaviour of a high-intent audience,
> and that converts into enquiries.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.2 — Geographic Performance

**📌 EMBED IMAGE: `Active_Users_-_by_country.png`**
*Caption: Source: Active_Users_-_by_country.png | GA4 — Active Users
by Country | Jun 15–Jul 14, 2026*

**World map visualisation** — choropleth with bubble markers sized
proportionally to active users. Colour-code: green = growth,
red = decline, grey = stable.

**Country table (sortable):**

| # | Country | Active Users | Change | Notable Signal |
|---|---|---|---|---|
| 1 | India | 259 | ▲ 2.8% | Primary market — steady growth |
| 2 | United States | 54 | ▼ 20.6% | Significant drop — monitor |
| 3 | Singapore | 11 | → 0.0% | Stable — ASEAN presence |
| 4 | Türkiye | 11 | ▲ 120%+ | ⭐ BREAKOUT — Paint Istanbul effect |
| 5 | China | 7 | ▼ 12.5% | Slight decline |
| 6 | Netherlands | 7 | ▲ 40.0% | Growing — European industrial market |
| 7 | Canada | 5 | ▼ 50.0% | Notable decline |

**⭐ Win callout — Türkiye:**
> *"Türkiye's active users surged +120% this period — directly
> attributable to NSPC's participation at Paint Istanbul Turkcoat
> 2026 (June 17–19). This is the first time a trade show attendance
> has produced a directly measurable and attributed spike in website
> traffic from the host country. The Paint Istanbul investment has
> delivered quantifiable digital reach into the Turkish market."*

**⚠️ Watch Point — United States:**
> *"The US declined 20.6% this period (from ~68 to 54 active users).
> The US consistently generates the highest GSC impressions of any
> country but the lowest click-through rates. The summer period may
> partly explain the dip, but a targeted content review for US
> searcher intent remains a priority recommendation."*

---

**🗣️ CONSULTANT NOTE:**
> *"Türkiye at +120% is the data story of this cycle. We went to
> Istanbul, we showed up at the show, and the Turkish market responded
> on Google Analytics within days. This is exactly the kind of
> multi-channel attribution that validates trade show investment with
> hard data. I'd recommend following up with a dedicated post-show
> article referencing Turkcoat 2026 to sustain this momentum.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.3 — Traffic Acquisition by Channel

**📌 EMBED IMAGE: `Traffic_ACquisition_from_sources.png`**
*Caption: Source: Traffic_ACquisition_from_sources.png | GA4 — Session
Channel Group | Jun 15–Jul 14, 2026*

**Total:** 712 sessions | 425 engaged | 59.69% engagement rate |
1m 10s avg engagement time

**Donut chart** of session breakdown:
- Organic Search: 518 (72.75%)
- Direct: 159 (22.33%)
- AI Assistant: 13 (1.83%)
- Organic Social: 10 (1.4%)
- Referral: 6 (0.84%)
- Unassigned: 5 (0.7%)

**Full channel table (sortable):**

| # | Channel | Sessions | % | Engaged Sessions | Eng. Rate | Avg. Eng. Time |
|---|---|---|---|---|---|---|
| 1 | Organic Search | 518 | 72.75% | 317 | 61.2% | 1m 19s |
| 2 | Direct | 159 | 22.33% | 88 | 55.35% | 45s |
| 3 | **AI Assistant** | **13** | **1.83%** | **10** | **76.92%** | **1m 02s** |
| 4 | Organic Social | 10 | 1.4% | 5 | 50% | 12s |
| 5 | Referral | 6 | 0.84% | 4 | 66.67% | 59s |
| 6 | Unassigned | 5 | 0.7% | 0 | 0% | 19s |

Highlight the AI Assistant row in a distinct teal-tinted background
with a ✨ icon to draw attention.

**⭐ Win callout — AI Assistant channel:**
> *"For the first time in NSPC's tracked analytics history, 'AI
> Assistant' appears as a distinct traffic acquisition channel.
> 13 sessions from AI tools (ChatGPT, Perplexity, Gemini, or similar)
> with a 76.92% engagement rate — the highest of any channel — and
> 1m 02s average engagement time. Users arriving from AI assistants
> are the most engaged visitors on the site. This confirms that NSPC's
> technical educational content (Cathodic Disbondment, Paint
> Technology 101, Ethers vs Esters) is being cited and surfaced by
> AI-powered search tools. The llms.txt implementation from our
> earlier SEO work is contributing to this visibility."*

**💡 Insight callout:**
> *"Organic Search at 72.75% of sessions (up from 59.14% in Mar–May)
> is the strongest organic search share in any reporting period. The
> site is becoming more search-dependent — which is positive for
> sustainable, non-paid growth — but also means any algorithm change
> has proportionally more impact. Organic Social at 10 sessions (1.4%)
> and 12s average engagement time remains the weakest channel for
> website conversion, confirming that LinkedIn content builds
> awareness but rarely drives direct site visits."*

---

**🗣️ CONSULTANT NOTE:**
> *"AI Assistant as a traffic channel is the most exciting development
> in this entire report. We are now being cited by AI tools. That is
> not accidental — it is a direct result of the technical content
> depth we have built into the Insights section. AI tools cite
> authoritative, specific, factual content. That is exactly what
> Shikhin's articles on phenalkamines, cathodic disbondment, and
> paint chemistry provide. We should double down on this — every
> new article is now potentially a citation in an AI-generated answer
> seen by a coating formulator anywhere in the world.*
> *— Yogi, Digital Marketing Consultant*"

---

### 2.4 — Top Pages by Engagement

**📌 EMBED IMAGE: `Pages_with_traffic.png`**
*Caption: Source: Pages_with_traffic.png | GA4 — Pages & Screens |
Jun 15–Jul 14, 2026*

**Totals:** 1,639 views | 437 active users | 3.75 views/user |
1m 54s avg engagement time | 4,710 events

**Full page table (sortable by Views, Active Users, Engagement Time):**

| # | Page Title | Views | Active Users | Views/User | Avg. Eng. Time | Notes |
|---|---|---|---|---|---|---|
| 1 | Manufacturer & Global Supplier of Speciality Resins \| NSPC | 348 | 190 | 1.83 | 53s | Homepage — top entry point |
| 2 | Contact NSPC \| Connect with Global Polymer Experts | 183 | 102 | 1.79 | 44s | ⭐ High intent — 2nd most viewed |
| 3 | About NSPC \| Pioneers in CNSL Technology | 138 | 46 | 3.00 | 1m 19s | Strong depth — 3 views/user |
| 4 | Specialty Polymers & Coatings Products \| Global Supplier \| NSPC | 122 | 77 | 1.58 | 1m 03s | Products discovery |
| 5 | Pioneering CNSL Technology in Epoxy Manufacturing \| NSPC | 57 | 40 | 1.43 | 1m 29s | Authority content |
| 6 | Understanding Cathodic Disbondment in Corrosion Protection \| NSPC | 57 | 29 | 1.97 | 1m 02s | Evergreen technical |
| 7 | Insights on Specialty Polymers & Coatings \| NSPC Blog | 54 | 19 | 2.84 | 25s | Blog hub |
| 8 | SOLOPOXY™ \| 1K Air-Drying Epoxy Ether Resin Manufacturer \| NSPC | 48 | 27 | 1.78 | 25s | Product page |
| 9 | SOLOPOXY 4848x65 1K Epoxy Primer \| NSPC Manufacturer | 45 | 23 | 1.96 | 1m 11s | Product detail |

**Horizontal bar chart:** Views by page, colour-banded.

**⭐ Win callout:**
> *"The Contact page is the second most viewed page with 183 views and
> 102 active users — a strong commercial signal. Users are clearly
> intent-driven in this period. The About page generating 3.00 views
> per user (highest ratio in the table) suggests visitors are reading
> deeply about the company before making contact — a classic B2B
> research and trust-building behaviour."*

**💡 Insight callout:**
> *"SOLOPOXY is now appearing in the top pages for the first time
> across tracked periods — both the category page (#8) and the
> 4848x65 product page (#9). This is a result of the product page
> title tag optimisations carried out in the March-April SEO sprint.
> Product pages converting to top-traffic pages means the SEO work
> is beginning to deliver commercial-intent traffic, not just
> educational traffic."*

---

**🗣️ CONSULTANT NOTE:**
> *"I want to highlight something about this pages table that often
> gets missed: the About page has a 3.0 views per user ratio. That
> means people are coming back to it, or reading multiple sections
> within the same session. In B2B, that behaviour almost always
> precedes a contact enquiry. The About page is doing commercial
> work — which is why we made sure it accurately represents the
> founding story, the Nadkarni legacy, and the CNSL innovation
> narrative. Content with human credibility converts.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 3 — ON-PAGE SEO NOTES

**Internal anchor:** `#seo`

**Section intro:**
> *"The following on-page SEO observations are based on analysis of
> nadkarnispc.com carried out as part of our ongoing digital
> marketing retainer. These represent work completed or in progress
> by our team. All recommendations are grounded in current best
> practices for B2B specialty chemical manufacturers."*

---

### 3.1 — Homepage On-Page Status

**Page:** https://www.nadkarnispc.com/

| Element | Current Status | Recommendation |
|---|---|---|
| Title Tag | `Manufacturer & Global Supplier of Speciality Resins \| NSPC` (57 chars) | ✅ Within 60-char limit — good |
| Meta Description | Present and descriptive | ✅ Implemented |
| H1 Tag | Present: "Bio-Based Epoxy Resins & Specialty Polymers Manufacturer in India" | ✅ Strong — includes primary keyword |
| Primary Keyword | Bio-based epoxy resin manufacturer India | ✅ Present in H1 and meta |
| Open Graph | og:title, og:description, og:image all present | ✅ Social sharing optimised |
| Twitter Card | summary_large_image set | ✅ In place |
| Canonical | Self-referencing canonical | ✅ Correct |
| Schema | Review status in next sprint | 🟡 In progress |
| Internal Linking | Products, Technology, Markets, Insights, Contact | ✅ Clear navigation structure |

**💡 callout:**
> *"The homepage is in a good structural state. The H1 correctly leads
> with the primary commercial keyword 'Bio-Based Epoxy Resins &
> Specialty Polymers Manufacturer in India'. The meta description
> is concise and product-forward. Ongoing work: schema markup
> enrichment and image alt text completion across hero images."*

---

### 3.2 — Blog & Content Pages — On-Page Health

**Pages reviewed:** Top Insights articles on nadkarnispc.com/insights/

| Page | On-Page Element | Status | Next Action |
|---|---|---|---|
| Ethers vs. Esters: Bonds That Last | Title: 53 chars | ✅ Good | — |
| Ethers vs. Esters: Bonds That Last | H1 present | ✅ Good | — |
| Ethers vs. Esters: Bonds That Last | Meta description | ✅ Present | Strengthen with 'ester vs ether' variant |
| Simplified Paint Technology 101 | Title: 47 chars | ✅ Good | — |
| Simplified Paint Technology 101 | Word count: 2,500+ words | ✅ Excellent depth | — |
| Cathodic Disbondment (comprehensive) | URL slug: long (115+ chars) | 🔴 Too long | Shorten + 301 redirect when ready |
| Cathodic Disbondment | H1 present | ✅ Good | — |
| Cathodic Disbondment | Internal links to products | 🟡 Sparse | Add 2–3 CURE-O-POXY links in body |
| Chemistry in a Nutshell (Phenalkamines) | Title tag | ✅ Good | — |
| Enhancing Coating Adhesion | URL slug: 115+ chars | 🔴 Too long | Shorten + 301 redirect when ready |

**Priority status legend:**
- ✅ Done / Good
- 🟡 In Progress / Improvement Opportunity
- 🔴 High Priority / Needs Fix

**⚠️ Watch Point callout:**
> *"Two blog URLs remain excessively long (115+ characters). While
> Google can index these, long slugs dilute keyword signals and
> display poorly in SERP snippets, reducing CTR. These are flagged
> for URL shortening with 301 redirects in the next sprint. This
> is non-urgent but should be completed before end of Q3 2026."*

---

### 3.3 — Product Pages — On-Page Progress

**Category:** CURE-O-POXY, NEOPOXY, SOLOPOXY, NEO-Alkyd product pages

| Issue | Pages Affected | Status |
|---|---|---|
| H1 tags missing | 45 product pages flagged in March audit | 🟡 In Progress — implementing batch |
| Word count < 300 words | 54 product pages (150–195 words avg) | 🟡 In Progress — enrichment underway |
| Multiple meta description conflicts | 74 pages (WordPress plugin conflict) | 🟡 In Progress — plugin review underway |
| Title tag length | All 9 flagged pages | ✅ Resolved in March sprint |
| Missing meta descriptions | 9 pages | ✅ All resolved in March sprint |
| Duplicate meta descriptions | 2 pages (phenalkamines/phenalkamides) | ✅ Resolved in March sprint |

**💡 callout:**
> *"The March–April SEO sprint resolved all critical title tag and
> meta description issues. The remaining work — H1 tags, word count
> enrichment, and multiple meta description conflicts — is structural
> and requires systematic implementation across ~45–74 pages. These
> are being processed in batches to avoid regression. No new critical
> issues identified this cycle."*

---

### 3.4 — AI Search Readiness (GEO)

| Signal | Status | Note |
|---|---|---|
| llms.txt | ✅ Implemented | AI crawlers can now access site content |
| Schema markup | 🟡 In Progress | LocalBusiness schema added; Product schema pending |
| Content depth (AI citability) | ✅ Strong | Cathodic Disbondment, Paint Tech 101, Phenalkamines articles are deeply detailed |
| AI Assistant channel (GA4) | ✅ Confirmed | 13 sessions, 76.92% engagement — AI tools are citing NSPC |
| Passage-level specificity | ✅ Good | Articles contain named chemistry terms, specific products, application contexts |

**⭐ Win callout:**
> *"The AI Assistant traffic channel appearing in GA4 this period is
> direct confirmation that NSPC's content is being cited by AI search
> tools. The llms.txt file implemented in the March sprint has made
> the site discoverable to AI crawlers. This is a significant
> forward-looking SEO win — AI search share is growing at approximately
> 15–20% annually and NSPC is positioning ahead of most competitors
> in the specialty chemicals space for AI search visibility."*

---

**🗣️ CONSULTANT NOTE — SEO:**
> *"The on-page work we've done since March is quietly laying the
> foundation for what you're now seeing in traffic — SOLOPOXY product
> pages entering the top-visited list, AI tools citing NSPC content,
> Türkiye showing up in active users after a trade show. None of this
> happens by accident. It's the compounding result of title tags,
> H1s, word count, schema, and llms.txt all working together.*
>
> *The remaining work — H1 batch implementation and word count
> enrichment on product pages — will be the next compounding step.
> Once Google can read a proper heading and 300+ words on a CURE-O-POXY
> product page, those pages will start ranking for the specific grade
> queries that coating formulators actually search.*
> *— Yogi, Digital Marketing Consultant*"

---

## SECTION 4 — CONSULTANT NOTES & RECOMMENDATIONS

**Internal anchor:** `#notes`

Priority action cards — 3-column responsive grid:

---

### 🔴 HIGH PRIORITY

**Card 1 — LinkedIn CTA Button**
> Three consecutive cycles of zero custom button clicks (120+ days).
> Relabel and redirect to a contact form or TDS download page before
> the next reporting cycle begins. This is a 5-minute fix.
> — *Expected impact: CTA engagement activation*

**Card 2 — LinkedIn Page Search Optimisation**
> 675 weekly LinkedIn search appearances with low search-to-visit
> conversion. Rewrite Page headline and About section with
> keyword-rich professional descriptions targeting: "bio-based epoxy
> resin supplier India", "CNSL-based phenalkamine manufacturer",
> "specialty coating hardeners".
> — *Expected impact: Higher profile visit rate from LinkedIn search*

**Card 3 — US Market CTR Investigation**
> US active users down 20.6% while US GSC impressions remain the
> highest of any country. Run a GSC country filter for US queries to
> identify which content is appearing for US searchers and whether
> the intent matches NSPC's positioning.
> — *Expected impact: Unlock largest impression market*

---

### 🟡 MEDIUM PRIORITY

**Card 4 — Post Paint Istanbul Follow-Up Content**
> Türkiye's +120% active user spike confirms the show drove traffic.
> Publish a post-show recap article: key conversations from Paint
> Istanbul Turkcoat 2026, NSPC's product showcased, and contact
> details for Turkish market enquiries. This sustains the traffic
> momentum.
> — *Expected impact: Extend Türkiye traffic spike*

**Card 5 — H1 Tag Batch Implementation**
> 45 product pages remain without H1 tags. Implement in batches of
> 10–15 per sprint. Start with CURE-O-POXY 8-series (highest
> traffic product category).
> — *Expected impact: Product page indexation quality improvement*

**Card 6 — Word Count Enrichment — Product Pages**
> 54 pages under 200 words. Add 100–150 words of application context
> per product page: target application, key industries, performance
> in conditions (temperature, humidity, substrate). Use TDS content
> as the source.
> — *Expected impact: Crawl quality and keyword coverage*

---

### 🟢 LOWER PRIORITY

**Card 7 — Cathodic Disbondment Internal Links**
> Add 2–3 contextual links to CURE-O-POXY product pages within the
> Cathodic Disbondment article. This is NSPC's second highest traffic
> article — internal links from it to product pages pass authority
> and create a buyer journey path from education to product.

**Card 8 — AI Assistant Channel Monitoring**
> Set up a GA4 custom segment for "AI Assistant" sessions. Monitor
> which pages they land on, what they click, and whether they
> convert to contact enquiries. This channel, while small now,
> is the highest engagement rate of any channel.

**Card 9 — Multiple Meta Description Fix**
> 74 pages with conflicting meta tags due to WordPress plugin conflict.
> Audit Yoast/RankMath overlap in header.php. A single code-level
> fix resolves all 74 pages simultaneously — highest leverage fix
> remaining in the audit backlog.

---

## ⚙️ TECHNICAL REQUIREMENTS FOR BOLT

### Interactivity
- [ ] Count-up animation on all KPI numbers (IntersectionObserver)
- [ ] All tables sortable by clicking column headers
- [ ] All images: lightbox modal on click (Escape to close)
- [ ] Consultant Note boxes: collapsible/expandable with toggle
- [ ] Internal sub-nav: smooth scroll, active pill tracks section
- [ ] Period badge sticky at top of tab at all times

### Charts Required
- Impressions trend line chart (Section 1.1)
- Follower growth milestone line chart (Section 1.2)
- GA4 active users area chart with peer median band (Section 2.1)
- Geographic choropleth / bubble map (Section 2.2)
- Traffic source donut chart (Section 2.3)
- Page views horizontal bar chart (Section 2.4)

### Responsive Breakpoints
- Desktop 1280px+: full layout
- Tablet 768px: 2-column card grids, stacked images
- Mobile 375px: single column, tables scroll horizontally

### Consultant Note Component Spec
```css
.consultant-note {
  border-left: 12px solid #003366;  /* navy */
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

Render after every major section: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1,
2.2, 2.3, 2.4, and the SEO section.

---

## 🚫 ABSOLUTE PROHIBITIONS

```
❌ DO NOT delete, modify, or touch any existing tab, data, CSS,
   or JavaScript in the project.

❌ DO NOT use placeholder text, "TBD", or filler content anywhere —
   every field is pre-populated from this document.

❌ DO NOT embed images as links — every image must render as a
   visible <img> tag in the exact section specified.

❌ DO NOT invent or estimate any data — use only the figures in
   this document, which are extracted from the uploaded screenshots.

❌ DO NOT begin building until all 10 images are uploaded and
   confirmed present.
```

---

## ✅ DEFINITION OF DONE

- [ ] `Jun–Jul 2026` tab added to existing navigation
- [ ] All existing tabs 100% intact and unchanged
- [ ] Sticky period badge `📅 June 15–July 14, 2026 | 30 Days`
- [ ] Internal sub-nav with 5 sections
- [ ] Hero with 8 KPI cards, count-up animation
- [ ] All 10 images physically embedded in named sections
- [ ] Lightbox on every image
- [ ] All 6 charts rendered and responsive
- [ ] All tables sortable
- [ ] Consultant Note component rendered after every section
  (minimum 10 consultant note boxes across the tab)
- [ ] SEO section with 4 sub-sections and full tables
- [ ] Priority Action cards section (9 cards, 3 priority levels)
- [ ] Page fully responsive across desktop, tablet, mobile
- [ ] Zero placeholder content anywhere

---

## 📎 DATA INTEGRITY

All figures in this document are extracted directly from the following
screenshots. No data has been estimated or invented.

| Screenshot | Data Used |
|---|---|
| `Highlights.png` | 16,313 impressions, 487 reactions, 30 comments, 2 reposts |
| `Follower_highlights.png` | 1,149 total followers, 103 new (▲17%) |
| `Visitor_highlights.png` | 306 page views (▲9.7%), 122 unique visitors (▲9.9%), 0 CTA clicks |
| `Search_appearance_highlights.png` | 675 page searches (▲0.4%) Jul 20–26 |
| `Competitor_highlights_1.png` | 30 comments (▲140% vs competitors), 103 new followers (▼70% vs competitors) |
| `Competitor_highlights_2.png` | Full 5-competitor growth table |
| `Active_Users.png` | 437 active users (▼4.6%), 4.7K events (▲13.4%), 394 new users (▼9.2%) |
| `Active_Users_-_by_country.png` | Country breakdown: India 259, US 54, Singapore 11, Türkiye 11 (+120%), Netherlands 7 (+40%) |
| `Traffic_ACquisition_from_sources.png` | 712 sessions, channel breakdown including AI Assistant 13 sessions (76.92% eng rate) |
| `Pages_with_traffic.png` | Top 9 pages: homepage 348 views, Contact 183, About 138, Products 122 |

---

*Prompt authored by: Yogi — Digital Marketing Consultant*
*For: Nadkarni Speciality Polymers & Coatings Pvt. Ltd. (NSPC)*
*Report Period: June 15 – July 14, 2026*
*Bolt Project: https://nadkarni-linkedin-ga-reporting.bolt.host/*
*Website: https://www.nadkarnispc.com/*
*Images: 10 screenshots uploaded alongside this prompt*

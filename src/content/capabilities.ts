export interface SubService {
  title: string;
  description: string;
  icon: string; // lucide name
}

export interface ApproachStep {
  title: string;
  description: string;
}

export interface StatPoint {
  label: string;
  value: number;
  suffix?: string;
}

export interface CapabilityContent {
  slug: string;
  tagline: string;
  iconName: string;
  subServices: SubService[];
  approach: ApproachStep[];
  stats: StatPoint[];
  statsCaption: string;
  regions: string[]; // ISO-like codes: SO, KE, ET, DJ, SS, UG, SD, ER
  related: string[]; // related slugs
  quote?: { text: string; attribution: string };
}

export const capabilities: Record<string, CapabilityContent> = {
  "capacity-development-and-trainings": {
    slug: "capacity-development-and-trainings",
    tagline: "Building institutional and individual capacity to deliver lasting change.",
    iconName: "GraduationCap",
    subServices: [
      { title: "Training Needs Assessment", description: "Diagnostic studies that identify skills gaps and capacity priorities at institutional and individual levels.", icon: "ClipboardList" },
      { title: "Curriculum Design", description: "Modular, competency-based curricula tailored to fragile-state and development contexts.", icon: "BookOpen" },
      { title: "Workshop Facilitation", description: "Bilingual (Somali/English) facilitation grounded in adult-learning principles and case-based learning.", icon: "Users" },
      { title: "Coaching & Mentorship", description: "Structured mentorship programmes linking emerging leaders with senior practitioners.", icon: "UserCheck" },
      { title: "Institutional Strengthening", description: "Systems, processes, SOPs, and governance reforms that embed learning into organisations.", icon: "Building2" },
      { title: "Post-Training Support", description: "Follow-up coaching, refresher sessions, and learning networks for sustained behaviour change.", icon: "LifeBuoy" },
    ],
    approach: [
      { title: "Listen & Diagnose", description: "Co-design begins with rapid diagnostics, stakeholder interviews, and a participatory needs analysis." },
      { title: "Design", description: "Tailored curricula, learning objectives, and delivery formats grounded in adult-learning theory." },
      { title: "Deliver", description: "Workshops, blended learning, simulation labs, and field-based coaching delivered bilingually." },
      { title: "Embed", description: "SOPs, peer-learning networks, and institutional anchors that turn learning into practice." },
      { title: "Measure", description: "Pre/post assessments, Kirkpatrick-style evaluation, and longitudinal follow-up." },
    ],
    stats: [
      { label: "Workshops Delivered", value: 120 },
      { label: "Practitioners Trained", value: 2400 },
      { label: "Partner Institutions", value: 45 },
      { label: "Average Skill Uplift", value: 38, suffix: "%" },
    ],
    statsCaption: "Cumulative reach across TIGAAL capacity-development engagements.",
    regions: ["SO", "KE", "ET", "DJ"],
    related: ["monitoring-evaluation-and-learning", "strategic-communication-and-pr"],
    quote: { text: "Capacity is not transferred — it is co-created.", attribution: "TIGAAL Learning Principle" },
  },
  "monitoring-evaluation-and-learning": {
    slug: "monitoring-evaluation-and-learning",
    tagline: "Evidence systems that strengthen accountability, learning, and impact.",
    iconName: "BarChart3",
    subServices: [
      { title: "MEL Framework Design", description: "Theories of change, results frameworks, indicators, and data-collection plans aligned to donor standards.", icon: "Workflow" },
      { title: "Baseline, Midline, Endline", description: "Mixed-methods studies that establish, track, and verify programme performance.", icon: "Activity" },
      { title: "Impact Evaluation", description: "Quasi-experimental and contribution analyses to credibly attribute outcomes.", icon: "Target" },
      { title: "Third-Party Monitoring", description: "Independent verification in hard-to-reach and conflict-affected areas.", icon: "ShieldCheck" },
      { title: "Data Quality Assessments", description: "DQA missions, MIS reviews, and reporting protocols that lift data integrity.", icon: "Database" },
      { title: "Learning Reviews", description: "After-action reviews, real-time learning loops, and adaptive-management support.", icon: "RefreshCcw" },
    ],
    approach: [
      { title: "Co-design", description: "Workshops with implementers to align indicators, assumptions, and use of evidence." },
      { title: "Instrument", description: "Survey design, qualitative protocols, mobile data collection, and quality controls." },
      { title: "Collect", description: "Enumerator training, field rollout, and remote/third-party verification." },
      { title: "Analyse", description: "Quantitative and qualitative triangulation, with transparent uncertainty reporting." },
      { title: "Use", description: "Findings translated into decisions through dashboards, briefings, and learning forums." },
    ],
    stats: [
      { label: "Evaluations Completed", value: 60 },
      { label: "Surveys Administered", value: 18000 },
      { label: "Enumerators Trained", value: 350 },
      { label: "Donor Frameworks", value: 12 },
    ],
    statsCaption: "Across humanitarian, governance, and development portfolios.",
    regions: ["SO", "KE", "ET", "SS"],
    related: ["capacity-development-and-trainings", "digital-solutions-mis"],
    quote: { text: "What gets measured rigorously, gets improved.", attribution: "TIGAAL MEL Practice" },
  },
  "strategic-communication-and-pr": {
    slug: "strategic-communication-and-pr",
    tagline: "Strengthening voice, credibility, and trust for mission-driven organisations.",
    iconName: "Megaphone",
    subServices: [
      { title: "Strategy & Positioning", description: "Communication strategies grounded in audience research and behavioural insight.", icon: "Compass" },
      { title: "Campaign Design", description: "Multi-channel campaigns built around local context, language, and trusted messengers.", icon: "Sparkles" },
      { title: "Stakeholder Engagement", description: "Mapping, convening, and dialogue facilitation across government, donors, and communities.", icon: "Users" },
      { title: "Media Relations", description: "Press kits, media training, and proactive engagement with regional and international outlets.", icon: "Newspaper" },
      { title: "Crisis Communications", description: "Rapid-response frameworks, scenario rehearsal, and reputational risk management.", icon: "AlertTriangle" },
      { title: "Content & Production", description: "Editorial, photography, video, and digital assets that travel across audiences.", icon: "Film" },
    ],
    approach: [
      { title: "Diagnose", description: "Audience, perception, and information-ecosystem mapping." },
      { title: "Frame", description: "Narrative architecture and message house aligned to mission and audience." },
      { title: "Produce", description: "High-craft assets in Somali, English, and Arabic where needed." },
      { title: "Amplify", description: "Channel strategy spanning earned, owned, paid, and community media." },
      { title: "Listen", description: "Sentiment tracking and feedback loops that adapt the strategy over time." },
    ],
    stats: [
      { label: "Campaigns Delivered", value: 28 },
      { label: "Audience Reached (M)", value: 12 },
      { label: "Validation Workshops", value: 35 },
      { label: "Languages Worked In", value: 4 },
    ],
    statsCaption: "Behaviour-change and stakeholder-engagement campaigns since 2020.",
    regions: ["SO", "KE", "ET", "DJ"],
    related: ["pcve-peacebuilding-social-cohesion", "capacity-development-and-trainings"],
  },
  "market-studies-and-assessments": {
    slug: "market-studies-and-assessments",
    tagline: "Actionable insight into markets, consumers, and value chains.",
    iconName: "TrendingUp",
    subServices: [
      { title: "Market Sizing", description: "Demand, supply, and addressable-market estimates with transparent methodology.", icon: "PieChart" },
      { title: "Consumer Research", description: "Qualitative and quantitative consumer insight, segmentation, and behavioural studies.", icon: "Search" },
      { title: "Value Chain Analysis", description: "End-to-end mapping of actors, flows, margins, and bottlenecks.", icon: "Network" },
      { title: "Feasibility Studies", description: "Investment-grade feasibility assessments with financial and risk modelling.", icon: "Calculator" },
      { title: "Competitive Landscape", description: "Benchmarking, share-of-wallet, and positioning analyses.", icon: "Crosshair" },
      { title: "Sectoral Deep Dives", description: "Agriculture, ICT, energy, financial services, and consumer-goods studies.", icon: "Layers" },
    ],
    approach: [
      { title: "Scope", description: "Define decision questions, hypotheses, and evidence required." },
      { title: "Sample", description: "Robust sampling frames for traders, consumers, and enterprises." },
      { title: "Field", description: "Mobile-enabled data collection with rigorous quality control." },
      { title: "Model", description: "Demand modelling, segmentation, and scenario analysis." },
      { title: "Advise", description: "Decision-ready recommendations and go-to-market playbooks." },
    ],
    stats: [
      { label: "Market Studies", value: 40 },
      { label: "Consumers Surveyed", value: 9500 },
      { label: "Sectors Covered", value: 11 },
      { label: "Avg. Project Length (wks)", value: 8 },
    ],
    statsCaption: "Commercial and development-finance assignments across the Horn of Africa.",
    regions: ["SO", "KE", "ET", "DJ"],
    related: ["private-sector-and-financial-inclusion", "digital-solutions-mis"],
  },
  "climate-resilience-and-adaptation": {
    slug: "climate-resilience-and-adaptation",
    tagline: "Climate-responsive policies and programmes for fragile environments.",
    iconName: "Leaf",
    subServices: [
      { title: "Climate Risk Assessment", description: "Hazard, exposure, and vulnerability assessments at sub-national level.", icon: "AlertCircle" },
      { title: "Adaptation Planning", description: "NAP, LAP, and sectoral adaptation strategies aligned to NDC commitments.", icon: "Map" },
      { title: "Nature-Based Solutions", description: "Watershed restoration, rangeland management, and ecosystem-based adaptation.", icon: "TreePine" },
      { title: "Climate Finance Readiness", description: "GCF/Adaptation Fund concept notes, MRV systems, and accreditation support.", icon: "Coins" },
      { title: "Anticipatory Action", description: "Trigger-based programming and shock-responsive social protection.", icon: "CloudLightning" },
      { title: "Just Transition", description: "Inclusive policies for pastoralist, coastal, and urban communities.", icon: "Scale" },
    ],
    approach: [
      { title: "Map Hazards", description: "Spatial and historical hazard analysis using satellite and household data." },
      { title: "Assess Vulnerability", description: "Livelihood, gender, and equity-disaggregated vulnerability assessment." },
      { title: "Prioritise", description: "No-regret actions and adaptation pathways, costed and sequenced." },
      { title: "Finance", description: "Mobilise climate finance through bankable concepts and partnerships." },
      { title: "Monitor", description: "MRV systems that track outcomes and unlock results-based finance." },
    ],
    stats: [
      { label: "Vulnerability Assessments", value: 22 },
      { label: "Hectares Mapped (k)", value: 480 },
      { label: "Adaptation Plans", value: 9 },
      { label: "Climate Finance Concepts", value: 7 },
    ],
    statsCaption: "Spanning pastoralist, agro-pastoral, and coastal systems.",
    regions: ["SO", "KE", "ET", "DJ", "SS"],
    related: ["private-sector-and-financial-inclusion", "monitoring-evaluation-and-learning"],
  },
  "private-sector-and-financial-inclusion": {
    slug: "private-sector-and-financial-inclusion",
    tagline: "Unlocking enterprise growth and inclusive finance in frontier markets.",
    iconName: "Landmark",
    subServices: [
      { title: "MSME Support", description: "BDS programmes, accelerators, and access-to-markets initiatives for small enterprises.", icon: "Briefcase" },
      { title: "Financial Inclusion", description: "Mobile money, agent banking, and product design for underserved segments.", icon: "Wallet" },
      { title: "Investment Climate", description: "Doing-business reforms, regulatory diagnostics, and PPP frameworks.", icon: "Scale" },
      { title: "Diaspora & Remittances", description: "Channeling diaspora capital into productive investment and inclusive finance.", icon: "Globe2" },
      { title: "Gender-Lens Programming", description: "Women-led enterprise support and gender-smart financial products.", icon: "Heart" },
      { title: "Value Chain Finance", description: "Structuring finance along agricultural, livestock, and fisheries value chains.", icon: "Layers" },
    ],
    approach: [
      { title: "Diagnose", description: "Market and regulatory diagnostics to identify binding constraints." },
      { title: "Co-design", description: "Co-design interventions with regulators, FSPs, and enterprises." },
      { title: "Pilot", description: "Test products and reforms with rapid learning cycles." },
      { title: "Scale", description: "Crowd in finance and partners to scale what works." },
      { title: "Measure", description: "Inclusion, usage, and welfare outcomes tracked rigorously." },
    ],
    stats: [
      { label: "MSMEs Supported", value: 1800 },
      { label: "Financial Products Designed", value: 14 },
      { label: "Women-Led Enterprises", value: 720 },
      { label: "Investment Mobilised ($M)", value: 28 },
    ],
    statsCaption: "Cumulative across enterprise- and finance-focused engagements.",
    regions: ["SO", "KE", "ET"],
    related: ["market-studies-and-assessments", "climate-resilience-and-adaptation"],
  },
  "digital-solutions-mis": {
    slug: "digital-solutions-mis",
    tagline: "Context-driven digital systems for social delivery and decision-making.",
    iconName: "Database",
    subServices: [
      { title: "MIS Design & Build", description: "Custom management information systems for social protection, health, and education.", icon: "Server" },
      { title: "Beneficiary Registries", description: "Single registries, deduplication, and biometric-ready identity systems.", icon: "FileText" },
      { title: "Mobile Data Collection", description: "ODK/Kobo/SurveyCTO deployments with offline-first workflows.", icon: "Smartphone" },
      { title: "Dashboards & BI", description: "Power BI, Tableau, and open-source dashboards for real-time decision-making.", icon: "BarChart3" },
      { title: "Interoperability", description: "API-based integration across ministries, donors, and implementers.", icon: "Plug" },
      { title: "Data Governance", description: "Privacy, security, and stewardship frameworks aligned to global standards.", icon: "Lock" },
    ],
    approach: [
      { title: "Discover", description: "User research with frontline workers, managers, and policy users." },
      { title: "Design", description: "Service blueprints and information architecture grounded in real workflows." },
      { title: "Build", description: "Iterative builds with frequent user testing and accessibility checks." },
      { title: "Deploy", description: "Pilots, training, and change management at field level." },
      { title: "Sustain", description: "Hand-over plans, documentation, and local-capacity transfer." },
    ],
    stats: [
      { label: "Systems Deployed", value: 16 },
      { label: "Beneficiary Records (k)", value: 320 },
      { label: "Field Staff Onboarded", value: 540 },
      { label: "Uptime SLA", value: 99, suffix: "%" },
    ],
    statsCaption: "MIS and digital-delivery engagements across government and NGO clients.",
    regions: ["SO", "KE", "ET", "DJ"],
    related: ["monitoring-evaluation-and-learning", "market-studies-and-assessments"],
  },
  "pcve-peacebuilding-social-cohesion": {
    slug: "pcve-peacebuilding-social-cohesion",
    tagline: "Evidence and engagement for resilience against violent extremism.",
    iconName: "ShieldCheck",
    subServices: [
      { title: "Drivers-of-Conflict Analysis", description: "Multi-level analysis of structural, proximate, and triggering drivers of conflict.", icon: "Compass" },
      { title: "Radicalisation Pathways", description: "Research on recruitment, mobilisation, and disengagement pathways.", icon: "GitBranch" },
      { title: "Community Resilience", description: "Locally-grounded resilience programming and youth engagement.", icon: "Users" },
      { title: "Strategic Comms for PCVE", description: "Counter- and alternative-narrative campaigns rooted in audience research.", icon: "Megaphone" },
      { title: "Social Cohesion", description: "Inter-group dialogue, reconciliation, and trust-building initiatives.", icon: "Handshake" },
      { title: "Policy Advisory", description: "Conflict-sensitive policy and programme design for governments and partners.", icon: "Landmark" },
    ],
    approach: [
      { title: "Listen", description: "Community perceptions studies, ethnography, and trusted-messenger interviews." },
      { title: "Analyse", description: "Drivers analysis, stakeholder mapping, and conflict-sensitivity reviews." },
      { title: "Design", description: "Locally-grounded interventions co-created with communities and authorities." },
      { title: "Deliver", description: "Resilience programming, dialogue, and strategic communications." },
      { title: "Learn", description: "Adaptive monitoring and ethical research safeguards throughout." },
    ],
    stats: [
      { label: "Community Studies", value: 26 },
      { label: "Respondents Engaged", value: 6400 },
      { label: "Dialogue Forums", value: 48 },
      { label: "Districts Covered", value: 22 },
    ],
    statsCaption: "PCVE and peacebuilding engagements in fragile and conflict-affected settings.",
    regions: ["SO", "KE", "ET"],
    related: ["ssr-political-risk-geopolitical", "strategic-communication-and-pr"],
    quote: { text: "Resilience is built locally — and earned through trust.", attribution: "TIGAAL PCVE Practice" },
  },
  "ssr-political-risk-geopolitical": {
    slug: "ssr-political-risk-geopolitical",
    tagline: "Strategic advisory on security, political risk, and regional geopolitics.",
    iconName: "Shield",
    subServices: [
      { title: "Security Sector Reform", description: "Institutional reviews, civilian oversight, and SSR strategy support.", icon: "ShieldCheck" },
      { title: "Political Economy Analysis", description: "Power, incentives, and interests analysis to inform policy and programming.", icon: "Scale" },
      { title: "Political Risk Intelligence", description: "Country-risk and event-driven intelligence for investors and partners.", icon: "AlertTriangle" },
      { title: "Geopolitical Analysis", description: "Red Sea, Gulf, and Horn-of-Africa dynamics with scenario foresight.", icon: "Globe2" },
      { title: "Stakeholder Mapping", description: "Influence and interest mapping across state and non-state actors.", icon: "Network" },
      { title: "Scenario Planning", description: "Structured foresight to stress-test strategies and investments.", icon: "Crosshair" },
    ],
    approach: [
      { title: "Frame", description: "Define the decision and the scenarios that matter to the client." },
      { title: "Research", description: "Primary interviews, open-source intelligence, and documentary analysis." },
      { title: "Analyse", description: "Political economy, conflict, and geopolitical lenses applied together." },
      { title: "Synthesise", description: "Clear, decision-ready briefs with explicit assumptions and uncertainty." },
      { title: "Advise", description: "Ongoing advisory and bespoke briefings as the situation evolves." },
    ],
    stats: [
      { label: "Risk Briefings", value: 90 },
      { label: "Countries Covered", value: 9 },
      { label: "Advisory Clients", value: 18 },
      { label: "Scenarios Modelled", value: 36 },
    ],
    statsCaption: "Strategic advisory across governments, IOs, investors, and partners.",
    regions: ["SO", "KE", "ET", "DJ", "ER", "SD", "SS"],
    related: ["pcve-peacebuilding-social-cohesion", "monitoring-evaluation-and-learning"],
  },
};

export const getCapability = (slug: string) => capabilities[slug];

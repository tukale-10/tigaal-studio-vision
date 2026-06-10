// Map service titles → slugs. Stable across DB title edits.
export const TITLE_TO_SLUG: Record<string, string> = {
  "Capacity Development and Trainings": "capacity-development-and-trainings",
  "Capacity Development & Trainings": "capacity-development-and-trainings",
  "Monitoring, Evaluation and Learning": "monitoring-evaluation-and-learning",
  "Monitoring, Evaluation & Learning": "monitoring-evaluation-and-learning",
  "Strategic Communication and Public Relations": "strategic-communication-and-pr",
  "Strategic Communication & PR": "strategic-communication-and-pr",
  "Market Studies and Assessments": "market-studies-and-assessments",
  "Market Studies & Assessments": "market-studies-and-assessments",
  "Climate Resilience & Adaptation": "climate-resilience-and-adaptation",
  "Climate Resilience and Adaptation": "climate-resilience-and-adaptation",
  "Private Sector Development & Financial Inclusion": "private-sector-and-financial-inclusion",
  "Private Sector Development and Financial Inclusion": "private-sector-and-financial-inclusion",
  "Context-Driven Digital Solutions: MIS & Social Delivery Systems": "digital-solutions-mis",
  "Preventing and Countering Violent Extremism (PCVE), Peacebuilding and Social Cohesion": "pcve-peacebuilding-social-cohesion",
  "Security Sector Reform (SSR), Political Risk and Geopolitical Analysis": "ssr-political-risk-geopolitical",
};

export const slugifyTitle = (title: string): string => {
  if (TITLE_TO_SLUG[title]) return TITLE_TO_SLUG[title];
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

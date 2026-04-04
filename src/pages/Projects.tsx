import { useState } from "react";
import PageHero from "@/components/PageHero";
import { X } from "lucide-react";

const pastProjects = [
  {
    id: 1,
    title: "Save the Children - El Nino Case Study",
    subtitle: "Capturing Learning Approach and Impact (Qualitative Study)",
    client: "Save the Children",
    desc: "The study aimed to investigate the impact of the El Niño floods on communities residing in Beledweyne town and riverine communities that come under the Beledweyn district. It is intended to gather substantial evidence regarding the efficacy of community-led anticipatory actions in reducing the impacts of El Niño on vulnerable communities and facilitating prompt recovery post-shock.",
  },
  {
    id: 2,
    title: "Gargaara Finance Limited - Third Party Monitoring Services",
    subtitle: "Enhancing Financial Capacity and MSME Support Project Across Somalia",
    client: "Gargaara Finance / World Bank",
    desc: "Tigaal Consulting serve as the strategic partner offering third-party monitoring services for the Gargaara Finance Limited project. This initiative is dedicated to enhancing the capacity of Somalia's financial sector and providing vital support to Micro, Small, and Medium Enterprises (MSMEs) across Somalia. Tigaal's role is to ensure that the project adheres to its goals and objectives, delivering comprehensive monitoring and evaluation to facilitate transparent and effective progress. Gargaara Finance Limited, an apex financial institution established with the backing of the Federal Government of Somalia and international partners like the World Bank, focuses on providing concessionary financing to commercial banks and micro-financial institutions. The project targets key productive sectors such as agriculture, livestock, fishery, and renewable energy, with plans to expand into health, education, and tourism. By leveraging Tigaal Consulting's expertise in third-party monitoring, the project aims to achieve significant milestones in financial inclusion, entrepreneurship, and economic growth. This partnership will enhance the project's accountability, providing critical insights and data to drive continuous improvement and impactful outcomes for MSMEs in Somalia.",
  },
  {
    id: 3,
    title: "Shaqo Consortium - Comprehensive TPM Services (2023 - 2025)",
    client: "Netherlands Embassy",
    desc: "The Shaqo Consortium operates on a three-year, $4,242,400 grant from the Embassy of the Kingdom of the Netherlands. This program's primary aim is to establish sustainable livelihood avenues for the vast number of unemployed Somali youth aged 15-25, either by creating jobs or connecting them to quality employment opportunities in Somalia. In support of this mission, Tigaal provides strategic monitoring and evaluation services for the consortium. Additionally, Tigaal is at the forefront of developing a dedicated M&E management systems portal to enhance the consortium's operational efficiency.",
  },
  {
    id: 4,
    title: "Saferworld - Comprehensive Analysis & Dashboard Design",
    subtitle: "Violence Incident Reporting System (2023)",
    client: "Saferworld",
    desc: "For Saferworld, we delved deep into the data concerning incidents of violence against women and girls in Mogadishu, Baidoa, Kismayo, and Wajid. Drawing from our analysis, we designed tailored incident reporting dashboards, offering clear and real-time insights. These dashboards not only enhanced understanding of the incidents but also significantly informed and guided Saferworld's on-ground implementation and intervention strategies in these areas.",
  },
  {
    id: 5,
    title: "Supreme Court of Somalia - Strategic Communication (2024)",
    client: "Supreme Court of Somalia",
    desc: "TIGAAL developed a comprehensive communication strategy for the Judiciary of Somalia under the leadership of the Supreme Court. The strategy was designed to strengthen citizen-centered engagement, enhance transparency, and promote public trust in the justice system. It provided clear frameworks for institutional messaging, stakeholder outreach, and media engagement, positioning the judiciary as more accessible, accountable, and responsive to the needs of Somali citizens.",
  },
  {
    id: 6,
    title: "Expanding Access to Justice Program - Strategic Communication Support",
    client: "Expanding Access to Justice",
    desc: "We provided strategic communication support for the Expanding Access to Justice Program in Somalia, effectively showcasing the project's key achievements and performances. Our expertise amplified the program's milestones, promoting its significant contributions to creating a more transparent and accessible justice system in the country.",
  },
  {
    id: 7,
    title: "Saferworld - Baseline Study",
    subtitle: "Strengthening Participation and Safety of Women Activists and Journalists in Baidoa, Kismayoa and Mogadishu",
    client: "Saferworld",
    desc: "Tigaal conducted a baseline assessment in partnership with Saferworld, Somali Women's Study Centre (SWSC), and Somali Women Development Centre (SWDC). This study focused on understanding the unique challenges and barriers facing women journalists and activists in South-West, Jubaland, and Mogadishu, Somalia, aiming to enhance their safety and civic participation in peacebuilding and political processes.",
  },
  {
    id: 8,
    title: "Iftiin Foundation - Streamlined M&E System Design",
    client: "Iftiin Foundation",
    desc: "Tigaal collaborated with Iftiin Foundation to design robust Monitoring and Evaluation (M&E) systems, streamlining their impact assessment and ensuring effective program implementation, catering to the foundation's commitment to transformative community initiatives.",
  },
  {
    id: 9,
    title: "Candlelight - Market-Driven Skills & Investable Business Opportunities",
    client: "Candlelight",
    desc: "The focus of this study was to identify key market-based sectors ripe for investment and to tailor TVET programs accordingly. Through this initiative, Tigaal aimed to bridge the gap between the current workforce skills and the demands of the market, ensuring that the local talent pool is equipped with relevant, up-to-date skills that align with the opportunities available in the region's growing economy.",
  },
  {
    id: 10,
    title: "IGAD CAEP - Scoping Study (2024)",
    client: "IGAD CAEP",
    desc: "TIGAAL conducted a scoping study for the IGAD Centre of Excellence for Climate Change Adaptation and Environmental Protection (IGAD CAEP). The study mapped key stakeholders, assessed institutional capacities, and identified priority areas for strengthening regional cooperation on climate change adaptation and environmental protection. The findings provided an evidence-based foundation to guide IGAD CAEP's future programming and strategic engagement.",
  },
  {
    id: 11,
    title: "Central Bank of Somalia - State of Financial Inclusion Report (2024)",
    client: "Central Bank of Somalia",
    desc: "TIGAAL supported the Central Bank of Somalia in preparing the State of Financial Inclusion Report, providing in-depth analysis of access to and usage of financial services across the country. The report highlighted gaps, opportunities, and policy recommendations to expand inclusive finance, strengthen regulatory frameworks, and enhance financial literacy, serving as a key reference for national strategies and stakeholder engagement in the financial sector.",
  },
  {
    id: 12,
    title: "Life and Peace Institute (LPI) - Strategic Communications Plan Development",
    client: "Life & Peace Institute",
    desc: "TIGAAL led the development of a Strategic Communications Plan for the Life & Peace Institute (LPI) in Somalia, under a European Union-funded initiative implemented jointly with Somali Public Agenda. The assignment involved participatory workshops with LPI, SPA, and civil society partners across Federal Member States and Mogadishu, resulting in a tailored communications strategy that aligned with LPI's 2023-2028 Strategic Plan and Somalia's broader peacebuilding and reconciliation efforts. Our work included designing consultative methodologies, facilitating workshops, developing policy and peace messaging frameworks, and creating tools for content validation to ensure conflict-sensitive and inclusive communication. We also provided training to CSO networks on communication capacity, social media engagement, and peace narrative development. The strategy enhanced visibility, strengthened stakeholder engagement, and amplified community voices in national policy and reconciliation processes.",
  },
];

const currentProjects = [
  {
    id: 13,
    title: "SCRP Management Information System (MIS) - UNOPS/World Bank",
    subtitle: "Provision of Consultancy Services for Maintenance, Enhancement, and Capacity Building",
    client: "UNOPS / World Bank",
    desc: "TIGAAL is currently undertaking the provision of consultancy services for the maintenance, enhancement, and capacity building of the Somali Crisis Recovery Project (SCRP) Management Information System (MIS) under a contract financed by the World Bank and administered through UNOPS. The assignment focuses on ensuring the continued functionality, performance, and responsiveness of the SCRP MIS, while introducing targeted system improvements and strengthening the capacity of project stakeholders to effectively manage, use, and sustain the platform. Through this engagement, TIGAAL is supporting improved data management, operational efficiency, and evidence-based implementation of the SCRP.",
    active: true,
  },
  {
    id: 14,
    title: "CARE Somalia - Third-Party Monitoring (TPM) Services (2024-2026)",
    subtitle: "Multi-Sectoral Humanitarian Response Targeting IDPs, Returnees and Host Communities",
    client: "CARE Somalia",
    desc: "TIGAAL is currently undertaking a third-party monitoring assignment for CARE Somalia's GAC-funded humanitarian response project in Banadir and Galgaduud, focused on independently verifying implementation progress, service delivery quality, and reported results across health, nutrition, protection, and cash assistance interventions for IDPs, returnees, and host communities.",
    active: true,
  },
  {
    id: 15,
    title: "Life and Peace Institute (LPI) - Communications Consultancy",
    subtitle: "Strategic Communications Plan Development (Ongoing)",
    client: "Life & Peace Institute",
    desc: "TIGAAL is currently leading the development of a Strategic Communications Plan for the Life & Peace Institute (LPI) in Somalia, under a European Union-funded initiative implemented jointly with Somali Public Agenda. The assignment involved participatory workshops with LPI, SPA, and civil society partners across Federal Member States and Mogadishu, resulting in a tailored communications strategy that aligned with LPI's 2023-2028 Strategic Plan and Somalia's broader peacebuilding and reconciliation efforts. Our work included designing consultative methodologies, facilitating workshops, developing policy and peace messaging frameworks, and creating tools for content validation to ensure conflict-sensitive and inclusive communication. We also provided training to CSO networks on communication capacity, social media engagement, and peace narrative development. The strategy enhanced visibility, strengthened stakeholder engagement, and amplified community voices in national policy and reconciliation processes.",
    active: true,
  },
];

const Projects = () => {
  const [tab, setTab] = useState<"past" | "current">("past");
  const [selectedProject, setSelectedProject] = useState<typeof pastProjects[0] | null>(null);

  const projects = tab === "past" ? pastProjects : currentProjects;

  return (
    <main>
      <PageHero title="Our Projects" subtitle="Tailored Solutions to Complex Problems" breadcrumb="Projects" />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tab Filters */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setTab("past")}
              className={`px-8 py-3 rounded-md font-semibold transition-colors ${
                tab === "past" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Past Projects
            </button>
            <button
              onClick={() => setTab("current")}
              className={`px-8 py-3 rounded-md font-semibold transition-colors relative ${
                tab === "current" ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              Current Projects
            </button>
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="text-left bg-background border border-border rounded-xl p-6 hover:shadow-lg hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-accent text-sm font-semibold">
                    {tab === "past" ? `${String(i + 1).padStart(2, "0")}` : ""}
                  </span>
                  {"active" in project && project.active && (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-accent">
                      <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                      Active
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.client}</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{project.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm" onClick={() => setSelectedProject(null)}>
          <div className="bg-background rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <span className="text-accent text-sm font-semibold">{selectedProject.client}</span>
              <button onClick={() => setSelectedProject(null)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{selectedProject.title}</h2>
            {"subtitle" in selectedProject && selectedProject.subtitle && (
              <h3 className="text-lg text-muted-foreground mb-4">{selectedProject.subtitle}</h3>
            )}
            <p className="text-muted-foreground leading-relaxed">{selectedProject.desc}</p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Projects;

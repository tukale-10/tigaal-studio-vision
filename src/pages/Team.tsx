import { useState } from "react";
import PageHero from "@/components/PageHero";
import { ChevronDown, ChevronUp } from "lucide-react";

const teamMembers = [
  {
    name: "Ahmed Ran",
    title: "Research & Business Development Manager",
    bio: "Ahmed Ran is Practice Lead for Private Sector Development at TIGAAL Consulting and an independent research, monitoring and evaluation, and private sector development specialist with 10 years of experience working across Somalia, Ethiopia, Kenya, and the wider Horn of Africa, with additional project experience in the UK and Turkey. He has built a strong track record leading complex assessments, data systems, and market research assignments for development institutions and bilateral donors, including DANIDA, USAID, the World Bank, IFC, the Netherlands Government, FCDO, SDC, and FAO, amongst others. His work spans the full research and MEL cycle, from instrument design and large-scale field data collection through to analysis, data systems integration, and donor reporting, covering private sector development, value chain and market systems analysis, climate-adaptive sectors, livelihoods programming, and sustainability assessments. Technically, he is proficient across the qualitative and quantitative data analysis and collection tools including STATA, Power BI, NVivo, and ODK, and has designed and built data management systems and real-time reporting dashboards used by major international organisations. Ahmed holds a First Class BSc in International Business from Kingston University, London, and is a native English and Somali speaker.",
  },
  {
    name: "Simon Robins",
    title: "Expert Advisor",
    bio: "Simon Robins combines 15 years of academic research and consulting, focusing on humanitarian protection, human rights, and transitional justice. He's actively involved in evaluation and program support, especially in post-conflict states, working closely with international agencies like the UN and NGOs. Simon serves as the Research Advisor for the International Committee of the Red Cross Missing Persons Centre and is a Senior Research Fellow at the University of York. He offers policy and programmatic guidance, often concentrating on protection and the rule of law. Simon's academic pursuits prioritize victims' needs in conflict aftermath, exploring victim-centered and therapeutic methods related to histories of violence. His research critically assesses transitional justice, with significant attention to those missing in armed conflicts and dead migrants at the EU's southern border. Simon's extensive field experience spans Nepal, Tunisia, sub-Saharan Africa, and Asia.",
  },
  {
    name: "Abdishakur Diriye",
    title: "Strategic Research Advisor",
    bio: "Abdishakur Diriye is a PhD student at the University of Edinburgh and the Jameel Observatory, specializing in climate change and food security for pastoral livelihoods. He has over seven years of academic and professional experience in Somalia, the UK, and China. Abdishakur has published several research papers on sustainable land use policies and has expertise in econometric modeling, statistical analysis, and data visualization using Python, RStudio, QGIS, Stata, and SPSS. His previous roles include climate change and environmental policy officer, environmental policy research assistant, and sustainable energy consultant. Currently, he focuses on anticipatory action and forecast-based microfinancing programs, such as drought index insurance for Somali pastoral resilience. He also supports TIGAAL as a strategic research advisor and lead researcher on climate-related projects.",
  },
  {
    name: "Ali Mohamed Salah",
    title: "Third-Party Monitoring Specialist",
    bio: "Ali Mohamed Salah is a seasoned Third-Party Monitoring Specialist at Tigaal Consulting. With over a decade of extensive experience in international development, Ali excels in designing, managing, and evaluating multi-sectoral and multi-stakeholder policy processes. His expertise spans governance, human capital development, economic and social development, with a particular focus on health, nutrition, fisheries, education, and durable solutions. Ali's previous roles include significant positions such as Program Manager at World Vision Somalia, M&E Analyst at UN FAO Somalia, and MEARL Adviser at the Ministry of Planning, Investment, and Economic Development in Puntland. Currently, he leverages his profound contextual understanding of Somalia's political dynamics, humanitarian trends, and institutional challenges to drive impactful monitoring and evaluation initiatives at Tigaal Consulting.",
  },
  {
    name: "Khali Jamah",
    title: "Communication Lead",
    bio: "Khali Jamah boasts over four years in strategic communications, document translation, and media consulting in the Horn of Africa's dynamic contexts. With a knack for producing top-tier media products, she thrives under pressure, leveraging her interpersonal skills and multicultural exposure. Khali has collaborated with several renowned local and international organizations. As Tigaal's lead for communication and stakeholder analyses, she ensures effective branding and messaging across projects. She earned her Bachelor's in International Relations from the University of Nairobi and is pursuing an online Master's in Project Planning and Management. Khali is native in Somali and fluent in English and Kiswahili.",
  },
  {
    name: "Ibrahim Isse Abdulle",
    title: "Somalia SME Policy & Stakeholder Engagement Specialist",
    bio: "Ibrahim Isse Abdulle is TIGAAL's Somalia SME Policy and Stakeholder Engagement Specialist bringing over ten years of experience at the intersection of public sector reform, SME development, and private sector engagement in Somalia. He has spent his career at Somalia's Ministry of Commerce and Industry, progressing from Business Environment and SME Development Advisor to Director of Promotion of SMEs and Cooperatives, and currently serving as Head of Planning and Policy, a trajectory that has given him unmatched institutional knowledge of Somalia's MSME policy landscape, business registration environment, and regulatory framework. In his roles at MoCI, he developed Somalia's National MSMEs Policy, led regulatory reforms to improve the business environment for startups and SMEs, coordinated multi-stakeholder programmes funded by international donors, and contributed directly to capacity-building initiatives covering ESG principles and green entrepreneurship. He holds a Master of Global Innovation Studies from Toyo University, Japan, and a Digital Finance certification from Frankfurt School of Finance and Management. On this assignment, Ibrahim leads SME identification and outreach across Shuraako Capital's portfolio, drawing on his government networks and deep knowledge of Somalia's private sector landscape, and contributes to the governance dimension of the assessment framework.",
  },
  {
    name: "Guled Abdi",
    title: "ESG & Private Sector Development Specialist",
    bio: "Guled Abdi is an ESG and private sector development specialist with over 10 years of experience working in SME development, investment advisory, and sustainability in fragile and pastoralist contexts in Ethiopia, particularly in the Somali Region. He has worked with the World Bank Group (IFC) and FAO on ESG-aligned investment models, value chain analysis, and private sector engagement, supporting businesses to meet environmental and social standards while improving commercial viability. As the Founder of Barwaqo Consultancy, he has led business assessments, feasibility studies, and enterprise support initiatives for SMEs and development programs. In recent years, he has also focused on regenerative agriculture and climate-resilient systems, providing practical sustainability solutions to farmers and agribusinesses. Guled holds an MBA in Impact Entrepreneurship and is fluent in Somali, Amharic, and English.",
  },
  {
    name: "Ridwan Tukale",
    title: "Communications & Digital Strategy Specialist",
    bio: "Eight years of experience in strategic communications, media production, and digital strategy across Somalia, Somaliland, and Ethiopia, working with major donor-funded programmes including USAID, EU, UN agencies, and international NGOs. Specializes in visibility and documentation for complex development programmes, human interest storytelling, brand identity systems, and multimedia content production. Brings a technical edge with a computer science background, enabling data-driven communications approaches and digital tool development for M&E reporting and programme visibility. Has produced communication strategies, field documentation, and stakeholder engagement campaigns for organizations including FAO, IOM, and World Vision. At Tigaal, Ridwan leads communications and content strategy across client engagements, ensuring programme achievements are effectively captured, packaged, and amplified to donor and public audiences. Fluent in English, Somali, Arabic, and Amharic.",
  },
];

const Team = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <main>
      <PageHero title="Our Team" breadcrumb="Our Team" />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed text-center mb-14 max-w-4xl mx-auto">
            TIGAAL's strength lies in the calibre and diversity of its team. Our professionals bring decades of combined experience across research, monitoring and evaluation, governance advisory, climate science, strategic communications, and institutional development. Each team member combines international standards of practice with deep contextual knowledge of Somalia and the broader Horn of Africa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="bg-background border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-xl">{member.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
                    <p className="text-accent text-sm font-medium">{member.title}</p>
                  </div>
                </div>
                <p className={`text-muted-foreground text-sm leading-relaxed ${expandedIndex === i ? "" : "line-clamp-3"}`}>
                  {member.bio}
                </p>
                <button
                  onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  className="flex items-center gap-1 mt-3 text-accent text-sm font-medium hover:underline"
                >
                  {expandedIndex === i ? (
                    <>Show Less <ChevronUp size={14} /></>
                  ) : (
                    <>Read More <ChevronDown size={14} /></>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Team;

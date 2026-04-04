import PageHero from "@/components/PageHero";
import { FileText, Download, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const publications = [
  {
    type: "Policy Brief",
    title: "Shock-Responsive Social Protection in Somalia: Lessons from Practice",
    description: "This brief examines the design and delivery of social safety nets in fragile and post-conflict settings, drawing on Tigaal's practical experience in Somalia's social protection landscape.",
    year: "2026",
  },
  {
    type: "Research Paper",
    title: "El Niño Floods Impact Study: Community-Led Anticipatory Actions in Beledweyne",
    description: "A qualitative study investigating the impact of El Niño floods on riverine communities and the efficacy of anticipatory actions in reducing disaster impacts and facilitating recovery.",
    year: "2025",
  },
  {
    type: "Assessment Report",
    title: "Somalia Business Environment: Investment Opportunities and Challenges",
    description: "A comprehensive assessment of Somalia's evolving business environment, analyzing sectors ripe for investment including manufacturing, technology, hospitality, and agri-farming.",
    year: "2025",
  },
  {
    type: "Learning Brief",
    title: "Capacity Development in Governance: A Practitioner's Guide",
    description: "Drawing from our governance and rule of law portfolio, this guide outlines practical approaches to institutional capacity building in fragile state contexts.",
    year: "2025",
  },
  {
    type: "Evaluation Report",
    title: "Third-Party Monitoring of Financial Inclusion Programmes in Somalia",
    description: "An independent evaluation of loan portfolio performance and financial inclusion outcomes, providing evidence-based recommendations for programme improvement.",
    year: "2024",
  },
  {
    type: "Strategy Paper",
    title: "Climate Resilience & Adaptation: A Framework for the Horn of Africa",
    description: "A strategic framework for climate-responsive policies and regulatory mechanisms, developed in collaboration with government and development partners across the region.",
    year: "2024",
  },
];

const typeColors: Record<string, string> = {
  "Policy Brief": "bg-accent/10 text-accent",
  "Research Paper": "bg-accent/10 text-accent",
  "Assessment Report": "bg-accent/10 text-accent",
  "Learning Brief": "bg-accent/10 text-accent",
  "Evaluation Report": "bg-accent/10 text-accent",
  "Strategy Paper": "bg-accent/10 text-accent",
};

const Publications = () => {
  return (
    <main>
      <PageHero title="Publications" subtitle="Research papers, policy briefs, and learning documents from our work" breadcrumb="Resources" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="space-y-6">
            {publications.map((pub, i) => (
              <article
                key={i}
                className="group relative grid md:grid-cols-[1fr_auto] gap-8 items-center bg-secondary rounded-sm p-8 lg:p-10 border border-border hover:border-accent/30 transition-all duration-500"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-xs font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-sm ${typeColors[pub.type] || "bg-accent/10 text-accent"}`}>
                      {pub.type}
                    </span>
                    <span className="text-muted-foreground/50 text-sm">{pub.year}</span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-foreground mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                    {pub.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pub.description}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 bg-accent/10 group-hover:bg-accent/20 rounded-sm flex items-center justify-center transition-colors duration-300">
                    <BookOpen className="text-accent" size={22} />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-accent group-hover:w-full transition-all duration-500" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Interested in our research?</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">
            Contact us to request full copies of our publications or discuss potential research collaborations.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Request Publications <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Publications;

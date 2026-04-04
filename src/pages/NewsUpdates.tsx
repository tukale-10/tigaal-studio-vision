import PageHero from "@/components/PageHero";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const newsItems = [
  {
    date: "March 2026",
    category: "Project Update",
    title: "Tigaal Completes Third-Party Monitoring for Gargaara Finance Limited",
    excerpt: "Our team successfully delivered comprehensive third-party monitoring services for Gargaara Finance Limited, assessing loan portfolio performance and financial inclusion outcomes across Somalia.",
  },
  {
    date: "February 2026",
    category: "Partnership",
    title: "New Partnership with UNOPS on Governance Programme",
    excerpt: "Tigaal has been selected to support UNOPS in delivering capacity development and strategic advisory services as part of a multi-year governance and rule of law programme in South-Central Somalia.",
  },
  {
    date: "January 2026",
    category: "Training",
    title: "Communications Training for Save the Children Staff",
    excerpt: "Tigaal delivered a comprehensive communications training programme for Save the Children's Somalia office, building capacity in strategic messaging, crisis communications, and media relations.",
  },
  {
    date: "December 2025",
    category: "Research",
    title: "El Niño Impact Case Study Published",
    excerpt: "Our qualitative study investigating the impact of El Niño floods on communities in Beledweyne has been published, providing evidence on the efficacy of community-led anticipatory actions.",
  },
  {
    date: "November 2025",
    category: "Event",
    title: "Tigaal Hosts Stakeholder Forum on Climate Resilience",
    excerpt: "We convened key stakeholders from government, development partners, and civil society to discuss climate-responsive policies and adaptation strategies for the Horn of Africa region.",
  },
  {
    date: "October 2025",
    category: "Milestone",
    title: "Expanding Our Team — New Hires in M&E and Policy Research",
    excerpt: "Tigaal welcomes new team members specializing in monitoring & evaluation and policy research, strengthening our capacity to deliver high-quality advisory services across Somalia.",
  },
];

const NewsUpdates = () => {
  return (
    <main>
      <PageHero title="News & Updates" subtitle="Latest developments, project milestones, and announcements from Tigaal" breadcrumb="Resources" />

      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <article
                key={i}
                className="group relative bg-secondary rounded-sm overflow-hidden border border-border hover:border-accent/30 transition-all duration-500"
              >
                <div className="p-8 lg:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl text-foreground mb-4 leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground/60 text-sm">
                    <Calendar size={14} />
                    <span>{item.date}</span>
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
          <h2 className="font-display text-3xl md:text-4xl text-primary-foreground mb-6">Stay Informed</h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">
            Want to stay updated on our latest work? Reach out to join our mailing list.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-10 py-4 bg-accent text-accent-foreground font-semibold rounded-sm hover:bg-accent/90 transition-all"
          >
            Get In Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default NewsUpdates;

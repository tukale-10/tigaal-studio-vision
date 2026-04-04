import PageHero from "@/components/PageHero";

const partnerCategories = [
  {
    category: "International Organizations",
    partners: ["World Bank", "UNOPS", "Save the Children", "CARE", "Saferworld", "Life & Peace Institute", "IDLO"],
  },
  {
    category: "Government Bodies",
    partners: ["Central Bank of Somalia", "Supreme Court of Somalia", "Ministry of Youth & Sports", "Ministry of Commerce & Industry"],
  },
  {
    category: "Regional & Local Partners",
    partners: ["IGAD CAEP", "iRise", "Shaqo Platform", "Iftiin Foundation", "Nagaasho", "Expanding Access to Justice", "Candlelight", "Gargaara Finance", "Netherlands Ministry of Foreign Affairs"],
  },
];

const Partners = () => {
  return (
    <main>
      <PageHero title="Our Partners" breadcrumb="Partners" />

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <p className="text-lg text-muted-foreground leading-relaxed text-center mb-14">
            TIGAAL takes pride in its strategic collaborations with leading international organizations, government bodies, and development actors. These partnerships enable us to deliver impact at scale and ensure our work remains relevant, rigorous, and responsive to evolving needs.
          </p>

          {partnerCategories.map((cat) => (
            <div key={cat.category} className="mb-12">
              <h2 className="text-2xl font-bold text-foreground mb-6 pb-2 border-b-2 border-accent/30">{cat.category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cat.partners.map((partner) => (
                  <div key={partner} className="bg-secondary border border-border rounded-xl p-6 flex items-center justify-center text-center min-h-[100px]">
                    <span className="text-sm font-semibold text-foreground">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Partners;

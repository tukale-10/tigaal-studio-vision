import acted from "@/assets/partners/acted.png.asset.json";
import candlelight from "@/assets/partners/candlelight.jpeg";
import care from "@/assets/partners/care.png";
import cbs from "@/assets/partners/cbs.png";
import gargaara from "@/assets/partners/gargaara.png";
import idlo from "@/assets/partners/idlo.png";
import iftiin from "@/assets/partners/iftiin.jpg";
import igad from "@/assets/partners/igad.png";
import irise from "@/assets/partners/irise.png";
import lpi from "@/assets/partners/lpi.jpg";
import moci from "@/assets/partners/moci.png";
import moys from "@/assets/partners/moys.png";
import nagaasho from "@/assets/partners/nagaasho.png";
import netherlands from "@/assets/partners/netherlands.png";
import saferworld from "@/assets/partners/saferworld.jpg";
import savethechildren from "@/assets/partners/savethechildren.jpg";
import shaqo from "@/assets/partners/shaqo.jpg";
import smrrc from "@/assets/partners/smrrc.png.asset.json";
import supremecourt from "@/assets/partners/supremecourt.jpg";
import unops from "@/assets/partners/unops.png";
import worldbank from "@/assets/partners/worldbank.png";

export type ClientLogo = {
  name: string;
  logo?: string;
  aliases?: string[];
};

export const clientLogoGroups: { category: string; clients: ClientLogo[] }[] = [
  {
    category: "International Organizations",
    clients: [
      { name: "ACTED", logo: acted.url, aliases: ["ACTED Somalia"] },
      { name: "World Bank", logo: worldbank },
      { name: "UNOPS", logo: unops },
      { name: "Save the Children", logo: savethechildren },
      { name: "CARE", logo: care, aliases: ["CARE Somalia"] },
      { name: "Saferworld", logo: saferworld },
      { name: "IDLO", logo: idlo },
      { name: "Life & Peace Institute", logo: lpi, aliases: ["Life and Peace Institute", "LPI"] },
    ],
  },
  {
    category: "Government Bodies",
    clients: [
      { name: "Ministry of Youth & Sports", logo: moys },
      { name: "Netherlands Ministry of Foreign Affairs", logo: netherlands, aliases: ["Netherlands MFA", "Netherlands Embassy"] },
      { name: "Central Bank of Somalia", logo: cbs },
      { name: "Supreme Court of Somalia", logo: supremecourt },
      { name: "Ministry of Commerce & Industry", logo: moci },
      { name: "Somali Marine Resources Research Center (SMRRC)", logo: smrrc.url, aliases: ["SMRRC"] },
    ],
  },
  {
    category: "Regional & Local Partners",
    clients: [
      { name: "IGAD CAEP", logo: igad },
      { name: "Iftiin Foundation", logo: iftiin },
      { name: "Nagaasho", logo: nagaasho },
      { name: "Candlelight", logo: candlelight },
      { name: "Shaqo Platform", logo: shaqo, aliases: ["Shaqo Consortium"] },
      { name: "iRise", logo: irise },
      { name: "Gargaara Finance", logo: gargaara },
      { name: "Expanding Access to Justice" },
    ],
  },
];

export const clientsWithLogos = clientLogoGroups.flatMap((group) => group.clients).filter((client) => client.logo);

const normalize = (value: string) => value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

export const getClientLogo = (clientName?: string | null): string | undefined => {
  if (!clientName) return undefined;
  const normalizedClient = normalize(clientName);

  const match = clientsWithLogos.find((client) =>
    [client.name, ...(client.aliases || [])].some((name) => {
      const normalizedName = normalize(name);
      return normalizedClient === normalizedName || normalizedClient.includes(normalizedName);
    }),
  );

  return match?.logo;
};
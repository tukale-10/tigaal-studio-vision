import mapAsset from "@/assets/tigaal-reach-map.png.asset.json";

const COUNTRY_NAMES: Record<string, string> = {
  SO: "Somalia",
  KE: "Kenya",
  ET: "Ethiopia",
  SD: "Sudan",
  SS: "South Sudan",
  ER: "Eritrea",
  DJ: "Djibouti",
  UG: "Uganda",
};

interface Props {
  active: string[];
}

const HornOfAfricaMap = ({ active }: Props) => {
  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden rounded-sm bg-background">
        <img
          src={mapAsset.url}
          alt="TIGAAL Reach — Somalia, Kenya, Ethiopia"
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {active.map((code) => (
          <span
            key={code}
            className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {COUNTRY_NAMES[code] || code}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HornOfAfricaMap;

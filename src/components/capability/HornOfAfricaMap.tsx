// Stylized SVG map of the Horn of Africa & neighbours.
// Highlights countries by ISO-2 codes provided in `active`.
// Coordinates are hand-tuned for a clean, on-brand illustration — not geographically perfect.

interface Country {
  code: string;
  name: string;
  // approximate polygon path (in viewBox 0 0 600 500 space)
  d: string;
  labelX: number;
  labelY: number;
}

const COUNTRIES: Country[] = [
  { code: "SD", name: "Sudan", d: "M120 60 L320 60 L340 130 L300 180 L240 200 L160 180 L120 140 Z", labelX: 220, labelY: 130 },
  { code: "SS", name: "South Sudan", d: "M160 180 L240 200 L300 180 L290 240 L210 260 L160 240 Z", labelX: 225, labelY: 225 },
  { code: "ER", name: "Eritrea", d: "M320 60 L420 80 L430 140 L370 150 L340 130 Z", labelX: 380, labelY: 110 },
  { code: "DJ", name: "Djibouti", d: "M430 140 L470 150 L470 180 L430 175 Z", labelX: 450, labelY: 165 },
  { code: "ET", name: "Ethiopia", d: "M300 180 L340 130 L370 150 L430 175 L470 180 L470 230 L420 280 L340 290 L290 240 Z", labelX: 380, labelY: 220 },
  { code: "SO", name: "Somalia", d: "M420 280 L500 240 L560 260 L540 360 L460 440 L400 400 L380 340 L340 290 Z", labelX: 470, labelY: 340 },
  { code: "KE", name: "Kenya", d: "M210 260 L290 240 L340 290 L380 340 L360 420 L260 430 L210 380 Z", labelX: 290, labelY: 350 },
  { code: "UG", name: "Uganda", d: "M160 240 L210 260 L210 380 L160 360 L140 300 Z", labelX: 180, labelY: 320 },
];

interface Props {
  active: string[];
}

const HornOfAfricaMap = ({ active }: Props) => {
  const isActive = (code: string) => active.includes(code);

  return (
    <div className="relative w-full">
      <svg viewBox="0 0 600 500" className="w-full h-auto" role="img" aria-label="TIGAAL operational regions">
        {/* dotted grid background */}
        <defs>
          <pattern id="grid" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.7" fill="hsl(var(--accent) / 0.18)" />
          </pattern>
        </defs>
        <rect width="600" height="500" fill="url(#grid)" />

        {/* country shapes */}
        {COUNTRIES.map((c) => (
          <g key={c.code}>
            <path
              d={c.d}
              fill={isActive(c.code) ? "hsl(var(--accent))" : "hsl(var(--primary) / 0.85)"}
              stroke="hsl(var(--background))"
              strokeWidth={1.5}
              opacity={isActive(c.code) ? 0.95 : 0.45}
            />
            <text
              x={c.labelX}
              y={c.labelY}
              textAnchor="middle"
              fontSize={isActive(c.code) ? 13 : 11}
              fontWeight={isActive(c.code) ? 700 : 500}
              fill={isActive(c.code) ? "hsl(var(--accent-foreground))" : "hsl(var(--primary-foreground) / 0.6)"}
              style={{ letterSpacing: "0.05em" }}
            >
              {c.name.toUpperCase()}
            </text>
            {isActive(c.code) && (
              <circle cx={c.labelX} cy={c.labelY + 12} r={3} fill="hsl(var(--accent-foreground))" />
            )}
          </g>
        ))}

        {/* compass */}
        <g transform="translate(540, 40)">
          <circle r="20" fill="hsl(var(--background))" stroke="hsl(var(--accent))" strokeWidth="1" />
          <text textAnchor="middle" y="-6" fontSize="9" fill="hsl(var(--muted-foreground))">N</text>
          <line x1="0" y1="-12" x2="0" y2="12" stroke="hsl(var(--accent))" strokeWidth="1" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="hsl(var(--accent))" strokeWidth="0.5" />
        </g>
      </svg>

      <div className="mt-6 flex flex-wrap gap-2">
        {COUNTRIES.filter((c) => isActive(c.code)).map((c) => (
          <span key={c.code} className="inline-flex items-center gap-2 text-xs font-medium text-accent bg-accent/10 px-3 py-1.5 rounded-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {c.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HornOfAfricaMap;

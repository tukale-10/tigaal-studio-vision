import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";
import type { StatPoint } from "@/content/capabilities";

interface Props {
  stats: StatPoint[];
}

const StatsChart = ({ stats }: Props) => {
  const data = stats.map((s) => ({ name: s.label, value: s.value, suffix: s.suffix || "" }));

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 12, left: 0, bottom: 8 }}>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
            interval={0}
            angle={-12}
            textAnchor="end"
            height={70}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--accent) / 0.08)" }}
            contentStyle={{
              background: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "2px",
              fontSize: "12px",
            }}
            formatter={(value: number, _name, props) => [`${value.toLocaleString()}${props.payload.suffix}`, "Value"]}
          />
          <Bar dataKey="value" radius={[2, 2, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill="hsl(var(--accent))" fillOpacity={0.85 - i * 0.08} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatsChart;

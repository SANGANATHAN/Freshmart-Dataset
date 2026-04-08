import { RetailRecord } from "@/hooks/useRetailData";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--muted-foreground))",
];

const CityProfitChart = ({ data }: { data: RetailRecord[] }) => {
  const grouped = data.reduce<Record<string, number>>((acc, r) => {
    acc[r.outletCity] = (acc[r.outletCity] || 0) + r.profit;
    return acc;
  }, {});

  const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);
  const top5 = sorted.slice(0, 5);
  const othersTotal = sorted.slice(5).reduce((s, [, v]) => s + v, 0);
  const chartData = [
    ...top5.map(([name, value]) => ({ name, value: Math.round(value) })),
    ...(othersTotal > 0 ? [{ name: "Others", value: Math.round(othersTotal) }] : []),
  ];

  return (
    <div className="bg-card rounded-xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Profit by City</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} strokeWidth={2}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Profit"]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CityProfitChart;

import { RetailRecord } from "@/hooks/useRetailData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const CategoryChart = ({ data }: { data: RetailRecord[] }) => {
  const grouped = data.reduce<Record<string, number>>((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + r.totalSalesValue;
    return acc;
  }, {});

  const chartData = Object.entries(grouped)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="bg-card rounded-xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Revenue by Category</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} fontSize={12} />
            <YAxis type="category" dataKey="name" width={100} fontSize={12} />
            <Tooltip formatter={(v: number) => [`₹${v.toLocaleString()}`, "Revenue"]} />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryChart;

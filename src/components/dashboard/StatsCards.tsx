import { RetailRecord } from "@/hooks/useRetailData";
import { DollarSign, TrendingUp, Package, Store } from "lucide-react";

const fmt = (n: number) =>
  n >= 1_000_000
    ? `₹${(n / 1_000_000).toFixed(1)}M`
    : n >= 1_000
    ? `₹${(n / 1_000).toFixed(1)}K`
    : `₹${n.toFixed(0)}`;

const StatsCards = ({ data }: { data: RetailRecord[] }) => {
  const totalSales = data.reduce((s, r) => s + r.totalSalesValue, 0);
  const totalProfit = data.reduce((s, r) => s + r.profit, 0);
  const totalQty = data.reduce((s, r) => s + r.quantitySold, 0);
  const outlets = new Set(data.map((r) => r.outletCity)).size;

  const cards = [
    { label: "Total Revenue", value: fmt(totalSales), icon: DollarSign, color: "text-primary" },
    { label: "Total Profit", value: fmt(totalProfit), icon: TrendingUp, color: "text-chart-2" },
    { label: "Units Sold", value: totalQty.toLocaleString(), icon: Package, color: "text-chart-3" },
    { label: "Active Outlets", value: outlets.toString(), icon: Store, color: "text-chart-4" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-card rounded-xl p-5 border border-border"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">{c.label}</span>
            <c.icon className={`w-5 h-5 ${c.color}`} />
          </div>
          <p className="font-heading text-2xl font-bold text-card-foreground">{c.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;

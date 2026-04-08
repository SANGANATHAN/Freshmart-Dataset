import { RetailRecord } from "@/hooks/useRetailData";

const TopProductsTable = ({ data }: { data: RetailRecord[] }) => {
  const top10 = [...data].sort((a, b) => b.totalSalesValue - a.totalSalesValue).slice(0, 10);

  return (
    <div className="bg-card rounded-xl p-6 border border-border" style={{ boxShadow: "var(--shadow-card)" }}>
      <h3 className="font-heading text-lg font-semibold text-card-foreground mb-4">Top 10 Products by Revenue</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left">
              <th className="pb-3 font-medium text-muted-foreground">Product</th>
              <th className="pb-3 font-medium text-muted-foreground">Category</th>
              <th className="pb-3 font-medium text-muted-foreground">Brand</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Revenue</th>
              <th className="pb-3 font-medium text-muted-foreground text-right">Profit</th>
            </tr>
          </thead>
          <tbody>
            {top10.map((r) => (
              <tr key={r.productId} className="border-b border-border/50 last:border-0">
                <td className="py-3 font-medium text-card-foreground">{r.productId}</td>
                <td className="py-3 text-muted-foreground">{r.category}</td>
                <td className="py-3 text-muted-foreground">{r.brand}</td>
                <td className="py-3 text-right text-card-foreground font-medium">₹{r.totalSalesValue.toLocaleString()}</td>
                <td className={`py-3 text-right font-medium ${r.profit >= 0 ? "text-primary" : "text-destructive"}`}>
                  ₹{r.profit.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProductsTable;

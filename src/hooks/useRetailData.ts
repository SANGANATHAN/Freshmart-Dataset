import { useState, useEffect } from "react";

export interface RetailRecord {
  productId: string;
  productName: string;
  category: string;
  brand: string;
  unitPrice: number;
  costPrice: number;
  outletCity: string;
  outletState: string;
  outletSize: string;
  saleDate: string;
  quantitySold: number;
  totalSalesValue: number;
  discount: number;
  profit: number;
  supplierName: string;
  daysOutOfStock: number;
}

export const useRetailData = () => {
  const [data, setData] = useState<RetailRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/freshmart.csv")
      .then((r) => r.text())
      .then((text) => {
        const lines = text.trim().split("\n");
        const records: RetailRecord[] = [];
        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(",");
          if (cols.length < 21) continue;
          records.push({
            productId: cols[0],
            productName: cols[1],
            category: cols[2],
            brand: cols[4],
            unitPrice: +cols[5],
            costPrice: +cols[6],
            outletCity: cols[8],
            outletState: cols[9],
            outletSize: cols[10],
            saleDate: cols[11],
            quantitySold: +cols[12],
            totalSalesValue: +cols[13],
            discount: +cols[14],
            profit: +cols[15],
            supplierName: cols[19],
            daysOutOfStock: +cols[20],
          });
        }
        setData(records);
        setLoading(false);
      });
  }, []);

  return { data, loading };
};

import { useEffect, useState } from "react";
import { getSales, createSale } from "../../../api/sales.api";

export interface SaleItem {
  name: string;
  qty: number;
  price: number;
}

export interface Sale {
  id: number;
  items: SaleItem[];
  total: number;
  date: string;
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSales() {
    const data = await getSales();
    setSales(data);
    setLoading(false);
  }

  async function addSale(sale: Omit<Sale, "id" | "total">) {
    const newSale = await createSale(sale);
    setSales(prev => [...prev, newSale]);
  }

  useEffect(() => {
    fetchSales();
  }, []);

  return { sales, loading, addSale };
}
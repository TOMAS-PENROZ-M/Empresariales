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
export interface createSaleInput {
    items: {
        name: string;
        qty: number;
        price: number;
    }[];
}

export function useSales() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchSales() {
    const data = await getSales();
    setSales(data);
    setLoading(false);
  }

  async function addSale(input: createSaleInput) {
  try {
    const newSale = await createSale(input);

    // actualización optimista simple
    setSales(prev => [...prev, newSale]);

  } catch (error) {
    console.error("Error creando venta:", error);
    throw error;
  }
}

  useEffect(() => {
    fetchSales();
  }, []);

  return { sales, loading, addSale };
}


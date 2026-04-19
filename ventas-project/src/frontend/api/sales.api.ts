import { apiFetch } from "./client";
import type { Sale } from "../features/sales/hooks/useSales";

export async function getSales(): Promise<Sale[]> {
  return apiFetch("/sales");
}

export async function createSale(data: any): Promise<Sale> {
  return apiFetch("/sales", {
    method: "POST",
    body: JSON.stringify(data)
  });
}
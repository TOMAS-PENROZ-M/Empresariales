import { useEffect, useState } from "react";
import { fetchDashboard } from "../../../api/reports.api";

export interface DashboardData {
  totalRevenue: number;
  totalTransactions: number;
  averageSale: number;
  topProducts: { name: string; quantity: number }[];
  productRevenue: { name: string; revenue: number }[];
}

export const useDashboard = (params?: {
  start?: string;
  end?: string;
  limit?: number;
}) => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchDashboard(params);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [params?.start, params?.end, params?.limit]);

  return { data, loading, reload: load };
};
import { getDashboard } from "./client";

export const fetchDashboard = (params?: {
  start?: string;
  end?: string;
  limit?: number;
}) => {
  return getDashboard(params);
};
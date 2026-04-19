import * as repo from "./reports.repository.js";

export async function getProductQuantities(params) {
  const data = await repo.getProductQuantities(params);

  return data.map(item => ({
    name: item.name,
    quantity: item._sum.qty
  }));
}

export async function getProductRevenue(params) {
  return repo.getProductRevenue(params);
}

export async function getTotalRevenue(params) {
  return repo.getTotalRevenue(params);
}

export async function getDashboard(params) {
  const limit = params.limit ? parseInt(params.limit) : 5;  // por default 5 productos en el top

  const MAX_LIMIT = 50;
  
  // Validar y limitar el valor de limit para evitar entregar demasiados datos
  const safeLimit =
    !limit || isNaN(limit) || limit <= 0
      ? 5
      : Math.min(parseInt(limit), MAX_LIMIT);

  const [stats, topProductsRaw, productRevenueRaw] = await Promise.all([
    repo.getSalesStats(params),
    repo.getTopProducts({ ...params, limit: safeLimit }),
    repo.getProductRevenue(params)
  ]);

  const averageSale = stats.totalTransactions
    ? stats.totalRevenue / stats.totalTransactions
    : 0;

  const topProducts = topProductsRaw.map(item => ({
    name: item.name,
    quantity: item._sum.qty
  }));

  const productRevenue = Object.entries(productRevenueRaw).map(
    ([name, revenue]) => ({
      name,
      revenue
    })
  );

  return {
    totalRevenue: stats.totalRevenue,
    totalTransactions: stats.totalTransactions,
    averageSale,
    topProducts,
    productRevenue
  };
}
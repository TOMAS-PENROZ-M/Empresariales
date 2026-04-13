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
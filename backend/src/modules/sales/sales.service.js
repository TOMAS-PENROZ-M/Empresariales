import * as repo from "./sales.repository.js";

function calculateTotal(items) {
  return items.reduce((acc, item) => {
    return acc + item.price * item.qty;
  }, 0);
}

export async function createSale(data) {
  const total = calculateTotal(data.items);

  return repo.createSale({
    ...data,
    total,
  });
}

export async function getSales() {
  return repo.getSales();
}
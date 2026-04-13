import * as services from "./sales.service.js";

export async function createSale(req, res) {
  try {
    const sale = await services.createSale(req.body);
    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getSales(req, res) {
  try {
    const sales = await services.getSales();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
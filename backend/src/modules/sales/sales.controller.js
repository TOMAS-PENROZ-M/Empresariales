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
    if (error.name === "NotFoundError") {
      return res.status(404).json({ error: error.message});
    } else if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message});
    } else { 
      res.status(500).json({ error: error.message });
    }
  }
}
import * as service from "./reports.service.js";

export async function getProductQuantities(req, res) {
  try {
    const { start, end } = req.query;

    const data = await service.getProductQuantities({ start, end });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getProductRevenue(req, res) {
  try {
    const { start, end } = req.query;

    const data = await service.getProductRevenue({ start, end });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getTotalRevenue(req, res) {
  try {
    const { start, end } = req.query;

    const data = await service.getTotalRevenue({ start, end });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getDashboard(req, res) {
  try {
    const { start, end, limit } = req.query;

    const data = await service.getDashboard({
      start,
      end,
      limit
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
import { Router } from "express";
import * as controller from "./reports.controller.js";

const router = Router();

router.get("/products/quantity", controller.getProductQuantities);
router.get("/products/revenue", controller.getProductRevenue);
router.get("/total-revenue", controller.getTotalRevenue);
router.get("/dashboard", controller.getDashboard);

export default router;
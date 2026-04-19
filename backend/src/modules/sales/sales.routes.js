import { Router } from "express";
import * as controller from "./sales.controller.js";

const router = Router();

router.post("/", controller.createSale);
router.get("/", controller.getSales);

export default router;
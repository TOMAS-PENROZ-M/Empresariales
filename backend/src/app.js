import express from "express";
import cors from "cors";
import salesRoutes from "./modules/sales/sales.routes.js";
import reportRoutes from "./modules/reports/reports.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);
app.use("/api/reports", reportRoutes);

app.get("/", (req, res) => {
  res.send("API running");
});

export default app;
import { Router } from "express";
import taskRoutes from "./tasks.js";
import tableRoutes from "./table.js";
import authRoutes from "./auth.js";
import express from "express";
const app = express();
import router from "./router.js";
 
app.use(taskRoutes);
app.use(tableRoutes);
app.use(authRoutes);

export default router;

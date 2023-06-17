import { Router } from "express";
import taskRoutes from "./tasks.js";
import tableRoutes from "./table.js";
import express from "express";
const app = express();
import router from "./router.js";
 
app.use(taskRoutes);
app.use(tableRoutes);


export default router;

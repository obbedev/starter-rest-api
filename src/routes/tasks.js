import router from "./router.js";

import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  count,
} from "../controllers/tasks.controller.js";


router.get("/tasks", getTasks);

router.get("/tasks/count", count);

router.get("/tasks/:id", getTask);

router.post("/tasks", createTask);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

export default router;

import router from "./router.js";
import {
  login
} from "../controllers/auth.controller.js";

router.post("/auth/login", login);

export default router;

import router from "./router.js";
import {
  login, signUp
} from "../controllers/auth.controller.js";

router.post("/auth/login", login);
router.post("/auth/signup", signUp);

export default router;

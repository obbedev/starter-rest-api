import {
  login, signUp
} from "../controllers/auth.controller.js";

export class AuthRoutes {
  private router = null;
  constructor(router) {
    this.router = router;
  }
  registerRoutes() {
    this.router.post("/auth/login", login);
    this.router.post("/auth/signup", signUp);
  }
}

import router from "./router.js";
import { getTableItem, getTableItems, insert, update } from "../controllers/generic.controller.js";
import { isLogged } from "../utils/auth.js";
export class TableRoutes {
    constructor(router) {
        this.router = null;
        this.router = router;
    }
    registerRoutes() {
        router.get("/:table", isLogged, getTableItems);
        router.get("/:table/:id", isLogged, getTableItem);
        router.post("/:table", isLogged, insert);
        router.put("/:table/:id", isLogged, update);
    }
}

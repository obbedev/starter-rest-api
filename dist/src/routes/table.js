import router from "./router.js";
import { getTableItem, getTableItems, insert, update } from "../controllers/generic.controller.js";
import { isLogged } from "../utils/auth.js";
import { getConnection } from "../database/database.js";
import { DataModel } from "../model/data.model.js";
import { Filter } from "../database/operation/filter.js";
export class TableRoutes {
    constructor(router) {
        this.router = null;
        this.router = router;
    }
    registerRoutes() {
        router.get("/testapi", async (req, res) => {
            let db = getConnection();
            let a = new DataModel("event", db);
            let filter = new Filter();
            let result = await a.findOne(2);
            res.status(200).json(result);
        });
        router.get("/:table", isLogged, getTableItems);
        router.get("/:table/:id", isLogged, getTableItem);
        router.post("/:table", isLogged, insert);
        router.put("/:table/:id", isLogged, update);
    }
}

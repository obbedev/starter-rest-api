import router from "./router.js";
import { findRequestController } from "../controllers/generic.controller.js";
import { isLogged } from "../utils/auth.js";
import { getConnection } from "../database/database.js";
import { DataModel } from "../model/data.model.js";
import { Filter } from "../database/operation/filter.js";
import { ApiController } from "../controllers/api.controller.js";
export class TableRoutes {
    constructor(router) {
        this.router = null;
        this.findRequest = (functionName) => {
            return (req, res, next) => {
                findRequestController(req, res, next, functionName);
            };
        };
        this.handleApiControllerRequest = (functionName) => {
            return (req, res, next) => {
                const api = new ApiController(req, res, next);
                api[functionName]();
            };
        };
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
        router.get("/:table", isLogged, this.findRequest("getItems"), this.handleApiControllerRequest("getItems"));
        router.get("/:table/:id", isLogged, this.handleApiControllerRequest("getItem"));
        router.post("/:table", isLogged, this.handleApiControllerRequest("insert"));
        router.put("/:table/:id", isLogged, this.handleApiControllerRequest("update"));
    }
}

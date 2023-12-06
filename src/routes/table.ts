import router from "./router.js";
import {
  findRequestController,
  getTableItem,
  getTableItems,
  insert,
  update
} from "../controllers/generic.controller.js";
import { isLogged } from "../utils/auth.js";
import { getConnection } from "../database/database.js";
import { DataModel } from "../model/data.model.js";
import { Filter } from "../database/operation/filter.js";
import { ApiController } from "../controllers/api.controller.js";

export class TableRoutes {
  private router = null;
  constructor(router) {
    this.router = router;
  }
  registerRoutes() {
    router.get("/testapi", async (req, res) => {
      let db = getConnection();
      let a = new DataModel("event", db);
      let filter = new Filter();
      let result = await a.findOne(2);
      res.status(200).json(result)
    });
    //router - middlware that finds the specific controller
    router.get("/:table", isLogged, this.findRequest("getItems"), this.handleApiControllerRequest("getItems"));
    router.get("/:table/:id", isLogged, this.handleApiControllerRequest("getItem"));
    router.post("/:table", isLogged, this.handleApiControllerRequest("insert"));
    router.put("/:table/:id", isLogged, this.handleApiControllerRequest("update"));
  }

  private findRequest = (functionName) => {
    return (req, res, next) => {
      findRequestController(req, res, next, functionName)
    };
  };

  private handleApiControllerRequest = (functionName) => {
    return (req, res, next) => {
      const api = new ApiController(req, res, next)
      api[functionName]();
    };
  };


}

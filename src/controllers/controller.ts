import { createControllerInstance, toDotCase } from "../utils/helper.js";
import { ApiController } from "./api.controller.js";

export const findRequestController = async (req, res, next, functionName) => {
  try {
    const table = req.params.table;
    let controllerName = toDotCase(table);
    let controllerObject = await createControllerInstance(controllerName, req, res, next);
    console.log("create instance result", controllerObject);
    if (controllerObject instanceof ApiController && controllerObject && functionName) {
      controllerObject[functionName]();
      return;
    }
    next();
  } catch (error) {
    console.log("findRequestController error", error);
    next();
  }
}


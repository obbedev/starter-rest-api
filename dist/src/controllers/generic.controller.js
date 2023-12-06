import { controllerExists, createControllerInstance, toDotCase } from "../utils/helper.js";
import { ApiController } from "./api.controller.js";
export const findRequestController = async (req, res, next, functionName) => {
    const table = req.params.table;
    let controllerName = toDotCase(table);
    let hasController = await controllerExists(controllerName, functionName);
    if (hasController) {
        let controllerObject = await createControllerInstance(controllerName, req, res, next);
        console.log("create instance result", controllerObject);
        if (controllerObject instanceof ApiController && controllerObject && functionName) {
            controllerObject[functionName]();
            return;
        }
    }
    else {
        console.log("findRequestController no tiene controller", table);
    }
    next();
};

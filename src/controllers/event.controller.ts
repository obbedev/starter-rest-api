import { getConnection } from "../core/database/database.js";
import { Event } from "../model/event.model.js";
import { ApiController } from "./api.controller.js";

export class EventController extends ApiController {
    constructor(request, response, handler) {
        super(request, response, handler);
    }

    async getItems() {
        console.log("EventController GETITEMS", this.requestObj.params?.table)
        try {
            const order = this.getRequestOrder();
            const filter = this.getRequestFilter();
            const { limit } = this.getRequestLimit();
            const fields = this.getRequestFields();

            const db = getConnection();
            let dataModel = new Event(db);
            let result = await dataModel.findMany(filter, fields, order, limit);
            this.responseObject.status(200).json(result)
        } catch (error) {
            //create generic error response to not expose internal errors
            this.responseObject.status(500).json({error:"Internal error"});
        }
    }

}
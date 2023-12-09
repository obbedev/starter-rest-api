import { getConnection } from "../core/database/database.js";
import { WearEvent } from "../model/wear.event.js";
import { ApiController } from "./api.controller.js";
export class WearEventController extends ApiController {
    constructor(request, response, handler) {
        super(request, response, handler);
    }
    async getItems() {
        console.log("WearEventController GETITEMS", this.requestObj.params?.table);
        try {
            const order = this.getRequestOrder();
            const filter = this.getRequestFilter();
            const { limit } = this.getRequestLimit();
            let fields = this.getRequestFields();
            if (!fields || fields === "*" || (Array.isArray(fields) && !(fields?.length > 0))) {
                fields = [
                    "id", "date", "gargement_id", "event_id",
                    "(select name from event where id = event_id) AS event_name",
                    "(select name from gargement where id = gargement_id) AS gargement_name"
                ];
            }
            const db = getConnection();
            let dataModel = new WearEvent(db);
            let result = await dataModel.findMany(filter, fields, order, limit);
            this.responseObject.status(200).json(result);
        }
        catch (error) {
            //create generic error response to not expose internal errors
            this.responseObject.status(500).json({ error: "Internal error" });
        }
    }
}

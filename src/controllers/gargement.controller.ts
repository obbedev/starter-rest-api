import { ApiController } from "./api.controller.js";

export class GargementController extends ApiController {
    constructor(request, response, handler) {
        super(request, response, handler);
    }

    formatItemRow(itemRow: {}): {} {
        itemRow = super.formatItemRow(itemRow);
        return itemRow;
    }

}
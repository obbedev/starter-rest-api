import { DataModel } from "./data.model.js";
export class WearEvent extends DataModel {
    constructor(db) {
        super('wear_event', db);
    }
}

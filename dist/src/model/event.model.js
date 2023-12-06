import { DataModel } from "./data.model.js";
export class Event extends DataModel {
    constructor(db) {
        super('event', db);
    }
}

import { DataModel } from "./data.model.js";
export class File extends DataModel {
    constructor(tableName, db) {
        super(tableName, db);
    }
}

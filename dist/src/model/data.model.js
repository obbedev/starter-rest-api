/**
 * Base class to accese the object data
 */
export class DataModel {
    constructor(tableName) {
        this.tableName = '';
        this.tableName = tableName;
    }
    findOne(id, fields) {
    }
    findMany(filter, fields) {
    }
    updateOne(id, values) {
    }
    updateMany(filter, values) {
    }
    deleteOne(id) {
    }
    deleteMany(filter) {
    }
    insertOne(id, values) {
    }
    insertMany(filter, values) {
    }
}

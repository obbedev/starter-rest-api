import { Query } from '../database/operation/query.js';
import { Filter } from '../database/operation/filter.js';
/**
 * Base class to accese the object data
 */
export class DataModel {
    constructor(entityName, db) {
        /**
         * Table name for mysql
         */
        this.entityName = '';
        this.entityName = entityName;
        this.db = db;
        this.query = new Query(this.entityName);
    }
    async findOne(id, fields = "") {
        let filter = new Filter();
        filter.addEqualFilter("id", id);
        this.query.addFilter(filter);
        this.query.setFields(fields);
        let result = await this.db.query(this.query.toString(), null);
        if (result.rows.length > 0) {
            return result.rows[0];
        }
        return {};
    }
    async findMany(filter = [], fields = "") {
        this.query.addFilter(filter);
        this.query.setFields(fields);
        let result = await this.db.query(this.query.toString(), null);
        console.log(result.rows);
        if (result.rows.length > 0) {
            return result.rows;
        }
        return [{}];
    }
    async updateOne(id, values) {
        return;
    }
    async updateMany(filter, values) {
        return;
    }
    async deleteOne(id) {
        return;
    }
    async deleteMany(filter) {
        return;
    }
    async insertOne(values) {
        return 1; //return inserted id
    }
    async insertMany(values) {
        return;
    }
}

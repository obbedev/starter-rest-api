import { Fields } from "../fields.js";
import { Filter } from "./filter.js";
export class Query {
    constructor(tableName, fields = "") {
        this.tableName = '';
        this.fields = '';
        this.limit = '';
        this.offset = '';
        this.filters = [];
        this.filter = '';
        this.tableName = tableName;
        this.setFields(fields);
    }
    setFields(fields) {
        if (fields == undefined || !fields) {
            fields = "*";
        }
        this.fields = fields;
    }
    setLimit(limit) {
        this.limit = limit;
    }
    setOffset(offest) {
        this.offset = offest;
    }
    setFilter(filter) {
        this.filter = filter;
    }
    addFilter(filter) {
        if (filter) {
            this.filters.push(filter);
        }
    }
    toString() {
        let query = "SELECT ";
        //get fields
        let fieldsObj = new Fields(this.fields);
        query += fieldsObj.generateFields();
        query += " FROM " + this.tableName;
        let filterObj = new Filter();
        console.log(filterObj.addFilter(this.filter));
        if (this.filter) {
            query += " WHERE " + this.filter;
        }
        else if (this.filters.length > 0) {
            const queryFilter = new Filter();
            queryFilter.addFilter(this.filters);
            let strFilter = queryFilter.getFilterString();
            if (strFilter) {
                query += " WHERE ";
                query += strFilter;
            }
        }
        if (this.limit) {
            let limitParsed = this.limit.split(",");
            query += " LIMIT " + limitParsed[0];
            if (limitParsed.length > 1) {
                query += " OFFSET " + limitParsed[1];
            }
        }
        else if (this.offset) {
            query += " OFFSET " + this.offset;
        }
        console.log("QUERY ->>>", query);
        return query;
    }
}

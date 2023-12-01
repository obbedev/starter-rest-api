import { Filter } from "./filter.js";

export class Query {
    private tableName = '';
    private fields = '';
    private limit = '';
    private offset = '';
    private filters = [];
    private filter = '';
    constructor(tableName, fields = "") {
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
        if(filter){
            this.filters.push(filter);
        }
    }

    toString() {
        let query = "SELECT ";
        //get fields
        if (Array.isArray(this.fields)) {
            query += this.fields.map(item => {
                return `${item}`;
            }).join(",");
        } else {
            query += this.fields;
        }

        query += " FROM " + this.tableName;

        if (this.filter) {
            query += " WHERE " + this.filter;
        } else if (this.filters.length > 0) {
            let parsedFilters = this.filters.map((filter) => {
                if (filter instanceof Filter) {
                    let result = filter.getFilterString();
                    if (result) {
                        return result;
                    }
                } else if (filter) {
                    return filter;
                }
            });
            parsedFilters = parsedFilters.filter(item => !!item);
            if (parsedFilters.length > 0) {
                query += " WHERE ";
                query += parsedFilters.join(" ");
            }
        }
        if (this.limit) {
            let limitParsed = this.limit.split(",");
            query += " LIMIT " + limitParsed[0];
            if (limitParsed.length > 1) {
                query += " OFFSET " + limitParsed[1];
            }
        } else if (this.offset) {
            query += " OFFSET " + this.offset;
        }

        console.log("QUERY ->>>", query)

        return query;
    }

}

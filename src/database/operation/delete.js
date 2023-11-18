export class Delete {
    constructor(tableName) {
        this.tableName = tableName;
        this.filters = [];
    }

    addFilter(filter) {
        this.filters.push(filter);
    }

    toString() {
        //security
        if (!this.filters.length > 0) {
            throw new Error("A filter must be set before generating DELETE query.");
        }
        let query = "";
        this.filters.forEach((filter) => {
            query += " ";
            if (filter instanceof Filter) {
                query += filter.getFilterString();
            } else {
                query += filter;
            }
        });

        return `DELETE FROM ${this.tableName} WHERE ${query};`;
    }
}

export class Query {
    tableName = '';
    fields = '';
    limit = '';
    offset = '';
    filters = [];
    filter = '';
    constructor(tableName, fields) {
        console.log(tableName)
        this.tableName = tableName;
        this.fields = fields;
    }
    
    setLimit(limit){
        this.limit = limit;
    }

    setOffset(offest){
        this.offest = offest;
    }

    setFilter(filter){
        this.filter = filter;
    }

    addFilter(filter){
        this.filters.push(filter);
    }

    toString() {
        let query = "select ";

        //get fields
        query += this.fields + " ";
        
        query += "from " + this.tableName;

        if(this.filter){
            query += " where " + this.filter;
        }
        if(this.limit){
            query += " LIMIT "+this.limit;
        }
        if(this.offest){
            query += " offset "+this.offest;
        }

        return query;
    }

}
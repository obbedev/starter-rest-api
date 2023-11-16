import { Filter } from "./filter.js";

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
        this.setFields(fields);
    }
    
    setFields(fields){
        if(fields == undefined || !fields){
            fields = "*";
        }
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
        }else if(this.filters.length>0){
            query += " where ";
            this.filters.forEach((filter)=>{
                query += " ";
                if(filter instanceof Filter){
                    query += filter.getFilterString();
                }else{
                    query += filter;
                }
            });
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

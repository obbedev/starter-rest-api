import { Filter } from "./filter.js";

export class Query {
    private tableName = '';
    private fields = '';
    private limit = '';
    private offset = '';
    private filters = [];
    private filter = '';
    constructor(tableName, fields) {
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
        this.offset = offest;
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
        if(this.offset){
            query += " offset "+this.offset;
        }
        console.log(query)

        return query;
    }

}

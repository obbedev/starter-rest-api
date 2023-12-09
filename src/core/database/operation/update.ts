import { Filter } from "./filter.js";

export class Update {
    private tableName = '';
    private values = [];
    private filter = "";
    private filters = [];
    constructor(tableName, values = []) {
        this.tableName = tableName;
        this.setValues(values);
    }
    
    setValues(values){
        this.values = values;
    }

    setFilter(filter){
        this.filter = filter;
    }

    addFilter(filter){
      this.filters.push(filter);
    }

    toString() {
        let query = "UPDATE "+this.tableName+" SET ";
        let result = Object.keys(this.values).map(item => {
          return `${item} = '${this.values[item]}'`
        });
        query += " "+result.join(",")+"";
        if(this.filter){
          query += " WHERE " + this.filter;
        }else if(this.filters.length>0){
            query += " WHERE ";
            this.filters.forEach((filter)=>{
                query += " ";
                if(filter instanceof Filter){
                    query += filter.getFilterString();
                }else{
                    query += filter;
                }
            });
        }
        console.log(query);
        return query;
    }

}

export class Insert {
    tableName = '';
    values = [];
  
    fields = '';
    limit = '';
    offset = '';
    filters = [];
    filter = '';
    constructor(tableName, values) {
        console.log(tableName)
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
        let query = "INSERT INTO "+this.tableName+" (";
        let fields = Object.keys(this.values[0]);
        query += " "+fields.join(",")+") VALUES (";

        let sqlValues = this.values.map((element)=>{
          let elementValues = Object.values(element);
          elementValues = elementValues.map((item)=>{
            return "`"+item+"`";
          });
          return "("+elementValues.join(",")+")";
        });
        query += sqlValues.join(",");
        
        console.log(query);
        return query;
    }

}

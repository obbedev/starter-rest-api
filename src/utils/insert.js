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
        this.setValues(fields);
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
        let query = "insert into "+this.tableName+" (";
        let fields = Object.keys(values[0]);
        query += " "+fields.join(",")+") VALUES (";
        
        this.values.forEach((element)=>{
          let elementValues = Object.values(element);
          elementValues.forEach((elementValue)=>{
            query += "'"+elementValue+"'";
          });
          query += ")";
        });
        
        console.log(query);
        return query;
    }

}

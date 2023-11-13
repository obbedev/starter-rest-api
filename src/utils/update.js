export class Update {
    tableName = '';
    values = [];
    filter = "";
    filters = [];
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
        //update event set name = '',id='' where id = XXX
        let query = "UPDATE "+this.tableName+" SET ";
        let result = Object.keys(this.values).map(item => {
          return `${item} = '${this.values[item]}'`
        });
        query += " "+result.join(",")+")";
        if(this.filter){
          query += " "+this.filter;
        }
        console.log(query);
        return query;
    }

}

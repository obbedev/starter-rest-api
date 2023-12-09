export class Insert {
  private tableName = '';
  private values = [];
  constructor(tableName, values = []) {
    console.log(tableName)
    this.tableName = tableName;
    this.setValues(values);
  }

  setValues(values) {
    this.values = values;
  }

  toString() {
    let query = "INSERT INTO " + this.tableName + " (";
    let fields = Object.keys(this.values[0]);
    query += " " + fields.join(",") + ") VALUES ";

    let sqlValues = this.values.map((element) => {
      let elementValues = Object.values(element);
      elementValues = elementValues.map((item) => {
        return "'" + item + "'";
      });
      return "(" + elementValues.join(",") + ")";
    });
    query += sqlValues.join(",");
    //todo would not work for mysql
    query += " RETURNING id;";
    console.log(query);
    return query;
  }

}

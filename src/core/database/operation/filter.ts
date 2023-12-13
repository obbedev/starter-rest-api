export class Filter {
  private logicalOperator = "";
  private filters = [];
  constructor() {
    this.filters = [];
    this.logicalOperator = 'AND';
  }

  addFilter(condition) {
    this.filters.push(condition);
  }

  setLogicalOperator(operator) {
    if (operator.toUpperCase() === 'AND' || operator.toUpperCase() === 'OR') {
      this.logicalOperator = operator.toUpperCase();
    } else {
      throw new Error('Operator is not allowed');
    }
  }

  addOperatorFilter(field, value, operator = '=') {
    this.filters.push({ field, value, operator });
  }

  addEqualFilter(field, value) {
    this.addOperatorFilter(field, "'" + value + "'", '=');
  }

  addInValues(field, values) {
    this.addOperatorFilter(field, "(" + values.join(",") + ")", 'IN');
  }

  getFilterString() {
    if (this.filters.length === 0) {
      return '';
    }

    let filterClauses = this.filters.map(filter => {
      if (filter instanceof Filter) {
        return "( " + filter.getFilterString() + " )";
      } else if (typeof filter === "string") {
        return "( " + filter + " )";
      } else if (filter?.constructor?.name === "Array") {
        let arrayFilters = filter.map((filterItem) => {
          if (filterItem instanceof Filter) {
            let result = filterItem.getFilterString();
            if (result) {
              return result;
            }
          } else if (filterItem) {
            return filterItem;
          }
          return '';
        }).filter(Boolean);
        return arrayFilters.join(` ${this.logicalOperator} `);
      }
      return `${filter.field} ${filter.operator} ${filter.value}`;
    }).filter(Boolean);
    return filterClauses.join(` ${this.logicalOperator} `);
  }
}

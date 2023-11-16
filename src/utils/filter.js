export class Filter {
  constructor() {
    this.filters = [];
    this.logicalOperator = 'AND';
  }

  setLogicalOperator(operator) {
    if (operator.toUpperCase() === 'AND' || operator.toUpperCase() === 'OR') {
      this.logicalOperator = operator.toUpperCase();
    } else {
      throw new Error('Operator is not allowed');
    }
  }

  addFilter(field, value, operator = '=') {
    this.filters.push({ field, value, operator });
  }

  getFilterString() {
    if (this.filters.length === 0) {
      return '';
    }

    const filterClauses = this.filters.map(filter => {
      return `${filter.field} ${filter.operator} '${filter.value}'`;
    });

    return filterClauses.join(` ${this.logicalOperator} `);
  }
}

export class Filter {
    constructor() {
        this.logicalOperator = "";
        this.filters = [];
        this.filters = [];
        this.logicalOperator = 'AND';
    }
    addFilter(condition) {
        this.filters.push(condition);
    }
    setLogicalOperator(operator) {
        if (operator.toUpperCase() === 'AND' || operator.toUpperCase() === 'OR') {
            this.logicalOperator = operator.toUpperCase();
        }
        else {
            throw new Error('Operator is not allowed');
        }
    }
    addOperatorFilter(field, value, operator = '=') {
        this.filters.push({ field, value, operator });
    }
    addEqualFilter(field, value) {
        this.addOperatorFilter(field, value, '=');
    }
    getFilterString() {
        if (this.filters.length === 0) {
            return '';
        }
        const filterClauses = this.filters.map(filter => {
            if (filter instanceof Filter) {
                return "( " + filter.getFilterString() + " )";
            }
            return `${filter.field} ${filter.operator} '${filter.value}'`;
        });
        return filterClauses.join(` ${this.logicalOperator} `);
    }
}

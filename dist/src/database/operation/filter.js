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
        let filterClauses = this.filters.map(filter => {
            if (filter instanceof Filter) {
                return "( " + filter.getFilterString() + " )";
            }
            else if (typeof filter === "string") {
                return "( " + filter + " )";
            }
            else if (filter?.constructor?.name === "Array") {
                let arrayFilters = filter.map((filterItem) => {
                    if (filterItem instanceof Filter) {
                        let result = filterItem.getFilterString();
                        if (result) {
                            return result;
                        }
                    }
                    else if (filterItem) {
                        return filterItem;
                    }
                    return '';
                });
                arrayFilters = arrayFilters.filter((filter) => !!filter);
                return arrayFilters.join(` ${this.logicalOperator} `);
            }
            return `${filter.field} ${filter.operator} '${filter.value}'`;
        });
        filterClauses = filterClauses.filter((filter) => !!filter);
        ;
        return filterClauses.join(` ${this.logicalOperator} `);
    }
}

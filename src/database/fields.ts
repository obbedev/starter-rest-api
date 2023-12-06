export class Fields {
    private fields = [];
    constructor(fields) {
        this.fields = fields;
    }

    generateFields() {
        let query = '';
        if (Array.isArray(this.fields)) {
            //TODO could be subselect,if,...
            query += this.fields.map(item => {
                return `${item}`;
            }).join(",");
        } else {
            query += this.fields;
        }
        return query;
    }
}
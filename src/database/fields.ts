export class Fields {
    private fields = [];
    private allIfNone = false;
    constructor(fields,allIfNone = false) {
        this.fields = fields;
        this.allIfNone = allIfNone;
    }

    addField(field){
        this.fields.push(field);
    }

    generateFields() {
        let query = '';
        if(!this.fields && this.allIfNone){
            return "*";
        }
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
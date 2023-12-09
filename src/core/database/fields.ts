export class Fields {
    private fields = null;
    private allIfNone = false;
    constructor(fields,allIfNone = false) {
        this.fields = fields;
        this.allIfNone = allIfNone;
    }

    addField(field){
        this.fields.push(field);
    }
    
    setFields(fields:string){
        this.fields = fields;
    }

    generateFields() {
        let query = '';
        if(!(this.fields || this.fields?.length>0) && this.allIfNone){
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
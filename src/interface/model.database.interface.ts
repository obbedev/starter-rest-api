export interface DatabaseModelI {
    findOne(id: any, fields: string[]): Promise<any>;

    findMany(filter: any, fields: string[]): Promise<any[]>;

    updateOne(id: any, values: any): Promise<void>;

    updateMany(filter: any, values: any): Promise<void>;

    deleteOne(id: any): Promise<void>;

    deleteMany(filter: any): Promise<void>;

    insertOne(values: any): Promise<any>;

    insertMany(values: Array<any>): Promise<any[]>;
}
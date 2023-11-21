import { DatabaseI } from '../database/database.interface.js';
import { DatabaseModelI } from '../interface/model.database.interface.js';
import { Query } from '../database/operation/query.js';
import { Filter } from '../database/operation/filter.js';

/**
 * Base class to accese the object data
 */
export class DataModel implements DatabaseModelI {
  /**
   * Table name for mysql
   */
  private entityName = '';
  private db: DatabaseI;
  private query: Query;
  constructor(entityName: string, db) {
    this.entityName = entityName;
    this.db = db;
    this.query = new Query(this.entityName);
  }

  async findOne(id: any, fields: string|string[]|null = ""): Promise<any> {
    let filter = new Filter();
    filter.addEqualFilter("id",id);
    this.query.addFilter(filter);
    this.query.setFields(fields);
    let result = await this.db.query(this.query.toString(),null);
    if(result.rows.length>0){
      return result.rows[0];
    }
    return {};
  }

  async findMany(filter: any = [], fields: string|string[] = ""): Promise<any[]> {
    this.query.addFilter(filter);
    this.query.setFields(fields);
    let result = await this.db.query(this.query.toString(),null);
    console.log(result.rows)
    if(result.rows.length>0){
      return result.rows;
    }
    return [{}];
  }

  async updateOne(id: any, values: any): Promise<void> {
    return;
  }

  async updateMany(filter: any, values: any): Promise<void> {
    return;
  }

  async deleteOne(id: any): Promise<void> {
    return;
  }

  async deleteMany(filter: any): Promise<void> {
    return;
  }

  async insertOne(values: any): Promise<any> {
    return 1; //return inserted id
  }

  async insertMany(values: any): Promise<any[]> {
    return;
  }
}

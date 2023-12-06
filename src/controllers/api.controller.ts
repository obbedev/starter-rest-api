import { getConnection } from "../database/database.js";
import { Filter } from "../database/operation/filter.js";
import { Insert } from "../database/operation/insert.js";
import { Update } from "../database/operation/update.js";
import { DataModel } from "../model/data.model.js";

export class ApiController {
  protected requestObj;
  protected responseObject;
  protected handlerObject;

  constructor(request, response, handler) {
    this.requestObj = request;
    this.responseObject = response;
    this.handlerObject = handler;
  }

  async getItems() {
    console.log("ApiController GETITEMS", this.requestObj.params?.table)
    try {
      const order = this.getRequestOrder();
      const filter = this.getRequestFilter();
      const { limit } = this.getRequestLimit();
      const fields = this.getRequestFields();
      const params = this.requestObj.params;
      const table = params.table;
      const db = getConnection();
      let dataModel = new DataModel(table, db);
      let result = await dataModel.findMany(filter, fields, order, limit);
      this.responseObject.status(200).json(result)
    } catch (error) {
      console.log(error);
      //create generic error response to not expose internal errors
      this.responseObject.status(500).json({ error: "Internal error" });
    }
  }

  async getItem() {
    try {
      const params = this.requestObj.params;
      const table = params.table;
      const id = params.id

      let fields = this.getRequestFields();
      const db = getConnection();
      let dataModel = new DataModel(table, db);
      let result = await dataModel.findOne(id, fields);
      console.log(result);
      this.responseObject.status(200).json(result);
    } catch (error) {
      console.log(error);
      this.responseObject.status(500).json({ error: "Internal error" });
    }
  };

  async insert() {
    const params = this.requestObj.params;
    const table = params.table;
    const body = this.requestObj.body;
    let insertValues = body;
    if (!Array.isArray(insertValues)) {
      insertValues = [];
      insertValues.push(body);
    }
    let query = new Insert(table, insertValues);
    console.log(query.toString());
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
      if (error) {
        throw error
      }
      this.requestObj.status(200).json(results)
    })
  };

  async update() {
    const params = this.requestObj.params;
    const table = params.table;
    const body = this.requestObj.body;
    const id = params.id;
    if (id && !isNaN(id)) {
      let updateValues = body;
      let query = new Update(table, updateValues);
      let filter = new Filter();
      filter.addEqualFilter("id", id);
      query.addFilter(filter);
      const db = getConnection();
      await db.query(query.toString(), (error, results) => {
        if (error) {
          throw error
        }
        this.responseObject.status(200).json(results);
      })
    } else {
      this.responseObject.status(400).json({ error: "Id paramter is missing" });
    }
  };

  getRequestFilter() {
    const filter = new Filter();
    const propertiesToOmit = ["fields", "order", "page", "page_size"];
    const newObj = { ...this.requestObj.query };
    propertiesToOmit.forEach(prop => { delete newObj[prop]; });
    for (const key in newObj) {
      if (Object.prototype.hasOwnProperty.call(newObj, key)) {
        const filterValue = newObj[key];
        if ((filterValue !== null && filterValue !== undefined && filterValue !== '')) {
          filter.addEqualFilter(key, filterValue);
        }
      }
    }
    return filter;
  }

  getRequestOrder() {
    const order = this.requestObj.query?.order;
    return order;
  }

  getRequestLimit() {
    const page = parseInt(this.requestObj.query.page) || 1;
    const size = parseInt(this.requestObj.query.page_size) || 10;
    const offset = (page - 1) * size;
    const limit = `${size},${offset}`;
    return { page, size, offset, limit };
  }

  getRequestFields() {
    let fields = this.requestObj.query?.fields;
    if (!fields) {
      fields = "*";
    }
    return fields;
  }


}
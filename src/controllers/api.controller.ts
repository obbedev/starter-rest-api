import { Filter } from "../database/operation/filter.js";

export class ApiController {
  protected requestObj;
  protected responseObject;
  protected handlerObject;
  
  constructor(request, response, handler) {
    this.requestObj = request;
    this.responseObject = response;
    this.handlerObject = handler;
  }

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
    const fields = this.requestObj.query?.fields;
    return fields;
  }


}
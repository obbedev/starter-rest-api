import { v4 } from "uuid";
import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";

export const login = async (req, res) => {
    const body = req.body;
    let query = new Query('api_user','id');
    query.setFilter("email = '"+body.email+"' and password = '"+body.password+"'");

    res.status(200).json(query.toString())
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
      if (error) {      
        throw error
      }
      res.status(200).json(results.rows[0])
    })
};

export const getTableItems = async (req, res) => {
    const params = req.params;
    const table = params.table;

    let query = new Query(table,req.query.fields);
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.page_size) || 10;
    const offset = (page - 1) * size;
    const limit = size;

    if(limit){
        query.setLimit(limit);
    }
    if(offset){
        query.setOffset(offset);
    }

    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
};

export const insert = async (req, res) => {
    const params = req.params;
    const table = params.table;
    const body = req.body;
    let insertValues = body;
    if(!Array.isArray(insertValues)){
        insertValues = [];
        insertValues.push(body);
    }
    let query = new Insert(table,insertValues);
    console.log(query.toString());
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results)
    })
};

export const update = async (req, res) => {
    const params = req.params;
    const table = params.table;
    const body = req.body;
    const id = req.params.id;
    let updateValues = body;
    let query = new Update(table,updateValues);
    query.setFilter("id = '"+id+"'");
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results)
    })
};

import { getConnection } from "../database/database.js";
import { Query } from "../database/operation/query.js";
import { Insert } from "../database/operation/insert.js";
import { Update } from "../database/operation/update.js";
import { Delete } from "../database/operation/delete.js";
export const getTableItem = async (req, res) => {
    const table = req.params.table;
    const id = req.params.id;
    let fields = req.query.fields ? req.query.fields : "*";
    let query = new Query(table, fields);
    query.setFilter("id = " + id);
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        console.log(results);
        res.status(200).json(results.rows[0]);
    });
};
export const getTableItems = async (req, res) => {
    const params = req.params;
    const table = params.table;
    let query = new Query(table, req.query.fields);
    const page = parseInt(req.query.page) || 1;
    const size = parseInt(req.query.page_size) || 10;
    const offset = (page - 1) * size;
    const limit = size;
    if (limit) {
        query.setLimit(limit);
    }
    if (offset) {
        query.setOffset(offset);
    }
    const db = await getConnection();
    await db.query(query.toString(), async (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};
export const insert = async (req, res) => {
    const params = req.params;
    const table = params.table;
    const body = req.body;
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
            throw error;
        }
        res.status(200).json(results);
    });
};
export const update = async (req, res) => {
    const params = req.params;
    const table = params.table;
    const body = req.body;
    const id = req.params.id;
    let updateValues = body;
    let query = new Update(table, updateValues);
    query.setFilter("id = '" + id + "'");
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results);
    });
};
export const deleteItem = async (req, res) => {
    const params = req.params;
    const table = params.table;
    const body = req.body;
    const id = req.params.id;
    let query = new Delete(table);
    query.addFilter("id = '" + id + "'");
    const db = getConnection();
    await db.query(query.toString(), (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results);
    });
};

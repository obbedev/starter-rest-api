import { getConnection } from "../database/database.js";
import { Insert } from "../database/operation/insert.js";
import { Update } from "../database/operation/update.js";
import { Delete } from "../database/operation/delete.js";
import { DataModel } from "../model/data.model.js";
import { Filter } from "../database/operation/filter.js";
import { toDotCase } from "../utils/helper.js";
import { promises as fsPromises } from 'fs';
import { fileURLToPath,pathToFileURL } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getTableItem = async (req, res) => {
  const table = req.params.table
  const id = req.params.id

  let fields = req.query.fields ? req.query.fields : "*";
  const db = getConnection();
  let dataModel = new DataModel(table, db);
  let result = await dataModel.findOne(id, fields);
  console.log(result);
  res.status(200).json(result);
};

export const getTableItems = async (req, res) => {
  const params = req.params;
  const table = params.table;
  const fields = req.query?.fields;
  const order = req.query?.order;

  //check if table controller exists and method
  //move to middleware
  let controllerName = toDotCase(table);
  let hasController = await controllerExists(controllerName,"getItems");
  if(hasController){
     let controllerObject = await getControllerFromTable(controllerName);
     if(controllerObject){
      controllerObject["getItems"](req,res);
      return;
     }
  }


  //calculate limit/offset
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.page_size) || 10;
  const offset = (page - 1) * size;
  const limit = `${size},${offset}`;
  //any field in query that is not order,fields,page,page_size
  //TODO need complex filter with operators
  //TODO extract function
  const filter = new Filter();
  const propertiesToOmit = ["fields", "order", "page", "page_size"];
  const newObj = { ...req.query };
  propertiesToOmit.forEach(prop => { delete newObj[prop]; });
  for (const key in newObj) {
    if (Object.prototype.hasOwnProperty.call(newObj, key)) {
      const filterValue = newObj[key];
      if ((filterValue !== null && filterValue !== undefined && filterValue !== '')) {
        filter.addEqualFilter(key, filterValue);
      }
    }
  }
  const db = getConnection();
  let dataModel = new DataModel(table, db);
  let result = await dataModel.findMany(filter, fields, order, limit);
  res.status(200).json(result);
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
  let query = new Update(table, updateValues);
  query.setFilter("id = '" + id + "'");
  const db = getConnection();
  await db.query(query.toString(), (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results)
  })
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
      throw error
    }
    res.status(200).json(results)
  })
};

async function controllerExists(controllerName, functionName = null) {
  try {
    let controllerPath = path.join(__dirname, `${controllerName}.controller.ts`);
    if(await !fileExists(controllerPath)){
      controllerPath = path.join(__dirname, `${controllerName}.controller.js`);
      if(await !fileExists(controllerPath)){
        return false;
      }
    }
    console.log("CONTROLLER EXISTS",`./${controllerName}.controller.ts`);
    if(functionName){
      const controllerPathUrl = pathToFileURL(controllerPath);
      const controllerModule = await import(controllerPathUrl.toString());
      if (controllerModule && typeof controllerModule[functionName] === 'function') {
        console.log(`El controlador ${controllerName} existe y contiene la función ${functionName}.`);
        return true;
      }else{
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error(`Error al cargar el controlador: ${error.message}`);
  }
}

async function getControllerFromTable(controllerName){
  try {
    const controllerPath = path.join(__dirname, `${controllerName}.controller.ts`);
    await fsPromises.access(controllerPath);
    const controllerPathUrl = pathToFileURL(controllerPath);
    const controllerModule = await import(controllerPathUrl.toString());
    return controllerModule;
  } catch (error) {
    console.error(`Error al cargar el controlador: ${error.message}`);
  }
}

async function fileExists(path: string): Promise<boolean> {
  try {
    await fsPromises.access(path);
    console.error(`El archivo existe: ${path}`);
    return true;
  } catch (error) {
    return false;
  }
}

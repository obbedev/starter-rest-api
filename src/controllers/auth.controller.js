import { v4 } from "uuid";
import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";

export const login = async (req, res) => {
    const body = req.body;
    let query = new Query('api_user','id,token');
    query.setFilter("email = '"+body.email+"' and password = '"+body.password+"'");
    const db = getConnection();
    await db.query(query.toString(), async (error, results) => {
      if (error) {      
        console.log(error)
        res.status(500).json({error});
        throw error
      }
      try {
        if(results.rows && results.rows.length>0){
          let user = results.rows[0];
          let token = "";
          if(user.token){
             token = user.token; 
          }else{
              token = await hash(body.password);
              let update = new Update('api_user');
              update.setValues({"token":token});
              update.setFilter("id = '"+user.id+"'");
              const db = getConnection();
              await db.query(update.toString(), (error, results) => {
                if (error) {
                  throw error
                }
                res.status(200).json({token:token})
              })
          }
          res.status(200).json({token:token})
      }else{
        res.status(401).json({error:"Invalid credentials"})
      }
      } catch (error) {
        res.status(500).json({error})
      }
    })
};

export const signUp = async (req, res) => {
  const body = req.body;

  //check if exists the user
  let query = new Query('api_user','id,token');
  query.setFilter("email = '"+body.email+"'");
  let userExist = false;
  const db = getConnection();
  await db.query(query.toString(), (error, results) => {
    if (error) {
      throw error
    }
    console.log("existe email? ",results.rows);
    if(results.rows.length>0){
      userExist = true;
    }
  })
  if(userExist){
    res.status(400).json({error:"Ya existe un usuario con este email"});
  }else{
    console.log("no existe email ");
    //TODO validate email, create service
    let hashPassword = await hash(body.password);
    let insertValues = [
      {email:body.email,password:hashPassword}
    ]; 
    let insert = new Insert('api_user',insertValues);
    await db.query(insert.toString(), (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).json(results)
    })
  }
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

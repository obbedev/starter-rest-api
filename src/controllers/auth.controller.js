import { v4 } from "uuid";
import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";

export const login = async (req, res) => {
    const body = req.body;
    let query = new Query('api_user','id,token');
    let hashedPassword = await hashPassword(body.password);
    query.setFilter("email = '"+body.email+"' and password = '"+hashedPassword+"'");
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
              await db.query(update.toString());
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
  let query = new Query('api_user','id,token');
  query.setFilter("email = '"+body.email+"'");
  const db = getConnection();
  await db.query(query.toString(), async (error, results) => {
    if (error) {
      throw error
    }
    if(results.rows.length>0){
      console.log("existe email");
      res.status(400).json({error:"Ya existe un usuario con este email"});
    }else{
      //TODO validate email, create service
      let hashedPassword = await hashPassword(body.password);
      let insertValues = [
        {email:body.email,password:hashedPassword}
      ]; 
      let insert = new Insert('api_user',insertValues);
      await db.query(insert.toString(), (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json({message:"User created"})
      })
    }
  })
};

export const hashPassword = async (password) => {
  let hashPassword = await hash(password);
  return hashPassword;
};

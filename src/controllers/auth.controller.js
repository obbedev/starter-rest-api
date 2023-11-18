import { v4 } from "uuid";
import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";
import { AuthService } from "../services/auth.service.js";

export const login = async (req, res) => {
    const body = req.body;
    try {
      const authService = new AuthService();
      let token = authService.login(body.email,body.password);
      res.status(200).json({token:token})
    } catch (error) {
      if(error?.code == 401){
        res.status(401).json({error:"Invalid credentials"})
      }
      res.status(500).json({error})
    }
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

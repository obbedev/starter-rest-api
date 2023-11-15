import { Query } from "./query.js";
import { getConnection } from "../database.js";

export const isLogged = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log("current request token",token);
      if(token && (typeof token === 'string' || token instanceof String)){
        let query = new Query('api_user','id');
        query.setFilter("token = '"+token+"'");
        const db = getConnection();
        await db.query("select id from api_user", (error, results) => {
           res.status(200).json({
                results
            });
          console.log("current request response",results);
          if(results.rows.length>0){
            next();
          }else{
            throw new Error('Invalid user ID');
          }
        })
      }else{
        throw new Error("Could not get token");
      }
    } catch (e) {
      res.status(401).json({
        error: "Error else",
        message:e
      });
    }
}

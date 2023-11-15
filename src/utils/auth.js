import { Query } from "./query.js";
import { getConnection } from "../database.js";

export const isLogged = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      if(token && (typeof token === 'string' || token instanceof String)){
        let query = new Query('api_user','id');
        query.setFilter("token = '"+token+"'");
        const db = getConnection();
        await db.query(query.toString(), (error, results) => {
          if(results && results.rows && results.rows.length>0){
            next();
          }else{
            res.status(401).json({
                error: 'Invalid user ID'
            });
          }
        })
      }else{
        throw new Error("Could not get token");
      }
    } catch (e) {
      res.status(401).json({
        error: 'Invalid user ID'
      });
    }
}

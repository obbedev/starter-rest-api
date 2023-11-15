import { Query } from "./query.js";

export const isLogged = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log("current request token",token);
      res.status(401).json({
        error: token,
        headers:req.headers
      });
      if(token && (typeof token === 'string' || token instanceof String)){
        let query = new Query('api_user','id');
        query.setFilter("token = '"+token+"'");
        const db = getConnection();
        await db.query(query.toString(), (error, results) => {
          if (error) {      
            throw error
          }
          console.log("current request response",results);
          if(results.rows.length>0){
            next();
          }else{
            throw 'Invalid user ID';
          }
        })
      }else{
        throw "Could not get token";
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
}

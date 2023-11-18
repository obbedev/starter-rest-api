import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";

export class AuthService{
    async login(email,password){
        let query = new Query('api_user','id,token');
        let hashedPassword = await this.hashPassword(password);
        query.setFilter("email = '"+email+"' and password = '"+hashedPassword+"'");
        const db = getConnection();
        try {
            let result = await db.query(query.toString());
            if(result.rows && result.rows.length>0){
                let user = result.rows[0];
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
                return token;
              }else{
                let error = new Error("Invalid credentials");
                error.code = 401;
                throw error;
              }
        } catch (error) {
            //do something
            throw error
        }
    }

    async signUp(data){
        try {
            let query = new Query('api_user','id');
            query.setFilter("email = '"+data.email+"'");
            const db = getConnection();
            let results = await db.query(query.toString());
            if(results.rows.length>0){
                console.log("Ya existe email");
                throw new Error("You have already an account");
            }else{
                //TODO validate email
                let hashedPassword = await this.hashPassword(data.password);
                let insertValues = [
                  {email:data.email,password:hashedPassword}
                ]; 
                let insert = new Insert('api_user',insertValues);
                await db.query(insert.toString());
                let query = new Query('api_user','id');
                query.setFilter("email = '"+data.email+"'");
                let results = await db.query(query.toString());
                return results.rows[0]["id"];
            }
        } catch (error) {
            throw error
        }
    }

    async hashPassword(password){
        let hashPassword = await hash(password);
        return hashPassword;
    };
}
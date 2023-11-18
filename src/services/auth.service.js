import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";

export class AuthService{
    async login(email,password){
        let query = new Query('api_user','id,token');
        let hashedPassword = await hashPassword(password);
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

    signUp(data){

    }

    async hashPassword(password){
        let hashPassword = await hash(password);
        return hashPassword;
    };
}
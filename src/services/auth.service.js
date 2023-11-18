import { getConnection } from "../database.js";
import { Query } from "../utils/query.js";
import { Insert } from "../utils/insert.js";
import { Update } from "../utils/update.js";
import { hash } from "../utils/helper.js";
import { Filter } from "../utils/filter.js";

export class AuthService{
    async login(email,password){
        if(this.validatePassword(password)){
            let query = new Query('api_user','id,token');
            let hashedPassword = await this.hashPassword(password);
            let filter = new Filter();
            filter.addEqualFilter('email',email);
            filter.addEqualFilter('password',hashedPassword);
            query.addFilter(filter);
            const db = getConnection();
            try {
                let result = await db.query(query.toString());
                if(result.rows && result.rows.length>0){
                    let user = result.rows[0];
                    let token = "";
                    if(user.token){
                       token = user.token; 
                    }else{
                        token = await hash(password);
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
        }else{
            throw new Error("Password must be at least 8 characters long, at least one letter and at least one number");
        }
    }

    async signUp(data){
        try {
            if(this.isValidEmail(data?.email)){
                if(this.validatePassword(data.password)){
                    let query = new Query('api_user','id');
                    let filter = new Filter();
                    filter.addEqualFilter('email',data.email);
                    query.addFilter(filter);
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
                }else{
                    throw new Error("Password must be at least 8 characters long, at least one letter and at least one number");
                }
            }else{
                throw new Error("Email is not valid");
            }
        } catch (error) {
            throw error
        }
    }

    async hashPassword(password){
        let hashPassword = await hash(password);
        return hashPassword;
    };

    validatePassword(password) {
        return password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
  
}
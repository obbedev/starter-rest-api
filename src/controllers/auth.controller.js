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
      let token = await authService.login(body.email,body.password);
      res.status(200).json({token:token})
    } catch (error) {
      console.log(error);
      if(error?.code == 401){
        res.status(401).json({error:"Invalid credentials"})
      }
      res.status(500).json({error})
    }
};

export const signUp = async (req, res) => {
  const body = req.body;
  try {
    const authService = new AuthService();
    await authService.signUp(body);
    res.status(200).json({message:"User created"});
  } catch (error) {
    console.log("Error creating account:",error);
    res.status(500).json({message:error})
  }
};

export const hashPassword = async (password) => {
  let hashPassword = await hash(password);
  return hashPassword;
};

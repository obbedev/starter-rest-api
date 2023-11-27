import { AuthService } from "../services/auth.service.js";
export const login = async (req, res) => {
    const body = req.body;
    console.log("login body", body);
    try {
        const authService = new AuthService();
        let token = await authService.login(body.email, body.password);
        res.status(200).json({ token: token });
    }
    catch (error) {
        console.log(error);
        if (error?.code == 401) {
            res.status(401).json({ error: "Invalid credentials" });
        }
        res.status(500).json({ error: error.message });
    }
};
export const signUp = async (req, res) => {
    const body = req.body;
    try {
        const authService = new AuthService();
        await authService.signUp(body);
        res.status(200).json({ message: "User created" });
    }
    catch (error) {
        console.log("Error creating account:", error);
        res.status(500).json({ error: error.message });
    }
};

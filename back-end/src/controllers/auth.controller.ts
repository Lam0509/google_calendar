import { Request, Response } from "express";
import {AuthServices} from "../services/auth.services";

class AuthController {

    static async login(req: Request, res: Response) {
        try {
            let { email, password } = req.body;
            let accessToken = await AuthServices.checkAuthAndGenerateToken(email, password);
            res.status(200).json(accessToken);
        }
        catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static async logout(req, res) {

    }

}

export default AuthController;
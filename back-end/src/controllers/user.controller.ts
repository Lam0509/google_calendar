import { Request, Response } from "express";
import {UserServices} from "../services/user.services";

class UserController {

    static async getOtherUsers(req: Request, res: Response) {
        try {
            let userId = req.params.id
            UserServices.getOtherUsers(userId)
                .then(users => {
                    res.json(users);
                }).catch(err => {
                    res.json(err)
            })
        }
        catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

    static addUser(req: Request, res: Response) {
        try {
            let {name, email, password} = req.body
            UserServices.addUser(name, email, password)
                .then(() => {
                    res.status(200).json({message: 'Add new user successfully!'})
                }).catch(err => {
                    res.json(err);
            })
        }
        catch (err: any) {
            res.status(500).json({ message: err.message });
        }
    }

}

export default UserController;
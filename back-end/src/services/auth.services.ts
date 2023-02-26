import bcrypt from 'bcrypt';
import {BaseServices} from "./base.services";
import {UserServices} from "./user.services";
require('dotenv').config();

export class AuthServices extends BaseServices {

    static async checkAuthAndGenerateToken(email, password): Promise<string> {
        let user = await UserServices.getUserByEmail(email);
        if (!user) {
            throw new Error("Wrong email or password");
        }
        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            throw new Error("Wrong email or password");
        }
        return this.generateAccessToken(user);
    }

}


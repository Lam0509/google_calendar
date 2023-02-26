import User from "../entity/user";
import jwt from 'jsonwebtoken';

export class BaseServices {

    static generateAccessToken(user: User): string {
        let { id, name, image, role } = user;
        let payload = { id, name, image, role};
        return jwt.sign(payload, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1y" }
        );
    }

}




import User from "../entity/user";
import {AppDataSource} from "../data-source";
import bcrypt from "bcrypt";

let userRepo = AppDataSource.getRepository(User)

export class UserServices {

    static async getUserByEmail(email: string) {
        return await userRepo.findOneBy({email: email});
    }

    static getOtherUsers(userId) {
        return userRepo.createQueryBuilder()
            .where('id != :id', {id: userId})
            .execute()
    }

    static async addUser(name, email, password) {
        let user = new User()
        user.name = name
        user.email = email
        user.password = await bcrypt.hash(password, 10)
        return userRepo.save(user)
    }

}

import {Axios} from "../configs/axios";

export class UserServices {
    static getOtherUsers(userId) {
        return Axios.get(`users/${userId}`);
    }

    static addNewUser(values) {
        return Axios.post(`users`, values);
    }
}

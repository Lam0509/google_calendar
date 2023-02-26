import {Axios} from "../configs/axios";

class AuthServices {
    static login(values) {
        return Axios.post('/auth/login',values);
    }
}

export default AuthServices;
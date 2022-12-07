import axios from "axios";


export default class UserService {
    static async get_user() {
        const response = await axios.get('http://127.0.0.1:8000/user')
        console.log(response)
        return response
    }
}
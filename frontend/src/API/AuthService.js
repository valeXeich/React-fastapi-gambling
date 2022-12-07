import axios from "axios";

export default class AuthService {

    static async login(data, headers) {
        try {
            const response = await axios.post('http://127.0.0.1:8000/login', data, headers)
            const token = response.data.access_token
            localStorage.setItem("auth_token", token)
            console.log(response.data)
            return {login: true, status: response.status}
          } catch(e) {
            const status = e.response.status
            if (status === 404) {
              console.log('user not defind')
            } else if (status === 400) {
              console.log('bad password')
            }
            return {login: false, status: status}
        }
    }

    static async createAccount(data) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/user', data)
        return {created: true}
      } catch (e) {
        if (e.response.status === 400) {
          return {created: false, message: e.response.data.detail}
        }
      }
    }

    static async getActiveUser() {
      const response = await axios.get('http://127.0.0.1:8000/user')
      return response.data
    }
}
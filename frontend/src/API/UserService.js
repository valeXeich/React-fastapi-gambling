import axios from "axios";


export default class UserService {
    static async get_user() {
        const response = await axios.get('http://127.0.0.1:8000/user')
        console.log(response)
        return response
    }

    static async getUserBalance(setBalance) {
        const response = await axios.get('http://127.0.0.1:8000/user/balance')
        console.log(response.data.balance, 'balance')
        setBalance(response.data.balance)
    }

    static async changeUserBalance(balance) {
        const formData = {
            balance: balance
        }
        await axios.post('http://127.0.0.1:8000/user/change-balance', formData);
    }

    static async deposit(balance, setError, setSuccess) {
        const formData = {
            balance: balance
        }
        try {
            await axios.post('http://127.0.0.1:8000/user/deposit', formData);
            setSuccess('Successfully completed');
        } catch(e) {
            if (e.response.status === 400) {
                setError(e.response.data.detail);
            }
        }
    }

    static async withdraw(balance, setError, setSuccess) {
        const formData = {
            balance: balance
        }
        try {
            await axios.post('http://127.0.0.1:8000/user/withdraw', formData);
            setSuccess('Successfully completed');
        } catch(e) {
            if (e.response.status === 400) {
                setError(e.response.data.detail);
            }
    }
}}
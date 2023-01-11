import axios from "axios";


export default class ChatService {
    static async getMessages(setMessages) {
        const response = await axios.get('http://127.0.0.1:8000/messages')
        setMessages((messages) => [...messages, ...response.data])
    }
}
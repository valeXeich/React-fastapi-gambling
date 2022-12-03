import React from "react";
import { useState, useEffect } from "react";
import '../styles/Chat.css';
import Message from "./UI/message/Message";

const Chat = () => {

  const [chat, setChat] = useState('');

  const [clienId, setClientId] = useState(Math.floor(new Date().getTime()/1000))

  const [messages, setMessages] = useState([]);

  const [websckt, setWebsckt] = useState();

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/message/${clienId}`);

    ws.onmessage = function(event) {
        const message = JSON.parse(event.data)
        console.log(message)
        if (!message.cliend_id) {
          
        }
        setMessages([...messages, message])

    }

    setWebsckt(ws)

    return () => ws.close()

  }, [messages])

  // const ws = new WebSocket('ws://localhost:8000/message');

  // ws.onmessage = function(event) {
  //   setMessages([...messages, JSON.parse(event.data)])
  //   console.log(JSON.parse(event.data))
  // }

  function sendMessage() {
    setChat('')
    websckt.send(chat)
    websckt.onmessage = (e) => {
      const message = JSON.parse(e.data)
      setMessages([...messages, message])
    }
  }



  return (
    <div className="chat p-3">
      <h4 className="text-center chat-title">Chat</h4>

      <Message messages={messages}/>

      <div className="chat-submit d-flex d-flex justify-content-between">
        <input
          placeholder="Your message"
          type="text"
          className="form-control form-chat shadow-none"
          onChange={e => setChat(e.target.value)}
          value={chat}
        />
        <button onClick={sendMessage} className="btn btn-chat-color">
          <i className="bi bi-send text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;

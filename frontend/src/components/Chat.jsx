import React, { useRef } from "react";
import { useState, useEffect, useContext } from "react";
import ChatService from "../API/ChatService";
import { AuthContext } from "../contex";
import '../styles/Chat.css';
import Message from "./UI/message/Message";

const Chat = () => {

  const {authData, setAuthData} = useContext(AuthContext);

  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState('');
  const socket = useRef();

  const [chatError, setChatError] = useState('');

  useEffect(() => {
    ChatService.getMessages(setMessages)
  }, [])

  useEffect(() => {

    socket.current = new WebSocket(`ws://localhost:8000/message`)

    socket.current.onopen = () => {
      console.log('Connected')
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((messages) => [...messages, message])
    };

    socket.current.onclose = () => {
      console.log('Socket closed')
    };

    socket.current.onerror = () => {
      console.log('Socket error')
    };

    return () => socket.current.close();
  }, [])
  


  const sendMessage = async () => {
    setChatError('');
    if (authData.auth) {
      const message = {
        username: authData.user.username,
        message: chat
      }
      socket.current.send(JSON.stringify(message));
      setChat('');
    } else {
      setChatError('You must be logged in')
      setChat('')
    }
  }


  return (
    <div className="chat p-3">
      <h4 className="text-center chat-title">Chat</h4>

      <Message messages={messages}/>

    {chatError
      ? <p className='text-danger'>{chatError}</p>
      : ''
    }

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

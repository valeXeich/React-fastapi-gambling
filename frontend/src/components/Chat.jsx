import React from "react";
import '../styles/Chat.css';

const Chat = () => {
  return (
    <div className="chat p-3">
      <h4 className="text-center chat-title">Chat</h4>
      <div className="message">
        <img
          src="img/avatar.jpg"
          width="30"
          height="30"
          alt=""
          className="img-fluid rounded-circle"
        />
        <span className="name-color ms-1">valex</span>
        <p className="text-chat">very good!</p>
      </div>
      <div className="chat-submit d-flex d-flex justify-content-between">
        <input
          placeholder="Your message"
          type="text"
          className="form-control form-chat shadow-none"
        />
        <button className="btn btn-chat-color">
          <i className="bi bi-send text-white"></i>
        </button>
      </div>
    </div>
  );
};

export default Chat;

import React from 'react';
import './Message.css'

const Message = ({messages}) => {
    return (
        <div>
        {messages.map((message, index) => (
            <div className="message" key={index}>
                <img
                src={`${process.env.PUBLIC_URL}/avatar.jpg`}
                width="30"
                height="30"
                alt=""
                className="img-fluid rounded-circle"
                />
                <span className="name-color ms-1">{message.username}</span>
                <p className="text-chat">{message.text}</p>
            </div>
        ))}
        </div>
    );
};

export default Message;
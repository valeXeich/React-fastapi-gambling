import React from 'react';
import './Message.css'

const Message = ({messages}) => {
    return (
        <div className="messages">
        {messages.map((message, index) => (
            <div className="message" key={index}>
                <img
                src={`${process.env.PUBLIC_URL}/avatar.jpg`}
                width="35"
                height="35"
                alt=""
                className="img-fluid rounded-circle"
                />
                <span className="name-color ms-2">{message.username} {message.time}</span>
                <p className="text-chat">{message.message}</p>
            </div>
        ))}
        </div>
    );
};

export default Message;
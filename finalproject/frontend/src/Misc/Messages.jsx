import React from "react";
import Message from './Message';

export default function Messages(props) {
    const {messages} = props;
    return (<div>
        {messages.map((message) => {
            return <Message
            message={message}
            key={message.body}
            />
        })}
    </div>)
}
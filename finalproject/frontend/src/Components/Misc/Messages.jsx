/**
 * TODO:
 *  - Messages should be assumed to be a list from a particular user (another contact)
 *  - We need to assume a user is passed in too
 */
import React from "react";
import Message from './Message';
import SendMessage from './SendMessage';

export default function Messages(props) {
    const {messages, sendMessage} = props;
    return (<div>
        <SendMessage  sendMessage={sendMessage} />
        {messages.map((message) => {
            return <Message
            message={message}
            key={message._id}
            />
        })}
    </div>)
}
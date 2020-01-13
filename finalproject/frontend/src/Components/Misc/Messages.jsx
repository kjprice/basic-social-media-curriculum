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
    if (!messages || !messages.length) {
        return null;
    }
    return (
        <div>
            <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                <h1 className="display-4">Messages</h1>
            </div>
            <SendMessage  sendMessage={sendMessage} />
            {messages.map((message) => {
                return (
                <Message
                    message={message}
                    key={message._id}
                />
                )
            })}
        </div>
    )
}
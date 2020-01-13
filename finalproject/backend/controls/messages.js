const MessageModel = require('../models/messages');

function getAllMessages() {
    return MessageModel.find().exec().then((messages) => {
        return messages;
    })
}

function sendMessage(newMessage) {
    if (!newMessage || !newMessage.body) {
        return Promise.reject('No message body sent');
    }
    console.log({newMessage})
    const message = new MessageModel(newMessage);

    return message.save();
}

module.exports = {
    getAllMessages, sendMessage
};
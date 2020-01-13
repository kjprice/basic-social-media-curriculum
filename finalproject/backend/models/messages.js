const {db, mongoose} = require('../db');

const messageSchema = new mongoose.Schema({
    body: String
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
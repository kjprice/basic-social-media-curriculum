const {db, mongoose} = require('../db');

const messageSchema = new mongoose.Schema({
    body: String,
    from: mongoose.Types.ObjectId,
    to: mongoose.Types.ObjectId
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
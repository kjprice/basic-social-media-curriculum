const {db, mongoose} = require('../db');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    fullname: String,
    friends: [{
    }],
    authenticationToken: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const UserModel = require('../models/users');
const {db, mongoose} = require('../db');

const uuidv1 = require('uuid/v1');
const ALLOWED_FIELDS = [
    'username',
    'fullname',
    '_id'
];


function getUserByCredentials(email, password) {
    if (!email || !password) {
        return Promise.reject('No user body sent');
    }

    return UserModel.findOne({email, password}).exec();
}

function createAuthenticationToken(user) {
    user.authenticationToken = uuidv1();

    return user.save().then(() => user.authenticationToken);
}

function signUp({ username, email, fullname, password }) {
    if (!username || !email || !fullname || !password) {
        return Promise.reject('All fields are required');
    }
    return UserModel.countDocuments({username}).exec()
    .then(count => {
        if (count > 0) {
            return Promise.reject('Username already exists');
        }
        return UserModel.countDocuments({email}).exec();
    })
    .then(count => {
        if (count > 0) {
            return Promise.reject('Email already exists');
        }
        const user = new UserModel({ username, email, fullname, password });

        return user.save();    
    });
}

function getUserByAuthorization(authenticationToken) {
    return UserModel.findOne({authenticationToken}).exec();
}

function getUsersExcludingUser(excludingUser) {
    return UserModel.find({_id: {$ne: excludingUser._id}}, ALLOWED_FIELDS).limit(10).exec();
}

// TODO: Obviously this is terrible, a friend should have an option to accept
function addFriend(user, friendId) {
    const trueFriendId = mongoose.Types.ObjectId(friendId);

    return Promise.all([
        UserModel.updateOne({_id: friendId}, { $addToSet: {friends: user._id}}),
        UserModel.updateOne({_id: user._id}, { $addToSet: {friends: trueFriendId}}),
    ]);
}

function getUsersByIds(userIds) {
    return UserModel.find({ _id: {$in: userIds}}, ALLOWED_FIELDS)
    .exec();
}

module.exports = {
    signUp,
    getUserByAuthorization,
    createAuthenticationToken,
    getUserByCredentials,
    getUsersExcludingUser,
    addFriend,
    getUsersByIds,
};
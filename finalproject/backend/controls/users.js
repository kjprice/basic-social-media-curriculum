const UserModel = require('../models/users');

const uuidv1 = require('uuid/v1');

function getUserByCredentials(username, password) {
    if (!username || !password) {
        return Promise.reject('No user body sent');
    }

    return UserModel.findOne({username, password}).exec();
}

function createAuthenticationToken(user) {
    user.authenticationToken = uuidv1();

    return user.save().then(() => user.authenticationToken);
}

function signUp({username, password}) {
    return UserModel.count({username}).exec()
    .then(count => {
        if (count > 0) {
            return Promise.reject('Username already exists');
        }
        const user = new UserModel({username, password});

        return user.save();    
    })
}

function getUserByAuthorization(authenticationToken) {
    return UserModel.findOne({authenticationToken}).exec();
}

module.exports = {
    signUp, getUserByAuthorization, createAuthenticationToken, getUserByCredentials
};
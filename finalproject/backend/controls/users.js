const UserModel = require('../models/users');

const uuidv1 = require('uuid/v1');

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

module.exports = {
    signUp, getUserByAuthorization, createAuthenticationToken, getUserByCredentials
};
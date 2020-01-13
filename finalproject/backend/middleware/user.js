const { sendError } = require('./misc');
const userControls = require('../controls/users');

// Authenticate user via cookie
// set a cookie
function authenticUserCookie(req, res, next) {
    // check if client sent cookie
    const cookie = req.cookies.jwtToken;
    if (cookie === undefined)
    {
        return next();
    }

    return userControls.getUserByAuthorization(cookie)
    .then(user => {
        if (user) {
            req.user = user;
        } else {
            // delete cookie as it is invalid
            res.cookie('jwtToken', null);
        }
        next();
    });
}

function setUserAuthenticationCookie(req, res, next) {
    const {user} = req;
    if (!user) {
        return sendError(res, 'Error from "setUserAuthenticationCookie", "user" not set')
    }
    return userControls.createAuthenticationToken(user)
    .then((authenticationToken) => {
        if (!authenticationToken) {
            return Promise.reject('Unable to create authentication token for user');
        }
        res.cookie('jwtToken' , authenticationToken, { maxAge: 900000, httpOnly: true });

        next();
    })
    .catch(e => {
        sendError(res, e)
    });
}

function loginUser(req, res, next) {
    const userCredentials = req.body;
    const {email, password} = (userCredentials || {});
    if (!email || !password) {
        res.status(400);
        return res.send({'errorMessage': 'Username or password not sent'});
    }
    return userControls.getUserByCredentials(email, password)
    .then((user) => {
        req.user = user;
    next();
    }).catch((e) => {
        res.status(400);
        res.send({'errorMessage': `Unkown Error (${e.message})`});
    });
}

function logout(req, res) {
    const { user } = req;

    if (!user) {
    return sendError(res, 'Unable to find user for logout')
    }

    res.cookie('jwtToken', null);
    res.send({message: 'logout successful'});
}

function getLoggedInUser(req, res) {
    const { user } = req;

    if (!user) {
        return res.send({});
    }

    // handpick things we want
    const { username, email, fullname, friends } = user;

    return res.send({ user: { username, email, fullname, friends } });
}

function signUpUser(req, res, next) {
    return userControls.signUp(req.body)
    .then((user) => {
        req.user = user;
        next();
    })
    .catch((err) => sendError(res, err));
}

function getUsers(req, res) {
    const { user } = req;
    return userControls.getUsersExcludingUser(user)
    .then((users) => {res.send({users})});
}

function getFriends(req, res) {
    const { user } = req;
    const { friends } = user;

    return userControls.getUsersByIds(friends)
    .then((friendsList) => {
        res.send({ friends: friendsList })
    })
    .catch(e => sendError(res, e));
}

function addFriend(req, res) {
    const { user } = req;
    const { userId } = req.body;

    return userControls.addFriend(user, userId)
    .then(() => res.send({success: true}))
    .catch((e) => sendError(res, e));
}

function validateUser(req, res, next) {
    const { user } = req;

    if (user) {
        return next();
    }

    sendError(res, 'User Not Found - cannot validate', 401);
}

function loginUserSuccess(req, res) {
    return res.send({message: 'Login Successful'});
}
module.exports = {
    authenticUserCookie,
    loginUser,
    signUpUser,
    setUserAuthenticationCookie,
    loginUserSuccess,
    logout,
    getLoggedInUser,
    getUsers,
    getFriends,
    validateUser,
    addFriend,
};
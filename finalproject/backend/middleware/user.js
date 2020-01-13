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
            // res.cookie('jwtToken', null);
        }
        next();
    });
}

function sendError(res, error, statusCode = 400) {
    const errorMessage = error.message ? `Unknown error (${error.message})` : error;
    res.status(statusCode);
    res.send({errorMessage})
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
    const {username, password} = (userCredentials || {});
    if (!username || !password) {
        res.status(400);
        return res.send({'errorMessage': 'Username or password not sent'});
    }
    return userControls.getUserByCredentials(username, password)
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

    return res.send({ user: {username: user.username} });
}


function loginUserSuccess(req, res) {
    return res.send({message: 'Login Successful'});
}
module.exports = {authenticUserCookie, loginUser, setUserAuthenticationCookie, loginUserSuccess, logout, getLoggedInUser};
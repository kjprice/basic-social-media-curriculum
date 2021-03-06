/***
 * TODO:
 * - Wire in Express endpoints
 * --- GET news feed based on passed in userid (add security for friends)
 * --- POST news feed item
 * --- LOGIN
 * --- LOGOUT
 * --- GET MESSAGES
 * --- POST message to friend
 * - Wire in Socket.io
 * --- Get new messages from friends
 * - Wire in Mongo Connection (based on Environment Variables)
 * - Wire Mongoose Models
 * --- User
 * --- News
 * --- Messages 
***/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const cors = require('cors');
const userMiddleware = require('./middleware/user');

app.use(cookieParser());

const whitelist = ['http://localhost:3000']
const corsOptions = {
    credentials: true,
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`${origin} Not allowed by CORS`))
        }
    }
}
 

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4001;


const messageControls = require('./controls/messages');
// const userControls = require('./controls/users');

const db = require('./db');

app.use(userMiddleware.authenticUserCookie);
// let static middleware do its job
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

// Messages
app.post('/message', function(req, res) {
    messageControls.sendMessage(req.body)
    .then(() => res.send('success'))
    // TODO: Show a proper error
    .catch((err) => res.send(err));
});

// Users
app.post('/signUp', userMiddleware.signUpUser, userMiddleware.setUserAuthenticationCookie, userMiddleware.loginUserSuccess);

app.post('/signIn', userMiddleware.loginUser, userMiddleware.setUserAuthenticationCookie, userMiddleware.loginUserSuccess);

app.post('/logout', userMiddleware.logout);

app.get('/loggedInUser', userMiddleware.getLoggedInUser);

app.get('/users', userMiddleware.validateUser, userMiddleware.getUsers);

app.get('/friends', userMiddleware.validateUser, userMiddleware.getFriends);

app.put('/friend', userMiddleware.validateUser, userMiddleware.addFriend);

io.on('connection', function(socket){
    messageControls.getAllMessages()
    .then(messages => {
        socket.emit('messages', messages);
    });
    
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});



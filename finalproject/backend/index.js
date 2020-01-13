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

const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4001;


const messageControls = require('./controls/messages');

const db = require('./db');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/message', function(req, res) {
    messageControls.sendMessage(req.body)
    .then(() => res.send('success'))
    // TODO: Show a proper error
    .catch((err) => res.send(err));
});

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



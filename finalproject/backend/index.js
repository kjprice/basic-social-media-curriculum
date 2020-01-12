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
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4001;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.emit('messages', [{body: 'yo'}]);
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});

http.listen(port, function(){
    console.log('listening on *:' + port);
});



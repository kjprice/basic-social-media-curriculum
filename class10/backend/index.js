/*
** Create folder "backend
** - Run npm init
** - Create file "index.js"
** - Run "npm i --save express"
** - Run "npm install --save cors"
** - Run "npm install --save -g nodemon"
** - Run "npm i --save body-parser"
** - Within package.json add "npm start"
** - Wire in (by hand) all of the express stuff to create a hello world app
** Create folder "frontend"
** - Run npx create-react-app messages
** - Run npm i --save axios
** - Within componentDidMount (https://reactjs.org/docs/react-component.html#componentdidmount), get messages from the server
** Within backend/index.js -> Add CORS with correct origin
** - Display Messages 
*/

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3113;

const messages = [];

const whitelist = ['http://localhost:3000'];
const corsOptions = {
    credentials: true,
    origin: true
}

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('hello world'));

app.post('/message', (req, res) => console.log(req.body) || res.send(req.body))

const messages = [{id: 1, body: 'Hey friend!'}];

app.get('/messages', (req, res) => {
    res.json(messages);
})

app.listen(PORT, () => {console.log(`Listening to port ${PORT}`)});
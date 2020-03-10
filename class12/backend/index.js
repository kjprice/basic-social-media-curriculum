const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'socialMedia';

const app = express();

const corsOptions = {
    origin: true
}
app.use(cors(corsOptions));

app.use(bodyParser.json());

const PORT = 4000;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
        throw new Error(err);
    }

    app.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    });

    const db = client.db(dbName);

    const userCollection = db.collection('users');

    app.post('/user', (req, res) => {
        userCollection.insertOne(req.body, (err, result) => {
            res.json({
                username: req.body.username,
                password: req.body.password,
                _id: result.insertedId
            })
        });
    });

    app.get('/messages', (req, res) => {
        console.log(req.params.userId);
        messagesCollection.find({
            userId: req.params.userId,
        }, (err, results) => {
            
        });
        res.send();
    })

    // app.get('/users', (req, res) => {
    //     userCollection.find().toArray((err, users) => {
    //         if (err) {
    //             throw new Error(err);
    //         }
    //         res.json(users);
    //     });    
    // });
});



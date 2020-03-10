const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongodb://localhost:27017';
const port = 4000;

const dbName = 'socialMedia';
const app = express();

app.use(bodyParser.json());


MongoClient.connect(mongoUrl, { useUnifiedTopology:true }, (err, client) => {
    if (err !== null) {
       throw new Error(`Could not connect to MongoDB with error: ${err}`)
    }

    console.log('Successfully connected to mongodb');

    const db = client.db(dbName);

    const usersCollection = db.collection('users');



    app.get('/users', (req, res) => {
        usersCollection.find().toArray((err, docs) => {
            res.json(docs);
        });
    });

    app.post('/user', (req, res) => {
        console.log(req.body);
        res.json(req.body);
        usersCollection.insertOne(req.body);
    });


    app.listen(port, () => {console.log(`Listening on port ${port}`)})
})


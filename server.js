require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');
const mongoClient = require('mongodb').MongoClient;


const PORT = process.env.PORT || 3000;

const app = express();

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
// app.use('/api', api);

const initialise = () => {
    const uri = 'mongodb+srv://'+ process.env.ATLAS_USER +':'+ process.env.ATLAS_PASSWORD +'@national-api.1dftw.mongodb.net/national-parks?retryWrites=true&w=majority';

    const client = new mongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    client.connect(err => {
        if(err){
            console.log('Error! ' + err);
            client.close();
        } else {
            console.log('Connected to MongoDB');
            const nationalParks = client.db('national-parks').collection('parks');
            //all parks
            app.get('/national-parks', (req, res) => {
                nationalParks.find({}).toArray()
                .then(parks => {
                    res.setHeader('content-type', 'Application/json');
                    res.statusCode = 200;
                    res.send(JSON.stringify(parks));
                }).catch(err => {
                    res.send('Error! ' + err);
                })
            });
            //country search by iso_a2
            app.get('/national-parks/country/:iso_a2', (req, res) => {
                console.log(req.params.iso_a2);
                const query = {"location.iso_a2": req.params.iso_a2};
                nationalParks.find(query).toArray()
                .then(parks => {
                    res.setHeader('content-type', 'Application/json');
                    res.statusCode = 200;
                    res.send(JSON.stringify(parks));
                }).catch(err => {
                    res.send('Error! ' + err);
                })
            });
            //autocomplete route
            app.get('/national-parks/ac/:query', (req, res) => {
                const regEx = new RegExp('.*' + req.params.query + '.*')
                const query = {"annotation.name": {'$regex': regEx, '$options': 'i'}};
                nationalParks.find(query).toArray()
                .then(parks => {
                    res.setHeader('content-type', 'Application/json');
                    res.statusCode = 200;
                    res.send(JSON.stringify(parks));
                }).catch(err => {
                    res.send('Error! ' + err);
                })
            });
        }
    })

}


app.listen(PORT, () => {
    initialise();
    console.log('Server listening at port ' + PORT)
});


// (err, data) => {
//     if(err){
//         res.send('Error! ' + err);
//     }else{
//         res.send(JSON.stringify(data));
//     }
// }
// const express = require('express');
// const bodyParser = require("body-parser");
// const path = require('path');
// // const Joi = require('joi');

// const db = require("./server/routes/api.js");
// const collection = "todo";
// const app = express();

// // schema used for data validation for our todo document
// // const schema = Joi.object().keys({
// //     todo: Joi.string().required()
// // });

// app.use(express.static(path.join(__dirname, 'dist')));

// // parses json data sent to us by the user 
// app.use(bodyParser.json());

// // serve static html file to user
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// // read
// app.get('/getTodos', (req, res) => {

//     db.getDB().collection(collection).find({}).toArray((err, documents) => {
//         if (err)
//             console.log(err);
//         else {
//             res.json(documents);
//         }
//     });

//     // res.send("Hello world");
// });


// app.use((err, req, res, next) => {
//     res.status(err.status).json({
//         error: {
//             message: err.message
//         }
//     });
// })


// db.connect((err) => {
//     if (err) {
//         console.log('unable to connect to database');
//         process.exit(1);
//     }
//     else {
//         app.listen(process.env.PORT || 3000, () => {
//             console.log('connected to database, app listening on port 3000');
//         });
//     }
// });




const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

// API file for interacting with MongoDB
const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
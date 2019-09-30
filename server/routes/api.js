const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;

const ObjectID = require('mongodb').ObjectID;

const dbname = "codesarrival";
const url = "mongodb://localhost:27017";
const mongoOptions = { useNewUrlParser: true };

const connection = (closure) => {
    console.log("hehhehhe")
    return MongoClient.connect(url, mongoOptions, (err, client) => {

        if (err)
            console.log(err);
        else {
            var dBase = client.db(dbname);
            // state.db = client.db(dbname);
            console.log("jkrhwjkhfwkj")
            console.log(dBase)
            closure(dBase);
        }
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/users', (req, res) => {
    console.log("Started")
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;


// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require('mongodb').ObjectID;
// // name of our database
// const dbname = "crud_mongodb";
// // location of where our mongoDB database is located
// const url = "mongodb://localhost:27017";
// // const url = "mongodb+srv://atta:Asdf123#$@cluster0-hwwxv.mongodb.net/test?retryWrites=true&w=majority";
// // mongodb + srv://atta:<password>@cluster0-hwwxv.mongodb.net/test?retryWrites=true&w=majority
// // Options for mongoDB
// const mongoOptions = { useNewUrlParser: true };

// const state = {
//     db: null
// };

// const connect = (cb) => {
//     // if state is not NULL
//     // Means we have connection already, call our CB
//     if (state.db)
//         cb();
//     else {
//         // attempt to get database connection
//         MongoClient.connect(url, mongoOptions, (err, client) => {
//             // unable to get database connection pass error to CB
//             if (err)
//                 cb(err);
//             // Successfully got our database connection
//             // Set database connection and call CB
//             else {
//                 state.db = client.db(dbname);
//                 cb();
//             }
//         });
//     }
// }

// // returns OBJECTID object used to 
// const getPrimaryKey = (_id) => {
//     return ObjectID(_id);
// }

// // returns database connection 
// const getDB = () => {
//     return state.db;
// }

// module.exports = { getDB, connect, getPrimaryKey };
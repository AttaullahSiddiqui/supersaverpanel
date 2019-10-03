const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    fetchCategories: fetchCategories
};

function fetchCategories(req, res) {

    Category.find({}, function (err, categories) {
        if (err) {
            res.json(resHandler.respondError(error[0], error[1] || -1));
        } else if (!categories) {
            res.json(resHandler.respondError("No categories at the moment", -3));
        }
        else {
            res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
        }
    });
}
function editCategory(req, res) {
    console.log("jjjjjj");
    console.log(req.body);
    res.send("hahhahha")
}

function registerUser(req, res) {
    var newUser = new User({
        userName: req.body.userName,
        userPass: req.body.userPass,
        admin: req.body.admin
    });
    newUser.save().then(function (result) {
        // return res.respondSuccess(result, "User account created successfully", 2);
        res.json(resHandler.respondSuccess(result, "User account created successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}
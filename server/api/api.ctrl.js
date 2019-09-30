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
    authUser: authUser,
    registerUser: registerUser,
    createCategory: createCategory,
    addStore: addStore,
    addCoupon: addCoupon
};

function authUser(req, res) {
    res.send("Hahahha from login");

    User.findOne({ userName: req.body.userName }, function (err, user) {
        if (err || !result) {
            console.log("Error : -------->", err);
            return res.respondError("Unexpected Error", -1);
        }
        if (!user) return fn(new Error('cannot find user'));
        hash(pass, user.salt, function (err, hash) {
            if (err) return fn(err);
            if (hash == user.hash) return fn(null, user);
            fn(new Error('invalid password'));
        })
    })
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

function createCategory(req, res) {
    res.send("Hahahha from createCategory")
}

function addStore(req, res) {
    res.send("Hahahha from addStore")
}

function addCoupon(req, res) {
    res.send("Hahahha from addCoupon")
}





































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
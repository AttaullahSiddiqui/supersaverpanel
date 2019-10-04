const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
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
    console.log("Hahahha from login");
    console.log(req.body);

    User.findOne({ userName: req.body.userName }, function (err, fetchedUser) {
        if (err) {
            res.json(resHandler.respondError(error[0], error[1] || -1));
        } else if (!fetchedUser) {
            res.json(resHandler.respondError("Wrong Username or Password", -3));
        }
        else {
            if (req.body.userPass == fetchedUser.userPass) {
                res.json(resHandler.respondSuccess(fetchedUser, "Login successfull, Welcome", 2));
            } else {
                res.json(resHandler.respondError("Wrong password", -3));
            }
        }
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
    var newCategory = new Category({
        name: req.body.catName,
        slug: req.body.catSlug,
        metaTitle: req.body.catMetaTitle,
        metaDescription: req.body.catMetaDescription,
        metaKeywords: req.body.catMetaKeywords,
        featuredForHome: req.body.catFeatured,
    });
    newCategory.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Category created successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
}

function addStore(req, res) {
    var newStore = new Store({
        name: req.body.name,
        heading: req.body.heading,
        categoryRef: req.body.categoryRef,
        shortDes: req.body.shortDes,
        longDes: req.body.longDes,
        img: req.body.img,
        imgAlt: req.body.imgAlt,
        directUrl: req.body.directUrl,
        trackUrl: req.body.trackUrl,
        metaTitle: req.body.metaTitle,
        metaDes: req.body.metaDes,
        metaKeywords: req.body.metaKeywords,
        fb: req.body.fb,
        pin: req.body.pin,
        wik: req.body.wik,
        twit: req.body.twit,
        gplus: req.body.gplus,
        android: req.body.android,
        ios: req.body.ios,
        topStore: req.body.topStore,
        editorChoice: req.body.editorChoice
    });
    newStore.save().then(function (result) {
        res.json(resHandler.respondSuccess(result, "Store added successfully", 2));
    }, function (err) {
        var error = errHandler.handle(err);
        res.json(resHandler.respondError(error[0], (error[1] || -1)));
    })
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
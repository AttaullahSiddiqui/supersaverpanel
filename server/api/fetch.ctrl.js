const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    fetchCategories: fetchCategories,
    fetchStoresOnlyId: fetchStoresOnlyId,
    fetchStoreById: fetchStoreById,
    fetchCouponsById: fetchCouponsById,
    fetchBlogs: fetchBlogs
};

function fetchCategories(req, res) {
    Category.
        find({}).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, categories) {
            if (err) {
                res.json(resHandler.respondError(err[0], err[1] || -1));
            }
            else {
                if (categories.length) {
                    res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
                } else {
                    res.json(resHandler.respondError("Can't load more categories", -3));
                }
            }
        });

    // Category.find({}, function (err, categories) {
    //     if (err) {
    //         res.json(resHandler.respondError(error[0], error[1] || -1));
    //     } else if (!categories) {
    //         res.json(resHandler.respondError("No categories at the moment", -3));
    //     }
    //     else {
    //         res.json(resHandler.respondSuccess(categories, "Categories fetched successfully", 2));
    //     }
    // });
}

function fetchStoresOnlyId(req, res) {
    Store.find({}, 'name _id', function (err, stores) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!stores) {
            res.json(resHandler.respondError("No Stores at the moment", -3));
        }
        else {
            res.json(resHandler.respondSuccess(stores, "Stores fetched successfully", 2));
        }
    })
}
function fetchStoreById(req, res) {
    console.log(req.body)
    console.log(req.query._id)
    Store.findById(req.query._id, function (err, store) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!store) {
            res.json(resHandler.respondError("No such Store at the moment", -3));
        }
        else {
            res.json(resHandler.respondSuccess(store, "Store fetched successfully", 2));
        }
    })
}
function fetchCouponsById(req, res) {
    Coupon.
        find({ storeId: req.query._id }).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, categories) {
            if (err) {
                res.json(resHandler.respondError(err[0], err[1] || -1));
            }
            else {
                if (categories.length) {
                    res.json(resHandler.respondSuccess(categories, "Coupons fetched successfully", 2));
                } else {
                    res.json(resHandler.respondError("No coupons in this Store", -3));
                }
            }
        });
}
function fetchBlogs(req, res) {
    Blog.
        find({}).
        skip(Number(req.query.skipNo)).
        limit(Number(req.query.limitNo)).
        exec(function (err, blogs) {
            if (err) {
                res.json(resHandler.respondError(err[0], err[1] || -1));
            }
            else {
                if (blogs.length) {
                    res.json(resHandler.respondSuccess(blogs, "Blogs fetched successfully", 2));
                } else {
                    res.json(resHandler.respondError("Can't load more blogs", -3));
                }
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
function callback() {

}
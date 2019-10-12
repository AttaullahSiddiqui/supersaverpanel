const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    editCategory: editCategory,
    editStore: editStore,
    editCoupon: editCoupon
};

function editCategory(req, res) {
    Category.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) {
            res.json(resHandler.respondError(error[0], error[1] || -1));
        } else if (!updatedNode) {
            res.json(resHandler.respondError("Wrong format provided", -3));
        }
        else {
            res.json(resHandler.respondSuccess(updatedNode, "Category updated successfully", 2));
        }
    })
}
function editCoupon(req, res) {
    Coupon.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) {
            res.json(resHandler.respondError(error[0], error[1] || -1));
        } else if (!updatedNode) {
            res.json(resHandler.respondError("Wrong format provided", -3));
        }
        else {
            res.json(resHandler.respondSuccess(updatedNode, "Coupon updated successfully", 2));
        }
    })
}
function editStore(req, res) {
    Store.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!updatedNode) {
            res.json(resHandler.respondError("Wrong format provided", -3));
        }
        else {
            res.json(resHandler.respondSuccess(updatedNode, "Store updated successfully", 2));
        }
    })
}
// function editCoupon(req, res) {
//     Coupon.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
//         if (err) {
//             res.json(resHandler.respondError(err[0], err[1] || -1));
//         } else if (!updatedNode) {
//             res.json(resHandler.respondError("Wrong format provided", -3));
//         }
//         else {
//             res.json(resHandler.respondSuccess(updatedNode, "Coupon updated successfully", 2));
//         }
//     })
// }

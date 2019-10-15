const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;

let Coupon = require('../Models/coupon.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    sortCoupons: sortCoupons
};

function sortCoupons(req, res) {
    // console.log(req.body);
    req.body.forEach(element => {
        // console.log(element)
        // console.log(element._id)
        Coupon.findOneAndUpdate({ _id: element._id }, element, function (err, updatedNode) {
            if (err) console.log(err)
            else if (!updatedNode) console.log("Wrong formatttt provided", -3);
            else console.log("Alaaaaaddd")
        })
    });
    res.json(resHandler.respondSuccess({ success: true }, "Coupons updated successfully", 2));


    // Coupon.updateMany(req.body, function (err, updatedNode) {
    //     if (err) {
    //         console.log(err)
    //         res.json(resHandler.respondError(err[0], err[1] || -1));
    //     } else if (!updatedNode) {
    //         res.json(resHandler.respondError("Wrong formatttt provided", -3));
    //     }
    //     else {
    //         console.log("Alaaaaaddd")
    //         res.json(resHandler.respondSuccess(updatedNode, "Coupon updated successfully", 2));
    //     }
    // })
}
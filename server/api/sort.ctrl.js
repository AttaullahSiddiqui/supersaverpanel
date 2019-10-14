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
    var returnArray = [];
    var xyz = req.query._id;
    req.query._id = req.body._id;
    console.log(req.body._id);
    console.log(req.query);

    Coupon.findByIdAndUpdate(req.body._id, req.query, { new: true }, function (err, updatedNode) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!updatedNode) {
            res.json(resHandler.respondError("Wrong formatttt provided", -3));
        }
        else {
            returnArray.push(updatedNode);
            req.body._id = xyz;
            console.log(xyz);
            console.log(req.body);
            Coupon.findByIdAndUpdate(xyz, req.body, { new: true }, function (error, response) {
                if (error) {
                    res.json(resHandler.respondError(error[0], error[1] || -1));
                } else if (!response) {
                    res.json(resHandler.respondError("Wrong format provided for second value", -3));
                }
                else {
                    returnArray.push(response)
                    res.json(resHandler.respondSuccess(returnArray, "Coupon updated successfully", 2));
                }
            })
            // res.json(resHandler.respondSuccess(updatedNode, "Category updated successfully", 2));
        }
    })
}
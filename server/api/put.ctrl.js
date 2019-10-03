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
    editCategory: editCategory
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

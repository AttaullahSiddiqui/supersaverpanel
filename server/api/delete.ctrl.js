const express = require('express');

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    deleteCategory: deleteCategory
};

function deleteCategory(req, res) {

    Category.findByIdAndRemove(req.body._id, function (err, deletedNode) {
        if (err) {
            res.json(resHandler.respondError(error[0], error[1] || -1));
        } else if (!deletedNode) {
            res.json(resHandler.respondError("Some error occured", -3));
        }
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Category deleted successfully", 2));
        }
    })
}

const express = require('express');

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let errHandler = require('../utils/errorHandler');
let resHandler = require('../utils/responseHandler');

module.exports = {
    deleteCategory: deleteCategory,
    deleteStore: deleteStore,
    deleteCoupon: deleteCoupon,
    deleteBlog: deleteBlog
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
function deleteStore(req, res) {
    Store.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!deletedNode) {
            res.json(resHandler.respondError("Some error occured", -3));
        }
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Store deleted successfully", 2));
        }
    })
}
function deleteCoupon(req, res) {
    Coupon.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!deletedNode) {
            res.json(resHandler.respondError("Some error occured", -3));
        }
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Coupon deleted successfully", 2));
        }
    })
}
function deleteBlog(req, res) {
    Blog.deleteOne({ _id: req.body._id }, function (err, deletedNode) {
        if (err) {
            res.json(resHandler.respondError(err[0], err[1] || -1));
        } else if (!deletedNode) {
            res.json(resHandler.respondError("Some error occured", -3));
        }
        else {
            res.json(resHandler.respondSuccess(deletedNode, "Blog deleted successfully", 2));
        }
    })
}

const express = require('express');

let User = require('../Models/user.model');
let Category = require('../Models/categories.model');
let Store = require('../Models/stores.model');
let Coupon = require('../Models/coupon.model');
let Blog = require('../Models/blog.model');
let resHandler = require('../utils/responseHandler');

module.exports = {
    editCategory: editCategory,
    editStore: editStore,
    editCoupon: editCoupon,
    editBlog: editBlog,
    editUser: editUser
};

function editCategory(req, res) {
    Category.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!updatedNode) res.json(resHandler.respondError("Wrong format provided", -3));
        else res.json(resHandler.respondSuccess(updatedNode, "Category updated successfully", 2));
    })
}
function editCoupon(req, res) {
    Coupon.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!updatedNode) res.json(resHandler.respondError("Wrong format provided", -3));
        else res.json(resHandler.respondSuccess(updatedNode, "Coupon updated successfully", 2));
    })
}
function editStore(req, res) {
    Store.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!updatedNode) res.json(resHandler.respondError("Wrong format provided", -3));
        else res.json(resHandler.respondSuccess(updatedNode, "Store updated successfully", 2));
    })
}
function editBlog(req, res) {
    Blog.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, updatedNode) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!updatedNode) res.json(resHandler.respondError("Wrong format provided", -3));
        else res.json(resHandler.respondSuccess(updatedNode, "Blog updated successfully", 2));
    })
}
function editUser(req, res) {
    User.findByIdAndUpdate(req.body._id, req.body, { new: true }, function (err, data) {
        if (err) res.json(resHandler.respondError(err[0], err[1] || -1));
        else if (!data) res.json(resHandler.respondError("Wrong format provided", -3));
        else res.json(resHandler.respondSuccess(data, "User credentials updated successfully", 2));
    })
}

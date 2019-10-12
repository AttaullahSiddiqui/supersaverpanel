const express = require('express');
const router = express.Router();
let apiCtrl = require('../api/api.ctrl');
let fetchCtrl = require('../api/fetch.ctrl');
let dltCtrl = require('../api/delete.ctrl');
let putCtrl = require('../api/put.ctrl');

router.post('/login', apiCtrl.authUser);
router.post('/register', apiCtrl.registerUser);
router.post('/createCategory', apiCtrl.createCategory);
router.post('/addStore', apiCtrl.addStore);
router.post('/addCoupon', apiCtrl.addCoupon);
router.post('/addDeal', apiCtrl.addDeal);
router.post('/addBlog', apiCtrl.addBlog);


router.get('/fetchCategories', fetchCtrl.fetchCategories);
router.get('/fetchBlogs', fetchCtrl.fetchBlogs);
router.get('/fetchStoresOnlyId', fetchCtrl.fetchStoresOnlyId);
router.get('/fetchStoreById', fetchCtrl.fetchStoreById);
router.get('/fetchCouponsById', fetchCtrl.fetchCouponsById);


router.post('/editCategory', putCtrl.editCategory);
router.post('/editStore', putCtrl.editStore);
router.post('/editCoupon', putCtrl.editCoupon);


router.post('/deleteCategory', dltCtrl.deleteCategory);
router.post('/deleteStore', dltCtrl.deleteStore);
router.post('/deleteCoupon', dltCtrl.deleteCoupon);


module.exports = router;
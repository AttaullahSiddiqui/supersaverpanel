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


router.get('/fetchCategories', fetchCtrl.fetchCategories);


router.post('/editCategory', putCtrl.editCategory);


router.post('/deleteCategory', dltCtrl.deleteCategory);


module.exports = router;
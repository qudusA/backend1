const express = require('express');
// const path = require('path')


// const rootDir = require('../util/path');
const adminController = require('../controller/admin');


const router = express.Router();

router.get('/add-product', adminController.getAddProduct);

router.get('/admin-product', adminController.getAdminProduct);

router.post('/add', adminController.postAdd);

router.get('/add-product/:productId', adminController.getEdit)

router.post('/editUpdate', adminController.postEditUpdate)

router.post('/delete', adminController.postdelete)


module.exports = router;
const express = require('express');
// const path = require('path');

// const rootDir = require('../util/path')
const shopController = require('../controller/shop')

const router = express.Router();

router.get('/', shopController.getShop);

router.get('/products', shopController.getProducts);

router.get('/orders', shopController.getOrders);

router.get('/cart', shopController.getCart);

router.get('/details/:productId', shopController.getDetails);

router.post('/addtocart', shopController.postCart);

router.post('/deleteCart', shopController.postdeleteCart);



module.exports = router;



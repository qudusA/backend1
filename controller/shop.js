const Products = require('../model/add-product')
const Cart = require('../model/cart');

// const productModel = require('../model/add-product');

exports.getShop =  (req, res, next)=>{
    Products.fetchproduct(product =>{
        res.render('shop/shop', {products: product})
    })
    // res.status(200).sendFile(path.join(rootDir, 'view', 'shop.html'))
};

exports.getProducts =  (req, res, next)=>{
    Products.fetchproduct(product =>{
        res.status(200).render('shop/products', {products: product})
    })
    // res.status(200).sendFile(path.join(rootDir, 'view', 'products.html'))
};

exports.getOrders = (req, res, next)=>{
    res.status(200).render('shop/orders')
    // res.status(200).sendFile(path.join(rootDir, 'view', 'orders.html'))
};

exports.getCart = (req, res, next)=>{
    Cart.fetchCart(product=>{
        // console.log(product)
        // console.log(product.totalCost)
        res.status(200).render('shop/cart', {cart: product})
    })
    // res.status(200).sendFile(path.join(rootDir, 'view', 'cart.html'))
};

exports.getDetails = (req, res, next)=>{
    const pams = req.params.productId
    Products.findId(pams, product=>{
        // console.log(product)
        res.render('shop/details', {product: product})
    })
    // console.log(pams)
}

exports.postCart = (req, res, next)=>{
    const prodId = req.body.productId
    Products.findId(prodId, product =>{
        // console.log(product)
        Cart.saveToCart(prodId, product)
        res.redirect('/cart')
    })
    // console.log(prodId)
}

exports.postdeleteCart = (req, res, next)=>{
    const prodId = req.body.id
    Products.findId(prodId, product=>{
        // console.log(product.price)
        Cart.deleteCart(prodId, product.price)
        res.redirect('/cart')
    })

}
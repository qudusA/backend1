const Products = require('../model/add-product');
const Cart = require('../model/cart');

exports.getAddProduct =  (req, res, next)=>{
    res.status(200).render('admin/add-product', {editmode: false})
    // res.status(200).sendFile(path.join(rootDir, 'view', 'add-product.html'))
};

exports.getAdminProduct = (req, res, next)=>{
    Products.fetchproduct(product =>{
        res.status(200).render('admin/admin-product',  {products: product})
        // console.log(prods)
        // res.status(200).sendFile(path.join(rootDir, 'view', 'admin-products.html'))
    });
};
// const products = []
exports.postAdd = (req, res, next)=>{
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    let adds = new Products(null,title, imageUrl, price, description)
    adds.save()
    // products.push({title: title, imageUrl: imageUrl, price: price, description: description})
    // console.log(products)

    res.redirect('/')
}

exports.getEdit = (req, res, next)=>{
    const prodId = req.params.productId
    const mode = req.query.edit
    Products.findId(prodId, product =>{
        // console.log(product)
        res.render('admin/add-product',{editmode: mode, product: product })
    })

}

exports.postEditUpdate = (req, res, next)=>{
    const prodId = req.body.id
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const edited = new Products(prodId, title, imageUrl, price, description)
    edited.save()
    res.status(302).redirect('/')
}

exports.postdelete = (req, res, next)=>{
    const prodId = req.body.id
    Products.delete(prodId)
    Products.findId(prodId, product => {
        Cart.deleteCart(prodId, product.price)
    })
    res.redirect('/')
}

// exports.products = products;
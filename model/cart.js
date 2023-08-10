const path = require('path');
const fs = require('fs')

// const productModel = require('./add-product')

const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

let cart = {product: [], totalCost: 0};
module.exports = class Cart{
    static saveToCart(id, prod){
        
        fs.readFile(p, (err, fileContent)=>{
            
            if(!err){
                cart = JSON.parse(fileContent)
            }
            const idExistindex = cart.product.findIndex(product => product.id === id)
            const idExist = cart.product[idExistindex];
            let update;
            if(idExist){
                update = {...idExist}
                update.qty = update.qty + 1
                cart.product = [...cart.product]
                cart.product[idExistindex] = update
            }else{
                update = {id : id, qty: 1, title: prod.title}
                cart.product.push(update)
            }
            cart.totalCost = cart.totalCost + +prod.price
            fs.writeFile(p, JSON.stringify(cart), err =>{
                console.log(err)
            })


        })
    }
    
    static fetchCart(cb){
        fs.readFile(p, (err, fileContent)=>{
            if(!err){
                cart = JSON.parse(fileContent);
            }else{
                cb(null)
            }
            cb(cart);

        })
    }


    static deleteCart(id, price){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                return;
            }
            cart = JSON.parse(fileContent);
            const update = {...cart};
            const product = update.product.find(product=> product.id === id);
            update.totalCost = update.totalCost - ( product.qty * +price )
            // const prodA = [...update.product]
            update.product  = update.product.filter(prod => prod.id !== id)
            fs.writeFile(p, JSON.stringify(update), err=>{
                console.log(err)
            })
        })

    }
}


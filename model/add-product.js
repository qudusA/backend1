const fs = require('fs');
const path = require('path');


const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const db = require('../util/data')

let products = [];

module.exports = class Ad {
    constructor(id ,title, imageUrl, price, description){
        this.id = id
        this.title = title
        this.imageUrl = imageUrl
        this.price = price
        this.description = description
    }

    save(){
        if(this.id){
            fs.readFile(p, (err, fileContent)=>{
                if(!err){
                    products = JSON.parse(fileContent)
                }
                const productIndex = products.findIndex(product=> product.id === this.id)
                const updated = [...products]
                updated[productIndex] = this;
                fs.writeFile(p, JSON.stringify(updated) ,err=>{
                    console.log(err)
                })
            })
        }else{
            this.id = Math.random().toString();
            fs.readFile(p, (err, fileContent)=>{
                if(!err){
                    products = JSON.parse(fileContent)
                }
                products.push(this)
                fs.writeFile(p, JSON.stringify(products), err =>{
                    console.log(err)
                }) 
            })
        }
    }

    static delete(id){
        fs.readFile(p, (err, fileContent)=>{
            if(!err){
                products = JSON.parse(fileContent)
            }
            const deleteIndex = products.findIndex(product => product.id === id)
            const updated = [...products]
            updated.splice(products[deleteIndex], 1)
            fs.writeFile(p, JSON.stringify(updated), err =>{
                console.log(err)
            })
        })
    }

    static fetchproduct(cb){
        // return db.execute('SELECT * FROM products')
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                console.log(err)
            }else{
                products = JSON.parse(fileContent)
            }
            cb(products)
        })
    
    }

    static findId(id, cb){
        fs.readFile(p, (err, fileContent)=>{
            if(err){
                console.log(err)
            }else{
                products = JSON.parse(fileContent)
                const product = products.find(product => product.id === id)
                cb(product)
            }
        })
    }

};
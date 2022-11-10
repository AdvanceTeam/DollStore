const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
var Schema = require('mongoose').Schema;
const authorization = require('../config/authorize')


const orderSchema = Schema({
    userID:String,
    send: {type:Boolean, default:false},
    address: String,
    list: [
        {idBook: String,quantity:Number}
    ]
},{
    collection: 'orders'
})

let Order
try {
    Order = mongoose.model('orders')
} catch(err) {
    Order = mongoose.model('orders', orderSchema);
}

const cartSchema = Schema({
    user: mongoose.ObjectId,
    product: [
        
    ]
}, {
    collection: 'carts'
});

let Cart
try {
    Cart = mongoose.model('carts')
}catch(error){
    Cart = mongoose.model('carts',cartSchema);
}

const addProducts = (productData) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Order(
             productData
        );
        
        let list2 = productData.list.map((element)=>{
            return {item:element.idBook, quantity:element.quantity}
        })
        
        // console.log("productData");
        // console.log(productData);
        console.log(list2);
        Cart.updateOne(
            { user:productData.userID, product:list2 },
            { $unset: { product : list2 }},()=>{

            }
        )

        new_product.save(
            (err, data)=>{
                if(err){
                    reject(new Error('Cannot insert order to DB'));
                }else{

                    resolve({message: 'Order added successfully'});
                }
            }
        );
    });
}


const getProduct = ()=> {
    return new Promise (
        (resolve, reject)=>{
            Order.find({}, (err, data)=> {if(err){
                reject(new Error('Cannot get products!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get products!'))
                }
            }})
        }
    );
}

const deleteProduct = (productID) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Order(
             productID
        );
        new_product.deleteOne(productID, (err, data)=>{

            if(err){
                reject(new Error('Cannot delete products!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot delete products!'))
                }
            }
        }
        );
    });
}


router.route('/addorder').post(authorization,(req, res)=>{
    console.log('add order');
    // console.log(req.body);
    addProducts(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
        res.status(400).json(err);
    })
})


router.route('/getorder').get(authorization,(req,res)=>{
    console.log('get');
    getProduct().then( result => {
        //console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})

router.route('/deleteorder').post(authorization,(req,res)=>{
    console.log("express delete bool");
    console.log(req.body._id);

    deleteProduct({_id:req.body._id}).then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})


router.route('/updateStateOrder').put(authorization,(req,res)=>{

    var query = {"_id":req.body._id};

        Order.findByIdAndUpdate(query, {send:true}, {new: true}, function(err, doc) {
            if (err) return res.status(400).json({msg:err});
            return res.status(200).json({msg:doc});
        });

})

module.exports = router
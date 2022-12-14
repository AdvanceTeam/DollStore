const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();
var Schema = require("mongoose").Schema;
const router = expressFunction.Router();
const authorization = require('../config/authorize')


const promotionSchema = Schema({
   name: String,
   percent: Number,
   datestart: String,
   datestop: String,
},{
    collection: 'promotions'
});

let Promotion
try {
    Promotion = mongoose.model('promotions')
}
catch (error){
    Promotion = mongoose.model('promotions',promotionSchema);
}

exports.Promotion

const addpromotion = (promotionData) => {
    return new Promise ((resolve,reject) => {
        var new_promotion = new Promotion(
            promotionData
        );
        new_promotion.save((err,data)=>{
            if(err){
                reject(new Error('Cannot insert promotion to DB!'));
            }
            else{
                resolve({message: 'Promotion added successfully'});
            }
        })
    })
}

const getPromotion = () =>{
    return new Promise((resolve,reject)=>{
        Promotion.find({},(err,data)=>{
            if(err){
                reject(new Error('Cannot get promotion!'))
            }
            else{
                if(data){
                    resolve(data)
                }
                else{
                    reject(new Error('Cannot get promotion!'));
                }
            }
        })
    });
}

router.route('/promotions/add').post(authorization,(req,res)=>{
    console.log('add');
    addpromotion(req.body)
        .then(result=>{
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err)
        })
});

router.route('/promotions/get').get(authorization,(req,res)=>{
    console.log('get');
    getPromotion()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
})

const deletePromotion = (productID) => {
    return new Promise((resolve, reject) => {
        Promotion.deleteOne({ _id: productID }, (err, data) => {
            if (err) {
                reject(new Error('Cannot delete promotion!'));
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot delete promotion!'))
                }
            }
        }
        );
    });
}

router.route('/deletepromotion/:id').delete(authorization, (req, res) => {
    console.log("express delete dollst");
    //console.log("backend",req.body);
    console.log(req.params.id);
    deletePromotion(req.params.id)
        .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
})

module.exports = router
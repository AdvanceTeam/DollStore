const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
var Schema = require('mongoose').Schema;
const authorization = require('../config/authorize')

// const promotionSchema = Schema({
//     name: String,
//     percent: Number,
//     datestart: String,
//     datestop: String,
// }, {
//     collection: 'promotions'
// });

const dollSchema = Schema({
    name: String,
    price: Number,
    stock: Number,
    detail: String,
    promotion: String,
    file: String,
    img: String,

}, {
    collection: 'dolls'
})

let Doll
try {
    Doll = mongoose.model('dolls')
} catch (err) {
    Doll = mongoose.model('dolls', dollSchema);
}

exports.Doll;

const addProduct = (productData) => {
    return new Promise((resolve, reject) => {
        var new_product = new Doll(
            productData
        );
        new_product.save(
            (err, data) => {
                if (err) {
                    reject(new Error('Cannot insert product to DB'));
                } else {
                    resolve({ message: 'Product added successfully' });
                }
            }
        );
    });
}

const getProduct = () => {
    return new Promise(
        (resolve, reject) => {
            Doll.find({}, (err, data) => {
                if (err) {
                    reject(new Error('Cannot get products!'));
                } else {
                    if (data) {
                        resolve(data)
                    } else {
                        reject(new Error('Cannot get products!'))
                    }
                }
            })
        }
    );
}

const getBySearchProduct = (keyword) => {
    return new Promise((resolve, reject) => {
        Doll.find({ "tag": keyword }, (err, data) => {
            if (err) {
                reject(new Error('Cannot get products'));
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot get products!'))
                }
            }
        })
    });
}


router.route('/search/:tag').get(authorization, (req, res) => {
    console.log('search');
    getBySearchProduct(RegExp(req.params.tag, 'i'))
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
})



router.route('/adddoll').post(authorization, (req, res) => {
    console.log('add');
    addProduct(req.body)
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
        })
})


router.route('/updateDollfromuser').put(authorization, (req, res) => {

    var query = { "name": req.body.name };

    Doll.findByIdAndUpdate(query, { "quantity": req.body.quantity }, { new: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully saved.');
    });

})

router.route('/getAllDoll').get(authorization, (req, res) => {
    console.log('get');
    getProduct().then(result => {
        console.log(result);
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
})

router.route('/getDollByID/:id').get(authorization, async (req, res) => {
    try {
        console.log("get chart By ID working");
        const result = await Doll.findOne({ "_id": req.params.id })
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})

const deleteProduct = (productID) => {
    return new Promise((resolve, reject) => {

        Doll.deleteOne({ _id: productID }, (err, data) => {

            if (err) {
                reject(new Error('Cannot delete products!'));
            } else {
                if (data) {
                    resolve(data)
                } else {
                    reject(new Error('Cannot delete products!'))
                }
            }
        }
        );
    });
}

router.route('/deletedoll/:id').delete(authorization, (req, res) => {
    console.log("express delete dollst");
    //console.log("backend",req.body);
    console.log(req.params.id);
    deleteProduct(req.params.id).then(result => {
        console.log(result);
        res.status(200).json(result);
    })
        .catch(err => {
            console.log(err);
        })
})



// const updateProduct = (productID) => {
//     var new_product = new Doll;
//     console.log('updateProduct by express working!!!');
//     //new_product.assign({_id:productID._id},productID,{new: true},
//     //console.log(productID)
//     var query = { "_id": productID.body._id };

//     Doll.findByIdAndUpdate(query, { "quantity": productID.body.quantity }, { new: true }, function (err, doc) {
//         if (err) return res.send(500, { error: err });
//         return res.send('Succesfully saved.');
//     });
// }

router.route('/updateData').put(authorization, (req, res) => {

    var query = { "_id": req.body._id };

    Doll.findByIdAndUpdate(query, { "price": req.body.price,"stock" : req.body.stock,"detail": req.body.stock,"promotion": req.body.promotion,"file": req.body.file, "img": req.body.img}, { new: true }, function (err, doc) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully saved.');
    });

})



module.exports = router
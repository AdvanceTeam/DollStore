var expressFunction = require('express');
const router = expressFunction.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var Schema = require("mongoose").Schema;

const userSchema = Schema({
    username: String,
    password: String,
    role: String,
    // address: String,
}, {
    collection: 'users'
});

let User
try {
    User = mongoose.model('users')
}catch(error){
    User = mongoose.model('users',userSchema);
}


const subSchema = Schema({
    id_product: String,
    quantity: {typr:Number, default: 0}
})

const cartSchema = Schema({
user:mongoose.ObjectId,
product: [
    
]
}, {
collection: 'carts'
});

let CartSchema
try {
    CartSchema = mongoose.model('carts')
}catch(error){
    CartSchema = mongoose.model('carts',cartSchema);
}

const makeHash = async(plainText) => {
    const result = await bcrypt.hash(plainText, 10);
    return result;
}

const insertUser = (dataUser) => {
    return new Promise (async (resolve, reject) => {

        const exist = await User.findOne({username:dataUser.username})
        if(exist){
            resolve({message: 'ชื่อผู้ใช้ซ้ำ'});
        }


        var new_user = new User({
            username: dataUser.username,
            password: dataUser.password,
            role: dataUser.role
            // address: dataUser.address
        });
        new_user.save((err, data)=>{
            if(err){
                reject(new Error('Cannot insert user to DB!'));
            }else{
                console.log(data);
                console.log(data._id);

                cart = new CartSchema();
                cart.user = data._id
                cart.product = []
                cart.save((err, cartResult)=>{
                    if(err){ 
                        reject(new Error('Cannot insert new '+ data.user+'\'cart to DB!'));
                    }
                })
                resolve({message: 'Singn up successfully'});
            }
        })
    });

}

router.route('/signup')
    .post((req, res)=>{
        makeHash(req.body.password)
        .then(hashText => {
            const playload = {
                username: req.body.username,
                password: hashText,
                role: req.body.role
                // address: req.body.role
            }
            // console.log(playload);
            insertUser(playload)
                .then(result => {
                    // console.log(result);
                    
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch( err => {

        })
    })

//นำออกไปใช้งาน    
module.exports = router;
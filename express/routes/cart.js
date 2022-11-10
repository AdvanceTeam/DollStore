const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
const Schema = require('mongoose').Schema;
const authorization = require('../config/authorize')


const userSchema = Schema({
    username: String,
    password: String,
    role: String
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
        quantity: {type:Number},
        id_product: {type:String},
})

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

router.route('/additemtocart').put(authorization,async (req, res)=>{
    try {
        console.log("req.body =");
        console.log(req.body);
        /*
        {
            id_item: "",
            quantity
        }
         */
        // check user
        const exist = await User.findOne({name:req.body.idUser})
        if(!exist){
            new Error('ไม่พบผู้ใช้งาน')
        }
        //check cart
        const cart = await Cart.findOne({user:req.body.idUser})
        
        if(!cart){
            new Error('ไม่พบตะกร้าผู้ใช้')
        }

        const index = cart.product.find((list) => list.item === req.body.item,()=>{
            console.log('list');
            console.log(list);
        });
        let aftersave;
        if(!index){
            cart.product.push({
                item:req.body.item,
                quantity:1
            })
            
            aftersave = await cart.save();
        }

        if(index){
            console.log("index = ");
            console.log(index);
            console.log("+1");
            let count = index?.quantity +1;
            console.log("count = "+count);

            // await Cart.findOneAndUpdate({user:req.body.idUser,"product.item":index.item},
            // {"product.quantity": 2})


            // await Cart.updateOne(
            //     {"uid":123456,"userclick.email":"neelshah486@gmail.com"},
            //     {$inc: { "userclick.$.count": 1}}
            // )


            // for (let i = 0; i < cart.product.length; i++) {
            //     if(cart.product[i].id_product == index.id_product){
            //         console.log("work");
            //         cart.product[i].quantity = count;
            //         console.log("after work");
            //         console.log(cart.product[i].quantity);
            //         aftersave = await cart.save();
            //         console.log("aftersave");
            //         console.log(aftersave);
                    
                
            //     }
            // }

            
            await Cart.updateOne(
                {user:req.body.idUser, "product.item":index.item},
                {
                    $inc:{
                        "product.$.quantity": 1
                    }
                }
            )
        }
        

       
        
        
        //  Cart.update(
        //     { _id: cart._id }, 
        //     { $addToset: { product: {
        //         quantity: 1,
        //         id_product: req.body.item,
        //     } } },
        // );
        
        
        
        res.status(200).json({msg: "plus cart API"});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }
})

router.route('/minustocart').put(authorization,async (req, res)=>{
    try {
      
        const exist = await User.findOne({name:req.body.idUser})
        if(!exist){
            new Error('ไม่พบผู้ใช้งาน')
        }
        //check cart
        const cart = await Cart.findOne({user:req.body.idUser})
        
        if(!cart){
            new Error('ไม่พบตะกร้าผู้ใช้')
        }

        const index = cart.product.find((list) => list.item === req.body.item,()=>{
            console.log('list');
            console.log(list);
        });
        let aftersave;
        
        let result;
        // console.log(index);
        if(index){
            // console.log("-====="+index.quantity > 2);
            if(index.quantity >= 2){
                console.log("process -1 working");
                result = await Cart.updateOne(
                {user:req.body.idUser, "product.item":index.item},
                {
                    $inc:{
                        "product.$.quantity": -1
                    }
                }
            )
            }else if(index.quantity ==1){
                // console.log(index);
                // console.log("delete one");
                await Cart.updateOne({user:req.body.idUser},
                {
                    $pull:{
                        "product": {$eq: index}
                    }
                })
            }else{
                console.log("not mathch condition");
            }
            
        }
        // console.log("result =");
        // console.log(result);
        
        res.status(200).json({msg: "minus cart API"});

    } catch (error) {
        console.log(error);
        res.status(400).json({msg: error});
    }
})

router.route('/getcart/:id').get(authorization,async (req,res)=>{
        try {
            console.log("get chart By ID working");
            const result = await Cart.findOne({"user":req.params.id})
            // console.log(result);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json(error);
        }
})

module.exports = router


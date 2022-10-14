const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
var Schema = require('mongoose').Schema;


const bookSchema = Schema({
    name: String,
    author:String,
    tag: String,
    quantity: Number,
    price:Number,
    file:String,
    img:String
},{
    collection: 'books'
})

let Book
try {
    Book = mongoose.model('books')
} catch(err) {
    Book = mongoose.model('books', bookSchema);
}

exports.Book;

const addProduct = (productData) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Book(
             productData
        );
        new_product.save(
            (err, data)=>{
                if(err){
                    reject(new Error('Cannot insert product to DB'));
                }else{
                    resolve({message: 'Product added successfully'});
                }
            }
        );
    });
}

const getProduct = ()=> {
    return new Promise (
        (resolve, reject)=>{
            Book.find({}, (err, data)=> {if(err){
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

const getBySearchProduct = (keyword) =>{
    return new Promise ((resolve, reject) =>{
        Book.find({"tag":keyword}, (err,data) =>{
            if(err){
                reject(new Error('Cannot get products'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get products!'))
                }
            }
        })
    });
}


router.route('/search/:tag').get((req, res)=>{
    console.log('search');
    getBySearchProduct(RegExp(req.params.tag,'i'))
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})



router.route('/addbook').post((req, res)=>{
    console.log('add');
    addProduct(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})


router.route('/updateBookfromuser').put( (req,res)=>{

    var query = {"name":req.body.name};

        Book.findByIdAndUpdate(query, {"quantity":req.body.quantity}, {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });

})

router.route('/getAllBook').get((req,res)=>{
    console.log('get');
    getProduct().then( result => {
        //console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})

router.route('/getBookByID/:id').get(async (req,res)=>{
    try {
        console.log("get chart By ID working");
        const result = await Book.findOne({"_id":req.params.id})
        // console.log(result);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
})

const deleteProduct = (productID) =>{
    return new Promise ((resolve, reject) => {
        
        Book.deleteOne({_id:productID}, (err, data)=>{

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



router.route('/deletebook/:id').delete((req,res)=>{
    console.log("express delete bool");
    //console.log("backend",req.body);
    console.log(req.params.id);
    deleteProduct(req.params.id).then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})



const updateProduct = (productID) =>{
    var new_product = new Book;
    console.log('updateProduct by express working!!!');
      //new_product.assign({_id:productID._id},productID,{new: true},
       //console.log(productID)
        var query = {"_id":productID.body._id};

        Book.findByIdAndUpdate(query, {"quantity":productID.body.quantity}, {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });
    }

    const deleteProduct2 = (productID) =>{
        return new Promise ((resolve, reject) => {
            
        });
    }
router.route('/updateQuantityBook').put( (req,res)=>{

    var query = {"_id":req.body._id};

        Book.findByIdAndUpdate(query, {"quantity":req.body.quantity}, {new: true}, function(err, doc) {
            if (err) return res.send(500, {error: err});
            return res.send('Succesfully saved.');
        });

})



module.exports = router
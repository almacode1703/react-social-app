const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
   productId : {
    type: String,
    required: [true, "Please enter product ID"]
   },
   productName : {
    type : String,
    required : [true, "Please enter product name"]
   },
   productImage : {
    type : String,
    required : [true, "Please enter upload an image for your product"]
   },    
   productDesc : {
    type : String,
    required : [true, "Please enter Product Desc"]
   },    
},
{
    collection : 'social-products'
},
{
    timestamps : true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
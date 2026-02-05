
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'product name is require']
    },
    price:{
        type:String
    },
    photo:{
        type:String
    },
    category:{
        // type:mongoose.Types.ObjectId,
        // ref:'category'
        type:String

    }
});

module.exports = mongoose.model('product', productSchema);
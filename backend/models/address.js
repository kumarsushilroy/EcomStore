
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    state:{
        type:String
    },
    city:{
        type:String
    },
    destrict:{
        type:String
    },
    pincode:{
        type:String
    },
    landmark:{
        type:String
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }


})

module.exports = mongoose.model('address', addressSchema)
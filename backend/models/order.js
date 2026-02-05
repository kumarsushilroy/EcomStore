

const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         required:[true,'order name is require']
//     },
//     price:{
//         type:String
//     },
//     photo:{
//         type:String
//     },
//     category:{
//         // type:mongoose.Types.ObjectId,
//         // ref:'category'
//         type:String

//     },
//     quantity:{
//         type:String
//     },
//     productId:{
//         type:String
//     },
//     deliveryAddressId:{
//         type:mongoose.Types.ObjectId,
//         ref:'address'
//     },
//     userId:{
//         type:mongoose.Types.ObjectId,
//         ref:'User'
//     }
// });

const orderSchema = new mongoose.Schema({
    
    orderItems:[
        {
            name:{
                type:String
            },
            price:{
                type:String
            },
            photo:{
                type:String
            },
            category:{
                type:String
            },
            quantity:{
                type:String
            }

        }, 

    ],

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    shippingAddress:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address'
    },

    shippingFee:{
        type:String 
    },

    totalAmount:{
        type:String
    },
    paymentMethod:{
        type:String,
        enum:{
            values:['COD','Online Payment'],
            message:"Please select: COD or Online Payment"
        }
    },

    paymentInfo:{
        id:String,
        status:String
    },
    
    orderStatus:{
        type:String,
        enum:{
            values:['processing', 'shipped', 'delivered'],
            message:'please select correct order status'
        },
        default:'processing'
    }

})

module.exports = mongoose.model('order', orderSchema);
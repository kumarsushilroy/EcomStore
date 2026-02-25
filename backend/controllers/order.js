

const orderSchema = require('../models/order.js');
const userSchema = require('../models/auth.js');


const createOrder = async (req, res) => {

  try {
   const user = req.user._id
    const {orderItems, shippingAddress, shippingFee, totalAmount, paymentMethod, orderStatus, paymentInfo} = req.body;
    if (!orderItems || !shippingAddress || !shippingFee || !totalAmount || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "all fields require !"
      });
    }
    
    const createOrder = new orderSchema({orderItems, shippingAddress, shippingFee, totalAmount, paymentMethod, orderStatus, user, paymentInfo});
    
    await createOrder.save();
    return res.status(200).json({
      success: true,
      message: "order placed successfully",
      order:createOrder
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
  }
};

const getOrders = async (req,res)=>{

  const {search} = req.query
  let query ={}
  if(search){
    query.$or = [
      {"orderItems.category": { $regex: search, $options: 'i' }},
      {"orderItems.name":{$regex:search, $options:'i'}}
    ]

  }
   
    try {
      const user = req.user._id
        // const orders = await orderSchema.find(query).populate('user', "username").lean().populate('shippingAddress')
         const orders = await orderSchema.find({user,...query});
        console.log(orders)
        return res.status(200).json({
            success:true,
            orders
        })
    } catch (error) {
          return res.status(400).json({
      success: false,
      message: "something went wrong !",
      error: error.message,
    });
    }
}

const updateOrderStatus = async(req,res)=>{
  console.log('body==', req.body)
  try {
    const orderId = req.params.id;
    let order = await orderSchema.findById(orderId);
    if(!order){
      return res.status(400).json({
        message:'no any order found with this id'
      })
    }
   order.orderStatus = req.body.status
   await order.save();
   return res.status(200).json({
    success:true,
    message:'Order Status Updated Successfully !',
    order
   })
  } catch (error) {
     return res.status(400).json({
      success:false,
      message:'something went wrong !',
      error:error.message
     })
  }
}

module.exports = {createOrder, getOrders, updateOrderStatus}
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeCart, clearCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAddressQuery } from "../../redux/authApi";
import { usePlaceOrderMutation } from "../../redux/authApi";
import { HiBars4 } from "react-icons/hi2";

const Cart = () => {
   
   const navigate = useNavigate();

   const [showAddress, setShowAddress] = React.useState(false)
   const [addressId , setAddressId] = useState('');
   const [paymentMode , setPaymentMode] = useState('COD');

   const {data:address} = useGetAddressQuery();
   const [placeOrder, {data:orderedData}] = usePlaceOrderMutation();
   

   const cart = useSelector((state)=>state.cart?.cart)
   
   const totalPrice = cart.reduce((acc,curr)=>acc + curr.quantity * curr.price, 0)
   
  const orderDetails = {orderItems:cart, shippingAddress:addressId, shippingFee:20, totalAmount:totalPrice, paymentMethod:paymentMode, paymentInfo:{status:'not paid'}}

   const makeOrder = ()=>{
     placeOrder(orderDetails)
     console.log('orderedDataa', orderedData);
     dispatch(clearCart())
   }
  
   const dispatch = useDispatch();

   const increaseQuantity = (id,quantity)=>{
     const obj = {id,quantity}
      dispatch(increaseQty(obj))
   }

   const decreaseQuantity = (id,quantity)=>{
    const obj = {id,quantity} ;
    dispatch(decreaseQty(obj))
   }

   const removeFromCart = (id)=>{
     dispatch(removeCart(id))
   }


  return (
  
     <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
        {
            cart?.length<1?(
                <h4 className="text-center mt-20">Your Cart is Empty</h4>
            ):
            (<>
 <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{cart.length} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cart?.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-5">
                        <div className="flex items-center md:gap-6 gap-3">

                            <div className="flex flex-col">
                            <div className="cursor-pointer w-24 h-24 flex flex-col items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.photo} alt={product.name} />
                            </div>
                            <p className="text-center p-2">Price: {product.price}</p>
                            </div>

                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    
                                    <div className='flex items-center justify-center gap-2'>
                                      <button onClick={()=>decreaseQuantity(product.productId,product.quantity)} className="bg-red-600 text-white font-bold px-2 rounded">-</button>
                                        <button>Qty:{product.quantity}</button>
                                      {/* <button onClick={()=>{

                                        const id = product.productId;
                                        const currentQty = product.quantity

                                        increaseQuantity({id, quantity:currentQty+1})
                                      }} className="bg-green-600 text-white font-bold px-2 rounded">+</button> */}

                                      <button onClick={()=>increaseQuantity(product.productId, product.quantity)} className="bg-green-600 p-2 text-white">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.price * product.quantity}</p>
                        <button className="cursor-pointer mx-auto" onClick={()=>removeFromCart(product.productId)}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">No address found</p>
                        <button onClick={() => navigate('/add-address')} className="text-indigo-500 hover:underline cursor-pointer">
                            Add Address
                        </button>
                        {address?.allAddress.length>0 && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                               <select id="" onChange={(e)=>setAddressId(e.target.value)}>
                                <option value="">Choose Address</option>
                                {
                                    address?.allAddress?.map((item)=>(
                                        <option value={item._id}>
                                        {item.city},{item.state},{item.pincode}
                                        </option>
                                    ))
                                }
                                
                               </select>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase ">Payment Method</p>

                    <select onChange={(e)=>setPaymentMode(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online Payment">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>$20</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>$20</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{cart.reduce((acc,curr)=>acc + curr.quantity * curr.price , 0)}</span>
                    </p>
                </div>

                <button onClick={makeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                    Place Order
                </button>
            </div>
            </>
            )
        }
           
        </div>
  );
};

export default Cart;

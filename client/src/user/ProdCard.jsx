import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { ProductContext } from '../features/ProductContext';
import { useAddToCartMutation } from '../../redux/authApi';
import { useDispatch } from 'react-redux';
import { addCart } from '../../redux/cartSlice';
import {toast} from 'react-hot-toast';

const ProdCard = ({prod,key}) => {

  const dispatch = useDispatch();

  const [cart , setCart] = useState([]);

   const parsedUser = localStorage.getItem('user');
   const user = JSON.parse(parsedUser);
  
   


   useEffect(()=>{
     console.log('carttt=',cart)
   },[cart])

    const order = async(orderItem)=>{
       console.log(orderItem)
        let placeOrder = await axios.post('http://localhost:4000/api/v1/place-order', orderItem, {
          withCredentials:true
        });
        console.log('placedOrder==', placeOrder)
        alert('order placed')
    }

    // const user = JSON.parse(localStorage.getItem('user'))

    const addToCart = (cartItem)=>{
      if(!user){
        toast.error('you are not logged in');
        return 
      }
      dispatch(addCart(cartItem))
      toast.success('item added to cart');
    }
    
  return (
     <div key={prod.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <img src={prod.photo} alt={prod.name} className="w-full h-48 object-cover rounded-t-lg" />
              <h3 className="text-xl font-semibold mt-4">{prod.name}</h3>
              <p className="text-gray-600 mt-2">${prod.price}</p>
              <button onClick={()=>addToCart({name:prod.name, price:prod.price, category:prod.category, photo:prod.photo, productId:prod._id, quantity:1})} className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
  )
}

export default ProdCard
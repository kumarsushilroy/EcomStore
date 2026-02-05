import {createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
    name:'cart',
    initialState:{
        cart:localStorage.getItem('cartItem')?
            JSON.parse(localStorage.getItem('cartItem')):
            []
    },
    reducers:{
        addCart:(state,action)=>{
            const existingItem = state.cart.find((i)=>i.productId==action.payload.productId);
            if(existingItem){
                existingItem.quantity += action.payload.quantity
            }else{
                state.cart.push(action.payload)
                localStorage.setItem('cartItem', JSON.stringify(state.cart));
            }
            
           
        },


        increaseQty:(state,action)=>{
         const {id,quantity} = action.payload ;
         const item = state.cart.find((i)=>i.productId==id)
         if(item){
            item.quantity += 1
            localStorage.setItem('cartItem', JSON.stringify(state.cart));
         }
        },

        decreaseQty:(state,action)=>{
          const {id,quantity} = action.payload ;
          const item = state.cart.find((i)=>i.productId==id);
          if(item){
            if(item.quantity<2){
                return
            }
            item.quantity -= 1 ;
            localStorage.setItem('cartItem', JSON.stringify(state.cart))
          }
        },

        removeCart:(state,action)=>{
           state.cart = state.cart.filter((i)=>i.productId!=action.payload)
           localStorage.setItem('cartItem', JSON.stringify(state.cart))
        },

        clearCart:(state,action)=>{
            state.cart = []
            localStorage.clear('cartItem')
        }
    }
});

export const {addCart, increaseQty, decreaseQty, removeCart, clearCart} = cart.actions ;
export default cart.reducer ;
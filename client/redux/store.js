// import { configureStore } from "@reduxjs/toolkit";
// import {productApi} from "./Api"
// import { authApi } from "./authApi";





// export const store = configureStore({
   
//     reducer:{
//         [productApi.reducerPath]:productApi.reducer,
//         [authApi.reducerPath]:authApi.reducer
//     },
//     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([productApi.middleware, authApi.middleware])
// })


// import { configureStore } from "@reduxjs/toolkit";
// import { authApi } from "./authApi";

// export const store = configureStore({
//     reducer:{
//         [authApi.reducerPath]:authApi.reducer
//     },
//     middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([authApi.middleware])
// })
import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { productApi } from "./Api";
import cartSlice from './cartSlice' ;

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        cart:cartSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([authApi.middleware],[productApi.middleware])
})
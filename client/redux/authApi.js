
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const authApi = createApi({
//   reducerPath: "authApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:4000/api/v1",
//     withCredentials:true
//   }),
//   endpoints: (builder) => ({
//     userLogin: builder.mutation({
//       query: (info) => ({
//         url: "/login",
//         method: "POST",
//         body:info
//       }),
//     }),
//     getOrders:builder.query({
//       query:()=> '/all-orders'
//     })
//   }),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const authApi = createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({
        baseUrl:'https://ecomstore-0oqz.onrender.com',
        credentials:'include',
    }),
    tagTypes:['auth'],
    endpoints:(builder)=>({
        userLogin:builder.mutation({

            query:(userInfo)=>({
                url:'/login',
                method:'POST',
                body:userInfo,
            }),

            provideTagsTypes:['auth']
           
        }),

        allProducts:builder.query({
            // query:({searchVal,categoryVal})=>`/admin-products/?search=${searchVal}&category=${categoryVal}`
            query:({searchVal,categoryVal})=>`/admin-products}`
        }),
        userOrders:builder.query({
            query:(searchVal)=>`/all-orders/?search=${searchVal}`
        }),
        // addToCart:builder.mutation({
        //     query:(cartInfo)=>{
        //       console.log(cartInfo)
        //     }
        // }),
        addAddress:builder.mutation({
            query:(addressDetail)=>({
                url:'/add-address',
                method:'POST',
                body:addressDetail
            })
        }),
        getAddress:builder.query({
            query:()=> '/user-address'
        }),
        placeOrder:builder.mutation({
            query:(orderDetails)=>({
                url:'/place-order',
                method:'POST',
                body:orderDetails
            })
        }),
        updateOrderStatus:builder.mutation({
            query:({id,status})=>({
                url:`/update-orderStatus/${id}`,
                method:'PUT',
                body:{status}
            })
        }),
        singleProduct:builder.query({
            query:(id)=>`/single-product/${id}`
        }),
        updateProduct:builder.mutation({
            query:({prodId, updatedInfo})=>(console.log('upDattedd=', prodId),{
                url:`/update-product/${prodId}`,
                method:'PUT',
                body:updatedInfo
            })
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/delete-product/${id}`,
                method:'DELETE'
            })
        }),
        register:builder.mutation({
            query:(userInfo)=>({
                url:'/register',
                method:'POST',
                body:userInfo
            })
        }),
        allUsers:builder.query({
            query:()=>'/all-users'
        }),
        updateUser:builder.mutation({
            query:({id,userInfo})=>({
                url:`/update-user/${id}`,
                method:'PUT',
                body:userInfo
            })
        }),
        deleteUser:builder.mutation({
          query:(id)=>({
            url:`/delete-user/${id}`,
            method:'DELETE'
          })
        }),
        
    })
});

export const {
    useUserLoginMutation,
    useAllProductsQuery,
    useUserOrdersQuery,
    useAddToCartMutation,
    useAddAddressMutation,
    useGetAddressQuery,
    usePlaceOrderMutation,
    useUpdateOrderStatusMutation,
    useSingleProductQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
    useRegisterMutation,
    useAllUsersQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
    } = authApi



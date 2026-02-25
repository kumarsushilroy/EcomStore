
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../Constant";
export const cartApi = ({

    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

   
})
    
    

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ecomstore-0oqz.onrender.com" }),
  tagTypes:["products"],

  endpoints: (builder) => ({
    getProductData: builder.query({
      query: (params) => "/admin-products",
      providesTags:["products"]
    }),
    getProductDetail: builder.query({
      query: (id) => `/single-product/${id}`,
    }),
    addProduct: builder.mutation({
      query(body) {
        return {
          url: "/create-product",
          method: "POST",
          body,
        };
    },
    invalidatesTags:["products"]
    }),
    updateProduct: builder.mutation({
      query({ id,body }) {
        return {
          url: `/update-product/${id}`,
          method: "PUT",
          body
        };
    },
    invalidatesTags:["products"]
    }),
    deleteProduct: builder.mutation({
      query(id) {
        return {
          url: `/delete-product/${id}`,
          method: "DELETE",
        };
    },
    invalidatesTags:["products"]
    }),
  }),
});

export const {
  useGetProductDataQuery,
  useGetProductDetailQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios';
import { useUserOrdersQuery, useAllOrdersQuery } from '../../redux/authApi';
import { useUpdateOrderStatusMutation } from '../../redux/authApi';
import {toast} from 'react-hot-toast'

const Orders = () => {

  const [searchVal , setSearchVal] = useState('')

  
  const {data:order, isLoading, error:orderError} = useUserOrdersQuery(searchVal);
  const [updateOrderStatus, {data:orderStatus, error:statusError}] = useUpdateOrderStatusMutation();
  const {data:allOrders} = useAllOrdersQuery();
   console.log('orderstatus--', allOrders.orders)

  useEffect(()=>{
    if(orderError){
      toast.error(orderError?.data?.message)
    }
    if(statusError){
      toast.error(statusError?.data.message)
    }
    if(orderStatus){
      toast.success(orderStatus?.message)
    }
  },[orderError, statusError, orderStatus])
 
  console.log('adminOrder=', order)
  
  const handleOrderStatus = async(id,status)=>{
    const obj = {id,status}
    await updateOrderStatus(obj)
  }
  

  return (
    <div className="container">
      <div className='row mt-5'>
        {
          allOrders?.orders?.length>0?(
              <div className="col-md-12">
          <h5>{allOrders?.orders?.length} Orders</h5>
          <input placeholder='search order ......' onChange={(e)=>setSearchVal(e.target.value)} className='m-2 p-2 outline-0 border rounded-xl shadow w-1/4' type="text" />
            
           <table class="table shadow rounded p-3">
              <thead>
                <tr>
                  <th scope="col">orderId</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Photo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {allOrders?.orders?.map((item, i) => (
                  <tr>
                    <td>{item._id}</td>
                    <td>{item.orderItems[0].name}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>
                      <img
                        style={{ width: "50px", height: "50px" }} 
                        className=" rounded-circle"
                        src={item.photo}
                        alt=""
                      />
                    </td>
                    <td className="d-flex gap-2">
                     <select name="" onChange={(e)=>handleOrderStatus(item._id,e.target.value )} className='form-control' id="">
                      <option value="">update status</option>
                      <option value="processing">processing</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                     </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
          ):(
<div className="col-md-12">
          <h2 className='text-center mt-10 text-red-500 font-serif'>No Orders Yet</h2>
        </div>
          )
        }
        
      
      </div>
      </div>
  )
}

export default Orders
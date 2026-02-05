import React, { useEffect } from "react";
import { useUserOrdersQuery } from "../../redux/authApi";
import { useState } from "react";
import useDebouce from "../../hooks/useDebounce";

const UserOrder = () => {

  const [searchVal , setSearchVal] = useState('');
  // const debouncedSearch = useDebouce(searchVal, 500)
  
  const { data:userOrder, isLoading } = useUserOrdersQuery(searchVal);
  console.log('dattt', userOrder)
 
  return (
    <>
    {
      userOrder?.orders?.length<1 && (
        <h3 className="text-center mt-36">No Orders Yet</h3>
      )
    }
    <div className="container-fluid">
      <div className="col-md-10 mx-auto">
        
          <input onChange={(e)=>setSearchVal(e.target.value)} className="border outline-0 m-2 p-2 rounded-xl shadow w-1/4" placeholder="search..." type="text" />
        


        <h3 className="mx-auto bg-amber-500 p-2 mt-3">Orders</h3>
        <table className="table bg-gray-100">
         
          {isLoading && "Loading data....."}
          <table border="1" cellPadding="10" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Items</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Shipping Fee</th>
              <th>Total Amount</th>
            </tr>
          </thead>

          <tbody>
            {userOrder?.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>

                {/* ORDER ITEMS */}
                <td>
                  <table width="100%">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Qty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.orderItems.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.category}</td>
                          <td>₹{item.price}</td>
                          <td>{item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>

                <td>{order.paymentMethod}</td>
                <td ><p className={order.orderStatus=='processing'?'bg-red-500 p-1 rounded text-white text-center':order.orderStatus=='shipped'?'bg-yellow-400 p-1 rounded text-white text-center':order.orderStatus=='delivered'?'bg-green-500 p-1 rounded text-white text-center':''}>{order.orderStatus}</p></td>
                <td>₹{order.shippingFee}</td>
                <td>₹{order.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </table>
      </div>
    </div>
    </>
  );
};

export default UserOrder;

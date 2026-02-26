import { useState } from "react";
import { useUserOrdersQuery, useAllUsersQuery, useAllProductsQuery, useAllOrdersQuery} from "../../redux/authApi";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const {data:allOrders} = useAllOrdersQuery();
  const {data:allUsers} = useAllUsersQuery();
  const {data:products} = useAllProductsQuery('');
  console.log('userordrrr',allOrders)

  return (
    
    <>
    <div className="flex gap-3 mt-5">
    <div className="bg-amber-400 p-5 flex-3 shadow">
      <h3>Users <span className="font-bold">{allUsers?allUsers?.users?.length:0}</span></h3>
    </div>
     <div className="bg-orange-400 p-5 flex-3 shadow">
      <h3>Orders <span className="font-bold">{allOrders?allOrders?.orders?.length:0}</span></h3>
    </div>
     <div className="bg-green-600 p-5 flex-3 shadow">
      <h3>Products <span className="font-bold">{products?products?.product?.length:0}</span></h3>
    </div>
    
    </div>
    </>

    
  );
};

export default Dashboard;

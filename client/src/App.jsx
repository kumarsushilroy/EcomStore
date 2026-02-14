import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./user/Home";
import Login from "./common/Login";
import Protected from "./common/Protected";
import Update from "./user/Update";
import Userlayout from "./user/Userlayout";
import Adminlayout from "./admin/Adminlayout";
import Dashboard from "./admin/Dashboard";
import Categories from "./admin/Categories";
import Products from "./admin/Products";
import Profile from "./admin/Profile"
import Suppliers from "./admin/Suppliers";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import { UseContextProvider } from "./features/Authcontext";
import { ProductContextProvider } from "./features/ProductContext";
import ProductDetail from "./user/ProductDetail";
import { Toaster } from "react-hot-toast";
import UserOrder from "./user/UserOrder";
import UserProfile from "./user/UserProfile";
import Cart from "./common/Cart";
import AddAddress from "./common/AddAddress";
import ProductList from "./common/ProductList";
import Register from "./common/Register";


function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ProductContextProvider>
          <UseContextProvider>
            <Routes>
             
              <Route element={<Userlayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={<Home />} />

                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/userOrder" element={<UserOrder />} />
                <Route path="/cartpage" element={<Cart />} />
                <Route path="/add-address" element={<AddAddress />} />
              </Route>

              <Route
                element={
                  <Protected>
                    <Adminlayout />
                  </Protected>
                }
              >
                <Route path="/admin-dashboard" element={<Dashboard />} />
                <Route path="/admin-categories" element={<Categories />} />
                <Route path="/admin-products" element={<ProductList />} />
                <Route
                  path="/admin-products/detail/:id"
                  element={<ProductDetail />}
                />
                <Route path="/admin-suppliers" element={<Suppliers />} />
                <Route path="/admin-orders" element={<Orders />} />
                <Route path="/admin-users" element={<Users />} />
                <Route path="/admin-profile" element={<Profile/>} />
                <Route />
              </Route>
            </Routes>
          </UseContextProvider>
        </ProductContextProvider>
      </BrowserRouter>

     
    </>
  );
}

export default App;

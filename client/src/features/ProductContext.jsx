import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../Constant";
export const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {

  const [product, setProduct] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [cart , setCart] = useState([]);
  const [quantity , setQuantity] = useState(1);
  const [cartItem , setCartItem] = useState();

  useEffect(() => {
    getProducts();
    // userOrders();
  }, []);

  const getProducts = async () => {
    let products = await axios.get(
      `${BASE_URL}/admin/products`
    );
    setProduct(products?.data?.product);
  };

  const userOrders = async () => {
    try {
      const resp = await axios.get("https://ecomstore-0oqz.onrender.com/all-orders");
      setUserOrder(resp?.data.orders)
    } catch (error) {
      return resp.status(400).json({
        message: "something went wrong !",
        error: error.message,
      });
    }
  };


  useEffect(()=>{
     setCartItem(JSON.parse(localStorage.getItem('cart')))
  },[cart])

 
  const addToCart = (product) => {
  // let updatedCart = [...cart];

  // let item = updatedCart.find(i => i.productId === product.productId);

  // item
  //   ? item.quantity++
  //   : updatedCart.push({ ...product, quantity});

  // setCart(updatedCart);
  // localStorage.setItem("cart", JSON.stringify(updatedCart));

  const item = [...cart];
  const existingItem = item.find((i)=>i.productId==product.productId);
  if(existingItem){
    existingItem.quantity += product.quantity ;
  }else{
    item.push(product)
    setCart(item)
    localStorage.setItem('cartItem', JSON.stringify(cart))
  }
  console.log('crrr', cart)

};

const increaseQuantity = (obj)=>{
  console.log('obj=', obj)
 const {id, quantity} = obj
 const cartItem = [...cart]
 const item = cartItem.find((i)=>i.productId==id);
 if(item){
  item.quantity = quantity
 }
  
}

const decreaseQuantity = ()=>{
 
  if(quantity<0){
    return 
  }
  setQuantity(quantity-1)
}

const removeFromCart = (id)=>{
 setCart(cart.filter((item)=>item.productId!==id)) 
}


  return (
    <ProductContext.Provider value={{
       product,
        // userOrder,
        addToCart,
        cart,
        cartItem,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
       }}>
      {children}
    </ProductContext.Provider>
  );
};
